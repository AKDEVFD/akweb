const { Schema, model } = require('mongoose');

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    blog_content: [
      {
        body: {
          type: String,
          required: true,
        },
      },
    ],
    lastAccessed: {
      type: Date,
      default: Date.now,
    },
  },
);

const Blog = model('Blog', blogSchema);

module.exports = Blog;
