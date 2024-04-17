const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  avt: String,
  name: String,
  id: String,
  isAdmin: Boolean,
});

const GroupSchema = new Schema({
  id: String,
  name: String,
  img: String,
  describe: String,
  members: [UserSchema],
});

module.exports = mongoose.model("groups", GroupSchema);
