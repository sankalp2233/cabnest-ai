"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RideHistory from '@/components/RideHistory';

export default function RidesPage() {
    return (
        <main className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <div className="flex-grow pt-24 pb-12">
                <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
                    <RideHistory />
                </div>
            </div>

            <Footer />
        </main>
    );
}
