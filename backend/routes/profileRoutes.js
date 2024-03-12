
const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

//AUTHENTICATED ROUTES
// router.post('/change-password', authenticateToken, accountController.changePassword);

//UNAUTHENTICATED ROUTES
router.get('/get_skin_types_cond', profileController.get_skin_types_cond)
router.post('/add', profileController.add_profile)
router.put('/update', profileController.update_skin_type_condition)

router.get('/:id/all_allergies', profileController.get_all_allergies)
router.get('/:id/get_routines', profileController.get_all_routines)
router.get('/:id/get_profile', profileController.get_profile_from_id)

module.exports = router;