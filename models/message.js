'use strict';

var mongoose = require('mongoose');

var schema = mongoose.Schema;

var messageSchema = schema({
  sender: String,
  body: String,
  time: Date,
  status: {type: String, default: 'unread'}
});

module.exports = mongoose.model('Message', messageSchema);
module.exports.schema = messageSchema;
