import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="auth-page">
            <div className="container" style={{ textAlign: 'center' }}>
                {/* 404 Illustration */}
                <div style={{
                    fontSize: 120,
                    fontWeight: 700,
                    color: 'var(--color-primary)',
                    lineHeight: 1,
                    marginBottom: 16,
                    opacity: 0.9
                }}>
                    404
                </div>

                {/* Message */}
                <h1 className="ios-title" style={{ marginBottom: 12 }}>
                    Page Not Found
                </h1>
                <p className="text-secondary" style={{
                    marginBottom: 32,
                    maxWidth: 320,
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}>
                    The page you're looking for doesn't exist or has been moved.
                </p>

                {/* Actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <Link to="/" className="ios-button ios-button-primary" style={{ textDecoration: 'none' }}>
                        <Home size={18} style={{ marginRight: 8 }} />
                        Go to Dashboard
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="ios-button"
                        style={{
                            background: 'var(--color-bg-secondary)',
                            color: 'var(--color-text)'
                        }}
                    >
                        <ArrowLeft size={18} style={{ marginRight: 8 }} />
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
