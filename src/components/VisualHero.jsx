"use client";

import React from 'react';
import Image from 'next/image';

const VisualHero = () => {
    return (
        <div className="relative w-full h-full flex items-center justify-center perspective-1000 min-h-[400px]">
            {/* Glow Sphere */}
            <div className="absolute w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(255,81,26,0.15)_0%,transparent_70%)] blur-[40px] animate-pulse-slow"></div>

            {/* Floating Assets */}
            <div className="relative w-full h-full flex items-center justify-center">
                <div className="relative w-[90%] max-w-[500px] z-[2] animate-float-slow drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                    <Image
                        src="/assets/hero-cab.png"
                        alt="Premium Cab"
                        width={500}
                        height={300}
                        className="w-full h-auto"
                        priority
                    />
                </div>

                {/* Nodes */}
                <div className="absolute w-3 h-3 bg-primary rounded-full blur-[2px] shadow-[0_0_15px_var(--primary)] top-[20%] right-[10%] animate-float-delayed-1"></div>
                <div className="absolute w-3 h-3 bg-primary rounded-full blur-[2px] shadow-[0_0_15px_var(--primary)] bottom-[15%] left-[15%] animate-float-delayed-2"></div>
                <div className="absolute w-3 h-3 bg-primary rounded-full blur-[2px] shadow-[0_0_15px_var(--primary)] top-[50%] left-[5%] animate-float-delayed-3"></div>
            </div>

            <style jsx>{`
                .element {
                    /* Custom animations that are hard to do with just Tailwind utilities without config */
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(2deg); }
                }
                .animate-float-slow {
                    animation: float 6s ease-in-out infinite;
                }
                .animate-float-delayed-1 {
                     animation: float 4s ease-in-out infinite 1s;
                }
                .animate-float-delayed-2 {
                     animation: float 5s ease-in-out infinite 0.5s;
                }
                 .animate-float-delayed-3 {
                     animation: float 7s ease-in-out infinite 2s;
                }
                @keyframes pulse {
                    0% { transform: scale(1); opacity: 0.5; }
                    100% { transform: scale(1.2); opacity: 0.8; }
                }
                .animate-pulse-slow {
                    animation: pulse 8s infinite alternate;
                }
            `}</style>
        </div>
    );
};

export default VisualHero;
