const express = require('express');
const parishSocietyController = require('../controllers/parishSocietyController');
const authController = require('../controllers/authController');
const { stationAdmin, parishAdmin, superAdmin } = require('../utils/roles');

const router = express.Router();


router
  .route('/')
  .get(parishSocietyController.getAllParishSocieties);
router
  .route('/:id')
  .get(parishSocietyController.getParishSociety);

// Protect all routes after this middleware
router.use(authController.protect);
router.use(authController.restrictTo(stationAdmin, parishAdmin, superAdmin));

router
  .route('/')
  .post(parishSocietyController.createParishSociety);
router
  .route('/:id')
  .patch(parishSocietyController.updateParishSociety)
  .delete(parishSocietyController.deleteParishSociety);

module.exports = router;
