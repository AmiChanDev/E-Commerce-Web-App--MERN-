# 🛍️ E-Commerce MERN Stack Application

A complete full-stack e-commerce web application for a fictional clothing brand, built with MongoDB, Express.js, React, and Node.js (MERN stack) using TypeScript.

## ✨ Features

### Core Functionality

- 🔐 User authentication (Register, Login, Logout) with JWT
- 📦 Product catalog with 23+ pre-seeded clothing items
- 🔍 Advanced product search and filtering (category, size, price)
- 🛒 Shopping cart system (supports guest and authenticated users)
- 💳 Checkout and order placement
- 📧 Order confirmation emails
- 📋 Order history and detailed order views
- 📱 Fully responsive design

### Technical Highlights

- **TypeScript** throughout the entire stack
- **JWT Authentication** with HTTP-only cookies
- **Guest Cart Support** with session management
- **Context API** for global state (Auth & Cart)
- **Protected Routes** on frontend and backend
- **RESTful API** with input validation
- **Email Service** with Nodemailer
- **MongoDB** with Mongoose ODM

## 🚀 Quick Start

See **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** for detailed setup instructions.

```powershell
# Backend
cd backend
npm install
npm run seed    # Seed database with products
npm run dev     # Start on http://localhost:5000

# Frontend (in a new terminal)
cd frontend
npm install
npm run dev     # Start on http://localhost:5173
```

## 📂 Project Structure

- **backend/** - Node.js + Express + TypeScript API server
- **frontend/** - React + TypeScript + Vite SPA

## 🗂️ Database Models

### User Model - Authentication with bcrypt password hashing

- Fields: name, email, password, timestamps
- Method: comparePassword()

### Product Model - Clothing items catalog

- Fields: name, description, price, imageUrl, category, sizes[], stock, timestamps
- Indexes: text search on name/description, category + price

### Cart Model - Shopping cart (guest + logged-in)

- Fields: userId/sessionId, items[], timestamps
- Supports both authenticated users and guest sessions

### Order Model - Order management

- Fields: userId, items[], totalPrice, status, orderDate, timestamps
- Order item includes: product, name, size, quantity, price
