
const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/authMiddlewares');
const {get_all_allergies, get_profile_from_acc_id} = require('../controllers/profileController');

//AUTHENTICATED ROUTES
// router.post('/change-password', authenticateToken, accountController.changePassword);

//UNAUTHENTICATED ROUTES
router.get('/:id/all_allergies', get_all_allergies)
router.get('/:id/get_profile', get_profile_from_acc_id)


module.exports = router;