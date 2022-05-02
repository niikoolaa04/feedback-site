const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  id: {
    type: String
  },
  username: {
    type: String,
  },
  mail: {
    type: String,
  },
  password: {
    type: String,
  },
  firstName: {
    type: String,
    default: "N/A"
  },
  about: {
    type: String,
    default: "Not Set"
  },
  polls: [
    { type: mongoose.Schema.Types.ObjectId }
  ],
  surveys: [
    { type: mongoose.Schema.Types.ObjectId }
  ],
  profilePicture: {
    type: String,
    default: "https://www.komysafety.com/images/banner/no-image.png"
  },
});

module.exports = mongoose.model("User", UserSchema);