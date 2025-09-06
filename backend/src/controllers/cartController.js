const CartItem = require('../models/CartItem');
const Product = require('../models/Product');

// @desc    Get user's cart
// @route   GET /api/cart
// @access  Private
const getCart = async (req, res) => {
  try {
    const cartItems = await CartItem.find({ user: req.user.id })
      .populate({
        path: 'product',
        populate: {
          path: 'category',
          select: 'name'
        }
      })
      .populate('product.seller', 'username')
      .sort({ addedAt: -1 });

    // Calculate total
    let total = 0;
    const itemsWithTotal = cartItems.map(item => {
      const itemTotal = item.product.price * item.quantity;
      total += itemTotal;
      return {
        ...item.toObject(),
        itemTotal
      };
    });

    res.json({
      success: true,
      count: cartItems.length,
      total,
      items: itemsWithTotal
    });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({
      message: 'Server error'
    });
  }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    // Check if product exists and is available
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }

    if (!product.isAvailable || product.isSold) {
      return res.status(400).json({
        message: 'Product is not available'
      });
    }

    // Check if user is trying to add their own product
    if (product.seller.toString() === req.user.id) {
      return res.status(400).json({
        message: 'Cannot add your own product to cart'
      });
    }

    // Check if item already exists in cart
    const existingItem = await CartItem.findOne({
      user: req.user.id,
      product: productId
    });

    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();
    } else {
      await CartItem.create({
        user: req.user.id,
        product: productId,
        quantity
      });
    }

    res.status(201).json({
      success: true,
      message: 'Item added to cart'
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({
      message: 'Server error'
    });
  }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/:id
// @access  Private
const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;

    const cartItem = await CartItem.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!cartItem) {
      return res.status(404).json({
        message: 'Cart item not found'
      });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    res.json({
      success: true,
      message: 'Cart item updated'
    });
  } catch (error) {
    console.error('Update cart item error:', error);
    res.status(500).json({
      message: 'Server error'
    });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:id
// @access  Private
const removeFromCart = async (req, res) => {
  try {
    const cartItem = await CartItem.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!cartItem) {
      return res.status(404).json({
        message: 'Cart item not found'
      });
    }

    await CartItem.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Item removed from cart'
    });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({
      message: 'Server error'
    });
  }
};

// @desc    Clear entire cart
// @route   DELETE /api/cart
// @access  Private
const clearCart = async (req, res) => {
  try {
    await CartItem.deleteMany({ user: req.user.id });

    res.json({
      success: true,
      message: 'Cart cleared'
    });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({
      message: 'Server error'
    });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
};
