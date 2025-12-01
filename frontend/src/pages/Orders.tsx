import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ordersAPI } from '../services/api';
import type { Order } from '../types';
import './Orders.css';

const Orders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await ordersAPI.getAll();
            setOrders(response.data.data.orders);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to fetch orders');
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
                <p>Loading orders...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="orders-page">
                <div className="container">
                    <h1>My Orders</h1>
                    <div className="error-message">{error}</div>
                </div>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="orders-page">
                <div className="container">
                    <h1>My Orders</h1>
                    <div className="empty-orders">
                        <p>📦 You haven't placed any orders yet</p>
                        <Link to="/products" className="btn btn-primary">
                            Start Shopping
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="orders-page">
            <div className="container">
                <h1>My Orders ({orders.length})</h1>

                <div className="orders-list">
                    {orders.map((order) => (
                        <div key={order._id} className="order-card">
                            <div className="order-header">
                                <div className="order-id">
                                    <span className="label">Order ID:</span>
                                    <span className="value">#{order._id.slice(-8)}</span>
                                </div>
                                <div className="order-date">
                                    <span className="label">Date:</span>
                                    <span className="value">
                                        {new Date(order.orderDate).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                        })}
                                    </span>
                                </div>
                                <div className={`order-status ${getStatusClass(order.status)}`}>
                                    {order.status.toUpperCase()}
                                </div>
                            </div>

                            <div className="order-items">
                                {order.items.slice(0, 3).map((item, index) => (
                                    <div key={index} className="order-item-preview">
                                        <span>{item.name}</span>
                                        <span className="item-qty">×{item.quantity}</span>
                                    </div>
                                ))}
                                {order.items.length > 3 && (
                                    <p className="more-items">
                                        +{order.items.length - 3} more item{order.items.length - 3 > 1 ? 's' : ''}
                                    </p>
                                )}
                            </div>

                            <div className="order-footer">
                                <div className="order-total">
                                    <span className="label">Total:</span>
                                    <span className="value">${order.totalPrice.toFixed(2)}</span>
                                </div>
                                <Link to={`/orders/${order._id}`} className="btn btn-primary btn-sm">
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Orders;
