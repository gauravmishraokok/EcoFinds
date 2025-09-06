const Product = require('../models/Product');
const Category = require('../models/Category');

const productService = {
  // Get products with filters
  getProducts: async (filters = {}) => {
    const {
      page = 1,
      limit = 12,
      category,
      search,
      sort = 'createdAt',
      order = 'desc',
      seller
    } = filters;

    let query = { isAvailable: true, isSold: false };

    if (category) query.category = category;
    if (seller) query.seller = seller;
    if (search) query.$text = { $search: search };

    const sortOptions = {};
    sortOptions[sort] = order === 'desc' ? -1 : 1;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const products = await Product.find(query)
      .populate('category', 'name')
      .populate('seller', 'username profileImage')
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Product.countDocuments(query);

    return {
      products,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit))
    };
  },

  // Get single product
  getProduct: async (id) => {
    return await Product.findById(id)
      .populate('category', 'name')
      .populate('seller', 'username profileImage bio location');
  },

  // Create product
  create: async (productData) => {
    return await Product.create(productData);
  },

  // Update product
  update: async (id, updateData) => {
    return await Product.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    }).populate('category', 'name')
      .populate('seller', 'username profileImage');
  },

  // Delete product
  delete: async (id) => {
    return await Product.findByIdAndDelete(id);
  },

  // Get user's products
  getUserProducts: async (userId) => {
    return await Product.find({ seller: userId })
      .populate('category', 'name')
      .sort({ createdAt: -1 });
  },

  // Get all categories
  getCategories: async () => {
    return await Category.find({ isActive: true }).sort({ name: 1 });
  },

  // Increment view count
  incrementViews: async (id) => {
    return await Product.findByIdAndUpdate(id, { $inc: { views: 1 } });
  },

  // Mark product as sold
  markAsSold: async (id) => {
    return await Product.findByIdAndUpdate(id, {
      isSold: true,
      isAvailable: false
    });
  }
};

module.exports = productService;
