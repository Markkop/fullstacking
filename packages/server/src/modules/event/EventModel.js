var mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: String,
  date: String,
  description: String,
  author: Object
});

module.exports = mongoose.model("Event", EventSchema);
