// resources/js/Components/Notifications/NotificationDropdown.tsx
import { CheckIcon } from '@heroicons/react/24/outline';
import { Link, router } from '@inertiajs/react';

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

interface Props {
    notifications: NotificationItem[];
    onMarkAsRead: (id: number) => void;
    onMarkAllAsRead: () => void;
    onClose: () => void;
}

const NotificationDropdown = ({
    notifications = [],
    onMarkAsRead,
    onMarkAllAsRead,
    onClose,
}: Props) => {
    const list = notifications ?? [];

    const handleClick = (notification: NotificationItem) => {
        if (!notification.read_at) {
            router.post(`/notifications/${notification.id}/read`, {}, { preserveScroll: true });
            onMarkAsRead(notification.id);
        }
        onClose();
    };

    const handleMarkAllAsRead = () => {
        router.post('/notifications/read-all', {}, { preserveScroll: true });
        onMarkAllAsRead();
    };

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case 'candidature': return '📝';
            case 'cours': return '📚';
            case 'devoir': return '📄';
            case 'evaluation': return '📊';
            case 'message': return '💬';
            default: return '🔔';
        }
    };

    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'candidature': return 'Candidature';
            case 'cours': return 'Cours';
            case 'devoir': return 'Devoir';
            case 'evaluation': return 'Évaluation';
            case 'message': return 'Message';
            default: return 'Info';
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'candidature': return 'bg-blue-100 text-blue-700';
            case 'cours': return 'bg-green-100 text-green-700';
            case 'devoir': return 'bg-orange-100 text-orange-700';
            case 'evaluation': return 'bg-purple-100 text-purple-700';
            case 'message': return 'bg-pink-100 text-pink-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-100 z-50 max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 sticky top-0 bg-white">
                <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                {list.some((n) => !n.read_at) && (
                    <button
                        onClick={handleMarkAllAsRead}
                        className="text-xs text-cab-blue hover:text-cab-dark flex items-center gap-1"
                    >
                        <CheckIcon className="w-4 h-4" />
                        Tout marquer comme lu
                    </button>
                )}
            </div>

            {list.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-8">Aucune notification</p>
            ) : (
                <div className="divide-y divide-gray-100">
                    {list.map((notification) => (
                        <Link
                            key={notification.id}
                            href={notification.link || '#'}
                            onClick={() => handleClick(notification)}
                            className={`block px-4 py-3 hover:bg-gray-50 transition-colors ${
                                !notification.read_at ? 'bg-blue-50/50' : ''
                            }`}
                        >
                            <div className="flex items-start gap-2">
                                {!notification.read_at && (
                                    <span className="w-2 h-2 mt-1.5 rounded-full bg-cab-blue flex-shrink-0" />
                                )}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm">{getNotificationIcon(notification.type)}</span>
                                        <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${getTypeColor(notification.type)}`}>
                                            {getTypeLabel(notification.type)}
                                        </span>
                                        {notification.data?.cours_type && (
                                            <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
                                                notification.data.cours_type === 'vague'
                                                    ? 'bg-blue-100 text-blue-700'
                                                    : 'bg-purple-100 text-purple-700'
                                            }`}>
                                                {notification.data.cours_type === 'vague' ? 'Vague' : 'Certification'}
                                            </span>
                                        )}
                                    </div>

                                    <p className="text-sm font-medium text-gray-900 mt-1">
                                        {notification.title}
                                    </p>

                                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                                        {notification.message}
                                    </p>

                                    {notification.data?.video_url && (

                                        <a    href={notification.data.video_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="inline-flex items-center gap-1 text-xs text-cab-blue hover:underline mt-1"
                                        >
                                            ▶️ {notification.data.video_title || 'Voir la vidéo'}
                                        </a>
                                    )}

                                    <p className="text-xs text-gray-400 mt-1">
                                        {notification.created_at}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NotificationDropdown;

