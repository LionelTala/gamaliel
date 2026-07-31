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

const AdminLayout = ({ children, title = 'Tableau de bord' }: AdminLayoutProps) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const { props, url } = usePage<SharedPageProps>();
    const user = props.auth?.user ?? null;
    const devoirCount = props.unreadCountsByType?.['devoir'] ?? 0;
    const candidatureCount = props.unreadCountsByType?.['candidature'] ?? 0;
    const evaluationCount = props.unreadCountsByType?.['evaluation'] ?? 0;
    const contactCount = props.unreadCountsByType?.['contact'] ?? 0;

    const canManageUsers = user?.role === 'super_admin' || user?.role === 'admin_centre';

    // Structure des groupes de menus
    const menuGroups: MenuGroup[] = [
        {
            title: 'Gestion du Site',
            icon: <Cog6ToothIcon className="w-5 h-5" />,
            badgeCount: contactCount,
            items: [
                { label: 'Statistiques visites', href: '/admin/stats-visites', icon: <EyeIcon className="w-4 h-4" /> },
                { label: 'Galerie', href: '/admin/galerie', icon: <PhotoIcon className="w-4 h-4" /> },
                { label: 'Activités', href: '/admin/activites', icon: <CalendarIcon className="w-4 h-4" /> },
                // Messages du formulaire de contact — prêt pour le jour où la page /contact sera en ligne
                { label: 'Messages de contact', href: '/admin/contacts', icon: <ChatBubbleLeftRightIcon className="w-4 h-4" />, badge: contactCount },
            ],
        },
        {
            title: 'Inscriptions',
            icon: <ClipboardDocumentListIcon className="w-5 h-5" />,
            badgeCount: candidatureCount,
            items: [
                { label: 'Pré-inscriptions', href: '/admin/pre-inscriptions', icon: <ClipboardDocumentListIcon className="w-4 h-4" /> },
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
    }, [url]);

    const toggleGroup = (title: string) => {
        setOpenGroups((prev) => ({
            ...prev,
            [title]: !prev[title],
        }));
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
        <div className="min-h-screen bg-gamaliel-paper">
            <ToastContainer />

            {/* Navbar Admin */}
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

                        <Link href="/admin/dashboard" className="flex items-center gap-2">
                            <img
                                src="/assets/images/logo.png"
                                alt="Institut Gamaliel"
                                className="h-8 w-8 rounded-lg object-cover"
                            />
                            <span className="text-lg font-bold text-gamaliel-navy-deep hidden sm:block">
                                Gamaliel <span className="text-gamaliel-orange">Admin</span>
                            </span>
                        </Link>
                    </div>

                    <div className="flex items-center gap-2">
                        <NotificationBell />

                        <div className="relative">
                            <button
                                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gamaliel-navy/5 transition-colors"
                            >
                                <div className="w-8 h-8 rounded-full bg-gamaliel-navy-deep text-white flex items-center justify-center text-sm font-semibold">
                                    {getUserInitials(user)}
                                </div>
                                <span className="text-sm font-medium text-gamaliel-navy/80 hidden sm:block">
                                    {user?.name || 'Utilisateur'}
                                </span>
                                <ChevronDownIcon className="w-4 h-4 text-gamaliel-navy/40" />
                            </button>

                            {isUserMenuOpen && user && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gamaliel-navy/10 py-1 z-50">
                                    <div className="px-4 py-2 border-b border-gamaliel-navy/10">
                                        <p className="text-sm font-medium text-gamaliel-navy-deep">{user.name}</p>
                                        <p className="text-xs text-gamaliel-navy/50">{user.email}</p>
                                        <span className="inline-block mt-1 px-2 py-0.5 bg-gamaliel-navy/10 text-gamaliel-navy rounded-full text-xs font-medium">
                                            {getRoleLabel(user.role)}
                                        </span>
                                    </div>
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
                <nav className="h-full overflow-y-auto p-4 space-y-1.5 pb-24">
                    {/* Lien Direct : Tableau de bord */}
                    <Link
                        href="/admin/dashboard"
                        className={`
                            flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium
                            transition-colors duration-200
                            ${url === '/admin/dashboard'
                                ? 'bg-gamaliel-navy-deep text-white'
                                : 'text-gamaliel-navy/70 hover:bg-gamaliel-navy/5 hover:text-gamaliel-navy-deep'
                            }
                        `}
                    >
                        <HomeIcon className="w-5 h-5" />
                        <span className="flex-1">Tableau de bord</span>
                    </Link>

                    {/* Lien Direct : Utilisateurs (si droits suffisants) */}
                    {canManageUsers && (
                        <Link
                            href="/admin/users"
                            className={`
                                flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium
                                transition-colors duration-200
                                ${url.startsWith('/admin/users')
                                    ? 'bg-gamaliel-navy-deep text-white'
                                    : 'text-gamaliel-navy/70 hover:bg-gamaliel-navy/5 hover:text-gamaliel-navy-deep'
                                }
                            `}
                        >
                            <UserGroupIcon className="w-5 h-5" />
                            <span className="flex-1">Utilisateurs</span>
                        </Link>
                    )}

                    {/* Menus Déroulants (Groupes) */}
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
                                    className={`
                                        flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-sm font-medium
                                        transition-colors duration-200
                                        ${hasActiveChild
                                            ? 'text-gamaliel-navy-deep font-semibold bg-gamaliel-navy/5'
                                            : 'text-gamaliel-navy/70 hover:bg-gamaliel-navy/5'
                                        }
                                    `}
                                >
                                    <div className="flex items-center gap-3">
                                        {group.icon}
                                        <span>{group.title}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {!isOpen && !!group.badgeCount && group.badgeCount > 0 && (
                                            <span
                                                className="text-xs font-bold rounded-full px-2 py-0.5 text-white"
                                                style={{ background: 'linear-gradient(135deg, #FD7D0F, #E13A4B)' }}
                                            >
                                                {group.badgeCount > 9 ? '9+' : group.badgeCount}
                                            </span>
                                        )}
                                        <ChevronDownIcon
                                            className={`w-4 h-4 text-gamaliel-navy/40 transition-transform duration-200 ${
                                                isOpen ? 'rotate-180' : ''
                                            }`}
                                        />
                                    </div>
                                </button>

                                {/* Sous-liens */}
                                {isOpen && (
                                    <div className="pl-6 space-y-1 border-l-2 border-gamaliel-navy/10 ml-4">
                                        {group.items.map((item) => {
                                            const isActive = url === item.href || url.startsWith(item.href + '/');

                                            return (
                                                <Link
                                                    key={item.href}
                                                    href={item.href}
                                                    className={`
                                                        flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium
                                                        transition-colors duration-200
                                                        ${isActive
                                                            ? 'bg-gamaliel-navy-deep text-white'
                                                            : 'text-gamaliel-navy/60 hover:bg-gamaliel-navy/5 hover:text-gamaliel-navy-deep'
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
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    {/* Lien Direct : Mon Profil */}
                    <Link
                        href="/profil"
                        className={`
                            flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium
                            transition-colors duration-200
                            ${url.startsWith('/profil')
                                ? 'bg-gamaliel-navy-deep text-white'
                                : 'text-gamaliel-navy/70 hover:bg-gamaliel-navy/5 hover:text-gamaliel-navy-deep'
                            }
                        `}
                    >
                        <UserIcon className="w-5 h-5" />
                        <span className="flex-1">Mon Profil</span>
                    </Link>

                    {/* Déconnexion */}
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
                        <p className="text-sm text-gamaliel-navy/50">Bienvenue sur votre espace d'administration</p>
                    </div>
                    {children}
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
