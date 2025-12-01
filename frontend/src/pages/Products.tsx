import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productsAPI } from '../services/api';
import type { Product, ProductFilters } from '../types';
import './Products.css';

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filters, setFilters] = useState<ProductFilters>({
        search: '',
        category: '',
        size: '',
        priceMin: undefined,
        priceMax: undefined,
        page: 1,
        limit: 6,
    });
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalProducts: 0,
    });

    useEffect(() => {
        fetchProducts();
    }, [filters]);

    const fetchProducts = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await productsAPI.getAll(filters);
            setProducts(response.data.data.products);
            setPagination(response.data.data.pagination);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setFilters({ ...filters, page: 1 });
    };

    const handleFilterChange = (key: keyof ProductFilters, value: any) => {
        // Only reset to page 1 if we're changing filters other than page
        if (key === 'page') {
            setFilters({ ...filters, [key]: value });
        } else {
            setFilters({ ...filters, [key]: value, page: 1 });
        }
    };

    const clearFilters = () => {
        setFilters({
            search: '',
            category: '',
            size: '',
            priceMin: undefined,
            priceMax: undefined,
            page: 1,
            limit: 12,
        });
    };

    if (loading && products.length === 0) {
        return (
            <div className="loading">
                <div className="spinner"></div>
                <p>Loading products...</p>
            </div>
        );
    }

    return (
        <div className="products-page">
            <div className="container">
                <h1>Our Products</h1>

                {/* Search and Filters */}
                <div className="filters-section">
                    <form onSubmit={handleSearch} className="search-form">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={filters.search}
                            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                        />
                        <button type="submit" className="btn btn-primary">Search</button>
                    </form>

                    <div className="filters-row">
                        <select
                            value={filters.category}
                            onChange={(e) => handleFilterChange('category', e.target.value)}
                        >
                            <option value="">All Categories</option>
                            <option value="Men">Men</option>
                            <option value="Women">Women</option>
                            <option value="Kids">Kids</option>
                        </select>

                        <select
                            value={filters.size}
                            onChange={(e) => handleFilterChange('size', e.target.value)}
                        >
                            <option value="">All Sizes</option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                        </select>

                        <input
                            type="number"
                            placeholder="Min Price"
                            value={filters.priceMin || ''}
                            onChange={(e) => handleFilterChange('priceMin', e.target.value ? Number(e.target.value) : undefined)}
                        />

                        <input
                            type="number"
                            placeholder="Max Price"
                            value={filters.priceMax || ''}
                            onChange={(e) => handleFilterChange('priceMax', e.target.value ? Number(e.target.value) : undefined)}
                        />

                        <button onClick={clearFilters} className="btn btn-secondary">
                            Clear Filters
                        </button>
                    </div>
                </div>

                {/* Results Info */}
                <div className="results-info">
                    <p>Showing {products.length} of {pagination.totalProducts} products</p>
                </div>

                {error && <div className="error-message">{error}</div>}

                {/* Products Grid */}
                {products.length === 0 ? (
                    <div className="no-products">
                        <p>No products found. Try adjusting your filters.</p>
                    </div>
                ) : (
                    <div className="products-grid">
                        {products.map((product) => (
                            <Link to={`/products/${product._id}`} key={product._id} className="product-card">
                                <div className="product-image">
                                    <img src={product.imageUrl} alt={product.name} />
                                    <span className="product-category">{product.category}</span>
                                </div>
                                <div className="product-info">
                                    <h3>{product.name}</h3>
                                    <p className="product-price">${product.price.toFixed(2)}</p>
                                    <div className="product-sizes">
                                        {product.sizes.map((size) => (
                                            <span key={size} className="size-badge">{size}</span>
                                        ))}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                    <div className="pagination">
                        <button
                            onClick={() => handleFilterChange('page', pagination.currentPage - 1)}
                            disabled={pagination.currentPage === 1}
                            className="btn btn-secondary"
                        >
                            Previous
                        </button>
                        <span className="page-info">
                            Page {pagination.currentPage} of {pagination.totalPages}
                        </span>
                        <button
                            onClick={() => handleFilterChange('page', pagination.currentPage + 1)}
                            disabled={pagination.currentPage >= pagination.totalPages}
                            className="btn btn-secondary"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;
