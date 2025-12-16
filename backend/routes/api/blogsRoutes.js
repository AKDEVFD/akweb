const router = require('express').Router();
const {
  //getUsers,
  //getSingleUser,
  createBlog,
  getBlogs,
} = require('../../controllers/blogController');

// /api/users
router.route('/').get(getBlogs).post(createBlog);

// /api/users/:userId
//router.route('/:userId').get(getSingleUser);

module.exports = router;
