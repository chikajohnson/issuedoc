const express = require('express');
const programmeController = require('../controllers/programmeController');
const authController = require('../controllers/authController');
const { stationAdmin, parishAdmin, superAdmin } = require('../utils/roles');


const router = express.Router();

router
  .route('/')
  .get(programmeController.getAllProgramme);
router
  .route('/:id')
  .get(programmeController.getProgramme);

// Protect all routes after this middleware
router.use(authController.protect);
router.use(authController.restrictTo(stationAdmin, parishAdmin, superAdmin));

router
  .route('/')
  .post(programmeController.createProgramme);

router
  .route('/:id')
  .patch(programmeController.updateProgramme)
  .delete(programmeController.deleteProgramme);

module.exports = router;
