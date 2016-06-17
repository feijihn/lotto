var mongoose = require('mongoose');

var schema = mongoose.Schema;

var footerLinkSchema = schema({
  label: String,
  link: String
});

module.exports = mongoose.model('FooterLink', footerLinkSchema);


