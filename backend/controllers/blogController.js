const {Blog} = require('../models');

module.exports = {
  async getBlogs(req, res) {
    try {
      const users = await Blog.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createBlog(req, res) {
    try {
      const user = await Blog.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};