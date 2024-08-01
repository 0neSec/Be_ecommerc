const Order = require('../../models/orderModel');
const Cart = require('../../models/cartModel');
const Product = require('../../models/ProductModel');



// Update order status
exports.updateOrderStatus = async (req, res) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;
  
      const order = await Order.findById(orderId).populate('items.product');
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      // Check if the status is changing to 'Completed'
      if (status === 'Completed') {
        // Update the stock of each product in the order
        for (const item of order.items) {
          const product = await Product.findById(item.product._id);
          if (product) {
            product.stock -= item.quantity;
            await product.save();
          }
        }
      }
  
      order.status = status;
      const updatedOrder = await order.save();
  
      res.status(200).json(updatedOrder);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

// Delete an order
exports.deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const deletedOrder = await Order.findByIdAndDelete(orderId);
    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

