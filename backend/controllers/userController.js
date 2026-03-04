const { User } = require('../models');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find().populate("blog");
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createUser(req, res) {
    try {
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        roll: req.body.roll,
        refreshToken: req.body.refreshToken,
      });

      const savedUser = await user.save();

      res.status(201).json(savedUser);
    } catch (err) {
      // Check for duplicate key error
      if (err.code === 11000 && err.keyPattern && err.keyPattern.name === 1) {
        return res.status(400).json({ message: "User with this name already exists." });
      }
      console.error(err);
      res.status(500).json(err);
    }
  },

  async loginUser(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const valid = await user.isCorrectPassword(password);
      console.log(`[LOGIN DEBUG] Email: ${email} | Password match: ${valid}`);
      if (!valid) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      console.log(`[LOGIN DEBUG] User authenticated successfully: ${user.name}`);
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );

      res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  },

};
