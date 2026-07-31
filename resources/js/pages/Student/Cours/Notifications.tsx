// resources/js/pages/Student/Cours/Notifications.tsx
import {
    BellIcon,
    CheckCircleIcon,
    VideoCameraIcon,
    DocumentIcon,
    EyeIcon,
} from '@heroicons/react/24/outline';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

import StudentLayout from '@/Components/Layouts/StudentLayout';


interface Notification {
    id: number;
    cours_id: number;
    titre: string;
    description: string | null;
    video_url: string | null;
    video_title: string | null;
    is_read: boolean;
    created_at: string;
}

interface Props {
    notifications: Notification[];
    unreadCount: number;
}

export default function Notifications({ notifications, unreadCount }: Props) {
    const [loading, setLoading] = useState<number | null>(null);

    const handleMarkAsRead = (id: number) => {
        setLoading(id);
        router.post(`/student/cours/notifications/${id}/mark-read`, {}, {
            preserveScroll: true,
            onSuccess: () => {
                setLoading(null);
                router.reload();
            },
            onError: () => {
                setLoading(null);
            },
        });
    };

    const handleMarkAllAsRead = () => {
        router.post('/student/cours/notifications/mark-all-read', {}, {
            preserveScroll: true,
            onSuccess: () => {
                router.reload();
            },
        });
    };

    return (
        <>
            <Head title="Notifications - Étudiant" />

            <StudentLayout title="Notifications">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <BellIcon className="w-6 h-6 text-cab-blue" />
                            <h2 className="text-lg font-semibold text-gray-900">Notifications de cours</h2>
                            {unreadCount > 0 && (
                                <span className="px-2 py-0.5 bg-red-100 text-red-600 rounded-full text-xs font-medium">
                                    {unreadCount} non lue{unreadCount > 1 ? 's' : ''}
                                </span>
                            )}
                        </div>
                        {unreadCount > 0 && (
                            <button
                                onClick={handleMarkAllAsRead}
                                className="text-sm text-cab-blue hover:text-cab-dark font-medium transition-colors"
                            >
                                Tout marquer comme lu
                            </button>
                        )}
                    </div>
                </div>

                <div className="space-y-3">
                    {notifications.length === 0 ? (
                        <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
                            <BellIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500 text-sm">Aucune notification</p>
                            <p className="text-gray-400 text-xs mt-1">Les notifications de cours apparaîtront ici</p>
                        </div>
                    ) : (
                        notifications.map((notification) => (
                            <div
                                key={notification.id}
                                className={`bg-white rounded-2xl p-5 shadow-sm border transition-all ${
                                    notification.is_read ? 'border-gray-100' : 'border-cab-blue/30 bg-blue-50/30'
                                }`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                {notification.titre}
                                            </h3>
                                            {!notification.is_read && (
                                                <span className="w-2 h-2 rounded-full bg-cab-blue animate-pulse" />
                                            )}
                                        </div>
                                        {notification.description && (
                                            <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
                                        )}
                                        <div className="flex items-center gap-4 mt-2">
                                            <span className="text-xs text-gray-400">{notification.created_at}</span>
                                            {notification.video_url && (
                                                <span className="flex items-center gap-1 text-xs text-red-500">
                                                    <VideoCameraIcon className="w-4 h-4" />
                                                    Vidéo
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-3 mt-3">
                                            <Link
                                                href={`/student/cours/${notification.cours_id}`}
                                                className="inline-flex items-center gap-1 text-sm text-cab-blue hover:underline"
                                            >
                                                <EyeIcon className="w-4 h-4" />
                                                Voir le cours
                                            </Link>
                                            {!notification.is_read && (
                                                <button
                                                    onClick={() => handleMarkAsRead(notification.id)}
                                                    disabled={loading === notification.id}
                                                    className="text-sm text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
                                                >
                                                    {loading === notification.id ? '⏳' : 'Marquer comme lu'}
                                                </button>
                                            )}
                                            {notification.is_read && (
                                                <span className="text-xs text-green-600 flex items-center gap-1">
                                                    <CheckCircleIcon className="w-4 h-4" />
                                                    Lu
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </StudentLayout>
        </>
    );
}
