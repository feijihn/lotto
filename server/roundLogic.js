'use strict';
var mongoose = require('mongoose');
var request = require('request');
var Ticket = require('./models/tickets.js');
var Round = require('./models/rounds.js');
var User = require('./models/user.js');
var Message = require('./models/message.js');
var Product = require('./models/product.js');

function convertTime(UNIX_timestamp) {
  let a = new Date(UNIX_timestamp);
  let year = a.getFullYear();
  let month = Number(a.getMonth()) + 1 >= 10 ? Number(a.getMonth) + 1 : '0' + (Number(a.getMonth()) + 1);
  let date = a.getDate() >= 10 ? a.getDate() : '0' + a.getDate();
  let hour = a.getHours() >= 10 ? a.getHours() : '0' + a.getHours();
  let min = a.getMinutes() >= 10 ? a.getMinutes() : '0' + a.getMinutes();
  let sec = a.getSeconds() >= 10 ? a.getSeconds() : '0' + a.getSeconds();
  let time = hour + ':' + min + ':' + sec + ' ' + date + '/' + month + '/' + year;
  return time;
}
var chooseWinner = function(date, isCheck) {
  let interval = 60 * 1000;
  if(String(date).length === 13) {
    console.log('[BLOCKCHAIN] got date in milliseconds... converting...');
    date = Math.floor(date / 1000);
  }
  let fetchDate = date * 1000;
  if (isCheck) {
    var values = [];
    interval = 5 * 1000;
    fetchDate = fetchDate + 3600000;
    console.log('[BLOCKCHAIN] Checking blockchain on date: ' + fetchDate + '...');
  }
  return new Promise(function(resolve, reject) {
    let handle = setInterval(() => {
      request('https://blockchain.info/blocks/' + fetchDate + '?format=json', (err, response, body) => {
        try {
          let winner = 0;
          let blocks = JSON.parse(response.body).blocks;
          let lastBlock;
          if (isCheck) {
            console.log(blocks.length);
            for(let i = 0; i < blocks.length; i++) {
              if(blocks[i].time >= date) {
                lastBlock = blocks[i];
                break;
              }
            }
          } else {
            lastBlock = blocks[0];
          }
          if(!lastBlock) {
            throw(new Error('Last block is undefined probably because no blocks were recieved.'))
          }
          console.log('[BLOCKCHAIN] Checking at ' + convertTime(date * 1000) + ' and got last block at ' + convertTime(lastBlock.time * 1000) + '...');
          if (date <= lastBlock.time) {
            request('https://blockchain.info/rawblock/' + lastBlock.hash, (err, response, body) => {
              try {
                let rawLastBlock = JSON.parse(response.body);
                rawLastBlock.tx.forEach((transaction, i) => {
                  //console.log(transaction.time + '===' + date);
                  if (transaction.time >= date && transaction.time <= date + 60) {
                    //console.log('[BLOCKCHAIN] Got transactions in needed interval...');
                    let value = 0;
                    transaction.inputs.forEach(input => {
                      if (input.prev_out) {
                        value += input.prev_out.value;
                      if (isCheck) {
                        values.push(input.prev_out.value);
                      }
                      }
                    });
                    if (value !== 0) {
                      let valueString = String(value);
                      if(valueString.length < 9) {
                        let addition = '';
                        if (8 - valueString.length) {
                          addition = '0'.repeat(8 - valueString.length);
                        }
                        valueString = '0.' + valueString + addition + ' BTC';
                      } else if (valueString.length === 9 ) {
                        valueString = valueString[0] + '.' + valueString.substr(1) + ' BTC';
                      } else {
                        valueString = valueString.substr(0, valueString.length - 8) + '.' + valueString.substr(valueString.length - 8, valueString.length) + ' BTC';
                      }
                      winner += Number(value);
                    }
                    if (i === rawLastBlock.tx.length - 1) {
                      if (isCheck) {
                        resolve([String(winner).substr(-5, 2), values, handle]);
                      } else {
                        resolve([String(winner).substr(-5, 2), handle]);
                      }
                    }
                  } else {
                    //console.log('skipping transactions not in needed time interval...');
                    if (i === rawLastBlock.tx.length - 1) {
                      if (isCheck) {
                        resolve([String(winner).substr(-5, 2), values, handle]);
                      } else {
                        resolve([String(winner).substr(-5, 2), handle]);
                      }
                    }
                  }
                });
              } catch (error) {
                console.err('When working with RAW block occured -- ', error);
                clearInterval(handle);
              }
            });
          }
        } catch (error) {
          console.err('When working with block occured -- ', error);
          clearInterval(handle);
        }
      });
    }, interval);
  });
};

function generateWinnerMessage(rndId) {
  try {
    let message = 'Greetings!\n Your ticket was the winner\'s one in the round id ' + rndId + '! Please contact round maintainer to claim your prize.';
    return message;
  } catch (error) {
    console.err('When generating winenr message occured -- ', error)
  }
}

function generateRoundEndMessage(rndId) {
  try {
    let message = 'Hello.\nRound with id ' + rndId + ' y in has ended. You are not the winner today, better luck next time!';
    return message;
  } catch(error) {
    console.err('When generating roudn end message occured -- ', error);
  }
}

function addParticipant(rndId, userId) {
  Round.findOneAndUpdate({_id: rndId, participants: {$nin: [String(userId)]}, endTime: undefined}, {$push: {participants: String(userId)}}, (err, round) => {
    try {
      if (err) {
        throw err;
      }
    } catch(error) {
      console.err('When adding participant to round occured --', error);
    }
  });
}

function checkRoundEnd(rndId) {
  Round.findOne({_id: rndId, endTime: {$eq: undefined}}, (err, round) => {
    try {
      if (err) {
        throw err;
      }
      if (round) {
        console.server('Checking if round ' + round._id + ' ended...');
        console.server('Round has ' + round.tickets.length + ' tickets');
        if (round.tickets.length >= 100) {
          console.server('Round ' + round._id + ' ended. Will choose winner now...');
          let end = Date.now();
          Round.findByIdAndUpdate(rndId, {$set: {endTime: end}}, err => {
            try {
              if (err) {
                throw err;
              }
              chooseWinner(end).then(
                result => {
                  let winnum = result[0];
                  let handle = result[1];
                  clearInterval(handle);
                  console.server('Winner is ticket number ' + winnum);
                  Round.findByIdAndUpdate(rndId, {$set: {winnum: winnum}}, (err, round) => {
                    if (err) {
                      throw err;
                    }
                    sendAlertsToParticipants(rndId, winnum);
                    handleNextRound(round.product_id);
                  });
                },
                error => console.err('When choosing winner occured --', error)
              );
            } catch(error) {
              console.err('When updating round occured -- ', error);
            }
          });
        }
      }
    } catch(error) {
      console.err('When checking round end occured -- ', error);
    }
  });
}

function createNewTicket(rndId, userId, value) {
  addParticipant(rndId, userId);
  let newTicket = new Ticket();
  newTicket.round_id = rndId;
  newTicket.user_id = userId;
  newTicket.value = value;
  newTicket.save(err => {
    try {
      if (err) {
        throw err;
      }
      Round.findByIdAndUpdate(rndId, {$push: {tickets: newTicket}}, (err, round) => {
        try {
          if (err) {
            throw err;
          }
        } catch(error) {
          console.err('When updating round occured -- ', error);
        }
      });
    } catch(error) {
      console.err('When creating new ticket occured -- ', error);
    }
  });
  return newTicket;
}

function createNewRound(prodId, running) {
  try {
    console.server('Creating new round...');
    newRound.product_id = prodId;
    newRound.running = running;
    if (running) {
      newRound.startTime = Date.now();
    }
    newRound.creationTime = Date.now();
    newRound.save((err, round) => {
      try {
        if (err) {
          throw err;
        }
      } catch(error) {
        console.err("When saving new round occured -- ", error);
      }
    });
    return newRound._id;
  } catch(error) {
    console.err('When creating new round occured -- ', error);
  }
}

function handleNextRound(prodId) {
  console.server('Running closest round...');
  Round.find({product_id: prodId, startTime: undefined}, (err, rounds) => {
    try {
      if (err) {
        throw err;
      }
      if (rounds.length) {
        let creationTimes = rounds.map(round => {
          return round.creationTime;
        });
        let earliest = Math.min(...creationTimes);
        Round.findOneAndUpdate({creationTime: earliest}, {$set: {running: true, startTime: Date.now()}}, err => {
          if (err) {
            throw err;
          }
        });
      } else {
        console.server('No more rounds exist... creating new...');
        createNewRound(prodId, true);
      }
    } catch(error) {
      console.err('When handling next round occured --', error)
    }
  });
}

function sendAlertsToParticipants(rndId, winner) {
  Round.findById(rndId, (err, round) => {
    if (err) {
      throw err;
    }
    round.participants.forEach(participant => {
      if (String(participant) === String(winner)) {
        let alert = new Message();
        alert.sender = 'System';
        alert.body = generateWinnerMessage(rndId);
        alert.time = Date.now();
        alert.save((err, alert) => {
          if (err) {
            throw err;
          }
          User.findByIdAndUpdate(participant, {$push: {messages: alert}}, err => {
            if (err) {
              throw err;
            }
          });
        });
      } else {
        let alert = new Message();
        alert.sender = 'System';
        alert.body = generateWinnerMessage(rndId);
        alert.time = Date.now();
        alert.save((err, alert) => {
          if (err) {
            throw err;
          }
          User.findByIdAndUpdate(participant, {$push: {messages: alert}}, err => {
            if (err) {
              throw err;
            }
          });
        });
      }
    });
  });
}

module.exports.ownTicket = function(rndId, userId, value) {
  let prodId;
  Round.findOne({_id: rndId}, (err, round) => {
    try {
      if (err) {
        throw err;
      }
      prodId = round.product_id;
    } catch(error) {
      console.err('Can`t find round (id ' + rndId + ') make sure it exists.', error);
    }
  });
  Ticket.find({round_id: rndId, value: value}, (err, ticket) => {
    try {
      if (err) {
        throw err;
      }
      if (ticket.length === 0) {
        createNewTicket(rndId, userId, value);
      } else {
        console.log('ticket collision... resolving...');
        setTimeout(() => {
          Round.find({product_id: prodId, startTime: undefined}, (err, rounds) => {
            if (err) {
              throw err;
            }
            if (rounds.length) {
              let creationTimes = rounds.map(round => {
                return round.creationTime;
              });
              for (var i = 0; i < creationTimes.length; ++i) {
                let break_ = false;
                Round.findOne({creationTime: creationTimes[i]}, (err, round) => {
                  if (err) {
                    throw err;
                  }
                  Ticket.findOne({round_id: round._id, value: value}, (err, ticket) => {
                    console.log('round with id ' + round._id + ' contains ' + ticket);
                    if (err) {
                      throw err;
                    }
                    if (!ticket) {
                      createNewTicket(round._id, userId, value);
                      console.log('added conflicting ticket w/ value ' + value + ' to round id ' + round._id);
                      break_ = true;
                    }
                  });
                });
                if (break_) {
                  break;
                }
              }
            } else {
              console.log('no more rounds exist... creating new...');
              let freshRound = createNewRound(prodId, false);
              createNewTicket(freshRound, userId, value);
            }
          });
        }, 1000);
      }
    } catch(error) {
      console.err('When trying to find tickets occured -- ', error)
    }
  });
};

module.exports.addParticipant = (rndId, userId) => {
  addParticipant(rndId, userId);
};

module.exports.checkRoundEnd = rndId => {
  checkRoundEnd(rndId);
};

module.exports.checkDate = date => {
  return chooseWinner(date, true);
}
