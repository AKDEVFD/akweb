const { Blog, User } = require('../models');
const mongoose = require('mongoose');

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
      // Find all blogs in the database
      const blogs = await Blog.find();

      // Check if any blogs exist
      if (!blogs || blogs.length === 0) {
        return res.status(404).json({ message: "No blogs found. Please create a blog first." });
      }

      // Create a new user with all found blogs
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        roll: req.body.roll,
        refreshToken: req.body.refreshToken,
        blog: blogs.map(blog => blog._id)  // Assign an array of blog ObjectId references
      });

      // Save the user to the database
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
};
