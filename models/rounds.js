
var mongoose = require('mongoose');

var roundSchema = mongoose.Schema({
  product_id: {type: mongoose.Schema.ObjectId, ref: 'Product'},
  purchase_id: mongoose.Schema.ObjectId,
  description: String,
  image: String,
  running: {type: Boolean, default: true},
  startTime: Date,
  endTime: Date,
  tickets: [{type: mongoose.Schema.ObjectId, ref: 'Ticket'}],
  ticketsOwned: {type: Number, default: 0}
});

roundSchema.methods.getWinner = function() {
  return Math.floor(Math.random() * (100));
};

module.exports = mongoose.model('Round', roundSchema);
