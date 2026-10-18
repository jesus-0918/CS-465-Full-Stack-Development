const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  hash: {
    type: String,
    required: true
  }
});

userSchema.methods.setPassword = async function(password) {
  this.hash = await bcrypt.hash(password, 12);
};

userSchema.methods.validPassword = async function(password) {
  return bcrypt.compare(password, this.hash);
};

userSchema.methods.generateJwt = function () {
  const jwt = require('jsonwebtoken');

  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name,
      exp: Math.floor(expiry.getTime() / 1000)
    },
    process.env.JWT_SECRET
  );
};

mongoose.model('users', userSchema);