const express = require('express');
const societyController = require('../controllers/societyController');
const authController = require('../controllers/authController');
const { stationAdmin, parishAdmin, superAdmin } = require('../utils/roles');

const router = express.Router();

router
  .route('/')
  .get(societyController.getAllSociety);
router
  .route('/:id')
  .get(societyController.getSociety);

// Protect all routes after this middleware
router.use(authController.protect);
router.use(authController.restrictTo(stationAdmin, parishAdmin, superAdmin));

router
  .route('/')
  .post(societyController.createSociety);

router
  .route('/:id')
  .patch(societyController.updateSociety)
  .delete(societyController.deleteSociety);

module.exports = router;
