const express = require('express');
const router = express.Router();
// const { authenticateToken } = require('../middlewares/authMiddlewares');
const productController = require('../controllers/productController');

//UNAUTHENTICATED ROUTES

// http://localhost:3000/api/v1/products/1/confidence?product_name=AmorePacific Age Spot Brightening Pen
router.get('/:id/confidence', productController.getConfidenceOfIngredientsInProducts);

router.get('/', productController.getAllProducts);
router.post('/', productController.addProduct);
router.delete('/:id', productController.deleteProduct);
router.get('/search', productController.getProductBySearch);
router.post('/:id/reviews', productController.getReviewsBySkinCondition);

module.exports = router;