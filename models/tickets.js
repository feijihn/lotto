var mongoose = require('mongoose');

var ticketSchema = mongoose.Schema({
	user_id: {type: mongoose.Types.objectId(), ref: 'User'},
	//product_id: {type: mogoose.Types.objectId(), ref: 'Product'},
	count: Number,
}); 

var activatedTicketSchema = mongoose.Schema({
	value: Number,
	user_id = {type: mongoose.Types.objectId(),ref : 'User'},
	round_id = {type: mongoose.Types.objectId(), res: 'Round'}
})

ticketSchema.methods.activate = () => {
	//activation method placeholder
};

module.exports = mogoose.model('Ticket', ticketSchema);
module.exports = mogoose.model('ActivatedTicket', activatedTicketSchema);
