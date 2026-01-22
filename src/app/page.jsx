"use client";


import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import BookingWidget from '@/components/BookingWidget';
import Footer from '@/components/Footer';
import dynamic from 'next/dynamic';

const MapWithNoSSR = dynamic(() => import('@/components/MapComponent'), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">Loading Map...</div>
});


export default function Home() {
    const [pickupMarker, setPickupMarker] = useState(null);
    const [dropoffMarker, setDropoffMarker] = useState(null);
    const [mapCenter, setMapCenter] = useState(null);

    const handlePickupSelect = (coords) => {
        setPickupMarker(coords);
        setMapCenter(coords);
    };

    const handleDropoffSelect = (coords) => {
        setDropoffMarker(coords);
        // If we have both markers, center between them
        if (pickupMarker) {
            const centerLat = (pickupMarker[0] + coords[0]) / 2;
            const centerLon = (pickupMarker[1] + coords[1]) / 2;
            setMapCenter([centerLat, centerLon]);
        } else {
            setMapCenter(coords);
        }
    };

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-16 min-h-[calc(100vh-64px)] flex items-center overflow-hidden bg-gray-100">
                {/* Map Background */}
                <div className="absolute inset-0 z-0">
                    <MapWithNoSSR
                        className="w-full h-full"
                        center={mapCenter}
                        pickup={pickupMarker}
                        dropoff={dropoffMarker}
                    />
                </div>

                <div className="container mx-auto px-4 lg:px-16 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 pointer-events-none">
                    <div className="max-w-md w-full pointer-events-auto">
                        <div className="mb-6 bg-black/80 backdrop-blur-md p-4 rounded-lg inline-block text-white">
                            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                                Go anywhere with <br /> CabNest
                            </h1>
                        </div>
                        <BookingWidget
                            onPickupSelect={handlePickupSelect}
                            onDropoffSelect={handleDropoffSelect}
                        />
                    </div>
                </div>
            </section>


            {/* Suggestions Section */}
            <section className="py-20 px-4 lg:px-16 container mx-auto">
                <h2 className="text-4xl font-bold mb-12 text-black">Suggestions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-accent-gray p-6 rounded-lg flex justify-between items-center cursor-pointer card-hover">
                        <div>
                            <h3 className="text-xl font-bold mb-2 text-black">Ride</h3>
                            <p className="text-sm text-gray-600">Go anywhere with CabNest. Request a ride, hop in, and go.</p>
                            <button className="mt-4 px-4 py-2 bg-white text-black rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors shadow-sm border border-gray-200">Details</button>
                        </div>
                        <div className="w-24 h-24 flex items-center justify-center">
                            <img src="/images/ride_illustration.png" alt="Ride" className="w-full h-full object-contain mix-blend-multiply" />
                        </div>
                    </div>
                    <div className="bg-accent-gray p-6 rounded-lg flex justify-between items-center cursor-pointer card-hover">
                        <div>
                            <h3 className="text-xl font-bold mb-2 text-black">Reserve</h3>
                            <p className="text-sm text-gray-600">Reserve your ride in advance so you can relax on the day of your trip.</p>
                            <button className="mt-4 px-4 py-2 bg-white text-black rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors shadow-sm border border-gray-200">Details</button>
                        </div>
                        <div className="w-24 h-24 flex items-center justify-center">
                            <img src="/images/reserve_illustration.png" alt="Reserve" className="w-full h-full object-contain mix-blend-multiply" />
                        </div>
                    </div>
                    <div className="bg-accent-gray p-6 rounded-lg flex justify-between items-center cursor-pointer card-hover">
                        <div>
                            <h3 className="text-xl font-bold mb-2 text-black">Package</h3>
                            <p className="text-sm text-gray-600">CabNest Connect makes same-day delivery easier than ever.</p>
                            <button className="mt-4 px-4 py-2 bg-white text-black rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors shadow-sm border border-gray-200">Details</button>
                        </div>
                        <div className="w-24 h-24 flex items-center justify-center">
                            <img src="/images/package_illustration.png" alt="Package" className="w-full h-full object-contain mix-blend-multiply" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Earner/Rider Split Grid */}
            <section className="container mx-auto px-4 lg:px-16 mb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="relative rounded-2xl overflow-hidden min-h-[400px] flex items-center p-12 bg-gray-100">
                        <div className="absolute inset-0">
                            {/* Placeholder Image */}
                            <div className="w-full h-full bg-gray-200"></div>
                        </div>
                        <div className="relative z-10 max-w-sm">
                            <h2 className="text-4xl font-bold mb-6 text-black">Drive when you want, make what you need</h2>
                            <p className="text-lg mb-8 text-black">Make money on your schedule with deliveries or rides—or both. You can use your own car or choose a rental through CabNest.</p>
                            <div className="flex gap-4">
                                <button className="btn-secondary px-6 py-3 rounded-lg font-medium">Get started</button>
                                <button className="text-black underline font-medium hover:text-gray-700">Already have an account? Sign in</button>
                            </div>
                        </div>
                    </div>
                    <div className="relative rounded-2xl overflow-hidden min-h-[400px] flex items-center p-12 bg-gray-100">
                        <div className="absolute inset-0">
                            {/* Placeholder Image */}
                            <div className="w-full h-full bg-gray-200"></div>
                        </div>
                        <div className="relative z-10 max-w-sm">
                            <h2 className="text-4xl font-bold mb-6 text-black">The CabNest advantage</h2>
                            <p className="text-lg mb-8 text-black">Experience the smartest way to move. Our AI optimizes routes for faster arrivals and lower costs.</p>
                            <div className="flex gap-4">
                                <button className="btn-secondary px-6 py-3 rounded-lg font-medium">Download App</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
