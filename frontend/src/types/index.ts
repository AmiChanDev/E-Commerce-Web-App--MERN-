// User types
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface AuthResponse {
  status: string;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

// Product types
export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: "Men" | "Women" | "Kids";
  sizes: string[];
  stock: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductsResponse {
  status: string;
  data: {
    products: Product[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalProducts: number;
      limit: number;
    };
  };
}

// Cart types
export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

export interface Cart {
  _id?: string;
  userId?: string;
  sessionId?: string;
  items: CartItem[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CartResponse {
  status: string;
  message?: string;
  data: {
    cart: Cart;
  };
}

// Order types
export interface OrderItem {
  product: string;
  name: string;
  size: string;
  quantity: number;
  price: number;
}

export interface Order {
  _id: string;
  userId: string;
  items: OrderItem[];
  totalPrice: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  orderDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderResponse {
  status: string;
  message?: string;
  data: {
    order: Order;
  };
}

export interface OrdersResponse {
  status: string;
  data: {
    orders: Order[];
  };
}

// Filter types
export interface ProductFilters {
  search?: string;
  category?: string;
  size?: string;
  priceMin?: number;
  priceMax?: number;
  page?: number;
  limit?: number;
}
