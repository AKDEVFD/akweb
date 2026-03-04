const router = require('express').Router();
const { getUsers, createUser, loginUser } = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/login
router.route('/login').post(loginUser);

module.exports = router;
