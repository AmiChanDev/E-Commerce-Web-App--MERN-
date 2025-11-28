# Databse Models

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
