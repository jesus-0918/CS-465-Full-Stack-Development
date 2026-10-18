const mongoose = require('mongoose');
const passport = require('passport');

const User = mongoose.model('users');

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: 'All fields are required.'
    });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: 'Unable to register with these details.'
      });
    }

    const user = new User({ name, email });

    await user.setPassword(password);
    await user.save();

    return res.status(201).json({
      token: user.generateJwt()
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Registration failed.'
    });
  }
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: 'Email and password are required.'
    });
  }

  passport.authenticate('local', (error, user) => {
    if (error) {
      return next(error);
    }

    if (!user) {
      return res.status(401).json({
        message: 'Incorrect email or password.'
      });
    }

    return res.status(200).json({
      token: user.generateJwt()
    });
  })(req, res, next);
};

module.exports = {
  register,
  login
};