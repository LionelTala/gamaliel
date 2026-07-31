// resources/js/pages/Admin/Dashboard.tsx
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Components/Layouts/AdminLayout';
import {
    ChartBarIcon,
    UserGroupIcon,
    AcademicCapIcon,
    BookOpenIcon,
    CalendarIcon,
    ClipboardDocumentListIcon,
    UserIcon,
    UsersIcon,
    ArrowTrendingUpIcon,
    ArrowTrendingDownIcon,
    EyeIcon,
    CheckCircleIcon,
    ClockIcon,
} from '@heroicons/react/24/outline';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement
);

interface Stats {
    total_students: number;
    total_formations: number;
    total_certifications: number;
    total_vagues: number;
    total_candidatures: number;
    total_admins: number;
    candidatures_en_attente: number;
    candidatures_admis: number;
    etudiants_online: number;
    etudiants_certification: number;
}

interface MonthlyStat {
    month: string;
    students: number;
    candidatures: number;
}

interface TopFormation {
    name: string;
    count: number;
    abbreviation: string;
}

interface Repartition {
    'En ligne': number;
    'Certification': number;
    'Non affectés': number;
}

interface RecentActivity {
    type: string;
    message: string;
    detail: string;
    statut: string;
    created_at: string;
    link: string;
}

interface Tendance {
    mois_dernier: number;
    mois_actuel: number;
    variation: number;
}

interface VaguesStats {
    en_cours: number;
    a_venir: number;
    terminees: number;
}

interface DashboardProps {
    stats: Stats;
    monthlyStats: MonthlyStat[];
    topFormations: TopFormation[];
    repartition: Repartition;
    recentActivities: RecentActivity[];
    tendance: Tendance;
    vaguesStats: VaguesStats;
}

export default function Dashboard({
    stats,
    monthlyStats,
    topFormations,
    repartition,
    recentActivities,
    tendance,
    vaguesStats,
}: DashboardProps) {
    // ✅ Données pour le graphique des inscriptions mensuelles
    const monthlyChartData = {
        labels: monthlyStats.map((item) => item.month),
        datasets: [
            {
                label: 'Étudiants',
                data: monthlyStats.map((item) => item.students),
                backgroundColor: 'rgba(26, 86, 219, 0.7)',
                borderColor: '#1A56DB',
                borderWidth: 2,
                borderRadius: 4,
            },
            {
                label: 'Candidatures',
                data: monthlyStats.map((item) => item.candidatures),
                backgroundColor: 'rgba(210, 31, 47, 0.7)',
                borderColor: '#D21F2F',
                borderWidth: 2,
                borderRadius: 4,
            },
        ],
    };

    // ✅ Données pour le graphique de répartition
    const repartitionChartData = {
        labels: Object.keys(repartition),
        datasets: [
            {
                data: Object.values(repartition),
                backgroundColor: ['#1A56DB', '#D21F2F', '#9CA3AF'],
                borderWidth: 2,
                borderColor: '#fff',
            },
        ],
    };

    // ✅ Données pour le graphique des top formations
    const topFormationsChartData = {
        labels: topFormations.map((f) => f.abbreviation || f.name.substring(0, 10)),
        datasets: [
            {
                label: 'Nombre d\'étudiants',
                data: topFormations.map((f) => f.count),
                backgroundColor: 'rgba(26, 86, 219, 0.8)',
                borderColor: '#1A56DB',
                borderWidth: 2,
                borderRadius: 4,
            },
        ],
    };

    const statsCards = [
        { label: 'Étudiants', value: stats.total_students, icon: <UserGroupIcon className="w-6 h-6" />, color: 'bg-blue-500' },
        { label: 'Formations', value: stats.total_formations, icon: <AcademicCapIcon className="w-6 h-6" />, color: 'bg-green-500' },
        { label: 'Certifications', value: stats.total_certifications, icon: <BookOpenIcon className="w-6 h-6" />, color: 'bg-purple-500' },
        { label: 'Vagues', value: stats.total_vagues, icon: <CalendarIcon className="w-6 h-6" />, color: 'bg-yellow-500' },
        { label: 'Candidatures', value: stats.total_candidatures, icon: <ClipboardDocumentListIcon className="w-6 h-6" />, color: 'bg-indigo-500' },
        { label: 'En attente', value: stats.candidatures_en_attente, icon: <ClockIcon className="w-6 h-6" />, color: 'bg-orange-500' },
    ];

    const getStatutBadge = (statut: string) => {
        const colors: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
            en_attente: {
                bg: 'bg-yellow-100',
                text: 'text-yellow-800',
                icon: <ClockIcon className="w-3 h-3" />,
            },
            en_cours: {
                bg: 'bg-blue-100',
                text: 'text-blue-800',
                icon: <EyeIcon className="w-3 h-3" />,
            },
            admis: {
                bg: 'bg-green-100',
                text: 'text-green-800',
                icon: <CheckCircleIcon className="w-3 h-3" />,
            },
            Actif: {
                bg: 'bg-green-100',
                text: 'text-green-800',
                icon: <CheckCircleIcon className="w-3 h-3" />,
            },
            Inactif: {
                bg: 'bg-red-100',
                text: 'text-red-800',
                icon: <ClockIcon className="w-3 h-3" />,
            },
        };

        const config = colors[statut] || colors.en_attente;
        return (
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
                {config.icon}
                {statut}
            </span>
        );
    };

    return (
        <>
            <Head title="Tableau de bord - Admin" />

            <AdminLayout title="Tableau de bord">
                {/* Statistiques */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
                    {statsCards.map((stat) => (
                        <div key={stat.label} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-gray-500">{stat.label}</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-0.5">{stat.value}</p>
                                </div>
                                <div className={`${stat.color} w-10 h-10 rounded-xl flex items-center justify-center text-white`}>
                                    {stat.icon}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Tendances */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                        <p className="text-xs text-gray-500">Étudiants ce mois</p>
                        <p className="text-2xl font-bold text-gray-900">{tendance.mois_actuel}</p>
                        <div className="flex items-center gap-1 mt-1">
                            {tendance.variation > 0 ? (
                                <>
                                    <ArrowTrendingUpIcon className="w-4 h-4 text-green-500" />
                                    <span className="text-sm text-green-500">+{tendance.variation}%</span>
                                </>
                            ) : tendance.variation < 0 ? (
                                <>
                                    <ArrowTrendingDownIcon className="w-4 h-4 text-red-500" />
                                    <span className="text-sm text-red-500">{tendance.variation}%</span>
                                </>
                            ) : (
                                <span className="text-sm text-gray-400">Stable</span>
                            )}
                            <span className="text-xs text-gray-400 ml-1">vs mois dernier ({tendance.mois_dernier})</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                        <p className="text-xs text-gray-500">Vagues en cours</p>
                        <p className="text-2xl font-bold text-gray-900">{vaguesStats.en_cours}</p>
                        <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                            <span>À venir: {vaguesStats.a_venir}</span>
                            <span>Terminées: {vaguesStats.terminees}</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                        <p className="text-xs text-gray-500">Répartition des étudiants</p>
                        <div className="flex items-center gap-4 mt-1">
                            <div>
                                <p className="text-lg font-bold text-blue-600">{stats.etudiants_online}</p>
                                <p className="text-xs text-gray-500">En ligne</p>
                            </div>
                            <div>
                                <p className="text-lg font-bold text-red-600">{stats.etudiants_certification}</p>
                                <p className="text-xs text-gray-500">Certification</p>
                            </div>
                            <div>
                                <p className="text-lg font-bold text-gray-400">
                                    {stats.total_students - stats.etudiants_online - stats.etudiants_certification}
                                </p>
                                <p className="text-xs text-gray-500">Non affectés</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Graphiques */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    {/* Inscriptions mensuelles */}
                    <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h2 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                            <ChartBarIcon className="w-5 h-5 text-cab-blue" />
                            Évolution des inscriptions
                        </h2>
                        <div className="h-64">
                            <Bar
                                data={monthlyChartData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: {
                                            position: 'top',
                                        },
                                    },
                                    scales: {
                                        y: {
                                            beginAtZero: true,
                                            ticks: {
                                                stepSize: 1,
                                            },
                                        },
                                    },
                                }}
                            />
                        </div>
                    </div>

                    {/* Répartition */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h2 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                            <UserIcon className="w-5 h-5 text-cab-blue" />
                            Répartition des étudiants
                        </h2>
                        <div className="h-64 flex items-center justify-center">
                            <Pie
                                data={repartitionChartData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: {
                                            position: 'bottom',
                                        },
                                    },
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Top formations + Activités récentes */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Top formations */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h2 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                            <AcademicCapIcon className="w-5 h-5 text-cab-blue" />
                            Top 5 formations
                        </h2>
                        {topFormations.length === 0 ? (
                            <p className="text-sm text-gray-500 text-center py-8">Aucune formation avec des étudiants</p>
                        ) : (
                            <>
                                <div className="h-48">
                                    <Bar
                                        data={topFormationsChartData}
                                        options={{
                                            responsive: true,
                                            maintainAspectRatio: false,
                                            plugins: {
                                                legend: {
                                                    display: false,
                                                },
                                            },
                                            scales: {
                                                y: {
                                                    beginAtZero: true,
                                                    ticks: {
                                                        stepSize: 1,
                                                    },
                                                },
                                            },
                                        }}
                                    />
                                </div>
                                <div className="mt-4 space-y-1">
                                    {topFormations.map((f) => (
                                        <div key={f.name} className="flex items-center justify-between text-sm">
                                            <span className="text-gray-600">{f.name}</span>
                                            <span className="font-semibold text-gray-900">{f.count} étudiants</span>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    {/* Activités récentes */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h2 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                            <ClockIcon className="w-5 h-5 text-cab-blue" />
                            Activités récentes
                        </h2>
                        <div className="space-y-3 max-h-80 overflow-y-auto">
                            {recentActivities.length === 0 ? (
                                <p className="text-sm text-gray-500 text-center py-8">Aucune activité récente</p>
                            ) : (
                                recentActivities.map((activity, index) => (
                                    <a
                                        key={index}
                                        href={activity.link}
                                        className="block p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                                                <p className="text-xs text-gray-500">{activity.detail}</p>
                                            </div>
                                            <div className="flex flex-col items-end gap-1">
                                                {getStatutBadge(activity.statut)}
                                                <span className="text-xs text-gray-400">{activity.created_at}</span>
                                            </div>
                                        </div>
                                    </a>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </>
    );
}
