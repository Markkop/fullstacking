var mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: String,
  date: String,
  description: String,
  author: String
});

module.exports = mongoose.model("Event", EventSchema);
