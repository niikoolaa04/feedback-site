const mongoose = require("mongoose");

const SurveySchema = new mongoose.Schema({
  id: {
    type: String
  },
  user: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  questions: {
    type: Array,
    default: []
  },
  submitters: {
    type: Array,
    default: []
  },
  limit: {
    type: Number
  },
  needAuth: {
    type: Boolean
  },
  publicResults: {
    type: Boolean
  }
});

module.exports = mongoose.model("Survey", SurveySchema);