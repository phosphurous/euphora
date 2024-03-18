
const express = require('express');
const router = express.Router();
const { example_upload, example_search, create_embeddings_in_db } = require('../controllers/exampleController')

//UNAUTHENTICATED ROUTES
router.get('/upload', example_upload)
router.get('/get-similar-ingredient', example_search)
router.get('/create-embeddings', create_embeddings_in_db)

module.exports = router;