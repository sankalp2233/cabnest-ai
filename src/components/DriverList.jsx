"use client";

import React, { useState, useEffect } from 'react';
import api from '@/lib/api'; // Assumption: api.js will be updated to fetch drivers
import { Star, Car, Shield } from 'lucide-react';

const DriverList = () => {
    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const response = await api.getAvailableDrivers();
                setDrivers(response.data);
            } catch (e) {
                console.error("Failed to fetch drivers", e);
            } finally {
                setLoading(false);
            }
        };
        fetchDrivers();
    }, []);

    if (loading) return <div className="text-center py-10">Loading drivers...</div>;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                <h3 className="font-bold text-lg">Available Drivers Nearby</h3>
                <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">{drivers.length} active</span>
            </div>
            <div className="divide-y divide-gray-100">
                {drivers.map(driver => (
                    <div key={driver.id} className="p-6 hover:bg-gray-50 transition flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                                <Car className="w-6 h-6 text-gray-600" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900">{driver.name}</h4>
                                <p className="text-sm text-gray-500">{driver.vehicle}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="text-right">
                                <div className="flex items-center gap-1 text-yellow-500 font-bold">
                                    <span>{driver.rating}</span>
                                    <Star className="w-4 h-4 fill-current" />
                                </div>
                                <p className="text-xs text-gray-400">{driver.trips} trips</p>
                            </div>
                            <button className="px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition">
                                Select
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DriverList;
