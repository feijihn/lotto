
var mogoose = require('mongoose');

var roundSchema = mongoose.Schema({
	product_id : {type: mogoose.Types.objectId(), ref: 'Product'},
	purchase_id : mongoose.Types.objectId(),
	description: String,
	image: mongoose.Types.binData(),
})

//TODO methods

module.exports = mogoose.model('Round', roundSchema);
