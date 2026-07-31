// resources/js/pages/Admin/Candidatures/Index.tsx
import {
    ClipboardDocumentListIcon,
    EyeIcon,
    CheckCircleIcon,
    XCircleIcon,
    ClockIcon,
    MagnifyingGlassIcon,
    FunnelIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

import AdminLayout from '@/Components/Layouts/AdminLayout';
import Pagination from '@/Components/UI/Pagination';

interface Candidature {
    id: number;
    nom_complet: string;
    email: string;
    telephone: string;
    type: string;
    type_label: string;
    statut: string;
    statut_label: string;
    statut_color: string;
    formation: { id: number; name: string; abbreviation: string } | null;
    certification: { id: number; titre: string } | null;
    vague: { id: number; name: string } | null;
    created_at: string;
    created_at_full: string;
}

interface Stats {
    total: number;
    en_attente: number;
    en_cours: number;
    admis: number;
    refuse: number;
}

interface Filters {
    statut: string | null;
    type: string | null;
    search: string | null;
}

interface Props {
    candidatures: {
        data: Candidature[];
        links: { url: string | null; label: string; active: boolean }[];
        from: number | null;
        to: number | null;
        total: number;
    };
    stats: Stats;
    filters: Filters;
}

export default function Index({ candidatures, stats, filters }: Props) {
    const [showFilters, setShowFilters] = useState(false);
    const [searchTerm, setSearchTerm] = useState(filters.search || '');

    const getStatutBadge = (statut: string, label: string) => {
        const colors: Record<string, string> = {
            en_attente: 'bg-yellow-100 text-yellow-800',
            en_cours: 'bg-blue-100 text-blue-800',
            admis: 'bg-green-100 text-green-800',
            refuse: 'bg-red-100 text-red-800',
        };

        const icons: Record<string, React.ReactNode> = {
            en_attente: <ClockIcon className="w-3 h-3" />,
            en_cours: <ClipboardDocumentListIcon className="w-3 h-3" />,
            admis: <CheckCircleIcon className="w-3 h-3" />,
            refuse: <XCircleIcon className="w-3 h-3" />,
        };

        return (
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${colors[statut] || 'bg-gray-100 text-gray-800'}`}>
                {icons[statut]}
                {label}
            </span>
        );
    };

    const handleFilter = (key: string, value: string | null) => {
        const params = new URLSearchParams();

        if (value && value !== 'all') {
            params.set(key, value);
        }

        if (filters.search) {
            params.set('search', filters.search);
        }

        if (filters.type && key !== 'type') {
            params.set('type', filters.type);
        }

        if (filters.statut && key !== 'statut') {
            params.set('statut', filters.statut);
        }

        const url = `/admin/candidatures${params.toString() ? '?' + params.toString() : ''}`;
        router.visit(url);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();

        if (searchTerm) {
            params.set('search', searchTerm);
        }

        if (filters.statut && filters.statut !== 'all') {
            params.set('statut', filters.statut);
        }

        if (filters.type && filters.type !== 'all') {
            params.set('type', filters.type);
        }

        const url = `/admin/candidatures${params.toString() ? '?' + params.toString() : ''}`;
        router.visit(url);
    };

    const clearFilters = () => {
        setSearchTerm('');
        router.visit('/admin/candidatures');
    };

    const statsCards = [
        { label: 'Total', value: stats.total, color: 'bg-gray-500', icon: <ClipboardDocumentListIcon className="w-5 h-5" /> },
        { label: 'En attente', value: stats.en_attente, color: 'bg-yellow-500', icon: <ClockIcon className="w-5 h-5" /> },
        { label: 'En cours', value: stats.en_cours, color: 'bg-blue-500', icon: <ClipboardDocumentListIcon className="w-5 h-5" /> },
        { label: 'Admis', value: stats.admis, color: 'bg-green-500', icon: <CheckCircleIcon className="w-5 h-5" /> },
        { label: 'Refusés', value: stats.refuse, color: 'bg-red-500', icon: <XCircleIcon className="w-5 h-5" /> },
    ];

    return (
        <>
            <Head title="Gestion des candidatures - Admin" />

            <AdminLayout title="Gestion des candidatures">
                {/* Statistiques */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
                    {statsCards.map((stat) => (
                        <div
                            key={stat.label}
                            onClick={() => {
                                if (stat.label !== 'Total') {
                                    const statutMap: Record<string, string> = {
                                        'En attente': 'en_attente',
                                        'En cours': 'en_cours',
                                        'Admis': 'admis',
                                        'Refusés': 'refuse',
                                    };
                                    handleFilter('statut', statutMap[stat.label] || null);
                                } else {
                                    handleFilter('statut', null);
                                }
                            }}
                            className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-all"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-0.5">{stat.value}</p>
                                </div>
                                <div className={`${stat.color} w-10 h-10 rounded-xl flex items-center justify-center text-white`}>
                                    {stat.icon}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Barre de recherche et filtres */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6">
                    <div className="flex flex-wrap gap-3 items-center">
                        <form onSubmit={handleSearch} className="flex-1 min-w-[200px]">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Rechercher..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors text-sm"
                                />
                            </div>
                        </form>

                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="px-4 py-2 border border-gray-300 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-2"
                        >
                            <FunnelIcon className="w-4 h-4" />
                            Filtres
                            {(filters.statut || filters.type) && (
                                <span className="w-2 h-2 bg-cab-blue rounded-full"></span>
                            )}
                        </button>

                        {(filters.statut || filters.type || filters.search) && (
                            <button
                                onClick={clearFilters}
                                className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors flex items-center gap-1"
                            >
                                <XMarkIcon className="w-4 h-4" />
                                Effacer les filtres
                            </button>
                        )}
                    </div>

                    {showFilters && (
                        <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Statut</label>
                                <select
                                    value={filters.statut || 'all'}
                                    onChange={(e) => handleFilter('statut', e.target.value === 'all' ? null : e.target.value)}
                                    className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors bg-white"
                                >
                                    <option value="all">Tous</option>
                                    <option value="en_attente">En attente</option>
                                    <option value="en_cours">En cours</option>
                                    <option value="admis">Admis</option>
                                    <option value="refuse">Refusé</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Type</label>
                                <select
                                    value={filters.type || 'all'}
                                    onChange={(e) => handleFilter('type', e.target.value === 'all' ? null : e.target.value)}
                                    className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors bg-white"
                                >
                                    <option value="all">Tous</option>
                                    <option value="formation">Formation</option>
                                    <option value="certification">Certification</option>
                                </select>
                            </div>
                        </div>
                    )}
                </div>

                {/* Liste des candidatures */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {candidatures.data.length === 0 ? (
                        <div className="text-center py-12">
                            <ClipboardDocumentListIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500 text-sm">Aucune candidature trouvée</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidat</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Formation</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {candidatures.data.map((candidature) => (
                                        <tr key={candidature.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 rounded-full bg-cab-blue/10 text-cab-blue flex items-center justify-center text-sm font-bold">
                                                        {candidature.nom_complet.charAt(0).toUpperCase()}
                                                    </div>
                                                    <span className="font-medium text-gray-900">{candidature.nom_complet}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <p className="text-gray-600 text-xs">{candidature.email}</p>
                                                <p className="text-gray-400 text-xs">{candidature.telephone}</p>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                                    candidature.type === 'formation'
                                                        ? 'bg-blue-100 text-blue-700'
                                                        : 'bg-purple-100 text-purple-700'
                                                }`}>
                                                    {candidature.type_label}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-gray-600 text-xs">
                                                {candidature.formation?.name || candidature.certification?.titre || '-'}
                                            </td>
                                            <td className="px-4 py-3">
                                                {getStatutBadge(candidature.statut, candidature.statut_label)}
                                            </td>
                                            <td className="px-4 py-3 text-gray-500 text-xs">
                                                {candidature.created_at}
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <Link
                                                    href={`/admin/candidatures/${candidature.id}`}
                                                    className="p-1.5 rounded-lg text-cab-blue hover:bg-blue-50 transition-colors inline-flex items-center gap-1"
                                                    title="Voir le détail"
                                                >
                                                    <EyeIcon className="w-5 h-5" />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                <Pagination
                    links={candidatures.links}
                    from={candidatures.from}
                    to={candidatures.to}
                    total={candidatures.total}
                />
            </AdminLayout>
        </>
    );
}
