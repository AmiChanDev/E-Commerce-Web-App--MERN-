# 🛍️ E-Commerce MERN Stack Application - Setup Guide

A full-stack e-commerce web application built with MongoDB, Express, React, Node.js (MERN) and TypeScript.

## 📋 Features

### Backend Features

- ✅ User authentication with JWT
- ✅ Product catalog with search, filters, and pagination
- ✅ Shopping cart system (supports guest and authenticated users)
- ✅ Order management with email notifications
- ✅ 23+ pre-seeded clothing products
- ✅ RESTful API with TypeScript
- ✅ MongoDB database with Mongoose ODM

### Frontend Features

- ✅ React 18 with TypeScript
- ✅ React Router for navigation
- ✅ Context API for state management (Auth & Cart)
- ✅ Responsive design with CSS
- ✅ Protected routes
- ✅ Product search and filtering
- ✅ Shopping cart with item management
- ✅ Checkout and order confirmation
- ✅ Order history

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### 1️⃣ Backend Setup

```powershell
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Configure environment variables
# Edit the .env file with your settings:
# - MONGO_URI: Your MongoDB connection string
# - JWT_SECRET: A secure random string
# - EMAIL_USER: Your email for Nodemailer
# - EMAIL_PASS: Your email app password

# Seed the database with products
npm run seed

# Start the backend server
npm run dev
```

Backend will run on: **http://localhost:5000**

### 2️⃣ Frontend Setup

```powershell
# Open a new terminal
# Navigate to frontend folder
cd frontend

# Install dependencies (if not already done)
npm install

# Start the frontend development server
npm run dev
```

Frontend will run on: **http://localhost:5173**

## 📝 Environment Variables

### Backend (.env)

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d

# Email Configuration (for order confirmations)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password
EMAIL_FROM=E-Commerce Store <noreply@ecommerce.com>
```

**Note:** For Gmail, you need to:

1. Enable 2-factor authentication
2. Generate an "App Password" in your Google Account settings
3. Use the app password in `EMAIL_PASS`

## 🗂️ Project Structure

```
E-Commerce Web App (MERN)/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.ts                 # MongoDB connection
│   │   ├── models/
│   │   │   ├── User.ts               # User model with password hashing
│   │   │   ├── Product.ts            # Product model
│   │   │   ├── Cart.ts               # Cart model (guest + auth)
│   │   │   └── Order.ts              # Order model
│   │   ├── controllers/
│   │   │   ├── authController.ts     # Auth logic
│   │   │   ├── productController.ts  # Product CRUD + search
│   │   │   ├── cartController.ts     # Cart management
│   │   │   └── orderController.ts    # Order processing
│   │   ├── middleware/
│   │   │   └── authMiddleware.ts     # JWT verification
│   │   ├── routes/
│   │   │   ├── authRoutes.ts
│   │   │   ├── productRoutes.ts
│   │   │   ├── cartRoutes.ts
│   │   │   └── orderRoutes.ts
│   │   ├── utils/
│   │   │   ├── generateToken.ts      # JWT token generation
│   │   │   ├── sessionHelper.ts      # Guest session management
│   │   │   └── emailService.ts       # Order confirmation emails
│   │   ├── seeds/
│   │   │   ├── seedProducts.ts       # Database seeding script
│   │   │   └── productData.ts        # 23+ product data
│   │   └── server.ts                 # Express app entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.tsx            # Navigation with cart badge
│   │   │   └── ProtectedRoute.tsx    # Route guard
│   │   ├── context/
│   │   │   ├── AuthContext.tsx       # Auth state management
│   │   │   └── CartContext.tsx       # Cart state management
│   │   ├── pages/
│   │   │   ├── Home.tsx              # Landing page
│   │   │   ├── Login.tsx             # Login page
│   │   │   ├── Register.tsx          # Registration page
│   │   │   ├── Products.tsx          # Product listing with filters
│   │   │   ├── ProductDetail.tsx     # Individual product page
│   │   │   ├── Cart.tsx              # Shopping cart
│   │   │   ├── Checkout.tsx          # Checkout page
│   │   │   ├── Orders.tsx            # Order history
│   │   │   └── OrderDetail.tsx       # Order confirmation
│   │   ├── services/
│   │   │   └── api.ts                # Axios instance + API endpoints
│   │   ├── types/
│   │   │   └── index.ts              # TypeScript interfaces
│   │   ├── App.tsx                   # Main app with routing
│   │   ├── main.tsx                  # React entry point
│   │   └── config.ts                 # API base URL
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
└── README.md
```

## 🔑 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Products

- `GET /api/products` - Get all products (with search, filters, pagination)
- `GET /api/products/:id` - Get single product
- `GET /api/products/categories` - Get available categories

### Cart

- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:itemId` - Update cart item quantity
- `DELETE /api/cart/:itemId` - Remove item from cart
- `DELETE /api/cart` - Clear entire cart

### Orders

- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get single order

## 👤 Testing the Application

### Create a Test User

1. Go to http://localhost:5173/register
2. Register with:
   - Name: Test User
   - Email: test@example.com
   - Password: password123

### Browse and Shop

1. Navigate to Products page
2. Use search and filters (category, size, price range)
3. Click on a product to view details
4. Select size and add to cart
5. View cart and update quantities

### Checkout

1. Go to cart and click "Proceed to Checkout"
2. Review order details
3. Click "Place Order"
4. View order confirmation
5. Check "My Orders" to see order history

### Guest Cart Feature

- Add items to cart without logging in
- Cart persists using session cookies
- Login to convert guest cart to user cart

## 🎨 Pre-seeded Products

The application comes with 23+ clothing products across categories:

- **Men's Clothing**: T-shirts, jeans, jackets, sneakers
- **Women's Clothing**: Dresses, jeans, blouses, heels
- **Kids' Clothing**: T-shirts, jeans, hoodies, sneakers

Run `npm run seed` in the backend folder to populate the database.

## 🛠️ Available Scripts

### Backend

```powershell
npm run dev      # Start development server with hot reload
npm run build    # Compile TypeScript to JavaScript
npm start        # Run compiled production server
npm run seed     # Seed database with products
```

### Frontend

```powershell
npm run dev      # Start Vite development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🔧 Troubleshooting

### MongoDB Connection Issues

- Ensure MongoDB is running: `mongod`
- Check MONGO_URI in `.env` file
- For MongoDB Atlas, whitelist your IP address

### Port Already in Use

- Backend: Change `PORT` in `.env`
- Frontend: Change port in `vite.config.ts` or use `--port` flag

### Email Not Sending

- Verify email credentials in `.env`
- For Gmail, use App Password (not regular password)
- Check email service provider's SMTP settings

### CORS Issues

- Ensure backend CORS is configured for `http://localhost:5173`
- Check `server.ts` CORS configuration

## 📚 Technologies Used

### Backend

- **Node.js** - Runtime environment
- **Express** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Nodemailer** - Email service
- **express-validator** - Input validation

### Frontend

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router v6** - Routing
- **Axios** - HTTP client
- **React Hook Form** - Form handling
- **Context API** - State management

## 🎯 Key Features Explained

### Guest Cart System

- Uses `uuid` to generate session IDs
- Stored in HTTP-only cookies
- Automatically migrates to user cart on login
- Expires after session

### JWT Authentication

- Token stored in HTTP-only cookies
- Auto-refresh on page load
- Protected routes on frontend
- Middleware protection on backend

### Product Search & Filtering

- Text search across name and description
- Filter by category, size, and price range
- Pagination with customizable limits
- Multiple filters can be applied simultaneously

### Email Notifications

- Beautiful HTML email templates
- Sent on order confirmation
- Includes order summary and items
- Configurable SMTP settings

## 📖 Next Steps

Want to enhance the application? Consider adding:

- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Admin dashboard
- [ ] Product image uploads
- [ ] Advanced order tracking
- [ ] Password reset functionality
- [ ] Social login (Google, Facebook)
- [ ] Real-time notifications
- [ ] Inventory management

## 🙏 Acknowledgments

Built with the MERN stack following modern best practices and TypeScript conventions.

---

**Happy Shopping! 🛒**
