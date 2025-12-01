import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ordersAPI } from '../services/api';
import './Checkout.css';

const Checkout = () => {
    const { cart, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const calculateTotal = () => {
        if (!cart?.items) return 0;
        return cart.items.reduce((total, item) => {
            return total + item.product.price * item.quantity;
        }, 0);
    };

    const handlePlaceOrder = async () => {
        if (!cart?.items || cart.items.length === 0) {
            alert('Your cart is empty');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await ordersAPI.create();
            const orderId = response.data.data.order._id;

            // Clear cart after successful order
            await clearCart();

            // Navigate to order confirmation
            navigate(`/orders/${orderId}`);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to place order');
        } finally {
            setLoading(false);
        }
    };

    if (!cart?.items || cart.items.length === 0) {
        return (
            <div className="checkout-page">
                <div className="container">
                    <h1>Checkout</h1>
                    <div className="empty-cart">
                        <p>Your cart is empty. Add items before checkout.</p>
                        <button onClick={() => navigate('/products')} className="btn btn-primary">
                            Browse Products
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-page">
            <div className="container">
                <h1>Checkout</h1>

                {error && <div className="error-message">{error}</div>}

                <div className="checkout-layout">
                    <div className="checkout-info">
                        <div className="info-section">
                            <h2>Customer Information</h2>
                            <div className="info-details">
                                <p><strong>Name:</strong> {user?.name}</p>
                                <p><strong>Email:</strong> {user?.email}</p>
                            </div>
                        </div>

                        <div className="info-section">
                            <h2>Order Items</h2>
                            <div className="order-items">
                                {cart.items.map((item, index) => (
                                    <div key={index} className="order-item">
                                        <img src={item.product.imageUrl} alt={item.product.name} />
                                        <div className="order-item-details">
                                            <h3>{item.product.name}</h3>
                                            <p>Size: {item.size} | Qty: {item.quantity}</p>
                                            <p className="item-price">
                                                ${item.product.price.toFixed(2)} × {item.quantity} =
                                                <strong> ${(item.product.price * item.quantity).toFixed(2)}</strong>
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="checkout-summary">
                        <h2>Order Summary</h2>

                        <div className="summary-row">
                            <span>Subtotal:</span>
                            <span>${calculateTotal().toFixed(2)}</span>
                        </div>

                        <div className="summary-row">
                            <span>Shipping:</span>
                            <span>Free</span>
                        </div>

                        <div className="summary-row">
                            <span>Tax:</span>
                            <span>$0.00</span>
                        </div>

                        <div className="summary-divider"></div>

                        <div className="summary-row summary-total">
                            <span>Total:</span>
                            <span>${calculateTotal().toFixed(2)}</span>
                        </div>

                        <button
                            onClick={handlePlaceOrder}
                            disabled={loading}
                            className="btn btn-primary btn-block btn-large"
                        >
                            {loading ? 'Processing...' : 'Place Order'}
                        </button>

                        <p className="checkout-note">
                            📧 Order confirmation will be sent to your email
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
