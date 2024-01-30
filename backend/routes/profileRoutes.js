
const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/authMiddlewares');
const {getProfile} = require('../controllers/profileController');

//AUTHENTICATED ROUTES
// router.post('/change-password', authenticateToken, accountController.changePassword);

//UNAUTHENTICATED ROUTES
router.get('/:id', getProfile)


module.exports = router;
