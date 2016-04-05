var mongoose = require('mongoose');

var ticketSchema = mongoose.Schema({
  user_id: {type: mongoose.Schema.ObjectId, ref: 'User'},
  round_id: {type: mongoose.Schema.ObjectId, res: 'Round'},
  value: Number
});

ticketSchema.methods.activate = () => {
  // activation method placeholder
};

module.exports = mongoose.model('Ticket', ticketSchema);
