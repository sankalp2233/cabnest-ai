import React from 'react';

const VisualHero = () => {
    return (
        <div className="visual-hero">
            <div className="glow-sphere"></div>
            <div className="floating-assets">
                <img
                    src="/assets/hero-cab.png"
                    alt="Premium Cab"
                    className="hero-cab"
                />
                <div className="node node-1"></div>
                <div className="node node-2"></div>
                <div className="node node-3"></div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        .visual-hero {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1000px;
        }

        .glow-sphere {
          position: absolute;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(255, 81, 26, 0.15) 0%, transparent 70%);
          filter: blur(40px);
          animation: pulse 8s infinite alternate;
        }

        .hero-cab {
          width: 90%;
          max-width: 500px;
          height: auto;
          filter: drop-shadow(0 20px 50px rgba(0,0,0,0.5));
          animation: float 6s ease-in-out infinite;
          z-index: 2;
        }

        .node {
          position: absolute;
          width: 12px;
          height: 12px;
          background: var(--primary);
          border-radius: 50%;
          filter: blur(2px);
          box-shadow: 0 0 15px var(--primary);
        }

        .node-1 { top: 20%; right: 10%; animation: float 4s ease-in-out infinite 1s; }
        .node-2 { bottom: 15%; left: 15%; animation: float 5s ease-in-out infinite 0.5s; }
        .node-3 { top: 50%; left: 5%; animation: float 7s ease-in-out infinite 2s; }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }

        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(1.2); opacity: 0.8; }
        }
      `}} />
        </div>
    );
};

export default VisualHero;
