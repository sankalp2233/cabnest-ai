import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
    return (
        <footer className="bg-secondary text-white pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="mb-12">
                    <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity w-fit">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-primary/10">
                            <Image
                                src="/logo.jpg"
                                alt="CabNest Logo"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <span className="text-2xl font-normal tracking-tight hover:text-primary transition-colors">
                            CabNest
                        </span>
                    </Link>
                    <Link href="/help">
                        <p className="mt-4 text-sm hover:underline cursor-pointer hover:text-primary transition-colors">Visit Help Center</p>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    <div>
                        <h4 className="font-medium mb-4">Company</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="#" className="hover:text-primary transition-colors">About us</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Our offerings</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Newsroom</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Investors</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Blog</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">AI Research</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-medium mb-4">Products</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="/" className="hover:text-primary transition-colors">Ride</Link></li>
                            <li><Link href="/drive" className="hover:text-primary transition-colors">Drive</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Deliver</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Eat</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">CabNest for Business</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-medium mb-4">Global citizenship</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="/safety" className="hover:text-primary transition-colors">Safety</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Diversity and Inclusion</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Sustainability</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-medium mb-4">Travel</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="#" className="hover:text-primary transition-colors">Reserve</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Airports</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Cities</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-700 pt-8 mt-8 text-xs text-gray-500">
                    <div className="flex gap-4 mb-4 md:mb-0">
                        <span>© 2026 CabNest Technologies Inc.</span>
                    </div>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-primary transition-colors">Privacy</Link>
                        <Link href="#" className="hover:text-primary transition-colors">Accessibility</Link>
                        <Link href="#" className="hover:text-primary transition-colors">Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;


