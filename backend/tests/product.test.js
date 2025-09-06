const request = require('supertest');
const app = require('../app');
const Product = require('../src/models/Product');
const Category = require('../src/models/Category');
const User = require('../src/models/User');

describe('Product Routes', () => {
  let authToken;
  let userId;
  let categoryId;

  beforeEach(async () => {
    await User.deleteMany({});
    await Product.deleteMany({});
    await Category.deleteMany({});

    // Create test user
    const user = await User.create({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    });
    userId = user._id;

    // Create test category
    const category = await Category.create({
      name: 'Electronics',
      description: 'Electronic devices'
    });
    categoryId = category._id;

    // Get auth token
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });
    authToken = loginResponse.body.token;
  });

  describe('POST /api/products', () => {
    it('should create a new product', async () => {
      const productData = {
        title: 'Test Product',
        description: 'A test product description',
        price: 99.99,
        category: categoryId
      };

      const response = await request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${authToken}`)
        .send(productData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.product.title).toBe(productData.title);
      expect(response.body.product.seller).toBe(userId.toString());
    });

    it('should not create product without authentication', async () => {
      const productData = {
        title: 'Test Product',
        description: 'A test product description',
        price: 99.99,
        category: categoryId
      };

      await request(app)
        .post('/api/products')
        .send(productData)
        .expect(401);
    });
  });

  describe('GET /api/products', () => {
    beforeEach(async () => {
      await Product.create({
        title: 'Test Product 1',
        description: 'Description 1',
        price: 50,
        category: categoryId,
        seller: userId
      });

      await Product.create({
        title: 'Test Product 2',
        description: 'Description 2',
        price: 100,
        category: categoryId,
        seller: userId
      });
    });

    it('should get all products', async () => {
      const response = await request(app)
        .get('/api/products')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.products).toHaveLength(2);
    });

    it('should filter products by category', async () => {
      const response = await request(app)
        .get(`/api/products?category=${categoryId}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.products).toHaveLength(2);
    });
  });
});
