const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/dashboard', adminController.getDashboard);
router.get('/employees', adminController.getEmployees);
router.get('/add-employee', adminController.getAddEmployee);
router.post('/add-employee', adminController.postAddEmployee);
router.get('/edit-employee/:id', adminController.getEditEmployee);
router.post('/edit-employee/:id', adminController.postEditEmployee);
router.get('/remove-employee/:id', adminController.getRemoveEmployee); // Route for removing an employee
router.get('/performance-reviews', adminController.getPerformanceReviews);
router.get('/assign-review/:id', adminController.getAssignReview);
router.post('/assign-review/:id', adminController.postAssignReview);

router.get('/manage-performance-reviews', adminController.getManagePerformanceReviews);
router.get('/review-details/:id', adminController.getReviewDetails);
router.get('/homepage', adminController.getHomepage);
// router.post('/assign-review', adminController.postAssignReview);

module.exports = router;
