// Export models
module.exports = {
  User: require('./models/User'),
  Product: require('./models/Product'),
  Category: require('./models/Category'),
  CartItem: require('./models/CartItem'),
  Purchase: require('./models/Purchase'),
  
  // Export utilities
  ...require('./utils/sampleData')
};
