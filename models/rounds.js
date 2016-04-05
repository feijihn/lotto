
var mongoose = require('mongoose');

var roundSchema = mongoose.Schema({
  product_id: {type: mongoose.Schema.ObjectId, ref: 'Product'},
  purchase_id: mongoose.Schema.ObjectId,
  description: String,
  image: String,
  startTime: Date,
  tickets: [{type: mongoose.Schema.ObjectId, ref: 'Ticket'}]
});

module.exports = mongoose.model('Round', roundSchema);
