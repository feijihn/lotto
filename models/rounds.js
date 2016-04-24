'use strict';
var mongoose = require('mongoose');

var schema = mongoose.Schema;

var roundSchema = schema({
  product_id: {type: schema.ObjectId, ref: 'Product'},
  description: String,
  image: String,
  running: {type: Boolean, default: false},
  startTime: Date,
  endTime: Date,
  tickets: [{type: schema.ObjectId, ref: 'Ticket'}],
  ticketsOwned: {type: Number, default: 0},
  seq_id: {type: Number, default: 0},
  participants: [{type: schema.ObjectId, ref: 'User'}],
  winnum: Number
});

roundSchema.methods.getWinner = function() {
  return Math.floor(Math.random() * (100));
};

module.exports = mongoose.model('Round', roundSchema);
