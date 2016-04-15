'use strict';

var mongoose = require('mongoose');

var schema = mongoose.Schema;

var messageSchema = schema({
  sender: String,
  body: String
});

module.exports = mongoose.model('Message', messageSchema);
module.exports.schema = messageSchema;
