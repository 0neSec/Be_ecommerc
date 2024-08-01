const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory 
} = require('../../controllers/product/productController');
const { authenticateToken, isAdmin } = require('../../middlewares/authMiddleware');

// Get all products
router.get('/product/',  getAllProducts);

// Get a single product by ID
router.get('/product/:id',  getProductById);

// Create a new product (admin only)
router.post('/product', authenticateToken, isAdmin, createProduct);

// Update a product (admin only)
router.put('/product/:id', authenticateToken, isAdmin, updateProduct);

// Delete a product (admin only)
router.delete('/product/:id', authenticateToken, isAdmin, deleteProduct);

router.get('/product/category/:categoryName', getProductsByCategory);


module.exports = router;
