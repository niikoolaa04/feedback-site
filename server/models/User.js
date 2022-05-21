const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
  profileName: {
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

UserSchema.pre('findOneAndUpdate', async function (next) {
  const docToUpdate = await this.model.findOne(this.getQuery());
  if(!docToUpdate) {
    next();
  }

  if(docToUpdate.password !== this._update.password && this._update.password != '' && this._update.password) {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this._update.password, salt)
    this._update.password = hashedPassword
    next();
  } else if(!this._update.password) {
    next();
  } else {
    next();
  }
});

UserSchema.pre('save', async function(next) {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  thus.password = hashedPassword;
  next();
})

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);