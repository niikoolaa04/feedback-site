const mongoose = require("mongoose");

const SurveySchema = new mongoose.Schema({
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
  }
});

module.exports = mongoose.model("Survey", SurveySchema);