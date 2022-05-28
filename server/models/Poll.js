const mongoose = require("mongoose");

const PollSchema = new mongoose.Schema({
  id: {
    type: String
  },
  user: {
    type: String,
  },
  title: {
    type: String,
    required: true
  },
  question: {
    type: String,
    required: true
  },
  options: {
    type: Array,
    default: []
  },
  submitters: {
    type: Array,
    default: []
  },
  limit: {
    type: Number,
    default: -1
  },
  needAuth: {
    type: Boolean,
    default: false
  },
  publicResults: {
    type: Boolean,
    default: true,
  },
  publicList: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model("Poll", PollSchema);