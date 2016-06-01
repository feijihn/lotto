'use strict';

var mongoose = require('mongoose');

var schema = mongoose.Schema;

var contentSchema = schema({
  name: String,
  text: String
});

module.exports = mongoose.model('Content', contentSchema);
module.exports.schema = contentSchema;
