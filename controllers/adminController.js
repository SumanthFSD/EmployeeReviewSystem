const Employee = require('../models/employee');
const PerformanceReview = require('../models/performanceReview');

exports.getDashboard = async (req, res) => {
  try {
    const employees = await Employee.find();
    const performanceReviews = await PerformanceReview.find();

    res.render('admin/dashboard', { employees, performanceReviews });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.render('admin/employees', { employees });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

exports.getAddEmployee = (req, res) => {
  res.render('admin/add-employee');
};

exports.postAddEmployee = async (req, res) => {
  const { newUsername, newPassword, newIsAdmin } = req.body;
  console.log("Uname/Pwd/IA:", newUsername, newPassword, newIsAdmin);
  let isAdmin = false;
  if(newIsAdmin == "admin"){
    isAdmin = true;
  }

  try {
    const existingEmployee = await Employee.findOne({ newUsername });

    if (existingEmployee) {
      return res.render('admin/add-employee', { error: 'Username already exists' });
    }

    const newEmployee = new Employee({
      username: newUsername,
      password: newPassword,
      isAdmin: isAdmin,
    });

    await newEmployee.save();
    res.redirect('/admin/employees');
  } catch (err) {
    console.error('Error adding employee:', err);
    res.status(500).send('Internal Server Error');
  }
};

exports.getEditEmployee = async (req, res) => {
  const employeeId = req.params.id;

  try {
    const employee = await Employee.findById(employeeId);
    res.render('admin/edit-employee', { employee });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

exports.postEditEmployee = async (req, res) => {
  const employeeId = req.params.id;
  const { editUsername, editPassword, editIsAdmin } = req.body;
  let isAdmin = false;

  if(editIsAdmin == "admin"){
    isAdmin = true;
  }

  try {
    await Employee.findByIdAndUpdate(employeeId, {
      username: editUsername,
      password: editPassword,
      isAdmin: isAdmin,
    });

    res.redirect('/admin/employees');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

exports.getPerformanceReviews = async (req, res) => {
  try {
    const performanceReviews = await PerformanceReview.find();
    res.render('admin/performance-reviews', { performanceReviews });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

// Controller function to render the assign review form
exports.getAssignReview = async (req, res) => {
  try {
    const reviewerId = req.params.id;
    
    // Fetch the reviewee (employee to be reviewed)
    const reviewer = await Employee.findById(reviewerId);
    console.log("reviewerId:", reviewerId, "->", reviewer);

    // Fetch all employees for the assignment
    const employees = await Employee.find();

    res.render('admin/assign-review', { reviewer, employees });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Controller function to handle the assignment form submission
exports.postAssignReview = async (req, res) => {
  
  const reviewerId = req.params.id; // Assuming the admin assigning the review is the reviewer
  const {revieweeId} = req.body; // The employee to be reviewed
  const reviewee = await Employee.findById(revieweeId);
  const reviewer = await Employee.findById(reviewerId);
  console.log("revieweeId:", revieweeId);

  try {
    // Create a new performance review with assigned reviewer and reviewee
    const newReview = new PerformanceReview({
      reviewer: reviewerId,
      reviewee: revieweeId,
      reviewerName: reviewer.username,
      revieweeName: reviewee.username
    });

    // Save the new performance review to the database
    await newReview.save();

    // Redirect back to the list of employees or wherever needed
    res.redirect('/admin/employees');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

exports.getManagePerformanceReviews = async (req, res) => {
  try {
    const performanceReviews = await PerformanceReview.find();
    res.render('admin/manage-performance-reviews', { performanceReviews });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

exports.getReviewDetails = async (req, res) => {
  const performanceReviewId = req.params.id;

  try {
    const performanceReview = await PerformanceReview.findById(performanceReviewId);
    res.render('admin/review-details', { performanceReview });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

exports.getHomepage = (req, res) => {
  res.render('homepage');
};

// exports.postAssignReview = async (req, res) => {
//   const { employeeId, assignedEmployeeId, feedback } = req.body;

//   try {
//     const newPerformanceReview = new PerformanceReview({
//       employeeId: assignedEmployeeId,
//       feedback,
//     });

//     await newPerformanceReview.save();
//     res.redirect('/admin/performance-reviews');
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Internal Server Error');
//   }
// };

// Controller function to handle GET request for removing an employee
exports.getRemoveEmployee = async (req, res) => {
  const employeeId = req.params.id;

  try {
    // Find the employee by ID and remove them
    await Employee.findByIdAndDelete(employeeId);

    // Redirect back to the list of employees
    res.redirect('/admin/employees');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
