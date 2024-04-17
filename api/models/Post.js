const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AuthSchema = new Schema({
  avt: String,
  name: String,
  id: String,
});

const CommentSchema = new Schema({
  id: String,
  content: String,
  auth: AuthSchema,
  createAt: { type: Date, default: Date.now },
  replys: [
    {
      id: String,
      content: String,
      auth: AuthSchema,
      createAt: { type: Date, default: Date.now },
    },
  ],
});

const PostSchema = new Schema({
  id: String,
  content: String,
  idGroup: String,
  auth: AuthSchema,
  isAssignment: Boolean,
  comments: [CommentSchema],
  reacts: [AuthSchema]
});

module.exports = mongoose.model("posts", PostSchema);
