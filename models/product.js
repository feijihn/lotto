var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
	category_id : mongoose.Schema.ObjectId, 
	name: String,
	price: Number,
	description: String,
	image: String,
})

//TODO methods

module.exports = mongoose.model('Product', productSchema);
