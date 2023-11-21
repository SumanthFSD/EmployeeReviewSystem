const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  username: String,
  password: String,
  isAdmin: { type: Boolean, default: false },
});

module.exports = mongoose.model('Employee', employeeSchema);
