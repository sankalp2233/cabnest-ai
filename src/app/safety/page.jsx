"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Shield, Phone, AlertCircle, FileText, Users, Lock } from 'lucide-react';

export default function SafetyPage() {
    return (
        <main className="min-h-screen bg-white flex flex-col">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-16 bg-gradient-secondary text-white">
                <div className="container mx-auto px-4 lg:px-16 max-w-4xl">
                    <div className="flex items-center gap-4 mb-6">
                        <Shield className="w-12 h-12 text-primary" />
                        <h1 className="text-5xl font-bold">Your Safety Matters</h1>
                    </div>
                    <p className="text-xl text-gray-300">
                        At CabNest, safety is our top priority. We're committed to providing a secure experience for both riders and drivers.
                    </p>
                </div>
            </section>

            {/* Safety Features */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 lg:px-16 max-w-6xl">
                    <h2 className="text-4xl font-bold mb-12 text-center">Safety Features</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="p-6 bg-accent-gray rounded-xl card-hover">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                <Phone className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">24/7 Support</h3>
                            <p className="text-gray-600">
                                Our dedicated safety team is available around the clock to assist you with any concerns or emergencies.
                            </p>
                        </div>

                        <div className="p-6 bg-accent-gray rounded-xl card-hover">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                <Shield className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Driver Verification</h3>
                            <p className="text-gray-600">
                                All drivers undergo comprehensive background checks and vehicle inspections before joining our platform.
                            </p>
                        </div>

                        <div className="p-6 bg-accent-gray rounded-xl card-hover">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                <AlertCircle className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Emergency Button</h3>
                            <p className="text-gray-600">
                                Quick access to emergency services directly from the app with automatic location sharing.
                            </p>
                        </div>

                        <div className="p-6 bg-accent-gray rounded-xl card-hover">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                <Users className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Share Your Trip</h3>
                            <p className="text-gray-600">
                                Share your real-time location and trip details with trusted contacts for added peace of mind.
                            </p>
                        </div>

                        <div className="p-6 bg-accent-gray rounded-xl card-hover">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                <Lock className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Data Privacy</h3>
                            <p className="text-gray-600">
                                Your personal information is encrypted and protected with industry-leading security measures.
                            </p>
                        </div>

                        <div className="p-6 bg-accent-gray rounded-xl card-hover">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                <FileText className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Ride Tracking</h3>
                            <p className="text-gray-600">
                                Every ride is GPS-tracked and recorded for your safety and quality assurance.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Community Guidelines */}
            <section className="py-16 bg-yellow-50">
                <div className="container mx-auto px-4 lg:px-16 max-w-4xl">
                    <h2 className="text-4xl font-bold mb-8">Community Guidelines</h2>
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="text-xl font-bold mb-3 text-primary">Respect Everyone</h3>
                            <p className="text-gray-700">
                                Treat all riders and drivers with courtesy and respect. Discrimination, harassment, or abusive behavior is not tolerated.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="text-xl font-bold mb-3 text-primary">Follow the Rules</h3>
                            <p className="text-gray-700">
                                Adhere to local traffic laws, wear seatbelts, and follow all safety protocols during your ride.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="text-xl font-bold mb-3 text-primary">Report Issues</h3>
                            <p className="text-gray-700">
                                If you experience any safety concerns or violations, report them immediately through the app or contact our support team.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Insurance Coverage */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 lg:px-16 max-w-4xl">
                    <h2 className="text-4xl font-bold mb-8">Insurance Coverage</h2>
                    <div className="bg-accent-gray p-8 rounded-xl">
                        <p className="text-lg text-gray-700 mb-6">
                            Every CabNest ride is covered by comprehensive insurance that protects both riders and drivers. Our coverage includes:
                        </p>
                        <ul className="space-y-3 text-gray-700">
                            <li className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                                <span><strong>Liability Coverage:</strong> Up to ₹10,00,000 for third-party injuries and property damage</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                                <span><strong>Personal Accident:</strong> Coverage for riders and drivers during the trip</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                                <span><strong>Vehicle Damage:</strong> Protection for driver vehicles during active trips</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Emergency Contact */}
            <section className="py-16 bg-secondary text-white">
                <div className="container mx-auto px-4 lg:px-16 max-w-4xl text-center">
                    <h2 className="text-4xl font-bold mb-6">Need Immediate Help?</h2>
                    <p className="text-xl text-gray-300 mb-8">
                        Our safety team is available 24/7 to assist you with any emergency or safety concern.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="tel:1800-123-4567" className="btn-primary px-8 py-4 rounded-lg font-bold text-lg inline-block">
                            Call Emergency: 1800-123-4567
                        </a>
                        <a href="/help" className="bg-white text-secondary px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors inline-block">
                            Visit Help Center
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
