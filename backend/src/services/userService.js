const User = require('../models/User');

const userService = {
  // Find user by email
  findByEmail: async (email) => {
    return await User.findOne({ email });
  },

  // Find user by username
  findByUsername: async (username) => {
    return await User.findOne({ username });
  },

  // Find user by ID
  findById: async (id) => {
    return await User.findById(id).select('-password');
  },

  // Create new user
  create: async (userData) => {
    return await User.create(userData);
  },

  // Update user
  update: async (id, updateData) => {
    return await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    }).select('-password');
  },

  // Delete user
  delete: async (id) => {
    return await User.findByIdAndDelete(id);
  },

  // Check if email exists
  emailExists: async (email, excludeId = null) => {
    const query = { email };
    if (excludeId) {
      query._id = { $ne: excludeId };
    }
    return await User.findOne(query);
  },

  // Check if username exists
  usernameExists: async (username, excludeId = null) => {
    const query = { username };
    if (excludeId) {
      query._id = { $ne: excludeId };
    }
    return await User.findOne(query);
  }
};

module.exports = userService;
