const { Schema, model } = require('mongoose');

const blogSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
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
    coverImage: {
      type: String,
      default: '',
    },
    lastAccessed: {
      type: Date,
      default: Date.now,
    },
  },
);

const Blog = model('Blog', blogSchema);

module.exports = Blog;
