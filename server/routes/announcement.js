const express = require('express');
const announcementController = require('../controllers/announcementController');
const authController = require('../controllers/authController');
const { stationAdmin, parishAdmin, superAdmin, admin } = require('../utils/roles');

const router = express.Router();



router
  .route('/')
  .get(announcementController.getAllAnnouncement);
router
  .route('/:id')
  .get(announcementController.getAnnouncement);

// Protect all routes after this middleware
router.use(authController.protect);
router.use(authController.restrictTo(stationAdmin, parishAdmin, admin, superAdmin));
router
  .route('/')
  .post(announcementController.createAnnouncement);
router
  .route('/:id')
  .patch(announcementController.updateAnnouncement)
  .delete(announcementController.deleteAnnouncement);

module.exports = router;
