const router = require('express').Router();
const {
  createBlog,
  getBlogs,
  getSingleBlog,
} = require('../../controllers/blogController');

router.route('/').get(getBlogs).post(createBlog);
router.route('/:id').get(getSingleBlog);

module.exports = router;
