import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const { itemCount } = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">
                    🛍️ E-Commerce Store
                </Link>

                <div className="navbar-links">
                    <Link to="/products">Products</Link>
                    <Link to="/cart" className="cart-link">
                        🛒 Cart
                        {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
                    </Link>

                    {isAuthenticated ? (
                        <>
                            <Link to="/orders">Orders</Link>
                            <span className="navbar-user">Hi, {user?.name}</span>
                            <button onClick={handleLogout} className="btn btn-secondary">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-primary">
                                Login
                            </Link>
                            <Link to="/register" className="btn btn-secondary">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
