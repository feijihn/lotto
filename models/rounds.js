
var mongoose = require('mongoose');

var roundSchema = mongoose.Schema({
  product_id: {type: mongoose.Schema.ObjectId, ref: 'Product'},
  purchase_id: mongoose.Schema.ObjectId,
  description: String,
  image: String,
  running: {type: Boolean, default: true},
  startTime: Date,
  tickets: [{type: mongoose.Schema.ObjectId, ref: 'Ticket'}],
  ticketsOwned: {type: Number, default: 0}
});

roundSchema.method.incTickets = () => {
  this.ticketsOwned++;
};

module.exports = mongoose.model('Round', roundSchema);
