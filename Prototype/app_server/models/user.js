var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  id: Number,
  name: String,
  email: String,
  password: String,
  role: String,
  dob: String,
  gender: String,
  tele: String,
  add1: String,
  add2: String,
  city: String,
  country: String,
  state: String,
  postalCode: String,
  createdBy: String,
  isActive: Boolean
});

module.exports = mongoose.model("user", UserSchema, "user");
