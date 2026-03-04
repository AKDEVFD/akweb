const {Blog, User} = require('../models');

module.exports = {
  async getBlogs(req, res) {
    try {
      const blogs = await Blog.find().populate("author", "name email");
      res.json(blogs);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getSingleBlog(req, res) {
    try {
      const blog = await Blog.findById(req.params.id).populate("author", "name email");
      if (!blog) return res.status(404).json({ message: "Blog not found." });
      res.json(blog);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createBlog(req, res) {
    try {
      const user = await User.findById(req.body.author);
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      const blog = await Blog.create(req.body);

      // Add the blog to the user's blog array
      user.blog.push(blog._id);
      await user.save();

      res.status(201).json(blog);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};