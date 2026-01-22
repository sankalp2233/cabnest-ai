import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import VisualHero from '../components/VisualHero';

const Home = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <>
            <Navbar />
            <main className="hero-section">
                <div className="container hero-container">
                    <div className="hero-content fade-in">
                        <div className="hero-badge">AI-Powered Mobility</div>
                        <h1 className="hero-headline">
                            Your Ride, <br />
                            <span style={{ color: '#ff511a' }}>Redefined by AI</span>
                        </h1>
                        <p className="hero-subheadline">
                            Experience the future of urban transport with CabNest.
                            Smart routing, premium comfort, and instant booking at your fingertips.
                        </p>

                        <div className="hero-actions">
                            <button
                                className="btn btn-primary"
                                onClick={() => navigate('/book-ride')}
                            >
                                Get Started
                            </button>
                            <button
                                className="btn btn-secondary"
                                onClick={() => navigate('/my-rides')}
                            >
                                View History
                            </button>
                        </div>

                        <div className="hero-stats">
                            <div className="stat-item">
                                <span className="stat-value">50k+</span>
                                <span className="stat-label">Happy Riders</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-value">4.9/5</span>
                                <span className="stat-label">Average Rating</span>
                            </div>
                        </div>
                    </div>

                    <div className="hero-visual">
                        <VisualHero />
                    </div>
                </div>

                <div className="services-grid container">
                    <div className="glass-card service-card" onClick={() => navigate('/book-ride')}>
                        <div className="service-icon">🚗</div>
                        <h3>Book a Ride</h3>
                        <p>Request a cab to your destination instantly with AI-optimized routing.</p>
                    </div>
                    <div className="glass-card service-card" onClick={() => navigate('/my-rides')}>
                        <div className="service-icon">📅</div>
                        <h3>My Rides</h3>
                        <p>Track your upcoming trips and review your past travel history.</p>
                    </div>
                    <div className="glass-card service-card" onClick={() => alert('Live tracking feature coming soon!')}>
                        <div className="service-icon">📍</div>
                        <h3>Live Tracking</h3>
                        <p>Real-time updates on your driver's location and estimated arrival.</p>
                    </div>
                </div>
            </main>

            <style dangerouslySetInnerHTML={{
                __html: `
                .hero-section {
                    padding-top: 8rem;
                    padding-bottom: 4rem;
                    position: relative;
                    overflow: hidden;
                }

                .hero-container {
                    display: grid;
                    grid-template-columns: 1.2fr 1fr;
                    gap: 4rem;
                    align-items: center;
                }

                .hero-badge {
                    display: inline-block;
                    padding: 0.5rem 1rem;
                    background: rgba(255, 81, 26, 0.1);
                    color: var(--primary);
                    border-radius: 2rem;
                    font-size: 0.875rem;
                    font-weight: 600;
                    margin-bottom: 1.5rem;
                    border: 1px solid rgba(255, 81, 26, 0.2);
                }

                .hero-headline {
                    font-size: clamp(2.5rem, 5vw, 4.5rem);
                    line-height: 1.1;
                    font-weight: 900;
                    margin-bottom: 1.5rem;
                    letter-spacing: -0.02em;
                }

                .hero-headline span {
                    color: var(--primary);
                }

                .hero-subheadline {
                    font-size: 1.125rem;
                    color: var(--text-gray);
                    margin-bottom: 2.5rem;
                    max-width: 540px;
                }

                .hero-actions {
                    display: flex;
                    gap: 1rem;
                    margin-bottom: 3rem;
                }

                .hero-stats {
                    display: flex;
                    gap: 3rem;
                    border-top: 1px solid var(--glass-border);
                    padding-top: 2rem;
                }

                .stat-item {
                    display: flex;
                    flex-direction: column;
                }

                .stat-value {
                    font-size: 1.5rem;
                    font-weight: 800;
                    color: white;
                }

                .stat-label {
                    font-size: 0.875rem;
                    color: var(--text-gray);
                }

                .services-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 2rem;
                    margin-top: 6rem;
                }

                .service-card {
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .service-card:hover {
                    transform: translateY(-10px);
                    background: rgba(255, 255, 255, 0.05);
                    border-color: rgba(255, 81, 26, 0.3);
                }

                .service-icon {
                    font-size: 2.5rem;
                    margin-bottom: 1.5rem;
                }

                .service-card h3 {
                    margin-bottom: 1rem;
                }

                .service-card p {
                    color: var(--text-gray);
                    font-size: 0.9375rem;
                }

                @media (max-width: 992px) {
                    .hero-container {
                        grid-template-columns: 1fr;
                        text-align: center;
                    }

                    .hero-subheadline {
                        margin-left: auto;
                        margin-right: auto;
                    }

                    .hero-actions {
                        justify-content: center;
                    }

                    .hero-stats {
                        justify-content: center;
                    }

                .hero-visual {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 500px;
                    margin-top: -4rem; /* Pull visual up */
                }
            `}} />
        </>
    );
};

export default Home;
