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
  shortDescription: {
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
  },
  date: {
    type: Date,
    default: new Date().toLocaleDateString()
  }
});

module.exports = mongoose.model("Poll", PollSchema);