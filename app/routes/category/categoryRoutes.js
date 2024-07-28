const express = require('express');
const router = express.Router();
const categoryController = require('../../controllers/category/categoryController');
const {authenticateToken, isAdmin} = require('../../middlewares/authMiddleware');

// Get all categories
router.get('/category',  authenticateToken,categoryController.getAllCategories);

// Get a single category by ID
router.get('/category/:id',  authenticateToken,categoryController.getCategoryById);

// Create a new category (admin only)
router.post('/category', authenticateToken, isAdmin, categoryController.createCategory);

// Update a category (admin only)
router.put('/category/:id', authenticateToken, isAdmin, categoryController.updateCategory);

// Delete a category (admin only)
router.delete('/category/:id', authenticateToken, isAdmin, categoryController.deleteCategory);

module.exports = router;
