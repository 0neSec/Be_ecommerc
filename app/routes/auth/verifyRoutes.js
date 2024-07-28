const express = require('express');
const router = express.Router();
const userController = require('../../controllers/Auth/verifyEmailControllers');

router.get('/verify-email', userController.verifyEmail);

module.exports = router;
