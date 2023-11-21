const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

router.get('/dashboard', employeeController.getDashboard);
router.get('/performance-reviews', employeeController.getPerformanceReviews);
router.get('/submit-feedback/:id', employeeController.getSubmitFeedback);
router.post('/submit-feedback/:id', employeeController.postSubmitFeedback);
router.get('/manage-performance-reviews', employeeController.getManagePerformanceReviews);
router.get('/view-details/:id', employeeController.getViewDetails);
// router.get('/homepage', employeeController.getHomepage);

module.exports = router;
