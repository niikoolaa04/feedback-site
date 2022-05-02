const mongoose = require("mongoose");

const PollSchema = new mongoose.Schema({
  id: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  title: {
    type: String,
  },
  question: {
    type: String,
  },
  options: {
    type: Array,
    default: []
  }
});

module.exports = mongoose.model("Poll", PollSchema);