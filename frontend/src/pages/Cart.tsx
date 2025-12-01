import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Cart.css';

const Cart = () => {
    const { cart, loading, updateCartItem, removeFromCart, clearCart } = useCart();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [updating, setUpdating] = useState<number | null>(null);

    const handleUpdateQuantity = async (index: number, newQuantity: number) => {
        if (newQuantity < 1) return;
        setUpdating(index);
        try {
            await updateCartItem(index, newQuantity);
        } catch (error) {
            alert('Failed to update quantity');
        } finally {
            setUpdating(null);
        }
    };

    const handleRemoveItem = async (index: number) => {
        if (!confirm('Remove this item from cart?')) return;
        setUpdating(index);
        try {
            await removeFromCart(index);
        } catch (error) {
            alert('Failed to remove item');
        } finally {
            setUpdating(null);
        }
    };

    const handleClearCart = async () => {
        if (!confirm('Clear all items from cart?')) return;
        try {
            await clearCart();
        } catch (error) {
            alert('Failed to clear cart');
        }
    };

    const handleCheckout = () => {
        if (!isAuthenticated) {
            if (confirm('You need to login to checkout. Go to login page?')) {
                navigate('/login');
            }
            return;
        }
        navigate('/checkout');
    };

    const calculateTotal = () => {
        if (!cart?.items) return 0;
        return cart.items.reduce((total, item) => {
            return total + item.product.price * item.quantity;
        }, 0);
    };

    if (loading) {
        return (
            <div className="loading">
                <div className="spinner"></div>
                <p>Loading cart...</p>
            </div>
        );
    }

    if (!cart?.items || cart.items.length === 0) {
        return (
            <div className="cart-page">
                <div className="container">
                    <h1>Shopping Cart</h1>
                    <div className="empty-cart">
                        <p>🛒 Your cart is empty</p>
                        <Link to="/products" className="btn btn-primary">
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="container">
                <div className="cart-header">
                    <h1>Shopping Cart ({cart.items.length} {cart.items.length === 1 ? 'item' : 'items'})</h1>
                    <button onClick={handleClearCart} className="btn btn-danger">
                        Clear Cart
                    </button>
                </div>

                <div className="cart-layout">
                    <div className="cart-items">
                        {cart.items.map((item, index) => (
                            <div key={index} className="cart-item">
                                <Link to={`/products/${item.product._id}`} className="cart-item-image">
                                    <img src={item.product.imageUrl} alt={item.product.name} />
                                </Link>

                                <div className="cart-item-details">
                                    <Link to={`/products/${item.product._id}`} className="cart-item-name">
                                        {item.product.name}
                                    </Link>
                                    <p className="cart-item-category">{item.product.category}</p>
                                    <p className="cart-item-size">Size: <strong>{item.size}</strong></p>
                                    <p className="cart-item-price">${item.product.price.toFixed(2)}</p>
                                </div>

                                <div className="cart-item-actions">
                                    <div className="quantity-controls">
                                        <button
                                            onClick={() => handleUpdateQuantity(index, item.quantity - 1)}
                                            disabled={updating === index || item.quantity <= 1}
                                            className="qty-btn"
                                        >
                                            -
                                        </button>
                                        <span className="qty-display">{item.quantity}</span>
                                        <button
                                            onClick={() => handleUpdateQuantity(index, item.quantity + 1)}
                                            disabled={updating === index}
                                            className="qty-btn"
                                        >
                                            +
                                        </button>
                                    </div>

                                    <p className="item-total">
                                        Total: <strong>${(item.product.price * item.quantity).toFixed(2)}</strong>
                                    </p>

                                    <button
                                        onClick={() => handleRemoveItem(index)}
                                        disabled={updating === index}
                                        className="btn btn-danger btn-sm"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <h2>Order Summary</h2>

                        <div className="summary-row">
                            <span>Subtotal:</span>
                            <span>${calculateTotal().toFixed(2)}</span>
                        </div>

                        <div className="summary-row">
                            <span>Shipping:</span>
                            <span>Free</span>
                        </div>

                        <div className="summary-divider"></div>

                        <div className="summary-row summary-total">
                            <span>Total:</span>
                            <span>${calculateTotal().toFixed(2)}</span>
                        </div>

                        <button onClick={handleCheckout} className="btn btn-primary btn-block btn-large">
                            Proceed to Checkout
                        </button>

                        <Link to="/products" className="continue-shopping">
                            ← Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
