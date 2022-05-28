const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  id: {
    type: String
  },
  author: {
    id: {
      type: String
    },
    profileName: {
      type: String
    },
    username: {
      type: String
    },
    profilePicture: {
      type: String
    }
  },
  comment: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model("Comment", CommentSchema);