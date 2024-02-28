
const express = require('express');
const router = express.Router();
const { example_upload } = require('../controllers/exampleController')

//UNAUTHENTICATED ROUTES
router.get('/upload', example_upload)

module.exports = router;