# EcoFinds Backend

A Node.js/Express backend for the EcoFinds marketplace application.

## Features

- User authentication and authorization
- Product listing and management
- Shopping cart functionality
- Purchase tracking
- Category management
- Search and filtering
- Image upload support

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- Express Validator for input validation
- Jest for testing

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the backend directory:
```env
MONGODB_URI=mongodb://localhost:27017/ecofinds
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

3. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `DELETE /api/users/profile` - Delete user account

### Products
- `GET /api/products` - Get all products (with filtering)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `GET /api/products/my-products` - Get user's products
- `GET /api/products/categories` - Get all categories

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item quantity
- `DELETE /api/cart/:id` - Remove item from cart
- `DELETE /api/cart` - Clear entire cart

### Purchases
- `POST /api/purchases/checkout` - Checkout cart
- `GET /api/purchases` - Get user's purchases
- `GET /api/purchases/sales` - Get user's sales
- `GET /api/purchases/:id` - Get single purchase

## Testing

Run tests:
```bash
npm test
```

## Database Seeding

To seed the database with sample data:
```javascript
const { seedAll } = require('./src/utils/sampleData');
seedAll();
```
