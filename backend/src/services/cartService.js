const CartItem = require('../models/CartItem');
const Product = require('../models/Product');

const cartService = {
  // Get user's cart
  getCart: async (userId) => {
    return await CartItem.find({ user: userId })
      .populate({
        path: 'product',
        populate: {
          path: 'category',
          select: 'name'
        }
      })
      .populate('product.seller', 'username')
      .sort({ addedAt: -1 });
  },

  // Add item to cart
  addToCart: async (userId, productId, quantity = 1) => {
    // Check if product exists and is available
    const product = await Product.findById(productId);
    if (!product || !product.isAvailable || product.isSold) {
      throw new Error('Product not available');
    }

    // Check if user is trying to add their own product
    if (product.seller.toString() === userId) {
      throw new Error('Cannot add your own product to cart');
    }

    // Check if item already exists in cart
    const existingItem = await CartItem.findOne({
      user: userId,
      product: productId
    });

    if (existingItem) {
      existingItem.quantity += quantity;
      return await existingItem.save();
    } else {
      return await CartItem.create({
        user: userId,
        product: productId,
        quantity
      });
    }
  },

  // Update cart item quantity
  updateQuantity: async (userId, itemId, quantity) => {
    const cartItem = await CartItem.findOne({
      _id: itemId,
      user: userId
    });

    if (!cartItem) {
      throw new Error('Cart item not found');
    }

    cartItem.quantity = quantity;
    return await cartItem.save();
  },

  // Remove item from cart
  removeFromCart: async (userId, itemId) => {
    const cartItem = await CartItem.findOne({
      _id: itemId,
      user: userId
    });

    if (!cartItem) {
      throw new Error('Cart item not found');
    }

    return await CartItem.findByIdAndDelete(itemId);
  },

  // Clear entire cart
  clearCart: async (userId) => {
    return await CartItem.deleteMany({ user: userId });
  },

  // Get cart total
  getCartTotal: async (userId) => {
    const cartItems = await CartItem.find({ user: userId })
      .populate('product', 'price');

    let total = 0;
    const itemsWithTotal = cartItems.map(item => {
      const itemTotal = item.product.price * item.quantity;
      total += itemTotal;
      return {
        ...item.toObject(),
        itemTotal
      };
    });

    return {
      items: itemsWithTotal,
      total
    };
  },

  // Validate cart items
  validateCartItems: async (userId) => {
    const cartItems = await CartItem.find({ user: userId })
      .populate('product');

    const unavailableItems = [];
    for (const item of cartItems) {
      if (!item.product.isAvailable || item.product.isSold) {
        unavailableItems.push({
          itemId: item._id,
          productTitle: item.product.title,
          reason: !item.product.isAvailable ? 'Product is no longer available' : 'Product has been sold'
        });
      }
    }

    return unavailableItems;
  }
};

module.exports = cartService;
