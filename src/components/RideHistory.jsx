"use client";

import React, { useState, useEffect } from 'react';
import api from '@/lib/api';
import { format } from 'date-fns';
import { MapPin, Clock, CircleDollarSign, Car, Calendar } from 'lucide-react';

import Link from 'next/link'; // For unauthenticated state redirection option
import { useAuth } from '@/context/AuthContext';

const RideHistory = () => {
    const { user } = useAuth();
    const [rides, setRides] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }

        const fetchRides = async () => {
            try {
                const response = await api.getUserRides(user.id);
                setRides(response.data);
            } catch (err) {
                console.error("Failed to fetch rides:", err);
                setError("Could not load ride history. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchRides();
    }, [user]);

    if (!user && !loading) {
        return (
            <div className="text-center p-12 bg-yellow-50 rounded-xl border border-primary/20">
                <p className="text-gray-700 mb-4">Please log in to view your ride history.</p>
                <Link href="/login" className="text-primary font-semibold hover:text-primary-hover underline">Login</Link>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center p-8 bg-red-50 rounded-lg text-red-600 border border-red-200">
                <p>{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-white border border-red-200 rounded-md shadow-sm hover:bg-gray-50 transition-colors"
                >
                    Retry
                </button>
            </div>
        );
    }

    if (rides.length === 0) {
        return (
            <div className="text-center p-12 bg-accent-gray rounded-xl">
                <Car className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">No rides yet</h3>
                <p className="text-gray-600 mb-6">You haven't taken any rides with CabNest yet.</p>
                <a href="/" className="btn-primary px-6 py-3 rounded-lg font-medium inline-block">
                    Book your first ride
                </a>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Ride History</h2>
            <div className="grid gap-4">
                {rides.map((ride) => (
                    <div
                        key={ride.id}
                        className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm card-hover"
                    >
                        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
                            <div className="flex items-center gap-2">
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${ride.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                                        ride.status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                                            ride.status === 'BOOKED' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-gray-100 text-gray-800'
                                    }`}>
                                    {ride.status}
                                </span>
                                <span className="text-sm text-gray-500 flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {ride.createdAt ? format(new Date(ride.createdAt), 'MMM d, yyyy • h:mm a') : 'Date unavailable'}
                                </span>
                            </div>
                            <div className="text-xl font-bold font-mono text-primary">
                                ₹{ride.fare?.toFixed(2)}
                            </div>
                        </div>

                        <div className="relative pl-8 space-y-6">
                            {/* Connecting line */}
                            <div className="absolute left-[11px] top-2 bottom-6 w-[1px] bg-gray-200"></div>

                            <div className="relative">
                                <div className="absolute -left-8 mt-0.5">
                                    <div className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center border-2 border-primary">
                                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-500 mb-1">Pickup</p>
                                <p className="font-medium text-gray-900">{ride.pickupLocation}</p>
                            </div>

                            <div className="relative">
                                <div className="absolute -left-8 mt-0.5">
                                    <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center border-2 border-secondary">
                                        <div className="w-2 h-2 rounded-sm bg-secondary"></div>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-500 mb-1">Destination</p>
                                <p className="font-medium text-gray-900">{ride.dropoffLocation}</p>
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
                            <button className="text-sm font-medium text-primary underline hover:text-primary-hover transition">
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RideHistory;
