import { useEffect, useState } from 'react';
import { router } from '@inertiajs/react';
import { uploadState } from '@/lib/uploadState';

const PageLoader = () => {
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        const handleStart = () => {
            // Ne s'affiche pas si un upload lourd est en cours
            if (uploadState.active) return;

            timer = setTimeout(() => {
                setLoading(true);
                requestAnimationFrame(() => setVisible(true));
            }, 150);
        };

        const handleFinish = () => {
            clearTimeout(timer);
            setVisible(false);
            setTimeout(() => setLoading(false), 300);
        };

        const handleUploadStateChange = (e: Event) => {
            const isUploading = (e as CustomEvent).detail;
            if (isUploading) {
                clearTimeout(timer);
                setVisible(false);
                setLoading(false);
            }
        };

        window.addEventListener('upload-state-change', handleUploadStateChange as EventListener);

        const removeStart = router.on('start', handleStart);
        const removeFinish = router.on('finish', handleFinish);
        const removeError = router.on('error', handleFinish);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('upload-state-change', handleUploadStateChange as EventListener);
            removeStart();
            removeFinish();
            removeError();
        };
    }, []);

    if (!loading) return null;

    return (
        <div
            className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gamaliel-navy-deep/70 backdrop-blur-md transition-opacity duration-300 ease-in-out ${
                visible ? 'opacity-100' : 'opacity-0'
            }`}
        >
            <div
                className={`relative flex flex-col items-center justify-center px-9 py-8 bg-white rounded-[1.75rem] shadow-2xl border border-white/10 transition-all duration-300 ${
                    visible ? 'scale-100' : 'scale-95'
                }`}
            >
                {/* Anneau — deux tons de vert (pas un simple spin bleu uniforme) */}
                <div className="relative w-16 h-16 mb-5">
                    <div className="absolute inset-0 rounded-full border-4 border-gamaliel-green/15" />
                    <div
                        className="absolute inset-0 rounded-full border-4 border-transparent animate-spin"
                        style={{
                            borderTopColor: '#9FE515',   // gamaliel-green (vif)
                            borderRightColor: '#6FA30E', // gamaliel-green-deep
                            animationDuration: '0.9s',
                        }}
                    />
                    {/* Logo miniature au centre de l'anneau */}
                    <div className="absolute inset-[6px] rounded-full overflow-hidden bg-white flex items-center justify-center shadow-inner">
                        <img
                            src="/assets/images/logo.png"
                            alt="Institut Gamaliel"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                <p className="font-display text-sm font-bold text-gamaliel-navy-deep tracking-wide">
                    Chargement...
                </p>
                <p className="text-[11px] text-gamaliel-navy/45 mt-1 tracking-wide">
                    Institut Gamaliel
                </p>

                {/* Trois points respirant en vert — remplace le simple "..." pulsé de CAB */}
                <div className="flex items-center gap-1.5 mt-3">
                    {[0, 1, 2].map((i) => (
                        <span
                            key={i}
                            className="w-1.5 h-1.5 rounded-full bg-gamaliel-green-deep"
                            style={{
                                animation: 'gamaliel-loader-bounce 1s ease-in-out infinite',
                                animationDelay: `${i * 0.15}s`,
                            }}
                        />
                    ))}
                </div>
            </div>

            <style>{`
                @keyframes gamaliel-loader-bounce {
                    0%, 80%, 100% { transform: translateY(0); opacity: 0.35; }
                    40% { transform: translateY(-4px); opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default PageLoader;