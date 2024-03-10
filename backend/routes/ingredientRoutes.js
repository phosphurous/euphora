
const express = require('express');
const router = express.Router();
const {similar_ingredients, is_allergic} = require('../controllers/ingredientCOntroller')

//UNAUTHENTICATED ROUTES
// http://localhost:3000/api/v1/ingredients/similarity-score?ingredient_name=aqua
router.get('/similarity-score', similar_ingredients)

// http://localhost:3000/api/v1/ingredients/2/is-allergic?ingredient_name=aqua
router.get('/:id/is-allergic', is_allergic)

module.exports = router;