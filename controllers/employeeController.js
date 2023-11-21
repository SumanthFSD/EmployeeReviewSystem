const PerformanceReview = require('../models/performanceReview');

exports.getDashboard = async (req, res) => {
  try {
    const performanceReviews = await PerformanceReview.find({ reviewer: req.session.userId });
    // console.log("performanceReviews:", performanceReviews);
    res.render('employee/dashboard', { performanceReviews });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

exports.getPerformanceReviews = async (req, res) => {
  try {
    const performanceReviews = await PerformanceReview.find({ reviewer: req.session.userId });
    res.render('employee/performance-reviews', { performanceReviews });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

exports.getSubmitFeedback = async (req, res) => {
  const performanceReviewId = req.params.id;

  try {
    const performanceReview = await PerformanceReview.findById(performanceReviewId);
    res.render('employee/submit-feedback', { performanceReview });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

exports.postSubmitFeedback = async (req, res) => {
  const performanceReviewId = req.params.id;
  const { feedback } = req.body;

  try {
    await PerformanceReview.findByIdAndUpdate(performanceReviewId, { feedback });
    res.redirect('/employee/performance-reviews');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};


exports.getManagePerformanceReviews = async (req, res) => {
  try {
    const performanceReviews = await PerformanceReview.find({ employeeId: req.session.userId });
    res.render('employee/manage-performance-reviews', { performanceReviews });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

exports.getViewDetails = async (req, res) => {
  const performanceReviewId = req.params.id;

  try {
    const performanceReview = await PerformanceReview.findById(performanceReviewId);
    res.render('employee/view-details', { performanceReview });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};
