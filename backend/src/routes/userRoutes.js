const express = require('express');
const { getUserProfile, updateProfile, deleteAccount } = require('../controllers/userController');
const { userValidation } = require('../utils/validator');
const validationMiddleware = require('../middleware/validationMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// @route   GET /api/users/:id
// @desc    Get user profile
// @access  Public
router.get('/:id', getUserProfile);

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', authMiddleware, userValidation.updateProfile, validationMiddleware, updateProfile);

// @route   DELETE /api/users/profile
// @desc    Delete user account
// @access  Private
router.delete('/profile', authMiddleware, deleteAccount);

module.exports = router;
