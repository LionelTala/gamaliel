// resources/js/pages/Admin/Bibliotheque/Index.tsx
import {
    PlusIcon,
    PencilIcon,
    TrashIcon,
    BookOpenIcon,
    MagnifyingGlassIcon,
    XMarkIcon,
    CheckCircleIcon,
    XCircleIcon,
} from '@heroicons/react/24/outline';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

import AdminLayout from '@/Components/Layouts/AdminLayout';
import Pagination from '@/Components/UI/Pagination';

interface Livre {
    id: number;
    titre: string;
    description: string;
    prix: number | null;
    lien_achat: string | null;
    is_active: boolean;
    created_at: string;
    image_url: string | null;
}

interface Stats {
    total: number;
    actifs: number;
    inactifs: number;
}

interface Filters {
    search: string | null;
    statut: string | null;
}

interface Props {
    livres: {
        data: Livre[];
        links: { url: string | null; label: string; active: boolean }[];
        from: number | null;
        to: number | null;
        total: number;
    };
    stats: Stats;
    filters: Filters;
}

export default function Index({ livres, stats, filters }: Props) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');

    const handleToggle = (id: number) => {
        if (confirm('Voulez-vous changer le statut de ce livre ?')) {
            router.patch(`/admin/bibliotheque/${id}/toggle`);
        }
    };

    const handleDelete = (id: number, titre: string) => {
        if (confirm(`Supprimer le livre "${titre}" ? Cette action est irréversible.`)) {
            router.delete(`/admin/bibliotheque/${id}`);
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (searchTerm) params.set('search', searchTerm);
        if (filters.statut && filters.statut !== 'all') params.set('statut', filters.statut);
        router.visit(`/admin/bibliotheque${params.toString() ? '?' + params.toString() : ''}`);
    };

    const handleStatut = (value: string) => {
        const params = new URLSearchParams();
        if (value !== 'all') params.set('statut', value);
        if (filters.search) params.set('search', filters.search);
        router.visit(`/admin/bibliotheque${params.toString() ? '?' + params.toString() : ''}`);
    };

    const clearFilters = () => {
        setSearchTerm('');
        router.visit('/admin/bibliotheque');
    };

    const statsCards = [
        { label: 'Total livres', value: stats.total, color: 'bg-blue-500', icon: <BookOpenIcon className="w-5 h-5 text-white" /> },
        { label: 'Actifs', value: stats.actifs, color: 'bg-green-500', icon: <CheckCircleIcon className="w-5 h-5 text-white" /> },
        { label: 'Inactifs', value: stats.inactifs, color: 'bg-gray-500', icon: <XCircleIcon className="w-5 h-5 text-white" /> },
    ];

    return (
        <>
            <Head title="Bibliothèque - Administration" />

            <AdminLayout title="Gestion de la bibliothèque">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                    {statsCards.map((stat) => (
                        <div key={stat.label} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-0.5">{stat.value}</p>
                                </div>
                                <div className={`${stat.color} w-10 h-10 rounded-xl flex items-center justify-center`}>
                                    {stat.icon}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

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
                                    placeholder="Rechercher un livre..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors text-sm"
                                />
                            </div>
                        </form>

                        <select
                            value={filters.statut || 'all'}
                            onChange={(e) => handleStatut(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-cab-blue focus:border-cab-blue bg-white"
                        >
                            <option value="all">Tous les statuts</option>
                            <option value="actif">Actif</option>
                            <option value="inactif">Inactif</option>
                        </select>

                        {(filters.statut || filters.search) && (
                            <button
                                onClick={clearFilters}
                                className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors flex items-center gap-1"
                            >
                                <XMarkIcon className="w-4 h-4" />
                                Effacer
                            </button>
                        )}

                        <Link
                            href="/admin/bibliotheque/create"
                            className="px-4 py-2 bg-cab-blue text-white rounded-xl text-sm font-medium hover:bg-cab-blue-dark transition-colors flex items-center gap-2"
                        >
                            <PlusIcon className="w-4 h-4" />
                            Ajouter
                        </Link>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {livres.data.length === 0 ? (
                        <div className="text-center py-12">
                            <BookOpenIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500 text-sm">Aucun livre trouvé</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Livre</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {livres.data.map((livre) => (
                                        <tr key={livre.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-3">
                                                    {livre.image_url ? (
                                                        <img src={livre.image_url} alt={livre.titre} className="w-12 h-16 object-cover rounded-lg" />
                                                    ) : (
                                                        <div className="w-12 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                                                            <BookOpenIcon className="w-6 h-6 text-gray-400" />
                                                        </div>
                                                    )}
                                                    <p className="font-medium text-gray-900">{livre.titre}</p>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                {livre.prix ? (
                                                    <span className="font-medium text-gray-900">{Number(livre.prix).toLocaleString()} FCFA</span>
                                                ) : (
                                                    <span className="text-gray-400 text-xs">Gratuit</span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${livre.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                                    {livre.is_active ? 'Actif' : 'Inactif'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    <Link
                                                        href={`/admin/bibliotheque/${livre.id}/edit`}
                                                        className="p-1.5 rounded-lg text-blue-500 hover:bg-blue-50 transition-colors"
                                                        title="Modifier"
                                                    >
                                                        <PencilIcon className="w-5 h-5" />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleToggle(livre.id)}
                                                        className={`p-1.5 rounded-lg transition-colors ${livre.is_active ? 'text-gray-500 hover:bg-gray-100' : 'text-green-500 hover:bg-green-50'}`}
                                                        title={livre.is_active ? 'Désactiver' : 'Activer'}
                                                    >
                                                        {livre.is_active ? <XCircleIcon className="w-5 h-5" /> : <CheckCircleIcon className="w-5 h-5" />}
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(livre.id, livre.titre)}
                                                        className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                                                        title="Supprimer"
                                                    >
                                                        <TrashIcon className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                <Pagination links={livres.links} from={livres.from} to={livres.to} total={livres.total} />
            </AdminLayout>
        </>
    );
}
