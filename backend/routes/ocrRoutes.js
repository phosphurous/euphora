
const express = require('express');
const router = express.Router();
const {get_text} = require('../controllers/ocrController');

//UNAUTHENTICATED ROUTES
router.get('/get-text', get_text);

module.exports = router;