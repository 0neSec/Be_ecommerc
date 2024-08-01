const Order = require('../../models/orderModel');
const Cart = require('../../models/cartModel');
const Product = require('../../models/ProductModel');

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { userId, paymentMethod, shippingAddress } = req.body;

    // Fetch the user's cart
    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart) {
      return res.status(400).json({ message: 'Cart not found' });
    }

    // Filter out items with null products
    cart.items = cart.items.filter(item => item.product !== null);

    // Check stock availability
    for (const item of cart.items) {
      if (item.product.stock < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for product: ${item.product.name}` });
      }
    }

    // Calculate total amount
    let totalAmount = 0;
    cart.items.forEach(item => {
      totalAmount += item.quantity * item.product.price;
    });

    // Create order items
    const orderItems = cart.items.map(item => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.product.price
    }));

    // Create new order
    const newOrder = new Order({
      user: userId,
      items: orderItems,
      totalAmount,
      paymentMethod,
      shippingAddress
    });

    const savedOrder = await newOrder.save();

    // Decrease product stock
    for (const item of cart.items) {
      await Product.findByIdAndUpdate(item.product._id, {
        $inc: { stock: -item.quantity }
      });
    }

    // Clear user's cart after order creation
    cart.items = [];
    await cart.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Other order controller functions...