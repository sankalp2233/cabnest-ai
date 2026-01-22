import React, { useState, useEffect } from 'react';
import api from '../api';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const History = () => {
    const [rides, setRides] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchRides = async () => {
            try {
                const userId = user?.id || 1; // Fallback to 1 for guest bookings
                const response = await api.getUserRides(userId);
                // Sort by id descending (assuming higher id = newer) if backend doesn't sort
                const sortedRides = response.data.sort((a, b) => b.id - a.id);
                setRides(sortedRides);
            } catch (error) {
                console.error('Error fetching rides:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRides();
    }, [user, navigate]);

    return (
        <>
            <Navbar />
            <div className="container" style={{ marginTop: '2rem', maxWidth: '800px' }}>
                <h2 style={{ marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
                    My Rides
                </h2>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-gray)' }}>Loading your rides...</div>
                ) : rides.length === 0 ? (
                    <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚖</div>
                        <h3>No rides yet</h3>
                        <p style={{ color: 'var(--text-gray)', marginBottom: '1.5rem' }}>You haven't booked any rides yet.</p>
                        <button className="btn btn-primary" onClick={() => navigate('/book-ride')}>Book a Ride</button>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {rides.map((ride) => (
                            <div key={ride.id} className="card fade-in" style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr auto',
                                gap: '1rem',
                                alignItems: 'center'
                            }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                                        <span style={{ color: 'var(--primary)', fontSize: '1.2rem' }}>●</span>
                                        <div>
                                            <span style={{ color: 'var(--text-gray)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Pickup</span>
                                            <div style={{ fontWeight: 500 }}>{ride.pickupLocation}</div>
                                        </div>
                                    </div>

                                    <div style={{ borderLeft: '2px dashed rgba(255,255,255,0.1)', marginLeft: '0.35rem', height: '1rem' }}></div>

                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                                        <span style={{ color: 'var(--danger)', fontSize: '1.2rem' }}>●</span>
                                        <div>
                                            <span style={{ color: 'var(--text-gray)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Dropoff</span>
                                            <div style={{ fontWeight: 500 }}>{ride.dropoffLocation}</div>
                                        </div>
                                    </div>
                                </div>

                                <div style={{
                                    textAlign: 'right',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-end',
                                    gap: '0.5rem'
                                }}>
                                    <div
                                        style={{
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '999px',
                                            fontSize: '0.75rem',
                                            fontWeight: 700,
                                            textTransform: 'uppercase',
                                            backgroundColor: ride.status === 'BOOKED' ? 'rgba(99, 102, 241, 0.15)' : 'rgba(34, 197, 94, 0.15)',
                                            color: ride.status === 'BOOKED' ? 'var(--primary)' : 'var(--success)',
                                            border: `1px solid ${ride.status === 'BOOKED' ? 'rgba(99, 102, 241, 0.3)' : 'rgba(34, 197, 94, 0.3)'}`
                                        }}
                                    >
                                        {ride.status}
                                    </div>

                                    {ride.fare !== null && ride.fare !== undefined && (
                                        <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text-light)' }}>
                                            ${Number(ride.fare).toFixed(2)}
                                        </div>
                                    )}

                                    <div style={{ color: 'var(--text-gray)', fontSize: '0.8rem' }}>
                                        Ride #{ride.id}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default History;
