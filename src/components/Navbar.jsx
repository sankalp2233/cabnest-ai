"use client";


import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { User } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';


const Navbar = () => {
    const { user, logout } = useAuth();
    const pathname = usePathname();

    const isActive = (path) => pathname === path;

    return (
        <nav className="fixed top-0 w-full z-50 bg-secondary text-white h-16 flex items-center px-4 lg:px-16 transition-all duration-300 shadow-dark">
            <div className="flex items-center gap-8 h-full">
                <Link href="/" className="flex items-center gap-3 mr-4 hover:opacity-80 transition-opacity">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-primary/10">
                        <Image
                            src="/logo.jpg"
                            alt="CabNest Logo"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <span className="text-2xl font-normal tracking-tight hover:text-primary transition-colors">
                        CabNest
                    </span>
                </Link>
                <div className="hidden md:flex items-center gap-6 text-sm font-medium">
                    <Link
                        href="/drive"
                        className={`hover:text-primary transition-colors ${isActive('/drive') ? 'text-primary font-semibold' : ''}`}
                    >
                        Drive
                    </Link>
                    {user && (
                        <Link
                            href="/rides"
                            className={`hover:text-primary transition-colors ${isActive('/rides') ? 'text-primary font-semibold' : ''}`}
                        >
                            Your Rides
                        </Link>
                    )}
                    <Link
                        href="/safety"
                        className={`hover:text-primary transition-colors ${isActive('/safety') ? 'text-primary font-semibold' : ''}`}
                    >
                        Safety
                    </Link>
                    <Link
                        href="/help"
                        className={`hover:text-primary transition-colors ${isActive('/help') ? 'text-primary font-semibold' : ''}`}
                    >
                        Help
                    </Link>
                </div>
            </div>

            <div className="flex-1"></div>

            <div className="flex items-center gap-4 text-sm font-medium">
                <Link href="#" className="hidden md:block hover:text-primary transition-colors">
                    EN
                </Link>

                {user ? (
                    <>
                        <div className="flex items-center gap-2 text-gray-300">
                            <User className="w-4 h-4" />
                            <span>{user.name}</span>
                        </div>
                        <button
                            onClick={logout}
                            className="bg-white text-secondary px-4 py-2 rounded-full hover:bg-primary hover:text-secondary transition-all duration-300 font-semibold"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link href="/login" className="hover:text-primary transition-colors">
                            Log in
                        </Link>
                        <Link href="/signup" className="bg-primary text-secondary px-4 py-2 rounded-full hover:bg-primary-hover transition-all duration-300 font-semibold">
                            Sign up
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};


export default Navbar;
