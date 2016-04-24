'use strict';
var mongoose = require('mongoose');
var Ticket = require('./models/tickets.js');
var Round = require('./models/rounds.js');
var User = require('./models/user.js');
var Message = require('./models/message.js');
var Product = require('./models/product.js');

function generateWinnerMessage(rndId) {
  return 'Greetings!\n Your ticket was the winner\'s one in the round id ' + rndId + '! Please contact round maintainer to claim your prize.';
}

function generateRoundEndMessage(rndId) {
  return 'Hello.\nRound with id ' + rndId + ' y in has ended. You are not the winner today, better luck next time!';
}

function createNewRound(prodId) {
  let newRound = new Round();
  console.log('creating new same round...');
  newRound.product_id = prodId;
  newRound.startTime = Date.now();
  Product.findOne({_id: prodId}, (err, prod) => {
    if (err) {
      throw err;
    }
    prod.update({$inc: {roundsCount: 1}}, err => {
      if (err) {
        throw err;
      }
      newRound.seq_id = prod.roundsCount;
      newRound.save(err => {
        if (err) {
          throw err;
        }
        return newRound;
      });
    });
  });
}

function runNextRound(prodId) {
  console.log('running closest round');
}

module.exports.restartRoundWithDelay = function(id, round, delay) {
  setTimeout(() => {
    Round.update({_id: id}, {$set: {running: false}}, err => {
      if (err) {
        throw err;
      }
      console.log('closed round ' + id);
      createNewRound(round.product_id);
      runNextRound(round.product_id, round.seq_id + 1);
    });
  }, delay);
};

module.exports.sendAlertsToParticipants = function(rndId, winner) {
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
};

module.exports.ownTicket = function(rndId, userId, value) {
  Ticket.find({round_id: rndId, value: value}, (err, ticket) => {
    if (err) {
      throw err;
    }
    if (ticket.length === 0) {
      let newTicket = new Ticket();
      newTicket.round_id = rndId;
      newTicket.user_id = userId;
      newTicket.value = value;
      newTicket.save(err => {
        if (err) {
          throw err;
        }
      });
    } else {
      console.log('Ticket was already owned; TODO');
    }
  });
};
