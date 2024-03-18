
const express = require('express');
const router = express.Router();
const {similar_ingredients, is_allergic, get_allergy_confidence_of_ingredient_list_in_image} = require('../controllers/ingredientController')
const multer  = require('multer')

const upload = multer({}).single("ingredient_image");
    

//UNAUTHENTICATED ROUTES
// http://localhost:3000/api/v1/ingredients/similarity-score?ingredient_name=aqua
router.get('/similarity-score', similar_ingredients)

// http://localhost:3000/api/v1/ingredients/2/is-allergic?ingredient_name=aqua
router.get('/:id/is-allergic', is_allergic)


router.post('/:id/allergy-confidence', upload, get_allergy_confidence_of_ingredient_list_in_image);

module.exports = router;