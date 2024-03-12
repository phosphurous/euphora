const express = require('express');
const router = express.Router();
// const { authenticateToken } = require('../middlewares/authMiddlewares');
const productController = require('../controllers/productController');

//UNAUTHENTICATED ROUTES
router.get('/', productController.getAllProducts);
router.post('/', productController.addProduct);
router.delete('/:id', productController.deleteProduct);
router.get('/search', productController.getProductBySearch);
router.get('/:id/reviews', productController.getReviewsBySkinCondition);

module.exports = router;