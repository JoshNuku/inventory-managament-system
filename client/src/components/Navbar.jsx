import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { ChevronLeft } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const showBack = location.pathname !== '/' &&
        location.pathname !== '/login' &&
        location.pathname !== '/register';

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleBack = () => {
        navigate(-1);
    };

    // Hide navbar on auth pages
    if (location.pathname === '/login' || location.pathname === '/register') {
        return null;
    }

    return (
        <nav className="ios-navbar">
            <div className="ios-navbar-content">
                <div style={{ width: 80 }}>
                    {showBack && (
                        <button
                            onClick={handleBack}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: 0,
                                color: 'var(--accent)',
                                fontSize: 17,
                                fontFamily: 'inherit'
                            }}
                        >
                            <ChevronLeft size={24} strokeWidth={2.5} />
                            <span>Back</span>
                        </button>
                    )}
                </div>

                <div style={{ width: 80, display: 'flex', justifyContent: 'flex-end' }}>
                    {user && (
                        <button
                            onClick={handleLogout}
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: 'var(--danger)',
                                fontSize: 17,
                                fontFamily: 'inherit',
                                fontWeight: 500
                            }}
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
