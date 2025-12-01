import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { cartAPI } from '../services/api';
import type { Cart } from '../types';

interface CartContextType {
    cart: Cart | null;
    loading: boolean;
    itemCount: number;
    refreshCart: () => Promise<void>;
    addToCart: (productId: string, size: string, quantity: number) => Promise<void>;
    updateCartItem: (itemIndex: number, quantity: number) => Promise<void>;
    removeFromCart: (itemIndex: number) => Promise<void>;
    clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
};

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
    const { isAuthenticated } = useAuth();
    const [cart, setCart] = useState<Cart | null>(null);
    const [loading, setLoading] = useState(false);

    // Load cart on mount and when auth changes
    useEffect(() => {
        refreshCart();
    }, [isAuthenticated]);

    const refreshCart = async () => {
        setLoading(true);
        try {
            const response = await cartAPI.get();
            setCart(response.data.data.cart);
        } catch (error) {
            console.error('Failed to load cart:', error);
            setCart({ items: [] });
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async (productId: string, size: string, quantity: number) => {
        try {
            const response = await cartAPI.addItem(productId, size, quantity);
            setCart(response.data.data.cart);
        } catch (error) {
            throw error;
        }
    };

    const updateCartItem = async (itemIndex: number, quantity: number) => {
        try {
            const response = await cartAPI.updateItem(itemIndex, quantity);
            setCart(response.data.data.cart);
        } catch (error) {
            throw error;
        }
    };

    const removeFromCart = async (itemIndex: number) => {
        try {
            const response = await cartAPI.removeItem(itemIndex);
            setCart(response.data.data.cart);
        } catch (error) {
            throw error;
        }
    };

    const clearCart = async () => {
        try {
            await cartAPI.clear();
            setCart({ items: [] });
        } catch (error) {
            throw error;
        }
    };

    const itemCount = cart?.items.reduce((total, item) => total + item.quantity, 0) || 0;

    const value = {
        cart,
        loading,
        itemCount,
        refreshCart,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
