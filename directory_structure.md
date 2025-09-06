```bash
EcoFinds/
├── .gitignore
├── .env.example
├── README.md
├── package.json                     # optional root script manager
│
├── backend/
│   ├── package.json
│   ├── .env
│   ├── README.md
│   ├── server.js                    # starts server, reads .env
│   ├── app.js                       # express app + middleware + routes mount
│   ├── src/
│   │   ├── config/
│   │   │   └── mongo.js             # mongo connection (mongoose)
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Product.js
│   │   │   ├── Category.js
│   │   │   ├── CartItem.js
│   │   │   └── Purchase.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── userController.js
│   │   │   ├── productController.js
│   │   │   ├── cartController.js
│   │   │   └── purchaseController.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── userRoutes.js
│   │   │   ├── productRoutes.js
│   │   │   ├── cartRoutes.js
│   │   │   └── purchaseRoutes.js
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js
│   │   │   ├── validationMiddleware.js
│   │   │   └── errorMiddleware.js
│   │   ├── services/
│   │   │   ├── userService.js
│   │   │   ├── productService.js
│   │   │   └── cartService.js
│   │   ├── utils/
│   │   │   ├── validator.js
│   │   │   ├── hash.js
│   │   │   └── sampleData.js        # seeds for categories & sample products
│   │   └── index.js                 # exports for tests
│   └── tests/
│       ├── auth.test.js
│       └── product.test.js
│
└── frontend/
    ├── package.json
    ├── .env
    ├── vite.config.js
    ├── index.html
    ├── public/
    │   ├── logo.png
    │   └── placeholder-image.png
    ├── src/
    │   ├── main.jsx                  # React entry, router
    │   ├── App.jsx
    │   ├── assets/
    │   │   └── images/
    │   ├── components/
    │   │   ├── common/
    │   │   │   ├── Navbar.jsx
    │   │   │   ├── Footer.jsx
    │   │   │   └── ProtectedRoute.jsx
    │   │   ├── product/
    │   │   │   ├── ProductCard.jsx
    │   │   │   ├── ProductList.jsx
    │   │   │   └── ProductGrid.jsx
    │   │   └── ui/
    │   │       ├── Button.jsx
    │   │       └── Input.jsx
    │   ├── pages/
    │   │   ├── Auth/
    │   │   │   ├── Login.jsx
    │   │   │   └── Signup.jsx
    │   │   ├── Home.jsx
    │   │   ├── ProductDetail.jsx
    │   │   ├── AddProduct.jsx
    │   │   ├── MyListings.jsx
    │   │   ├── Cart.jsx
    │   │   ├── Purchases.jsx
    │   │   └── Dashboard.jsx
    │   ├── context/
    │   │   ├── AuthContext.jsx
    │   │   └── CartContext.jsx
    │   ├── services/
    │   │   ├── apiClient.js
    │   │   ├── authService.js
    │   │   ├── productService.js
    │   │   ├── cartService.js
    │   │   └── purchaseService.js
    │   ├── hooks/
    │   │   ├── useAuth.js
    │   │   └── useCart.js
    │   ├── styles/
    │   │   ├── globals.css
    │   │   └── tailwind.css
    │   └── utils/
    │       └── validators.js
    └── tests/
        ├── Home.test.jsx
        └── AddProduct.test.jsx
