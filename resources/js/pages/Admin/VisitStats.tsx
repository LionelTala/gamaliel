// resources/js/pages/Admin/VisitStats.tsx
import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/Components/Layouts/AdminLayout';
import { EyeIcon, UsersIcon } from '@heroicons/react/24/outline';

interface PageStat {
    path: string;
    label: string;
    total: number;
    uniques: number;
}

interface Props {
    period: string;
    totalVisits: number;
    totalUniques: number;
    perPage: PageStat[];
}

const periods = [
    { key: 'today', label: "Aujourd'hui" },
    { key: 'week', label: 'Cette semaine' },
    { key: 'month', label: 'Ce mois' },
    { key: 'all', label: 'Tout (depuis le lancement)' },
];

export default function VisitStats({ period, totalVisits, totalUniques, perPage }: Props) {
    const changePeriod = (key: string) => {
        router.get('/admin/stats-visites', { period: key }, { preserveScroll: true });
    };

    return (
        <>
            <Head title="Statistiques de visites - Admin" />
            <AdminLayout title="Statistiques de visites">
                <div className="flex gap-1 bg-gray-100 rounded-lg p-1 mb-6 w-fit">
                    {periods.map((p) => (
                        <button
                            key={p.key}
                            onClick={() => changePeriod(p.key)}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                period === p.key ? 'bg-white text-cab-blue shadow-sm' : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            {p.label}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white rounded-2xl p-6 border border-gray-100">
                        <div className="flex items-center gap-2 text-gray-500 mb-2">
                            <EyeIcon className="w-5 h-5" />
                            <span className="text-sm">Vues totales</span>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{totalVisits}</p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-gray-100">
                        <div className="flex items-center gap-2 text-gray-500 mb-2">
                            <UsersIcon className="w-5 h-5" />
                            <span className="text-sm">Visiteurs uniques</span>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{totalUniques}</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-4 py-3 text-left font-medium text-gray-500">Page</th>
                                <th className="px-4 py-3 text-right font-medium text-gray-500">Vues</th>
                                <th className="px-4 py-3 text-right font-medium text-gray-500">Visiteurs uniques</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {perPage.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="text-center py-8 text-gray-400">Aucune donnée pour cette période</td>
                                </tr>
                            ) : (
                                perPage.map((p) => (
                                    <tr key={p.path}>
                                        <td className="px-4 py-3 font-medium text-gray-900">{p.label}</td>
                                        <td className="px-4 py-3 text-right">{p.total}</td>
                                        <td className="px-4 py-3 text-right">{p.uniques}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </AdminLayout>
        </>
    );
}
