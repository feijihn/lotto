var mongoose = require('mongoose');

var schema = mongoose.Schema;

var ticketSchema = schema({
  user_id: {type: mongoose.Schema.ObjectId, ref: 'User'},
  round_id: {type: mongoose.Schema.ObjectId, res: 'Round'},
  value: Number
});

ticketSchema.methods.activate = () => {
  // activation method placeholder
};

module.exports = mongoose.model('Ticket', ticketSchema);
module.exports.schema = ticketSchema;
