import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { LoginData } from '../services/authService';
import '../styles/AuthPages.css';

const LoginPage = () => {
    const { login, loading, error } = useAuth();
    const [formData, setFormData] = useState<LoginData>({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await login(formData);
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h2>Welcome Back</h2>
                    <p>Sign in to continue to CodeCollab</p>
                </div>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                <form onSubmit={onSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <div className="input-with-icon">
                            <span className="input-icon">📧</span>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={onChange}
                                placeholder="your@email.com"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="input-with-icon">
                            <span className="input-icon">🔒</span>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={onChange}
                                placeholder="Your password"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="auth-button"
                        disabled={loading}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>
                        Don't have an account? <Link to="/register" className="auth-link">Create Account</Link>
                    </p>
                </div>
            </div>

            <div className="auth-info">
                <div className="auth-info-content">
                    <h3>Code Better Together</h3>
                    <p>Join our community of developers sharing and collaborating on code snippets.</p>
                    <ul className="auth-features">
                        <li>✓ Share code in 100+ languages</li>
                        <li>✓ Collaborate in real-time</li>
                        <li>✓ Create private snippets</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;