var mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {type: String},
});

module.exports = mongoose.model('Product', productSchema);
