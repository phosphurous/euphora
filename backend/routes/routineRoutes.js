const express = require('express');
const router = express.Router();
// const { authenticateToken } = require('../middlewares/authMiddlewares');
const routineController = require('../controllers/routineController');

//UNAUTHENTICATED ROUTES
router.get('/logs', routineController.getAllRoutineLog);

router.post('/addProduct', routineController.addProductToRoutine);
router.post('/', routineController.addRoutine);

router.put('/:id', routineController.updateRoutineProductLog);
router.delete('/:id', routineController.deleteRoutine);

module.exports = router;