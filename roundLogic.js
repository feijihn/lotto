'use strict';
var mongoose = require('mongoose');
var Ticket = require('./models/tickets.js');
var Round = require('./models/rounds.js');
var User = require('./models/user.js');
var Message = require('./models/message.js');

function generateWinnerMessage(rndId) {
  return 'Greetings!\n Your ticket was the winner\'s one in the round id ' + rndId + '! Please contact round maintainer to claim your prize.';
}

function generateRoundEndMessage(rndId) {
  return 'Hello.\nRound with id ' + rndId + ' y in has ended. You are not the winner today, better luck next time!';
}

module.exports.restartRoundWithDelay = function(id, round, delay) {
  let newRound = new Round();
  console.log('creating new same round...');
  newRound.product_id = round.product_id;
  newRound.description = round.description;
  newRound.image = round.image;
  newRound.startTime = Date.now();
  console.log('old round closing and new starting in 10 seconds...');
  setTimeout(() => {
    Round.remove({_id: id}, err => {
      if (err) {
        throw err;
      }
      console.log('removed round ' + id);
      newRound.save(err => {
        if (err) {
          throw err;
        }
        console.log('new round saved');
      });
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
        User.findByIdAndUpdate(participant, {$push: {messages: {sender: 'System', body: generateWinnerMessage(rndId)}}}, err => {
          if (err) {
            throw err;
          }
        });
      } else {
        User.findByIdAndUpdate(participant, {$push: {messages: {sender: 'System', body: generateRoundEndMessage(rndId)}}}, err => {
          if (err) {
            throw err;
          }
        });
      }
    });
  });
};
