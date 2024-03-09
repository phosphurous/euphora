
const express = require('express');
const router = express.Router();
const { example_upload, example_search } = require('../controllers/exampleController')

//UNAUTHENTICATED ROUTES
router.get('/upload', example_upload)
router.get('/get-similar-ingredient', example_search)

module.exports = router;