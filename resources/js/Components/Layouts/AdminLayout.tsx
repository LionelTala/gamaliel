import {
    HomeIcon,
    UserGroupIcon,
    AcademicCapIcon,
    BookOpenIcon,
    CalendarIcon,
    ClipboardDocumentListIcon,
    ArrowLeftOnRectangleIcon,
    Bars3Icon,
    XMarkIcon,
    ChevronDownIcon,
    ChartBarIcon,
    PhotoIcon,
    UserIcon,
    EyeIcon,
    BanknotesIcon,
    CreditCardIcon,
    Cog6ToothIcon,
    ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';
import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import NotificationBell from '@/Components/Notifications/NotificationBell';
import ToastContainer from '@/Components/UI/ToastContainer';
import type { SharedPageProps } from '@/types';

interface AdminLayoutProps {
    children: React.ReactNode;
    title?: string;
}

interface MenuItem {
    label: string;
    href: string;
    icon: React.ReactNode;
    badge?: number;
}

interface MenuGroup {
    title: string;
    icon: React.ReactNode;
    items: MenuItem[];
    badgeCount?: number;
}

const COLORS = {
    navy: '#153B62',
    navyDeep: '#0D2844',
    navyMuted: 'rgba(21,59,98,0.7)',
    navyFaint: 'rgba(21,59,98,0.5)',
    navyBorder: 'rgba(21,59,98,0.1)',
    navySoftBg: 'rgba(21,59,98,0.05)',
    green: '#6FA30E',
    red: '#E13A4B',
    paper: '#FAFAF8',
    white: '#FFFFFF',
};

const AdminLayout = ({ children, title = 'Tableau de bord' }: AdminLayoutProps) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const { props, url } = usePage<SharedPageProps>();
    const user = props.auth?.user ?? null;
    const devoirCount = props.unreadCountsByType?.['devoir'] ?? 0;
    const candidatureCount = props.unreadCountsByType?.['candidature'] ?? 0;
    const evaluationCount = props.unreadCountsByType?.['evaluation'] ?? 0;
    const contactCount = props.unreadCountsByType?.['contact'] ?? 0;
    const preInscriptionCount = props.unreadCountsByType?.['pre_inscription'] ?? 0;

    const canManageUsers = user?.role === 'super_admin' || user?.role === 'admin_centre';

    const menuGroups: MenuGroup[] = [
        {
            title: 'Gestion du Site',
            icon: <Cog6ToothIcon className="w-5 h-5" />,
            badgeCount: contactCount,
            items: [
                { label: 'Statistiques visites', href: '/admin/stats-visites', icon: <EyeIcon className="w-4 h-4" /> },
                { label: 'Galerie', href: '/admin/galerie', icon: <PhotoIcon className="w-4 h-4" /> },
                { label: 'Activités', href: '/admin/activites', icon: <CalendarIcon className="w-4 h-4" /> },
                { label: 'Messages de contact', href: '/admin/contacts', icon: <ChatBubbleLeftRightIcon className="w-4 h-4" />, badge: contactCount },
            ],
        },
        {
            title: 'Inscriptions',
            icon: <ClipboardDocumentListIcon className="w-5 h-5" />,
            badgeCount: candidatureCount + preInscriptionCount, 
            items: [
                { label: 'Pré-inscriptions', href: '/admin/pre-inscriptions', icon: <ClipboardDocumentListIcon className="w-4 h-4" />, badge: preInscriptionCount },
                { label: 'Candidatures', href: '/admin/candidatures', icon: <ClipboardDocumentListIcon className="w-4 h-4" />, badge: candidatureCount },
            ],
        },
        {
            title: 'Gestion Académique',
            icon: <AcademicCapIcon className="w-5 h-5" />,
            badgeCount: devoirCount + evaluationCount,
            items: [
                { label: 'Formations', href: '/admin/formations', icon: <AcademicCapIcon className="w-4 h-4" /> },
                { label: 'Vagues', href: '/admin/vagues', icon: <CalendarIcon className="w-4 h-4" /> },
                { label: 'Étudiants', href: '/admin/students', icon: <UserGroupIcon className="w-4 h-4" /> },
                { label: 'Cours', href: '/admin/cours', icon: <BookOpenIcon className="w-4 h-4" /> },
                { label: 'Devoirs', href: '/admin/devoirs', icon: <ClipboardDocumentListIcon className="w-4 h-4" />, badge: devoirCount },
                { label: 'Évaluations', href: '/admin/evaluations', icon: <ChartBarIcon className="w-4 h-4" />, badge: evaluationCount },
            ],
        },
        {
            title: 'Finance',
            icon: <BanknotesIcon className="w-5 h-5" />,
            items: [
                { label: 'Tranches', href: '/admin/tranches', icon: <BanknotesIcon className="w-4 h-4" /> },
                { label: 'Paiements', href: '/admin/paiements', icon: <CreditCardIcon className="w-4 h-4" /> },
            ],
        },
    ];

    const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

    useEffect(() => {
        const activeState: Record<string, boolean> = {};
        menuGroups.forEach((group) => {
            const hasActiveChild = group.items.some((item) => url === item.href || url.startsWith(item.href + '/'));
            if (hasActiveChild) {
                activeState[group.title] = true;
            }
        });
        setOpenGroups((prev) => ({ ...prev, ...activeState }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]);

    const toggleGroup = (title: string) => {
        setOpenGroups((prev) => ({ ...prev, [title]: !prev[title] }));
    };

    const getUserInitials = (user: typeof props.auth.user) => {
        if (!user) return '?';
        return user.name.charAt(0).toUpperCase();
    };

    const getRoleLabel = (role?: string) => {
        const labels: Record<string, string> = {
            super_admin: 'Super Administrateur',
            admin_centre: 'Admin Centre',
            admin: 'Administrateur',
            student_online: 'Étudiant en ligne',
        };
        return role ? labels[role] || role : '';
    };

    return (
        <div className="min-h-screen" style={{ backgroundColor: COLORS.paper }}>
            <ToastContainer />

            {/* Navbar Admin */}
            <nav
                className="fixed top-0 left-0 right-0 z-40 border-b"
                style={{ backgroundColor: COLORS.white, borderColor: COLORS.navyBorder }}
            >
                <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="lg:hidden p-2 rounded-lg transition-colors"
                            style={{ color: COLORS.navyMuted }}
                        >
                            {isSidebarOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
                        </button>

                        <Link href="/admin/dashboard" className="flex items-center gap-2">
                            <img
                                src="/assets/images/logo.png"
                                alt="Institut Gamaliel"
                                className="h-8 w-8 rounded-lg object-cover"
                            />
                            <span className="text-lg font-bold hidden sm:block" style={{ color: COLORS.navyDeep }}>
                                Gamaliel <span style={{ color: COLORS.green }}>Admin</span>
                            </span>
                        </Link>
                    </div>

                    <div className="flex items-center gap-2">
                        <NotificationBell />

                        <div className="relative">
                            <button
                                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors"
                            >
                                <div
                                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold"
                                    style={{ backgroundColor: COLORS.navyDeep, color: COLORS.white }}
                                >
                                    {getUserInitials(user)}
                                </div>
                                <span className="text-sm font-medium hidden sm:block" style={{ color: COLORS.navyMuted }}>
                                    {user?.name || 'Utilisateur'}
                                </span>
                                <ChevronDownIcon className="w-4 h-4" style={{ color: COLORS.navyFaint }} />
                            </button>

                            {isUserMenuOpen && user && (
                                <div
                                    className="absolute right-0 mt-2 w-48 rounded-xl shadow-lg border py-1 z-50"
                                    style={{ backgroundColor: COLORS.white, borderColor: COLORS.navyBorder }}
                                >
                                    <div className="px-4 py-2 border-b" style={{ borderColor: COLORS.navyBorder }}>
                                        <p className="text-sm font-medium" style={{ color: COLORS.navyDeep }}>{user.name}</p>
                                        <p className="text-xs" style={{ color: COLORS.navyFaint }}>{user.email}</p>
                                        <span
                                            className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium"
                                            style={{ backgroundColor: COLORS.navySoftBg, color: COLORS.navy }}
                                        >
                                            {getRoleLabel(user.role)}
                                        </span>
                                    </div>
                                    <Link
                                        href="/logout"
                                        method="post"
                                        as="button"
                                        className="flex items-center gap-2 w-full px-4 py-2 text-sm transition-colors"
                                        style={{ color: COLORS.red }}
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
                className={`fixed top-16 left-0 bottom-0 z-30 w-64 border-r transition-transform duration-300 ease-in-out overflow-hidden ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } lg:translate-x-0`}
                style={{ backgroundColor: COLORS.white, borderColor: COLORS.navyBorder }}
            >
                <nav className="h-full overflow-y-auto p-4 space-y-1.5 pb-24">
                    <Link
                        href="/admin/dashboard"
                        className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200"
                        style={
                            url === '/admin/dashboard'
                                ? { backgroundColor: COLORS.navyDeep, color: COLORS.white }
                                : { color: COLORS.navyMuted }
                        }
                    >
                        <HomeIcon className="w-5 h-5" />
                        <span className="flex-1">Tableau de bord</span>
                    </Link>

                    {canManageUsers && (
                        <Link
                            href="/admin/users"
                            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200"
                            style={
                                url.startsWith('/admin/users')
                                    ? { backgroundColor: COLORS.navyDeep, color: COLORS.white }
                                    : { color: COLORS.navyMuted }
                            }
                        >
                            <UserGroupIcon className="w-5 h-5" />
                            <span className="flex-1">Utilisateurs</span>
                        </Link>
                    )}

                    {menuGroups.map((group) => {
                        const isOpen = !!openGroups[group.title];
                        const hasActiveChild = group.items.some(
                            (item) => url === item.href || url.startsWith(item.href + '/')
                        );

                        return (
                            <div key={group.title} className="space-y-1 pt-1">
                                <button
                                    type="button"
                                    onClick={() => toggleGroup(group.title)}
                                    className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200"
                                    style={
                                        hasActiveChild
                                            ? { color: COLORS.navyDeep, fontWeight: 600, backgroundColor: COLORS.navySoftBg }
                                            : { color: COLORS.navyMuted }
                                    }
                                >
                                    <div className="flex items-center gap-3">
                                        {group.icon}
                                        <span>{group.title}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {!isOpen && !!group.badgeCount && group.badgeCount > 0 && (
                                            <span
                                                className="text-xs font-bold rounded-full px-2 py-0.5"
                                                style={{ backgroundColor: COLORS.green, color: COLORS.white }}
                                            >
                                                {group.badgeCount > 9 ? '9+' : group.badgeCount}
                                            </span>
                                        )}
                                        
                                        <ChevronDownIcon
                                            className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                                            style={{ color: COLORS.navyFaint }}
                                        />
                                    </div>
                                </button>

                                {isOpen && (
                                    <div className="pl-6 space-y-1 border-l-2 ml-4" style={{ borderColor: COLORS.navyBorder }}>
                                        {group.items.map((item) => {
                                            const isActive = url === item.href || url.startsWith(item.href + '/');

                                            return (
                                                <Link
                                                    key={item.href}
                                                    href={item.href}
                                                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                                                    style={
                                                        isActive
                                                            ? { backgroundColor: COLORS.navyDeep, color: COLORS.white }
                                                            : { color: COLORS.navyFaint }
                                                    }
                                                >
                                                    {item.icon}
                                                    <span className="flex-1">{item.label}</span>
                                                    
                                                    {!!item.badge && item.badge > 0 && (
                                                        <span
                                                            className="text-xs font-bold rounded-full px-2 py-0.5"
                                                            style={
                                                                isActive
                                                                    ? { backgroundColor: COLORS.white, color: COLORS.navy }
                                                                    : { backgroundColor: COLORS.green, color: COLORS.white }
                                                            }
                                                        >
                                                            {item.badge > 9 ? '9+' : item.badge}
                                                        </span>
                                                    )}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    <Link
                        href="/profil"
                        className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200"
                        style={
                            url.startsWith('/profil')
                                ? { backgroundColor: COLORS.navyDeep, color: COLORS.white }
                                : { color: COLORS.navyMuted }
                        }
                    >
                        <UserIcon className="w-5 h-5" />
                        <span className="flex-1">Mon Profil</span>
                    </Link>

                    <div className="pt-4 mt-4 border-t" style={{ borderColor: COLORS.navyBorder }}>
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
                            style={{ color: COLORS.red }}
                        >
                            <ArrowLeftOnRectangleIcon className="w-5 h-5" />
                            Déconnexion
                        </Link>
                    </div>
                </nav>
            </aside>

            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-20 lg:hidden"
                    style={{ backgroundColor: 'rgba(13,40,68,0.5)' }}
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <main className="lg:ml-64 pt-16">
                <div className="p-4 md:p-6">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold" style={{ color: COLORS.navyDeep }}>{title}</h1>
                        <p className="text-sm" style={{ color: COLORS.navyFaint }}>Bienvenue sur votre espace d'administration</p>
                    </div>
                    {children}
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;