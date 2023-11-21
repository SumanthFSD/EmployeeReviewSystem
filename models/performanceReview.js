// PerformanceReview.js
const mongoose = require('mongoose');

const performanceReviewSchema = new mongoose.Schema({
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
  },
  reviewee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
  },
  reviewerName: {
    type: String,
  },
  revieweeName: {
    type: String,
  },
  feedback: String,
  
});

module.exports = mongoose.model('PerformanceReview', performanceReviewSchema);
