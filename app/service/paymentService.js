// services/paymentService.js
const processPayment = async ({ amount, paymentMethod }) => {
    // Simulate payment processing (replace with actual payment gateway integration)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (paymentMethod && amount > 0) {
          resolve({ status: 'success', transactionId: 'txn_12345' });
        } else {
          reject(new Error('Payment failed'));
        }
      }, 1000);
    });
  };
  
  module.exports = { processPayment };
  