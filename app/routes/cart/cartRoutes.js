const express = require('express');
const router = express.Router();
const cartController = require('../../controllers/cart/cartController');
const { authenticateToken } = require('../../middlewares/authMiddleware');

// Get the user's cart
router.get('/cart', authenticateToken, cartController.getCart);

// Add a product to the cart
router.post('/cart', authenticateToken, cartController.addToCart);

// Update cart item quantity
router.put('/cart', authenticateToken, cartController.updateCartItem);

// Remove a product from the cart
router.delete('/cart', authenticateToken, cartController.removeFromCart);

// Clear the cart
router.delete('/cart/clear', authenticateToken, cartController.clearCart);

module.exports = router;
