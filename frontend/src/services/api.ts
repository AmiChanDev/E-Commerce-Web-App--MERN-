import axios from "axios";
import type {
  AuthResponse,
  ProductsResponse,
  Product,
  CartResponse,
  OrderResponse,
  OrdersResponse,
  ProductFilters,
} from "../types";

const API_BASE_URL = "http://localhost:5000/api";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Send cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: (name: string, email: string, password: string) =>
    api.post<AuthResponse>("/auth/register", { name, email, password }),

  login: (email: string, password: string) =>
    api.post<AuthResponse>("/auth/login", { email, password }),

  logout: () => api.post("/auth/logout"),

  getMe: () => api.get<{ status: string; data: { user: any } }>("/auth/me"),
};

// Products API
export const productsAPI = {
  getAll: (filters?: ProductFilters) =>
    api.get<ProductsResponse>("/products", { params: filters }),

  getById: (id: string) =>
    api.get<{ status: string; data: { product: Product } }>(`/products/${id}`),

  getCategories: () =>
    api.get<{ status: string; data: { categories: string[] } }>(
      "/products/categories"
    ),
};

// Cart API
export const cartAPI = {
  get: () => api.get<CartResponse>("/cart"),

  addItem: (productId: string, size: string, quantity: number = 1) =>
    api.post<CartResponse>("/cart", { productId, size, quantity }),

  updateItem: (itemIndex: number, quantity: number) =>
    api.put<CartResponse>(`/cart/${itemIndex}`, { quantity }),

  removeItem: (itemIndex: number) =>
    api.delete<CartResponse>(`/cart/${itemIndex}`),

  clear: () => api.delete("/cart"),
};

// Orders API
export const ordersAPI = {
  create: () => api.post<OrderResponse>("/orders"),

  getAll: () => api.get<OrdersResponse>("/orders"),

  getById: (id: string) => api.get<OrderResponse>(`/orders/${id}`),
};

export default api;
