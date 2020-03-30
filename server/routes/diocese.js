const express = require('express');
const dioceseController = require('../controllers/dioceseController');
const authController = require('../controllers/authController');
const { superAdmin } = require('../utils/roles');

const router = express.Router();

router
  .route('/')
  .get(dioceseController.getAllDiocese);
router
  .route('/:id')
  .get(dioceseController.getDiocese);

// Protect routes
router.use(authController.protect);
router.use(authController.restrictTo(superAdmin));

router
  .route('/')
  .post(dioceseController.createDiocese);
router
  .route('/:id')
  .patch(dioceseController.updateDiocese)
  .delete(dioceseController.deleteDiocese);

module.exports = router;
