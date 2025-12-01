import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ordersAPI } from '../services/api';
import type { Order } from '../types';
import './OrderDetail.css';

const OrderDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (id) {
            fetchOrder();
        }
    }, [id]);

    const fetchOrder = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await ordersAPI.getById(id!);
            setOrder(response.data.data.order);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to fetch order');
        } finally {
            setLoading(false);
        }
    };

    const getStatusClass = (status: string) => {
        switch (status) {
            case 'pending':
                return 'status-pending';
            case 'processing':
                return 'status-processing';
            case 'shipped':
                return 'status-shipped';
            case 'delivered':
                return 'status-delivered';
            case 'cancelled':
                return 'status-cancelled';
            default:
                return '';
        }
    };

    if (loading) {
        return (
            <div className="loading">
                <div className="spinner"></div>
                <p>Loading order details...</p>
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="order-detail-page">
                <div className="container">
                    <div className="error-message">{error || 'Order not found'}</div>
                    <button onClick={() => navigate('/orders')} className="btn btn-primary mt-2">
                        Back to Orders
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="order-detail-page">
            <div className="container">
                <button onClick={() => navigate('/orders')} className="btn btn-secondary mb-2">
                    ← Back to Orders
                </button>

                <div className="order-success-banner">
                    <div className="success-icon">✓</div>
                    <div className="success-content">
                        <h1>Order Confirmed!</h1>
                        <p>Thank you for your order. A confirmation email has been sent to your email address.</p>
                    </div>
                </div>

                <div className="order-detail-layout">
                    <div className="order-info-section">
                        <div className="info-card">
                            <h2>Order Information</h2>
                            <div className="info-grid">
                                <div className="info-item">
                                    <span className="info-label">Order ID:</span>
                                    <span className="info-value">#{order._id}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Order Date:</span>
                                    <span className="info-value">
                                        {new Date(order.orderDate).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Status:</span>
                                    <span className={`order-status ${getStatusClass(order.status)}`}>
                                        {order.status.toUpperCase()}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="info-card">
                            <h2>Order Items</h2>
                            <div className="order-items-list">
                                {order.items.map((item, index) => (
                                    <div key={index} className="order-item-detail">
                                        <div className="item-info">
                                            <h3>{item.name}</h3>
                                            <p className="item-specs">
                                                Size: <strong>{item.size}</strong> | Quantity: <strong>{item.quantity}</strong>
                                            </p>
                                        </div>
                                        <div className="item-pricing">
                                            <p className="item-price">${item.price.toFixed(2)}</p>
                                            <p className="item-total">
                                                Total: <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="order-summary-section">
                        <div className="summary-card">
                            <h2>Order Summary</h2>

                            <div className="summary-row">
                                <span>Subtotal:</span>
                                <span>${order.totalPrice.toFixed(2)}</span>
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
                                <span>${order.totalPrice.toFixed(2)}</span>
                            </div>

                            <button onClick={() => navigate('/products')} className="btn btn-primary btn-block mt-3">
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;
