'use strict';
var mongoose = require('mongoose');

var schema = mongoose.Schema;

var roundSchema = schema({
  product_id: {type: schema.ObjectId, ref: 'Product'},
  purchase_id: schema.ObjectId,
  description: String,
  image: String,
  running: {type: Boolean, default: true},
  startTime: Date,
  endTime: Date,
  tickets: [{type: schema.ObjectId, ref: 'Ticket'}],
  ticketsOwned: {type: Number, default: 0},
  participants: [{type: schema.ObjectId, ref: 'User'}]
});

roundSchema.methods.getWinner = function() {
  return Math.floor(Math.random() * (100));
};

module.exports = mongoose.model('Round', roundSchema);
