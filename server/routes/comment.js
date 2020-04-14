const express = require('express');
const commentController = require('../controllers/commentController');
const authController = require('../controllers/authController');
const { admin } = require('../utils/roles');


const router = express.Router();

router
  .route('/')
  .get(commentController.getAllComment);
router
  .route('/:id')
  .get(commentController.getComment);

// Protect all routes after this middleware
router.use(authController.protect);
router.use(authController.restrictTo(admin));

router
  .route('/')
  .post(commentController.createComment);
router
  .route('/:id')
  .patch(commentController.updateComment)
  .delete(commentController.deleteComment);

module.exports = router;
