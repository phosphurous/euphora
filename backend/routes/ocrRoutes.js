
const express = require('express');
const router = express.Router();
const {get_text, img_to_text} = require('../controllers/ocrController');


const multer  = require('multer')

// var storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     console.log(file)
//     cb(null, './controllers/assets/profilePic/');
//   },
//   filename: function(req, file, cb) {
//     console.log(file)
//     cb(null, file.originalname);
//   }
// });
var upload = multer({
//   storage: storage
}).single("demo_image");

//UNAUTHENTICATED ROUTES
router.get('/get-text', get_text);
router.post('/img-to-text', upload ,img_to_text);

module.exports = router;