import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home = () => {
    const { isAuthenticated } = useAuth();

    return (
        <div className="home-container">
            <div className="home-hero">
                <h1>Welcome to Our Clothing Store</h1>
                <p>Discover the latest trends in fashion for Men, Women, and Kids</p>

                <div className="home-actions">
                    <Link to="/products" className="btn btn-primary btn-large">
                        Shop Now
                    </Link>
                    {!isAuthenticated && (
                        <Link to="/register" className="btn btn-secondary btn-large">
                            Create Account
                        </Link>
                    )}
                </div>
            </div>

            <div className="home-features">
                <div className="feature-card">
                    <h3>👕 Quality Products</h3>
                    <p>Browse through our collection of premium clothing items</p>
                </div>
                <div className="feature-card">
                    <h3>🛒 Easy Shopping</h3>
                    <p>Simple and secure checkout process</p>
                </div>
                <div className="feature-card">
                    <h3>📦 Fast Delivery</h3>
                    <p>Quick order processing and email confirmation</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
