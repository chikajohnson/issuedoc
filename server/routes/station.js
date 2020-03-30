const express = require('express');
const stationController = require('../controllers/stationController');
const authController = require('../controllers/authController');
const { stationAdmin, parishAdmin, superAdmin } = require('../utils/roles');

const router = express.Router();

router
  .route('/')
  .get(stationController.getAllStation);
router
  .route('/:id')
  .get(stationController.getStation);

// Protect all routes after this middleware
router.use(authController.protect);
router.use(authController.restrictTo('admin'));

router
  .route('/')
  .post(stationController.createStation);
router
  .route('/:id')
  .patch(stationController.updateStation)
  .delete(stationController.deleteStation);

module.exports = router;
