
const express = require('express');
const router = express.Router();
const {get_all_allergies, get_profile_from_id, get_all_routines} = require('../controllers/profileController');

//AUTHENTICATED ROUTES
// router.post('/change-password', authenticateToken, accountController.changePassword);

//UNAUTHENTICATED ROUTES
router.get('/:id/all_allergies', get_all_allergies)
router.get('/:id/get_routines', get_all_routines)
router.get('/:id/get_profile', get_profile_from_id)

module.exports = router;