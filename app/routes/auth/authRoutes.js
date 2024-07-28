const express = require('express');
const router = express.Router();
const { registerUser } = require('../../controllers/Auth/registerController');
const { loginUser } = require('../../controllers/Auth/loginController');
const { logoutUser } = require('../../controllers/Auth/logoutController');
const authenticateToken = require('../../middlewares/authMiddleware');

// Register a new user (should not be protected)
router.post('/register', registerUser);

// Login a user (should not be protected)
router.post('/login', loginUser);

// Logout a user (optionally protected)
router.post('/logout',  logoutUser);

// Protected route example (example)
router.get('/profile',  (req, res) => {
  res.status(200).json({ message: 'This is a protected route', user: req.user });
});

module.exports = router;
