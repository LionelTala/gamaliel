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
        nom?: string;
        telephone?: string;
    };
}

interface PageProps {
    unreadNotificationsCount: number;
    auth?: { user?: { id: number; role?: string } };
}

// Rôles pouvant recevoir les notifications globales (contact, etc.)
// — garde côté front cohérente avec isAdmin() et routes/channels.php
const ADMIN_ROLES = ['super_admin', 'admin_centre', 'admin'];

const NotificationBell = () => {
    const { props } = usePage<PageProps>();
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState<NotificationItem[]>([]);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const unreadCount = props.unreadNotificationsCount ?? 0;
    const userId = props.auth?.user?.id;
    const userRole = props.auth?.user?.role;
    const isAdmin = !!userRole && ADMIN_ROLES.includes(userRole);

    // Handler commun aux deux canaux — évite de dupliquer la logique
    const handleIncomingNotification = (data: NotificationItem) => {
        setNotifications((prev) => {
            if ((prev ?? []).some((n) => n.id === data.id)) return prev;
            return [data, ...(prev ?? [])];
        });

        const emoji = data.type === 'contact' ? '✉️' : '📚';
        showToast(`${emoji} ${data.title} — ${data.message}`, 'success', 10000);

        router.reload({ only: ['unreadNotificationsCount'] });
    };

    useEffect(() => {
        if (!window.Echo || !userId) return;

        // Canal individuel — inchangé
        const userChannelName = `user.${userId}`;
        const userChannel = window.Echo.private(userChannelName);
        userChannel.listen('.notification.created', handleIncomingNotification);

        // Canal partagé "admins" — uniquement pour les rôles habilités
        let adminsChannel: ReturnType<typeof window.Echo.private> | null = null;
        if (isAdmin) {
            adminsChannel = window.Echo.private('admins');
            adminsChannel.listen('.notification.created', handleIncomingNotification);
        }

        return () => {
            try {
                window.Echo.leave(userChannelName);
                if (isAdmin) window.Echo.leave('admins');
            } catch {
                // Gestion silencieuse
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isAdmin]);

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
                className="relative p-2 rounded-lg hover:bg-gamaliel-navy/5 transition-colors"
            >
                <BellIcon className="w-6 h-6 text-gamaliel-navy/60" />
                {unreadCount > 0 && (
                    <span
                        className="absolute -top-1 -right-1 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                        style={{ backgroundColor: '#E13A4B' }}
                    >
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <NotificationDropdown
                    notifications={notifications}
                    onMarkAsRead={(id) => {
                        setNotifications((prev) => (prev ?? []).filter((n) => n.id !== id));
                        router.reload({ only: ['unreadNotificationsCount'] });
                    }}
                    onMarkAllAsRead={() => {
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