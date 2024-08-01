const Order = require('../models/orderModel');
const coreApi = require('../config/midtrans');

exports.handleMidtransNotification = async (req, res) => {
  try {
    const notification = await coreApi.transaction.notification(req.body);
    const orderId = notification.order_id;
    const transactionStatus = notification.transaction_status;
    const fraudStatus = notification.fraud_status;

    const order = await Order.findOne({ midtransOrderId: orderId });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (transactionStatus === 'capture') {
      if (fraudStatus === 'challenge') {
        order.status = 'Pending';
      } else if (fraudStatus === 'accept') {
        order.status = 'Processing';
      }
    } else if (transactionStatus === 'settlement') {
      order.status = 'Processing';
    } else if (transactionStatus === 'deny' || transactionStatus === 'cancel' || transactionStatus === 'expire') {
      order.status = 'Cancelled';
    } else if (transactionStatus === 'pending') {
      order.status = 'Pending';
    }

    await order.save();
    res.status(200).json({ message: 'Notification processed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
