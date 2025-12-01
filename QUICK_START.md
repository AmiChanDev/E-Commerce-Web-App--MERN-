# 🚀 Quick Start - Running the Application

## Step 1: Start MongoDB

Make sure MongoDB is running on your system:

```powershell
# If using local MongoDB
mongod
```

## Step 2: Start Backend Server

Open a terminal and run:

```powershell
cd backend
npm run dev
```

✅ Backend should be running on: **http://localhost:5000**

You should see:

```
Server running on port 5000
MongoDB connected: localhost
```

## Step 3: Start Frontend Server

Open a **NEW** terminal and run:

```powershell
cd frontend
npm run dev
```

✅ Frontend should be running on: **http://localhost:5173**

## Step 4: Open Your Browser

Navigate to: **http://localhost:5173**

## 🎯 Test the Application

### 1. Register a New Account

- Click "Register" in the navbar
- Fill in your details
- Click "Register"

### 2. Browse Products

- Click "Products" in the navbar
- Use search bar to find items
- Filter by category, size, or price
- Click on any product for details

### 3. Add to Cart

- On product detail page, select a size
- Choose quantity
- Click "Add to Cart"
- See cart badge update in navbar

### 4. Checkout

- Click cart icon to view cart
- Update quantities or remove items
- Click "Proceed to Checkout"
- Review order and click "Place Order"

### 5. View Orders

- Click "Orders" in navbar
- See your order history
- Click "View Details" on any order

## 🔧 Troubleshooting

### Backend won't start?

- Check if MongoDB is running
- Verify `.env` file exists with correct settings
- Make sure port 5000 is not in use

### Frontend won't start?

- Make sure you ran `npm install` in the frontend folder
- Check if port 5173 is available
- Verify backend is running first

### Can't login?

- Make sure you registered first
- Check backend console for errors
- Verify MongoDB connection

### Cart not working?

- Clear browser cookies
- Check browser console for errors
- Verify backend `/api/cart` endpoint is responding

## 📧 Email Configuration (Optional)

To enable order confirmation emails:

1. Edit `backend/.env`:

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

2. For Gmail:
   - Enable 2-factor authentication
   - Generate App Password in Google Account settings
   - Use the App Password in `EMAIL_PASS`

## 🎉 You're All Set!

Your e-commerce application is now running. Happy shopping! 🛒

---

For detailed documentation, see **[SETUP_GUIDE.md](./SETUP_GUIDE.md)**
