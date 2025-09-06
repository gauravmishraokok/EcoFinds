const express = require('express');
const cors = require('cors');
const errorHandler = require('./src/middleware/errorMiddleware');

// Import routes
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const productRoutes = require('./src/routes/productRoutes');
const cartRoutes = require('./src/routes/cartRoutes');
const purchaseRoutes = require('./src/routes/purchaseRoutes');

const app = express();

// CORS middleware - must be before other middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Body parser middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/purchases', purchaseRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ message: 'EcoFinds API is running!' });
});

// Error handling middleware
app.use(errorHandler);

module.exports = app;
