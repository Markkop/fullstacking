var mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: String,
});

module.exports = mongoose.model('Product', ProductSchema);
