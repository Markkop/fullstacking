var mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
  title: String,
});

module.exports = mongoose.model('Product', ProductSchema);
