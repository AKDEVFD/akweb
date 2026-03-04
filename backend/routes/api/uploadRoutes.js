const router = require('express').Router()
const { uploadImage } = require('../../controllers/uploadController')

// POST /upload/image
router.post('/image', uploadImage)

module.exports = router
