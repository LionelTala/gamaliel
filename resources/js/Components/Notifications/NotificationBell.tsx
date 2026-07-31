import { BellIcon } from '@heroicons/react/24/outline';
import { usePage, router } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import NotificationDropdown from './NotificationDropdown';
import { showToast } from '@/lib/toast';

interface NotificationItem {
    id: number;
    type: string;
    title: string;
    message: string;
    link: string | null;
    created_at: string;
    read_at: string | null;
    data?: {
        video_url?: string;
        video_title?: string;
        has_video?: boolean;
        has_files?: boolean;
        cours_type?: string;
    };
}

interface PageProps {
    unreadNotificationsCount: number;
    auth?: { user?: { id: number } };
}

const NotificationBell = () => {
    const { props } = usePage<PageProps>();
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState<NotificationItem[]>([]);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const unreadCount = props.unreadNotificationsCount ?? 0;
    const userId = props.auth?.user?.id;

    useEffect(() => {
        if (!window.Echo || !userId) return;

        const channelName = `user.${userId}`;
        const channel = window.Echo.private(channelName);

        channel.listen('.notification.created', (data: NotificationItem) => {
            // ✅ Une nouvelle notification arrive forcément non lue, on l'ajoute en tête
            setNotifications((prev) => {
                if ((prev ?? []).some((n) => n.id === data.id)) return prev;
                return [data, ...(prev ?? [])];
            });

            showToast(`📚 ${data.title} — ${data.message}`, 'success', 10000);

            router.reload({ only: ['unreadNotificationsCount'] });
        });

        return () => {
            try {
                window.Echo.leave(channelName);
            } catch {
                // Gestion silencieuse
            }
        };
    }, [userId]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const fetchNotifications = async () => {
        try {
            const res = await fetch('/notifications', {
                headers: { Accept: 'application/json' },
            });

            if (!res.ok) {
                setNotifications([]);
                return;
            }

            const data = await res.json();
            // Le backend renvoie directement un tableau
            setNotifications(Array.isArray(data) ? data : (Array.isArray(data?.notifications) ? data.notifications : []));
        } catch {
            setNotifications([]);
        }
    };

    const toggleDropdown = () => {
        if (!isOpen) fetchNotifications();
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={toggleDropdown}
                className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
                <BellIcon className="w-6 h-6 text-gray-600" />
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-cab-red text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <NotificationDropdown
                    notifications={notifications}
                    onMarkAsRead={(id) => {
                        // ✅ Retire l'item de la liste au lieu de juste marquer read_at
                        setNotifications((prev) => (prev ?? []).filter((n) => n.id !== id));
                        router.reload({ only: ['unreadNotificationsCount'] });
                    }}
                    onMarkAllAsRead={() => {
                        // ✅ Vide complètement la liste
                        setNotifications([]);
                        router.reload({ only: ['unreadNotificationsCount'] });
                    }}
                    onClose={() => setIsOpen(false)}
                />
            )}
        </div>
    );
};

export default NotificationBell;