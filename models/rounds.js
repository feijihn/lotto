'use strict';
var mongoose = require('mongoose');

var schema = mongoose.Schema;

var roundSchema = schema({
  product_id: {type: schema.ObjectId, ref: 'Product'},
  description: String,
  imageLink: String,
  image: {data: Buffer, contentType: String},
  creationTime: Date,
  startTime: Date,
  endTime: Date,
  tickets: [{type: schema.ObjectId, ref: 'Ticket'}],
  participants: [{type: schema.ObjectId, ref: 'User'}],
  winnum: Number
});

module.exports = mongoose.model('Round', roundSchema);
