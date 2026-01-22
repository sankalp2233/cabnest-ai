"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { HelpCircle, Mail, Phone, MessageCircle, ChevronDown, ChevronUp, Search } from 'lucide-react';

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-200 last:border-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-4 px-6 flex justify-between items-center hover:bg-gray-50 transition-colors text-left"
            >
                <span className="font-semibold text-gray-900">{question}</span>
                {isOpen ? <ChevronUp className="w-5 h-5 text-primary" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
            </button>
            {isOpen && (
                <div className="px-6 pb-4 text-gray-600 animate-fade-in">
                    {answer}
                </div>
            )}
        </div>
    );
};

export default function HelpPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const faqs = [
        {
            question: "How do I book a ride?",
            answer: "Simply enter your pickup and destination locations in the booking widget on the home page, then click 'Request Now'. Make sure you're logged in to complete the booking."
        },
        {
            question: "What payment methods are accepted?",
            answer: "We accept all major credit/debit cards, UPI, digital wallets, and cash payments. You can manage your payment methods in your account settings."
        },
        {
            question: "How do I cancel a ride?",
            answer: "You can cancel a ride from the 'Your Rides' page before the driver arrives. Please note that cancellation fees may apply if you cancel after the driver has been assigned."
        },
        {
            question: "How is the fare calculated?",
            answer: "Fares are calculated based on distance, time, and current demand. You'll see an estimated fare before confirming your booking. The final fare may vary slightly based on the actual route taken."
        },
        {
            question: "Can I schedule a ride in advance?",
            answer: "Yes! Use the 'Reserve' tab in the booking widget to schedule a ride up to 30 days in advance. This is perfect for airport trips or important appointments."
        },
        {
            question: "What if I left something in the vehicle?",
            answer: "Contact our support team immediately with your ride details. We'll help you connect with your driver to retrieve your lost items."
        },
        {
            question: "How do I become a driver?",
            answer: "Visit the 'Drive' page and fill out the driver registration form. You'll need a valid driver's license, vehicle registration, and insurance. Our team will review your application within 2-3 business days."
        },
        {
            question: "Is my personal information safe?",
            answer: "Absolutely. We use industry-standard encryption to protect your data. Your payment information is never stored on our servers, and we never share your personal details with third parties without your consent."
        },
        {
            question: "What should I do in case of an emergency?",
            answer: "Use the emergency button in the app to contact local authorities and our safety team immediately. Your location will be automatically shared. You can also call our 24/7 emergency helpline at 1800-123-4567."
        },
        {
            question: "How do I update my account information?",
            answer: "Log in to your account and navigate to Settings. From there, you can update your name, email, phone number, payment methods, and other preferences."
        }
    ];

    const filteredFAQs = faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <main className="min-h-screen bg-white flex flex-col">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-16 bg-gradient-secondary text-white">
                <div className="container mx-auto px-4 lg:px-16 max-w-4xl">
                    <div className="flex items-center gap-4 mb-6">
                        <HelpCircle className="w-12 h-12 text-primary" />
                        <h1 className="text-5xl font-bold">Help Center</h1>
                    </div>
                    <p className="text-xl text-gray-300">
                        Find answers to common questions or get in touch with our support team.
                    </p>
                </div>
            </section>

            {/* Search Bar */}
            <section className="py-8 bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 lg:px-16 max-w-4xl">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search for help..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-lg focus:border-primary outline-none transition-colors text-lg"
                        />
                    </div>
                </div>
            </section>

            {/* FAQs */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 lg:px-16 max-w-4xl">
                    <h2 className="text-4xl font-bold mb-8">Frequently Asked Questions</h2>
                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                        {filteredFAQs.length > 0 ? (
                            filteredFAQs.map((faq, index) => (
                                <FAQItem key={index} question={faq.question} answer={faq.answer} />
                            ))
                        ) : (
                            <div className="p-8 text-center text-gray-500">
                                No results found for "{searchQuery}". Try different keywords or contact support.
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Contact Support */}
            <section className="py-16 bg-yellow-50">
                <div className="container mx-auto px-4 lg:px-16 max-w-6xl">
                    <h2 className="text-4xl font-bold mb-12 text-center">Contact Support</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-xl shadow-sm text-center card-hover">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Phone className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Call Us</h3>
                            <p className="text-gray-600 mb-4">Available 24/7 for urgent issues</p>
                            <a href="tel:1800-123-4567" className="text-primary font-semibold hover:text-primary-hover">
                                1800-123-4567
                            </a>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-sm text-center card-hover">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Mail className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Email Us</h3>
                            <p className="text-gray-600 mb-4">Response within 24 hours</p>
                            <a href="mailto:support@cabnest.com" className="text-primary font-semibold hover:text-primary-hover">
                                support@cabnest.com
                            </a>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-sm text-center card-hover">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MessageCircle className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Live Chat</h3>
                            <p className="text-gray-600 mb-4">Chat with our support team</p>
                            <button className="text-primary font-semibold hover:text-primary-hover">
                                Start Chat
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Help Topics */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 lg:px-16 max-w-4xl">
                    <h2 className="text-4xl font-bold mb-8">Quick Help Topics</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <a href="#" className="p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-yellow-50 transition-all">
                            <h3 className="font-semibold text-lg mb-1">Account Issues</h3>
                            <p className="text-sm text-gray-600">Login problems, password reset, account settings</p>
                        </a>
                        <a href="#" className="p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-yellow-50 transition-all">
                            <h3 className="font-semibold text-lg mb-1">Payment Problems</h3>
                            <p className="text-sm text-gray-600">Failed payments, refunds, billing questions</p>
                        </a>
                        <a href="#" className="p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-yellow-50 transition-all">
                            <h3 className="font-semibold text-lg mb-1">Ride Issues</h3>
                            <p className="text-sm text-gray-600">Cancellations, driver problems, route concerns</p>
                        </a>
                        <a href="#" className="p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-yellow-50 transition-all">
                            <h3 className="font-semibold text-lg mb-1">Driver Support</h3>
                            <p className="text-sm text-gray-600">Earnings, vehicle requirements, driver app help</p>
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
