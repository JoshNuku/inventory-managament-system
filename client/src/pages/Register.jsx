import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import AuthContext from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { showToast } = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await register(name, email, password);
            showToast('Account created successfully', 'success');
            navigate('/');
        } catch (err) {
            showToast('Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="container">
                {/* Title */}
                <div style={{ textAlign: 'center', marginBottom: 40 }}>
                    <h1 className="ios-title">Create Account</h1>
                    <p className="text-secondary" style={{ marginTop: 8 }}>
                        Start managing your inventory
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <div className="ios-card">
                        <div className="ios-row">
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="ios-input"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                autoComplete="name"
                                disabled={loading}
                            />
                        </div>
                        <div className="ios-row">
                            <input
                                type="email"
                                placeholder="Email"
                                className="ios-input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoComplete="email"
                                disabled={loading}
                            />
                        </div>
                        <div className="ios-row" style={{ position: 'relative' }}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                className="ios-input"
                                style={{ paddingRight: 44 }}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="new-password"
                                disabled={loading}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: 'absolute',
                                    right: 12,
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    padding: 4,
                                    cursor: 'pointer',
                                    color: 'var(--color-text-secondary)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                                tabIndex={-1}
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <div style={{ marginTop: 24 }}>
                        <button
                            type="submit"
                            className="ios-button ios-button-primary"
                            disabled={loading}
                        >
                            {loading && <span className="btn-spinner" />}
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </div>
                </form>

                {/* Footer */}
                <div style={{ marginTop: 32, textAlign: 'center' }}>
                    <span className="text-secondary">Already have an account? </span>
                    <Link to="/login" className="ios-link">Sign In</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
