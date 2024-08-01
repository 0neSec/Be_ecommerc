const express = require('express');
const router = express.Router();
const { handleMidtransNotification } = require('../controllers/notificationController');

// Midtrans notifications
router.post('/midtrans', handleMidtransNotification);

module.exports = router;
