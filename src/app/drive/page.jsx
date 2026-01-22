"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import api from '@/lib/api';
import { CheckCircle, Sliders, DollarSign, Clock } from 'lucide-react';

export default function DrivePage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        vehicleType: 'Car',
        vehicleNumber: '',
        licenseNumber: ''
    });
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        try {
            await api.registerDriver(formData);
            setStatus('success');
        } catch (error) {
            console.error("Driver registration failed", error);
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <main className="min-h-screen bg-white">
                <Navbar />
                <div className="pt-32 pb-20 container mx-auto px-4 max-w-2xl text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h1 className="text-4xl font-bold mb-4">You're all set!</h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Thanks for signing up to drive with CabNest. We've received your application and will contact you shortly once your details are verified.
                    </p>
                    <a href="/" className="inline-block px-8 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition">
                        Back to Home
                    </a>
                </div>
                <Footer />
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section */}
            <div className="bg-black text-white pt-32 pb-20 px-4">
                <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                            Drive when you want, <br /> make what you need
                        </h1>
                        <p className="text-xl text-gray-300 mb-8 max-w-lg">
                            Make money on your schedule with deliveries or rides—or both. You can use your own car or choose a rental through CabNest.
                        </p>
                    </div>
                    <div className="w-full max-w-md bg-white text-black p-8 rounded-2xl shadow-xl">
                        <h2 className="text-2xl font-bold mb-6">Sign up to drive</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Full Name"
                                required
                                className="w-full bg-gray-100 p-3 rounded-lg border border-transparent focus:bg-white focus:border-black outline-none transition"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                            <input
                                type="email"
                                placeholder="Email Address"
                                required
                                className="w-full bg-gray-100 p-3 rounded-lg border border-transparent focus:bg-white focus:border-black outline-none transition"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                            />
                            <div className="flex gap-4">
                                <input
                                    type="tel"
                                    placeholder="Phone Number"
                                    required
                                    className="flex-1 bg-gray-100 p-3 rounded-lg border border-transparent focus:bg-white focus:border-black outline-none transition"
                                    value={formData.phone}
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                />
                                <select
                                    className="bg-gray-100 p-3 rounded-lg border border-transparent focus:bg-white focus:border-black outline-none transition"
                                    value={formData.vehicleType}
                                    onChange={e => setFormData({ ...formData, vehicleType: e.target.value })}
                                >
                                    <option value="Car">Car</option>
                                    <option value="Bike">Bike</option>
                                    <option value="Auto">Auto</option>
                                </select>
                            </div>
                            <input
                                type="text"
                                placeholder="Vehicle Number (e.g. DL 01 AB 1234)"
                                required
                                className="w-full bg-gray-100 p-3 rounded-lg border border-transparent focus:bg-white focus:border-black outline-none transition"
                                value={formData.vehicleNumber}
                                onChange={e => setFormData({ ...formData, vehicleNumber: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="License Number"
                                required
                                className="w-full bg-gray-100 p-3 rounded-lg border border-transparent focus:bg-white focus:border-black outline-none transition"
                                value={formData.licenseNumber}
                                onChange={e => setFormData({ ...formData, licenseNumber: e.target.value })}
                            />

                            <button
                                type="submit"
                                disabled={status === 'submitting'}
                                className="w-full bg-black text-white font-bold py-3 rounded-lg hover:bg-gray-800 transition disabled:opacity-70"
                            >
                                {status === 'submitting' ? 'Submitting...' : 'Sign Up to Drive'}
                            </button>

                            {status === 'error' && (
                                <p className="text-red-500 text-sm text-center">Registration failed. Please try again.</p>
                            )}
                        </form>
                    </div>
                </div>
            </div>

            {/* Features Grid */}
            <div className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="text-center">
                            <Clock className="w-12 h-12 mx-auto mb-4 text-black" />
                            <h3 className="text-xl font-bold mb-2">Set your own schedule</h3>
                            <p className="text-gray-600">You're the boss. You can drive with the CabNest app day or night. Fit driving around your life, not the other way around.</p>
                        </div>
                        <div className="text-center">
                            <DollarSign className="w-12 h-12 mx-auto mb-4 text-black" />
                            <h3 className="text-xl font-bold mb-2">Make money on your terms</h3>
                            <p className="text-gray-600">The more you drive, the more you can make. Plus, your fares get automatically deposited weekly.</p>
                        </div>
                        <div className="text-center">
                            <Sliders className="w-12 h-12 mx-auto mb-4 text-black" />
                            <h3 className="text-xl font-bold mb-2">Let the app lead the way</h3>
                            <p className="text-gray-600">Just tap and go. You'll get turn-by-turn directions, tools to help you make more, and 24/7 support.</p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
