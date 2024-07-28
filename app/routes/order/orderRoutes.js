const express = require('express');
const router = express.Router();
const {authenticateToken, isAdmin} = require('../../middlewares/authMiddleware');
const { createOrder } = require('../../controllers/order/createOrder');
const { getUserOrders, getOrderById } = require('../../controllers/order/getOrder');
const { updateOrderStatus, deleteOrder } = require('../../controllers/order/PutOrder');


// Create a new order
router.post('/order',authenticateToken, createOrder);

// Get all orders for a user
router.get('/user/order/:userId',authenticateToken, getUserOrders);

// Get a single order by ID
router.get('/order/:orderId',authenticateToken, getOrderById);

// Update order status
router.put('/order/:orderId',authenticateToken, updateOrderStatus);

// Delete an order
router.delete('/order/:orderId',authenticateToken, deleteOrder);

module.exports = router;
