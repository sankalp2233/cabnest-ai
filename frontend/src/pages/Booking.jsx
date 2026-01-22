import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import Navbar from '../components/Navbar';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for Leaflet marker icons
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const LocationMarker = ({ selecting, setPickup, setDropoff }) => {
    useMapEvents({
        click(e) {
            if (selecting === 'pickup') {
                setPickup(e.latlng);
            } else if (selecting === 'dropoff') {
                setDropoff(e.latlng);
            }
        },
    });
    return null;
};

const Booking = () => {
    const [pickup, setPickup] = useState(null);
    const [dropoff, setDropoff] = useState(null);
    const [selecting, setSelecting] = useState('pickup'); // 'pickup' or 'dropoff'
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    // Removed login redirect for guest access
    useEffect(() => {
        // user check removed
    }, [user, navigate]);

    const handleBook = async () => {
        if (!pickup || !dropoff) {
            alert('Please select both pickup and dropoff locations on the map.');
            return;
        }

        setLoading(true);
        try {
            const rideData = {
                userId: user?.id || 1, // Fallback to 1 for guest bookings
                pickupLocation: `${pickup.lat.toFixed(4)}, ${pickup.lng.toFixed(4)}`,
                dropoffLocation: `${dropoff.lat.toFixed(4)}, ${dropoff.lng.toFixed(4)}`,
                status: 'BOOKED'
            };

            await api.bookRide(rideData);
            alert('Ride booked successfully!');
            navigate('/my-rides');
        } catch (error) {
            console.error('Booking failed:', error);
            alert('Failed to book ride. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container" style={{ marginTop: '2rem', display: 'flex', gap: '2rem', height: 'calc(100vh - 6rem)', flexDirection: 'column' }}>
                <div style={{ display: 'flex', gap: '2rem', flex: 1, flexWrap: 'wrap' }}>
                    {/* Booking Form Panel */}
                    <div className="card" style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '1.5rem', height: 'fit-content' }}>
                        <div>
                            <h2 style={{ marginBottom: '0.5rem' }}>Book a Ride</h2>
                            <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem' }}>
                                Select locations by clicking on the map.
                            </p>
                        </div>

                        <div className="input-group">
                            <label>Pickup Location</label>
                            <div
                                style={{
                                    padding: '1rem',
                                    background: selecting === 'pickup' ? 'rgba(99, 102, 241, 0.1)' : 'rgba(0,0,0,0.2)',
                                    border: '1px solid',
                                    borderColor: selecting === 'pickup' ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
                                    borderRadius: '0.5rem',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}
                                onClick={() => setSelecting('pickup')}
                            >
                                <span>{pickup ? `${pickup.lat.toFixed(4)}, ${pickup.lng.toFixed(4)}` : 'Tap to select on map'}</span>
                                {selecting === 'pickup' && <span style={{ color: 'var(--primary)', fontSize: '0.8rem' }}>● Active</span>}
                            </div>
                        </div>

                        <div className="input-group">
                            <label>Dropoff Location</label>
                            <div
                                style={{
                                    padding: '1rem',
                                    background: selecting === 'dropoff' ? 'rgba(99, 102, 241, 0.1)' : 'rgba(0,0,0,0.2)',
                                    border: '1px solid',
                                    borderColor: selecting === 'dropoff' ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
                                    borderRadius: '0.5rem',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}
                                onClick={() => setSelecting('dropoff')}
                            >
                                <span>{dropoff ? `${dropoff.lat.toFixed(4)}, ${dropoff.lng.toFixed(4)}` : 'Tap to select on map'}</span>
                                {selecting === 'dropoff' && <span style={{ color: 'var(--primary)', fontSize: '0.8rem' }}>● Active</span>}
                            </div>
                        </div>

                        <div style={{ marginTop: '1rem' }}>
                            <button
                                className="btn btn-primary"
                                style={{ width: '100%' }}
                                onClick={handleBook}
                                disabled={loading || !pickup || !dropoff}
                            >
                                {loading ? 'Booking...' : 'Confirm Booking'}
                            </button>
                        </div>
                    </div>

                    {/* Map Panel */}
                    <div className="card" style={{ flex: '2 1 400px', padding: 0, overflow: 'hidden', minHeight: '400px', position: 'relative' }}>
                        <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100%', width: '100%' }}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <LocationMarker
                                selecting={selecting}
                                setPickup={setPickup}
                                setDropoff={setDropoff}
                            />
                            {pickup && <Marker position={pickup} />}
                            {dropoff && <Marker position={dropoff} />}
                        </MapContainer>

                        {/* Map Legend/Overlay */}
                        <div style={{
                            position: 'absolute',
                            top: '1rem',
                            right: '1rem',
                            background: 'rgba(15, 23, 42, 0.9)',
                            padding: '0.5rem 1rem',
                            borderRadius: '0.5rem',
                            zIndex: 1000,
                            fontSize: '0.8rem',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}>
                            Currently selecting: <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>
                                {selecting === 'pickup' ? 'Pickup' : 'Dropoff'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Booking;
