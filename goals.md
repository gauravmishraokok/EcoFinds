# EcoFinds — Requirements & Wireframes

## Features / Deliverables ✅

- [ ] **User Authentication**  
  A simple and secure mechanism for user registration and login (email + password). Passwords must be stored hashed.

- [ ] **Profile Creation (Basic)**  
  Users can set a username and basic profile fields upon signup or later in profile settings.

- [ ] **User Dashboard**  
  Users can view and edit all profile fields (username, email, profile image, etc.).

- [ ] **Product Listing Creation**  
  Users can create new product listings with:
  - Title  
  - Brief description  
  - Predefined category (dropdown)  
  - Price  
  - At least one image placeholder (local URL or placeholder image)

- [ ] **Product Listing Management (CRUD - Basic)**  
  Users can view, edit and delete *their own* product listings.

- [ ] **Product Browsing**  
  A public feed showing available product listings with basic info (title, price, placeholder image).

- [ ] **Category Filtering**  
  Filter the product feed by predefined categories.

- [ ] **Keyword Search**  
  Search listings by keywords in the product title.

- [ ] **Product Detail View**  
  A page/screen showing full details of a product: title, description, price, category, and image placeholder.

- [ ] **Previous Purchase View**  
  A page that lists products the current user purchased previously.

- [ ] **Cart**  
  A cart page displaying all products added by the user, showing each product as a card with basic information and quantity controls.

---

## Wireframes — Screen-by-screen (UI Elements)

### 1. Login / Sign Up Screen
**Elements**
- App logo / title  
- Email input  
- Password input  
- Login button  
- Sign-up link / button  
- (Optional) "Forgot password" link

---

### 2. Product Listing Feed Screen (Home)
**Elements**
- Header with app title/logo and user avatar/login state  
- Search bar (keyword search)  
- Category filter options (tappable buttons or dropdown)  
- Sort options (optional: newest / price)  
- List / grid of product items — each item shows:
  - Placeholder image
  - Product title
  - Price
  - Quick action (e.g., "Add to cart" or view details)
- Prominent floating **+** button to add a new product listing

---

### 3. Add New Product Screen
**Elements**
- Back button  
- Screen title: **Add New Product**  
- Input fields:
  - Product Title (text)
  - Category (dropdown of predefined categories)
  - Description (textarea)
  - Price (number input)
- Image area: **+ Add Image (Placeholder)** — allow 1+ image placeholders
- Submit Listing button  
- Client-side validation messages (required fields, price format, etc.)

---

### 4. My Listings Screen
**Elements**
- Header with app title/logo and user avatar  
- **+** button for adding a product  
- List of user's listed products — each entry shows:
  - Placeholder image
  - Title
  - Price
  - Edit button
  - Delete button
  - (Optional) Toggle to mark as sold / unavailable

---

### 5. Product Detail Screen
**Elements**
- Back button  
- Large product image placeholder (carousel if multiple)  
- Product title  
- Price  
- Category badge  
- Full description  
- Seller info (username, link to seller profile)  
- Add to cart button  
- (Optional) Report / flag button, message seller CTA

---

### 6. User Dashboard (Profile)
**Elements**
- Header with app title/logo  
- User profile image / avatar  
- Display profile fields:
  - Username
  - Email
  - (Optional) Bio / location
- Edit button or inline-edit fields to update profile data  
- (Optional) Link to My Listings, Purchases, Settings

---

### 7. Cart Screen
**Elements**
- Header with app title/logo  
- List of products added to cart, each as a card containing:
  - Placeholder image
  - Title
  - Price
  - Quantity control (±)
  - Remove item button
- Cart totals (subtotal, taxes if any)  
- Checkout button (for demo: simulates purchase and moves items to Purchases)

---

### 8. Previous Purchases Screen

**Elements**

- Header with app title/logo  
- List view of purchased products (cards or rows), each showing:
  - Placeholder image
  - Title
  - Price
  - Purchased date
- (Optional) Rating / review button for purchased item

---

## Notes / Implementation Tips

- Validate all user inputs on both client and server (required fields, email format, price numeric and ≥ 0).  
- Auth must use secure hashing (bcrypt) and JWT for session tokens.  
- Product ownership checks: only allow edits/deletes by the product owner.  
- Search: implement case-insensitive substring search on product title.  
- Filters: category filter should be applied together with search and pagination.  
- For wireframe responsiveness: design components to collapse from grid → stacked cards on small widths (phone-like).  
- Seed categories & sample products so frontend looks populated during demo.  
- For images in prototype, use `public/placeholder-image.png` and store the URL in the product `image_url` field.

---