const express = require('express');
const parishController = require('../controllers/parishController');
const authController = require('../controllers/authController');
const { admin } = require('../utils/roles');


const router = express.Router();

router
  .route('/')
  .get(parishController.getAllParish);
router
  .route('/:id')
  .get(parishController.getParish);

// Protect all routes after this middleware
router.use(authController.protect);
router.use(authController.restrictTo(admin));

router
  .route('/')
  .post(parishController.createParish);
router
  .route('/:id')
  .patch(parishController.updateParish)
  .delete(parishController.deleteParish);

module.exports = router;
