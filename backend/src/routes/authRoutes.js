const express = require('express');
const { register, login, getMe } = require('../controllers/authController');
const { userValidation } = require('../utils/validator');
const validationMiddleware = require('../middleware/validationMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register user
// @access  Public
router.post('/register', userValidation.register, validationMiddleware, register);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', userValidation.login, validationMiddleware, login);

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', authMiddleware, getMe);

module.exports = router;
