# EcoFinds

A sustainable marketplace for buying and selling eco-friendly products. Built with React, Node.js, Express, and MongoDB.

## Features

### User Features
- **User Authentication**: Secure registration and login with JWT
- **User Dashboard**: Profile management and settings
- **Product Listings**: Create, edit, and manage product listings
- **Product Browsing**: Browse products with search and category filtering
- **Shopping Cart**: Add items to cart and manage quantities
- **Purchase History**: View previous purchases and sales

### Product Features
- **Product Management**: Full CRUD operations for product listings
- **Category System**: Organized product categories
- **Image Support**: Product image placeholders
- **Search & Filter**: Find products by keywords and categories
- **Condition Tracking**: Track product condition (new, like-new, good, fair, poor)

### Technical Features
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Real-time Updates**: Live cart and user state management
- **Secure API**: Protected routes and input validation
- **Error Handling**: Comprehensive error handling and user feedback
- **Testing**: Unit tests for critical functionality

## Tech Stack

### Frontend
- React 19
- React Router DOM
- Tailwind CSS
- React Query
- React Hook Form
- Axios
- React Hot Toast
- Lucide React Icons

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing
- Express Validator
- Helmet for security
- Rate limiting

## Project Structure

```
EcoFinds/
├── backend/                 # Node.js/Express API
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── models/         # MongoDB models
│   │   ├── controllers/    # Route controllers
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   ├── services/       # Business logic
│   │   └── utils/          # Utility functions
│   └── tests/              # Backend tests
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context
│   │   ├── services/       # API services
│   │   ├── hooks/          # Custom hooks
│   │   ├── styles/         # CSS styles
│   │   └── utils/          # Utility functions
│   └── public/             # Static assets
└── docs/                   # Documentation
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd EcoFinds
   ```

2. **Install all dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   
   Create `backend/.env`:
   ```env
   MONGODB_URI=mongodb://localhost:27017/ecofinds
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=7d
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   ```

   Create `frontend/.env`:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start the development servers**
   ```bash
   npm run dev
   ```

   This will start both the backend (port 5000) and frontend (port 3000) servers.

### Individual Server Commands

- **Backend only**: `npm run dev:backend`
- **Frontend only**: `npm run dev:frontend`
- **Build frontend**: `npm run build`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products (with filtering)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `GET /api/products/categories` - Get categories

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove from cart

### Purchases
- `POST /api/purchases/checkout` - Checkout cart
- `GET /api/purchases` - Get purchases
- `GET /api/purchases/sales` - Get sales

## Testing

Run all tests:
```bash
npm test
```

Run backend tests only:
```bash
cd backend && npm test
```

Run frontend tests only:
```bash
cd frontend && npm test
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built following modern web development best practices
- Responsive design principles
- Sustainable and eco-friendly focus
- User-centered design approach
