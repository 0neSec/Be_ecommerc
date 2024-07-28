const express = require('express');
const router = express.Router();
const userController = require('../../controllers/users/userControllers');
const { authenticateToken, isAdmin } = require('../../middlewares/authMiddleware');

// Get all users
router.get('/users', authenticateToken, isAdmin, userController.getAllUsers);

// Get a single user by ID
router.get('/users/:id', authenticateToken, isAdmin, userController.getUserById);

// Create a new user
router.post('/users', authenticateToken, isAdmin, userController.createUser);

// Update a user
router.put('/users/:id', authenticateToken, isAdmin, userController.updateUser);

// Delete a user
router.delete('/users/:id', authenticateToken, isAdmin, userController.deleteUser);

module.exports = router;
