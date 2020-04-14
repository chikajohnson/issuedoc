const express = require('express');
const issueController = require('../controllers/issueController');
const authController = require('../controllers/authController');
const { admin , developer} = require('../utils/roles');


const router = express.Router();

router
  .route('/')
  .get(issueController.getAllIssues);
router
  .route('/:id')
  .get(issueController.getIssue);

// Protect all routes after this middlewarey
router.use(authController.protect);
router.use(authController.restrictTo(admin, developer));


router
  .route('/')
  .post(issueController.createIssue);
router
  .route('/:id')
  .patch(issueController.updateIssue)
  .delete(issueController.deleteIssue);

module.exports = router;
