// resources/js/Components/Layouts/StudentLayout.tsx
import {
    HomeIcon,
    BookOpenIcon,
    ClipboardDocumentListIcon,
    ChartBarIcon,
    UserIcon,
    ArrowLeftOnRectangleIcon,
    Bars3Icon,
    XMarkIcon,
    ChevronDownIcon,
} from '@heroicons/react/24/outline';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

import NotificationBell from '@/Components/Notifications/NotificationBell';
import ToastContainer from '@/Components/UI/ToastContainer';
import type { SharedPageProps } from '@/types';

interface StudentLayoutProps {
    children: React.ReactNode;
    title?: string;
}

const StudentLayout = ({ children, title = 'Tableau de bord' }: StudentLayoutProps) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const { props, url } = usePage<SharedPageProps>();
    const user = props.auth?.user ?? null;

    const coursCount = props.unreadCountsByType?.['cours'] ?? 0;
    const devoirCount = props.unreadCountsByType?.['devoir'] ?? 0;
    const evaluationCount = props.unreadCountsByType?.['evaluation'] ?? 0;

    const menuItems: {
        label: string;
        href: string;
        icon: React.ReactNode;
        badge?: number;
    }[] = [
        { label: 'Tableau de bord', href: '/student/dashboard', icon: <HomeIcon className="w-5 h-5" /> },
        { label: 'Mes cours', href: '/student/cours', icon: <BookOpenIcon className="w-5 h-5" />, badge: coursCount },
        { label: 'Mes devoirs', href: '/student/devoirs', icon: <ClipboardDocumentListIcon className="w-5 h-5" />, badge: devoirCount },
        { label: 'Mes évaluations', href: '/student/evaluations', icon: <ChartBarIcon className="w-5 h-5" />, badge: evaluationCount },
        { label: 'Mon profil', href: '/profil', icon: <UserIcon className="w-5 h-5" /> },
    ];

    const getUserInitials = (user: typeof props.auth.user) => {
        if (!user) return '?';
        return user.name?.charAt(0)?.toUpperCase() || '?';
    };

    return (
        <div className="min-h-screen bg-gamaliel-paper">
            <ToastContainer />

            {/* Navbar Student */}
            <nav className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gamaliel-navy/10">
                <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="lg:hidden p-2 rounded-lg hover:bg-gamaliel-navy/5"
                        >
                            {isSidebarOpen ? (
                                <XMarkIcon className="w-6 h-6 text-gamaliel-navy/70" />
                            ) : (
                                <Bars3Icon className="w-6 h-6 text-gamaliel-navy/70" />
                            )}
                        </button>

                        <Link href="/student/dashboard" className="flex items-center gap-2">
                            <img
                                src="/assets/images/logo.png"
                                alt="Institut Gamaliel"
                                className="h-8 w-8 rounded-lg object-cover"
                            />
                            <span className="text-lg font-bold text-gamaliel-navy-deep hidden sm:block">
                                Gamaliel <span className="text-gamaliel-orange">Étudiant</span>
                            </span>
                        </Link>
                    </div>

                    <div className="flex items-center gap-2">
                        <NotificationBell />

                        {/* User Menu */}
                        <div className="relative">
                            <button
                                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gamaliel-navy/5 transition-colors"
                            >
                                <div className="w-8 h-8 rounded-full bg-gamaliel-navy-deep text-white flex items-center justify-center text-sm font-semibold">
                                    {getUserInitials(user)}
                                </div>
                                <span className="text-sm font-medium text-gamaliel-navy/80 hidden sm:block">
                                    {user?.name || 'Étudiant'}
                                </span>
                                <ChevronDownIcon className="w-4 h-4 text-gamaliel-navy/40" />
                            </button>

                            {isUserMenuOpen && user && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gamaliel-navy/10 py-1 z-50">
                                    <div className="px-4 py-2 border-b border-gamaliel-navy/10">
                                        <p className="text-sm font-medium text-gamaliel-navy-deep">{user.name}</p>
                                        <p className="text-xs text-gamaliel-navy/50">{user.email}</p>
                                    </div>
                                    <Link
                                        href="/student/profil"
                                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gamaliel-navy/70 hover:bg-gamaliel-navy/5 transition-colors"
                                        onClick={() => setIsUserMenuOpen(false)}
                                    >
                                        <UserIcon className="w-4 h-4" />
                                        Mon profil
                                    </Link>
                                    <Link
                                        href="/logout"
                                        method="post"
                                        as="button"
                                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gamaliel-red hover:bg-gamaliel-red/10 transition-colors"
                                    >
                                        <ArrowLeftOnRectangleIcon className="w-4 h-4" />
                                        Déconnexion
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Sidebar */}
            <aside
                className={`
                    fixed top-16 left-0 bottom-0 z-30 w-64 bg-white border-r border-gamaliel-navy/10
                    transition-transform duration-300 ease-in-out overflow-hidden
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    lg:translate-x-0
                `}
            >
                <nav className="h-full overflow-y-auto p-4 space-y-1 pb-24">
                    {menuItems.map((item) => {
                        const isActive = url === item.href || url.startsWith(item.href + '/');

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`
                                    flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium
                                    transition-colors duration-200
                                    ${isActive
                                        ? 'bg-gamaliel-navy-deep text-white'
                                        : 'text-gamaliel-navy/70 hover:bg-gamaliel-navy/5 hover:text-gamaliel-navy-deep'
                                    }
                                `}
                            >
                                {item.icon}
                                <span className="flex-1">{item.label}</span>
                                {!!item.badge && item.badge > 0 && (
                                    <span
                                        className="text-xs font-bold rounded-full px-2 py-0.5"
                                        style={
                                            isActive
                                                ? { backgroundColor: '#fff', color: '#153B62' }
                                                : { background: 'linear-gradient(135deg, #FD7D0F, #E13A4B)', color: '#fff' }
                                        }
                                    >
                                        {item.badge > 9 ? '9+' : item.badge}
                                    </span>
                                )}
                            </Link>
                        );
                    })}

                    <div className="pt-4 mt-4 border-t border-gamaliel-navy/10">
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-medium text-gamaliel-red hover:bg-gamaliel-red/10 transition-colors"
                        >
                            <ArrowLeftOnRectangleIcon className="w-5 h-5" />
                            Déconnexion
                        </Link>
                    </div>
                </nav>
            </aside>

            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-20 bg-gamaliel-navy-deep/50 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <main className="lg:ml-64 pt-16">
                <div className="p-4 md:p-6">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-gamaliel-navy-deep">{title}</h1>
                        <p className="text-sm text-gamaliel-navy/50">Bienvenue sur votre espace étudiant</p>
                    </div>
                    {children}
                </div>
            </main>
        </div>
    );
};

export default StudentLayout;
