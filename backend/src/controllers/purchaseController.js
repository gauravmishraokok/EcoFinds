const Purchase = require('../models/Purchase');
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');

// @desc    Create purchase from cart
// @route   POST /api/purchases/checkout
// @access  Private
const checkout = async (req, res) => {
  try {
    // Get user's cart items
    const cartItems = await CartItem.find({ user: req.user.id })
      .populate('product');

    if (cartItems.length === 0) {
      return res.status(400).json({
        message: 'Cart is empty'
      });
    }

    // Validate all items are still available
    for (const item of cartItems) {
      if (!item.product.isAvailable || item.product.isSold) {
        return res.status(400).json({
          message: `Product "${item.product.title}" is no longer available`
        });
      }
    }

    // Create purchases
    const purchases = [];
    for (const item of cartItems) {
      const purchase = await Purchase.create({
        buyer: req.user.id,
        seller: item.product.seller,
        product: item.product._id,
        quantity: item.quantity,
        totalPrice: item.product.price * item.quantity
      });

      // Mark product as sold
      await Product.findByIdAndUpdate(item.product._id, {
        isSold: true,
        isAvailable: false
      });

      purchases.push(purchase);
    }

    // Clear cart
    await CartItem.deleteMany({ user: req.user.id });

    // Populate purchases with product details
    const populatedPurchases = await Purchase.find({
      _id: { $in: purchases.map(p => p._id) }
    })
      .populate('product', 'title price images')
      .populate('seller', 'username')
      .sort({ purchaseDate: -1 });

    res.status(201).json({
      success: true,
      message: 'Purchase completed successfully',
      purchases: populatedPurchases
    });
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({
      message: 'Server error'
    });
  }
};

// @desc    Get user's purchases
// @route   GET /api/purchases
// @access  Private
const getPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find({ buyer: req.user.id })
      .populate('product', 'title price images')
      .populate('seller', 'username profileImage')
      .sort({ purchaseDate: -1 });

    res.json({
      success: true,
      count: purchases.length,
      purchases
    });
  } catch (error) {
    console.error('Get purchases error:', error);
    res.status(500).json({
      message: 'Server error'
    });
  }
};

// @desc    Get user's sales
// @route   GET /api/purchases/sales
// @access  Private
const getSales = async (req, res) => {
  try {
    const sales = await Purchase.find({ seller: req.user.id })
      .populate('product', 'title price images')
      .populate('buyer', 'username profileImage')
      .sort({ purchaseDate: -1 });

    res.json({
      success: true,
      count: sales.length,
      sales
    });
  } catch (error) {
    console.error('Get sales error:', error);
    res.status(500).json({
      message: 'Server error'
    });
  }
};

// @desc    Get single purchase
// @route   GET /api/purchases/:id
// @access  Private
const getPurchase = async (req, res) => {
  try {
    const purchase = await Purchase.findById(req.params.id)
      .populate('product', 'title price images description')
      .populate('buyer', 'username profileImage')
      .populate('seller', 'username profileImage bio location');

    if (!purchase) {
      return res.status(404).json({
        message: 'Purchase not found'
      });
    }

    // Check if user is buyer or seller
    if (purchase.buyer._id.toString() !== req.user.id && 
        purchase.seller._id.toString() !== req.user.id) {
      return res.status(403).json({
        message: 'Not authorized to view this purchase'
      });
    }

    res.json({
      success: true,
      purchase
    });
  } catch (error) {
    console.error('Get purchase error:', error);
    res.status(500).json({
      message: 'Server error'
    });
  }
};

module.exports = {
  checkout,
  getPurchases,
  getSales,
  getPurchase
};
