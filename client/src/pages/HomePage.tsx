import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './HomePage.css';

const HomePage = () => {
    const { isAuthenticated } = useAuth();

    return (
        <div className="home-page-container">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <h1>Code. Collaborate. Create.</h1>
                    <p className="hero-subtitle">
                        Share and collaborate on code snippets with developers around the world in real-time.
                    </p>
                    <div className="hero-buttons">
                        {isAuthenticated ? (
                            <Link to="/snippets" className="primary-button">
                                My Snippets
                            </Link>
                        ) : (
                            <>
                                <Link to="/register" className="primary-button">
                                    Get Started
                                </Link>
                                <Link to="/login" className="secondary-button">
                                    Sign In
                                </Link>
                            </>
                        )}
                    </div>
                </div>
                <div className="hero-image">
                    <div className="code-window">
                        <div className="code-header">
                            <span className="dot red"></span>
                            <span className="dot yellow"></span>
                            <span className="dot green"></span>
                        </div>
                        <pre className="code-content">
                            <code>
                                {"function shareCode() {\n  return {\n    collaborative: true,\n    efficient: true,\n    powerful: true\n  };\n}"}
                            </code>
                        </pre>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <h2>Why Choose CodeCollab?</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">📝</div>
                        <h3>Share Code Snippets</h3>
                        <p>Create and share code snippets with syntax highlighting for over 100 languages.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">👥</div>
                        <h3>Real-time Collaboration</h3>
                        <p>Work together with your team in real-time, seeing changes as they happen.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🔒</div>
                        <h3>Secure Storage</h3>
                        <p>All your code snippets are securely stored and accessible only by you and your collaborators.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">📱</div>
                        <h3>Access Anywhere</h3>
                        <p>Access your code from any device with our responsive web application.</p>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="cta-section">
                <h2>Ready to start coding together?</h2>
                <p>Join thousands of developers who are already using CodeCollab to share and collaborate.</p>
                {!isAuthenticated && (
                    <Link to="/register" className="cta-button">
                        Create Free Account
                    </Link>
                )}
            </section>

            <div className="home-footer">
                <p>CodeCollab - The modern way to share code</p>
            </div>
        </div>
    );
};

export default HomePage;