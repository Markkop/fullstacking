var mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  password: String,
  email: String,
  active: Boolean
});

module.exports = mongoose.model("User", UserSchema);
