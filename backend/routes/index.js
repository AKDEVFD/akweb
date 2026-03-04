const router = require('express').Router();
const blogsRoutes = require('./api/blogsRoutes');
const userRoutes = require('./api/userRoutes');
const uploadRoutes = require('./api/uploadRoutes');

router.use('/blogs', blogsRoutes);
router.use('/users', userRoutes);
router.use('/upload', uploadRoutes);

module.exports = router;
