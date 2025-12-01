import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productsAPI } from '../services/api';
import { useCart } from '../context/CartContext';
import type { Product } from '../types';
import './ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [addingToCart, setAddingToCart] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (id) {
            fetchProduct();
        }
    }, [id]);

    const fetchProduct = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await productsAPI.getById(id!);
            setProduct(response.data.data.product);
            // Set default size
            if (response.data.data.product.sizes.length > 0) {
                setSelectedSize(response.data.data.product.sizes[0]);
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to fetch product');
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = async () => {
        if (!selectedSize) {
            alert('Please select a size');
            return;
        }

        setAddingToCart(true);
        setSuccessMessage('');
        try {
            await addToCart(product!._id, selectedSize, quantity);
            setSuccessMessage('✓ Added to cart successfully!');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err: any) {
            alert(err.response?.data?.message || 'Failed to add to cart');
        } finally {
            setAddingToCart(false);
        }
    };

    if (loading) {
        return (
            <div className="loading">
                <div className="spinner"></div>
                <p>Loading product...</p>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="container mt-3">
                <div className="error-message">{error || 'Product not found'}</div>
                <button onClick={() => navigate('/products')} className="btn btn-primary mt-2">
                    Back to Products
                </button>
            </div>
        );
    }

    return (
        <div className="product-detail-page">
            <div className="container">
                <button onClick={() => navigate('/products')} className="btn btn-secondary mb-2">
                    ← Back to Products
                </button>

                {successMessage && (
                    <div className="success-message">{successMessage}</div>
                )}

                <div className="product-detail">
                    <div className="product-detail-image">
                        <img src={product.imageUrl} alt={product.name} />
                    </div>

                    <div className="product-detail-info">
                        <div className="product-category-badge">{product.category}</div>
                        <h1>{product.name}</h1>
                        <p className="product-detail-price">${product.price.toFixed(2)}</p>

                        <div className="product-description">
                            <h3>Description</h3>
                            <p>{product.description}</p>
                        </div>

                        <div className="product-options">
                            <div className="option-group">
                                <label>Select Size:</label>
                                <div className="size-selector">
                                    {product.sizes.map((size) => (
                                        <button
                                            key={size}
                                            className={`size-option ${selectedSize === size ? 'active' : ''}`}
                                            onClick={() => setSelectedSize(size)}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="option-group">
                                <label>Quantity:</label>
                                <div className="quantity-selector">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="qty-btn"
                                    >
                                        -
                                    </button>
                                    <span className="qty-display">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="qty-btn"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleAddToCart}
                            disabled={addingToCart || !selectedSize}
                            className="btn btn-primary btn-large btn-block"
                        >
                            {addingToCart ? 'Adding to Cart...' : '🛒 Add to Cart'}
                        </button>

                        <div className="product-meta">
                            <p><strong>Stock:</strong> {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}</p>
                            <p><strong>Category:</strong> {product.category}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
