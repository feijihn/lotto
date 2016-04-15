var mongoose = require('mongoose');

var schema = mongoose.Schema;

var productSchema = schema({
  category_id: mongoose.Schema.ObjectId,
  name: String,
  price: Number,
  description: String,
  image: String
});

module.exports = mongoose.model('Product', productSchema);
