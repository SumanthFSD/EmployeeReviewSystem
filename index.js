const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const config = require('./config');
const authMiddleware = require('./middlewares/authMiddleware');

const app = express();

// Connect to MongoDB
mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(session({ secret: config.sessionSecret, resave: true, saveUninitialized: true }));

// Routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const employeeRoutes = require('./routes/employee');

// Middleware to check authentication for admin and employee routes
app.use(['/admin/*', '/employee/*'], authMiddleware);

app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/employee', employeeRoutes);

app.get('/', (req, res) => {
  if (req.session.userId) {
    if (req.session.isAdmin) {
      res.redirect('/admin/dashboard');
    } else {
      res.redirect('/employee/dashboard');
    }
  } else {
    res.redirect('/auth/homepage');
  }
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
