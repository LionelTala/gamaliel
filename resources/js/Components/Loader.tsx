// resources/js/Components/Loader.tsx
import { useState, useEffect } from 'react';

const Loader = () => {
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        let value = 0;
        const interval = setInterval(() => {
            value += Math.random() * 18;
            if (value >= 100) {
                value = 100;
                clearInterval(interval);
                setTimeout(() => setIsVisible(false), 350);
            }
            setProgress(Math.min(value, 100));
        }, 180);

        return () => clearInterval(interval);
    }, []);

    if (!isVisible) return null;

    // Anneau SVG — circonférence fixe, on anime juste le décalage du trait
    const radius = 42;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-gamaliel-navy-deep transition-opacity duration-500"
            style={{ opacity: progress >= 100 ? 0 : 1, pointerEvents: progress >= 100 ? 'none' : 'auto' }}
        >
            {/* Halos décoratifs — cohérents avec Hero / Login */}
            <div className="pointer-events-none absolute -top-24 -left-16 w-80 h-80 rounded-full bg-gamaliel-green/15 blur-[100px]" />
            <div className="pointer-events-none absolute -bottom-24 -right-16 w-80 h-80 rounded-full bg-gamaliel-orange/20 blur-[100px]" />

            <div className="relative text-center px-8">
                {/* Logo entouré d'un anneau de progression circulaire */}
                <div className="relative w-28 h-28 mx-auto mb-7">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                        {/* Piste de fond */}
                        <circle
                            cx="50"
                            cy="50"
                            r={radius}
                            fill="none"
                            stroke="rgba(255,255,255,0.1)"
                            strokeWidth="4"
                        />
                        {/* Trait de progression — dégradé orange -> rouge */}
                        <circle
                            cx="50"
                            cy="50"
                            r={radius}
                            fill="none"
                            stroke="url(#gamaliel-loader-gradient)"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={offset}
                            style={{ transition: 'stroke-dashoffset 0.3s ease-out' }}
                        />
                        <defs>
                            <linearGradient id="gamaliel-loader-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#FD7D0F" />
                                <stop offset="100%" stopColor="#E13A4B" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Logo au centre de l'anneau */}
                    <div className="absolute inset-[10px] rounded-full bg-white flex items-center justify-center overflow-hidden shadow-lg">
                        <img
                            src="/assets/images/logo.png"
                            alt="Institut Gamaliel"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Pourcentage au centre-bas, discret */}
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[11px] font-semibold text-white/40 tabular-nums">
                        {Math.round(progress)}%
                    </span>
                </div>

                <p className="mt-8 text-sm text-white/60 font-medium tracking-wide">
                    Institut de Formation Professionnelle Gamaliel
                </p>
            </div>
        </div>
    );
};

export default Loader;
