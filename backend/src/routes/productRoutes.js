const express = require('express');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getMyProducts,
  getCategories
} = require('../controllers/productController');
const { productValidation } = require('../utils/validator');
const validationMiddleware = require('../middleware/validationMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// @route   GET /api/products
// @desc    Get all products with filtering and search
// @access  Public
router.get('/', getProducts);

// @route   GET /api/products/categories
// @desc    Get all categories
// @access  Public
router.get('/categories', getCategories);

// @route   GET /api/products/my-products
// @desc    Get user's products
// @access  Private
router.get('/my-products', authMiddleware, getMyProducts);

// @route   GET /api/products/:id
// @desc    Get single product
// @access  Public
router.get('/:id', getProduct);

// @route   POST /api/products
// @desc    Create new product
// @access  Private
router.post('/', authMiddleware, productValidation.create, validationMiddleware, createProduct);

// @route   PUT /api/products/:id
// @desc    Update product
// @access  Private
router.put('/:id', authMiddleware, productValidation.update, validationMiddleware, updateProduct);

// @route   DELETE /api/products/:id
// @desc    Delete product
// @access  Private
router.delete('/:id', authMiddleware, deleteProduct);

module.exports = router;
