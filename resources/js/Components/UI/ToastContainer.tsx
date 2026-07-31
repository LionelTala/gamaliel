// resources/js/Components/UI/ToastContainer.tsx
import { usePage } from '@inertiajs/react';
import { useEffect, useState, useRef } from 'react';

interface ToastData {
    message: string;
    type: 'success' | 'error';
    duration?: number;
}

const ToastContainer = () => {
    const [toastData, setToastData] = useState<ToastData | null>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const { props } = usePage();
    const flash = props.flash as { success?: string; error?: string };

    const showToast = (message: string, type: 'success' | 'error', duration = 5000) => {
        if (timerRef.current) clearTimeout(timerRef.current);
        setToastData({ message, type, duration });
        timerRef.current = setTimeout(() => setToastData(null), duration);
    };


    useEffect(() => {
        if (flash?.success) {
            showToast(flash.success, 'success');
        } else if (flash?.error) {
            showToast(flash.error, 'error');
        }
    }, [flash]);

    useEffect(() => {
        const handler = (e: Event) => {
            const detail = (e as CustomEvent<ToastData>).detail;
            showToast(detail.message, detail.type ?? 'success', detail.duration);
        };
        window.addEventListener('app-toast', handler);
        return () => window.removeEventListener('app-toast', handler);
    }, []);

    if (!toastData) return null;

    return (
        <div className="fixed top-20 right-4 z-50 max-w-md w-full">
            <div className={`rounded-lg shadow-lg p-4 border-l-4 ${
                toastData.type === 'success'
                    ? 'bg-green-50 border-green-500 text-green-800'
                    : 'bg-red-50 border-red-500 text-red-800'
            }`}>
                <div className="flex items-start gap-3">
                    <span className="text-xl">
                        {toastData.type === 'success' ? '🔔' : '❌'}
                    </span>
                    <div className="flex-1 text-sm">{toastData.message}</div>
                    <button
                        onClick={() => setToastData(null)}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        ✕
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ToastContainer;
