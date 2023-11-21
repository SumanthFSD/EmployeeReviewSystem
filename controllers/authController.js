const Employee = require('../models/employee');
const config = require('../config');

exports.getLogin = (req, res) => {
  res.render('auth/login');
};

exports.postLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const employee = await Employee.findOne({ username, password });
    
    if (!employee) {
      return res.render('auth/login', { error: 'Invalid username or password' });
    }

    req.session.userId = employee._id;
    req.session.isAdmin = employee.isAdmin;

    if (employee.isAdmin) {
      res.redirect('/admin/dashboard');
    } else {
      res.redirect('/employee/dashboard');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/auth/login');
};

exports.getRegister = (req, res) => {
  res.render('auth/register');
};

exports.postRegister = async (req, res) => {
  const { username, password } = req.body;
  console.log("Uname/Pwd:", username, password);

  try {
    const existingEmployee = await Employee.findOne({ username });

    if (existingEmployee) {
      return res.render('auth/register', { error: 'Username already exists' });
    }

    let isAdmin = false;

    // Set isAdmin to true based on a condition (e.g., if the username is 'admin')
    if (username === 'admin') {
      isAdmin = true;
    }

    const newEmployee = new Employee({
      username,
      password,
      isAdmin,
    });

    await newEmployee.save();
    res.redirect('/auth/login');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};


exports.getHomepage = (req, res) => {
  res.render('homepage');
};