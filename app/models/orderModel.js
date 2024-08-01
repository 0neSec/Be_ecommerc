const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      default: 1
    }
  }],
  totalPayment: {
    type: Number,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid'],
    default: 'Pending'
  },
  paymentAmount: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
