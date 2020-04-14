const express = require('express');
const projectController = require('../controllers/projectController');
const authController = require('../controllers/authController');
const { admin } = require('../utils/roles');


const router = express.Router();

router
  .route('/')
  .get(projectController.getAllProject);
router
  .route('/:id')
  .get(projectController.getProject);

// Protect all routes after this middleware
router.use(authController.protect);
router.use(authController.restrictTo(admin));

router
  .route('/')
  .post(projectController.createProject);
router
  .route('/:id')
  .patch(projectController.updateProject)
  .delete(projectController.deleteProject);

module.exports = router;
