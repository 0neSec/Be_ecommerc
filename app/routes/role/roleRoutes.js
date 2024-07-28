const express = require('express');
const router = express.Router();
const roleController = require('../../controllers/role/roleController');
const { authenticateToken, isAdmin } = require('../../middlewares/authMiddleware');

// Get all role
router.get('/role', authenticateToken, isAdmin, roleController.getAllRoles );

// Get a single role by ID
router.get('/role:id', authenticateToken, isAdmin, roleController.getRoleById);

// Create a new role
router.post('/role',authenticateToken, isAdmin, roleController.createRole);

// Update a role
router.put('/role/:id',authenticateToken,  isAdmin,roleController.updateRole);

// Delete a role
router.delete('/role/:id',authenticateToken,isAdmin,  roleController.deleteRole);

module.exports = router;