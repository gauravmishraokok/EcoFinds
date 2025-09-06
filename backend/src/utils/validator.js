const { body } = require('express-validator');

// User validation rules
const userValidation = {
  register: [
    body('username')
      .trim()
      .isLength({ min: 3, max: 30 })
      .withMessage('Username must be between 3 and 30 characters'),
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Please provide a valid email'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long')
  ],
  login: [
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Please provide a valid email'),
    body('password')
      .notEmpty()
      .withMessage('Password is required')
  ],
  updateProfile: [
    body('username')
      .optional()
      .trim()
      .isLength({ min: 3, max: 30 })
      .withMessage('Username must be between 3 and 30 characters'),
    body('bio')
      .optional()
      .isLength({ max: 500 })
      .withMessage('Bio cannot exceed 500 characters'),
    body('location')
      .optional()
      .isLength({ max: 100 })
      .withMessage('Location cannot exceed 100 characters')
  ]
};

// Product validation rules
const productValidation = {
  create: [
    body('title')
      .trim()
      .isLength({ min: 1, max: 100 })
      .withMessage('Title must be between 1 and 100 characters'),
    body('description')
      .trim()
      .isLength({ min: 1, max: 1000 })
      .withMessage('Description must be between 1 and 1000 characters'),
    body('price')
      .isFloat({ min: 0 })
      .withMessage('Price must be a positive number'),
    body('category')
      .isMongoId()
      .withMessage('Please provide a valid category ID'),
    body('condition')
      .optional()
      .isIn(['new', 'like-new', 'good', 'fair', 'poor'])
      .withMessage('Invalid condition value')
  ],
  update: [
    body('title')
      .optional()
      .trim()
      .isLength({ min: 1, max: 100 })
      .withMessage('Title must be between 1 and 100 characters'),
    body('description')
      .optional()
      .trim()
      .isLength({ min: 1, max: 1000 })
      .withMessage('Description must be between 1 and 1000 characters'),
    body('price')
      .optional()
      .isFloat({ min: 0 })
      .withMessage('Price must be a positive number'),
    body('condition')
      .optional()
      .isIn(['new', 'like-new', 'good', 'fair', 'poor'])
      .withMessage('Invalid condition value')
  ]
};

// Cart validation rules
const cartValidation = {
  addItem: [
    body('productId')
      .isMongoId()
      .withMessage('Please provide a valid product ID'),
    body('quantity')
      .optional()
      .isInt({ min: 1 })
      .withMessage('Quantity must be a positive integer')
  ],
  updateQuantity: [
    body('quantity')
      .isInt({ min: 1 })
      .withMessage('Quantity must be a positive integer')
  ]
};

module.exports = {
  userValidation,
  productValidation,
  cartValidation
};
