const Category = require('../models/Category');
const Product = require('../models/Product');
const User = require('../models/User');

const sampleCategories = [
  { name: 'Electronics', description: 'Electronic devices and gadgets' },
  { name: 'Clothing', description: 'Fashion and apparel' },
  { name: 'Home & Garden', description: 'Home improvement and gardening items' },
  { name: 'Books', description: 'Books and educational materials' },
  { name: 'Sports & Outdoors', description: 'Sports equipment and outdoor gear' },
  { name: 'Toys & Games', description: 'Toys, games, and entertainment' },
  { name: 'Automotive', description: 'Car parts and automotive accessories' },
  { name: 'Health & Beauty', description: 'Health and beauty products' },
  { name: 'Furniture', description: 'Furniture and home decor' },
  { name: 'Miscellaneous', description: 'Other items' }
];

const sampleProducts = [
  {
    title: 'Vintage Camera',
    description: 'Beautiful vintage film camera in excellent condition. Perfect for photography enthusiasts.',
    price: 150,
    condition: 'good',
    tags: ['camera', 'vintage', 'photography']
  },
  {
    title: 'Designer Jeans',
    description: 'High-quality designer jeans, barely worn. Size 32x34.',
    price: 45,
    condition: 'like-new',
    tags: ['clothing', 'jeans', 'designer']
  },
  {
    title: 'Garden Tools Set',
    description: 'Complete set of garden tools including shovel, rake, and pruning shears.',
    price: 25,
    condition: 'good',
    tags: ['garden', 'tools', 'outdoor']
  },
  {
    title: 'Programming Book',
    description: 'JavaScript: The Good Parts - essential reading for developers.',
    price: 15,
    condition: 'good',
    tags: ['book', 'programming', 'javascript']
  },
  {
    title: 'Bicycle',
    description: 'Mountain bike in good condition. Perfect for commuting or weekend rides.',
    price: 200,
    condition: 'good',
    tags: ['bike', 'cycling', 'transportation']
  }
];

const seedCategories = async () => {
  try {
    await Category.deleteMany({});
    await Category.insertMany(sampleCategories);
    console.log('Categories seeded successfully');
  } catch (error) {
    console.error('Error seeding categories:', error);
  }
};

const seedProducts = async () => {
  try {
    // Get a sample user and categories
    const user = await User.findOne();
    const categories = await Category.find();
    
    if (!user || categories.length === 0) {
      console.log('No user or categories found. Please seed users and categories first.');
      return;
    }

    await Product.deleteMany({});
    
    const productsWithReferences = sampleProducts.map((product, index) => ({
      ...product,
      seller: user._id,
      category: categories[index % categories.length]._id,
      images: ['/placeholder-image.png']
    }));

    await Product.insertMany(productsWithReferences);
    console.log('Products seeded successfully');
  } catch (error) {
    console.error('Error seeding products:', error);
  }
};

const seedAll = async () => {
  await seedCategories();
  await seedProducts();
};

module.exports = {
  sampleCategories,
  sampleProducts,
  seedCategories,
  seedProducts,
  seedAll
};
