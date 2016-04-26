'use strict';
var mongoose = require('mongoose');
var request = require('request');
var Ticket = require('./models/tickets.js');
var Round = require('./models/rounds.js');
var User = require('./models/user.js');
var Message = require('./models/message.js');
var Product = require('./models/product.js');

function chooseWinner() {
  var winner;
  request('https://blockchain.info/latestblock', (err, response, body) => {
    // TODO for date;
    let lastBlock = JSON.parse(response.body);
    request('https://blockchain.info/rawblock/' + lastBlock.hash, (err, response, body) => {
      let rawLastBlock = JSON.parse(response.body);
      rawLastBlock.tx.forEach((transaction, i) => {
        let value = 0;
        transaction.inputs.forEach(input => {
          if (input.prev_out) {
            value += input.prev_out.value;
          }
        });
        if (value !== 0) {
          value = value.toString();
          winner += Number(value.slice(4, 6));
        }
        if (i === rawLastBlock.tx.length - 1) {
          console.log(winner % 100);
          return Number(winner % 100);
        }
      });
    });
  });
}

function generateWinnerMessage(rndId) {
  return 'Greetings!\n Your ticket was the winner\'s one in the round id ' + rndId + '! Please contact round maintainer to claim your prize.';
}

function generateRoundEndMessage(rndId) {
  return 'Hello.\nRound with id ' + rndId + ' y in has ended. You are not the winner today, better luck next time!';
}

function addParticipant(rndId, userId) {
  Round.findOneAndUpdate({_id: rndId, participants: {$nin: [String(userId)]}, endTime: undefined}, {$push: {participants: String(userId)}}, (err, round) => {
    if (err) {
      throw err;
    }
  });
}

function checkRoundEnd(rndId) {
  var winningTicket = chooseWinner() || Math.floor(Math.random() * (100));
  console.log(winningTicket);
  Round.findOne({_id: rndId, endTime: {$eq: undefined}}, (err, round) => {
    if (err) {
      throw err;
    }
    if (round && round.tickets.length === 100) {
      Round.findByIdAndUpdate(rndId, {$set: {endTime: Date.now(), winnum: winningTicket}}, err => {
        if (err) {
          throw err;
        }
        sendAlertsToParticipants(rndId, winningTicket);
        handleNextRound(round.product_id);
      });
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
    if (err) {
      throw err;
    }
    Round.findByIdAndUpdate(rndId, {$push: {tickets: newTicket}}, (err, round) => {
      if (err) {
        throw err;
      }
    });
  });
  return newTicket;
}

function createNewRound(prodId, running) {
  let newRound = new Round();
  console.log('creating new round...');
  newRound.product_id = prodId;
  newRound.running = running;
  if (running) {
    newRound.startTime = Date.now();
  }
  newRound.creationTime = Date.now();
  newRound.save((err, round) => {
    if (err) {
      throw err;
    }
  });
  return newRound._id;
}

function handleNextRound(prodId) {
  console.log('running closest round...');
  Round.find({product_id: prodId, startTime: undefined}, (err, rounds) => {
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
      console.log('no more rounds exist... creating new...');
      createNewRound(prodId, true);
    }
  });
}

function sendAlertsToParticipants(rndId, winner) {
  Round.findById(rndId, (err, round) => {
    if (err) {
      throw err;
    }
    round.participants.forEach(participant => {
      console.log(String(participant) + 'and' + String(winner) + ' === ' + String(participant) === String(winner));
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
    if (err) {
      throw err;
    }
    prodId = round.product_id;
  });
  Ticket.find({round_id: rndId, value: value}, (err, ticket) => {
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
  });
};

module.exports.addParticipant = (rndId, userId) => {
  addParticipant(rndId, userId);
};

module.exports.checkRoundEnd = rndId => {
  checkRoundEnd(rndId);
};
