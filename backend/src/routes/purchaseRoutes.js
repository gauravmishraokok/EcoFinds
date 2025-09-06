const express = require('express');
const {
  checkout,
  getPurchases,
  getSales,
  getPurchase
} = require('../controllers/purchaseController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// All routes are private
router.use(authMiddleware);

// @route   POST /api/purchases/checkout
// @desc    Create purchase from cart
// @access  Private
router.post('/checkout', checkout);

// @route   GET /api/purchases
// @desc    Get user's purchases
// @access  Private
router.get('/', getPurchases);

// @route   GET /api/purchases/sales
// @desc    Get user's sales
// @access  Private
router.get('/sales', getSales);

// @route   GET /api/purchases/:id
// @desc    Get single purchase
// @access  Private
router.get('/:id', getPurchase);

module.exports = router;
