const express = require('express');
const issueController = require('../controllers/issueController');
const authController = require('../controllers/authController');
const { admin } = require('../utils/roles');


const router = express.Router();

router
  .route('/')
  .get(issueController.getAllIssue);
router
  .route('/:id')
  .get(issueController.getIssue);

// Protect all routes after this middleware
router.use(authController.protect);
router.use(authController.restrictTo(admin));

router
  .route('/')
  .post(issueController.createIssue);
router
  .route('/:id')
  .patch(issueController.updateIssue)
  .delete(issueController.deleteIssue);

module.exports = router;
