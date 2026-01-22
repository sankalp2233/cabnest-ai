"use client";

import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Clock, Package, Car } from 'lucide-react';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const BookingWidget = ({ onPickupSelect, onDropoffSelect }) => {
    const { user } = useAuth();
    const router = useRouter();
    const pickupInputRef = useRef(null);

    const [activeTab, setActiveTab] = useState('ride');
    const [pickup, setPickup] = useState('');
    const [destination, setDestination] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    // Auto-focus pickup field on mount
    useEffect(() => {
        if (pickupInputRef.current) {
            pickupInputRef.current.focus();
        }
    }, []);

    const handleGeocode = async (query, type) => {
        if (!query) return;
        try {
            const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`);
            const data = await res.json();
            if (data && data[0]) {
                const coords = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
                if (type === 'pickup' && onPickupSelect) {
                    onPickupSelect(coords);
                } else if (type === 'dropoff' && onDropoffSelect) {
                    onDropoffSelect(coords);
                }
            }
        } catch (e) {
            console.error("Geocoding failed", e);
        }
    };

    const handleBookRide = async () => {
        if (!user) {
            router.push('/login');
            return;
        }

        if (!pickup || !destination) {
            setMessage({ type: 'error', text: 'Please enter both pickup and destination locations' });
            return;
        }

        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const rideData = {
                userId: user.id,
                pickupLocation: pickup,
                dropoffLocation: destination,
                rideType: activeTab.toUpperCase()
            };

            const response = await api.bookRide(rideData);
            setMessage({
                type: 'success',
                text: `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} booked successfully! Fare: ₹${response.data.fare}`
            });

            // Clear form after successful booking
            setTimeout(() => {
                setPickup('');
                setDestination('');
                setMessage({ type: '', text: '' });
                if (pickupInputRef.current) {
                    pickupInputRef.current.focus();
                }
            }, 3000);
        } catch (error) {
            setMessage({
                type: 'error',
                text: error.response?.data?.error || 'Failed to book ride. Please try again.'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-premium max-w-md w-full text-black animate-fade-in">
            <div className="flex border-b border-gray-200 mb-6">
                <button
                    className={`flex flex-col items-center pb-4 px-4 flex-1 transition-all duration-200 ${activeTab === 'ride'
                            ? 'border-b-2 border-primary font-semibold text-primary'
                            : 'text-gray-500 hover:text-black'
                        }`}
                    onClick={() => setActiveTab('ride')}
                >
                    <Car className="w-6 h-6 mb-2" />
                    <span>Ride</span>
                </button>
                <button
                    className={`flex flex-col items-center pb-4 px-4 flex-1 transition-all duration-200 ${activeTab === 'courier'
                            ? 'border-b-2 border-primary font-semibold text-primary'
                            : 'text-gray-500 hover:text-black'
                        }`}
                    onClick={() => setActiveTab('courier')}
                >
                    <Package className="w-6 h-6 mb-2" />
                    <span>Courier</span>
                </button>
                <button
                    className={`flex flex-col items-center pb-4 px-4 flex-1 transition-all duration-200 ${activeTab === 'reserve'
                            ? 'border-b-2 border-primary font-semibold text-primary'
                            : 'text-gray-500 hover:text-black'
                        }`}
                    onClick={() => setActiveTab('reserve')}
                >
                    <Clock className="w-6 h-6 mb-2" />
                    <span>Reserve</span>
                </button>
            </div>

            <h2 className="text-3xl font-bold mb-6">
                {activeTab === 'ride' && 'Request a ride now'}
                {activeTab === 'courier' && 'Send a package'}
                {activeTab === 'reserve' && 'Reserve a ride'}
            </h2>

            <div className="relative mb-4">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full animate-pulse-yellow"></div>
                <input
                    ref={pickupInputRef}
                    type="text"
                    placeholder="Enter pickup location"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    onBlur={() => handleGeocode(pickup, 'pickup')}
                    className="input-field pl-10"
                />
            </div>

            <div className="relative mb-4">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-secondary border border-secondary rounded-sm"></div>
                {/* Connecting line */}
                <div className="absolute left-[1.2rem] -top-6 bottom-6 w-[1px] bg-gray-300"></div>
                <input
                    type="text"
                    placeholder="Enter destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    onBlur={() => handleGeocode(destination, 'dropoff')}
                    className="input-field pl-10"
                />
            </div>

            {message.text && (
                <div className={`mb-4 p-3 rounded-lg text-sm animate-fade-in ${message.type === 'success'
                        ? 'bg-green-50 text-green-800 border border-green-200'
                        : 'bg-red-50 text-red-800 border border-red-200'
                    }`}>
                    {message.text}
                </div>
            )}

            {!user && (
                <div className="mb-4 text-sm text-gray-600 bg-yellow-50 border border-primary/20 p-3 rounded-lg text-center">
                    Please <a href="/login" className="underline text-primary font-semibold hover:text-primary-hover">log in</a> to book a ride.
                </div>
            )}

            <button
                onClick={handleBookRide}
                disabled={loading}
                className={`w-full font-bold py-3 rounded-lg text-lg transition-all duration-300 ${user
                        ? 'btn-primary hover:-translate-y-0.5'
                        : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    } disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none`}
            >
                {loading ? 'Booking...' : (user ? 'Request Now' : 'Log in to Request')}
            </button>
        </div>
    );
};

export default BookingWidget;


