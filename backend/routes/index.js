const router = require('express').Router();
const blogsRoutes = require('./api/blogsRoutes');
const userRoutes = require('./api/userRoutes');

router.use('/blogs', blogsRoutes);
router.use('/users', userRoutes);

module.exports = router;
