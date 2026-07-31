import {
    ClipboardDocumentListIcon,
    MagnifyingGlassIcon,
    CheckCircleIcon,
    XCircleIcon,
    ClockIcon,
    UserIcon,
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon,
    ArrowUpIcon,
    ArrowDownIcon,
} from '@heroicons/react/24/outline';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/Components/Layouts/AdminLayout';
import Pagination from '@/Components/UI/Pagination';

interface PreInscription {
    id: number;
    nom_complet: string;
    email: string;
    telephone: string;
    ville: string | null;
    formation: string;
    formation_id: string | null;
    statut: string;
    statut_label: string;
    statut_color: string;
    commentaire: string | null;
    created_at: string;
}

interface Stats {
    total: number;
    en_attente: number;
    contacte: number;
    inscrit: number;
    refuse: number;
}

interface Props {
    preInscriptions: {
        data: PreInscription[];
        links: { url: string | null; label: string; active: boolean }[];
        from: number | null;
        to: number | null;
        total: number;
    };
    stats: Stats;
    filters: {
        search: string;
        statut: string;
    };
    sort: {
        field: string;
        direction: string;
    };
}

export default function Index({ preInscriptions, stats, filters, sort }: Props) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [selectedStatut, setSelectedStatut] = useState(filters.statut || '');

    // 🚀 Helper d'envoi unifié pour les filtres et le tri
    const applyFilters = (newParams: Record<string, string>) => {
        const queryParams: Record<string, string> = {
            search: searchTerm,
            statut: selectedStatut,
            sort: sort.field || 'created_at',
            direction: sort.direction || 'desc',
            ...newParams,
        };

        // Supprimer les clés vides
        Object.keys(queryParams).forEach((key) => {
            if (!queryParams[key]) delete queryParams[key];
        });

        router.get('/admin/pre-inscriptions', queryParams, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        applyFilters({ search: searchTerm });
    };

    const handleStatutChange = (statut: string) => {
        setSelectedStatut(statut);
        applyFilters({ statut });
    };

    const handleSort = (field: string) => {
        const newDirection = sort.field === field && sort.direction === 'asc' ? 'desc' : 'asc';
        applyFilters({ sort: field, direction: newDirection });
    };

    const handleUpdateStatut = (id: number, statut: string) => {
        const commentaire = prompt('Ajouter un commentaire (optionnel) :');
        router.put(`/admin/pre-inscriptions/${id}`, {
            statut,
            commentaire: commentaire || '',
        }, {
            preserveScroll: true,
        });
    };

    const handleDelete = (id: number, nom: string) => {
        if (confirm(`Supprimer la pré-inscription de "${nom}" ?`)) {
            router.delete(`/admin/pre-inscriptions/${id}`);
        }
    };

    const SortIcon = ({ field }: { field: string }) => {
        if (sort.field !== field) {
            return <ArrowUpIcon className="w-3 h-3 text-gray-300" />;
        }
        return sort.direction === 'asc'
            ? <ArrowUpIcon className="w-3 h-3 text-cab-blue" />
            : <ArrowDownIcon className="w-3 h-3 text-cab-blue" />;
    };

    const statsCards = [
        { label: 'Total', value: stats.total, color: 'bg-blue-500', key: '' },
        { label: 'En attente', value: stats.en_attente, color: 'bg-yellow-500', key: 'en_attente' },
        { label: 'Contactés', value: stats.contacte, color: 'bg-blue-500', key: 'contacte' },
        { label: 'Inscrits', value: stats.inscrit, color: 'bg-green-500', key: 'inscrit' },
        { label: 'Refusés', value: stats.refuse, color: 'bg-red-500', key: 'refuse' },
    ];

    const getStatutIcon = (statut: string) => {
        switch (statut) {
            case 'en_attente': return <ClockIcon className="w-4 h-4" />;
            case 'contacte': return <UserIcon className="w-4 h-4" />;
            case 'inscrit': return <CheckCircleIcon className="w-4 h-4" />;
            case 'refuse': return <XCircleIcon className="w-4 h-4" />;
            default: return null;
        }
    };

    return (
        <>
            <Head title="Pré-inscriptions - Admin" />

            <AdminLayout title="Pré-inscriptions">
                {/* Statistiques */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
                    {statsCards.map((stat) => (
                        <div
                            key={stat.label}
                            onClick={() => handleStatutChange(stat.key)}
                            className={`bg-white rounded-2xl p-4 shadow-sm border transition-all cursor-pointer hover:shadow-md ${
                                selectedStatut === stat.key ? 'border-cab-blue ring-2 ring-cab-blue/10' : 'border-gray-100'
                            }`}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-0.5">{stat.value}</p>
                                </div>
                                <div className={`${stat.color} w-10 h-10 rounded-xl flex items-center justify-center text-white`}>
                                    <ClipboardDocumentListIcon className="w-5 h-5" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Barre de recherche et filtres */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6">
                    <form onSubmit={handleSearch} className="flex flex-wrap gap-3">
                        <div className="flex-1 min-w-[200px] relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Rechercher par nom, email, téléphone..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors text-sm"
                            />
                        </div>
                        <select
                            value={selectedStatut}
                            onChange={(e) => handleStatutChange(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors bg-white text-sm"
                        >
                            <option value="">Tous les statuts</option>
                            <option value="en_attente">En attente</option>
                            <option value="contacte">Contacté</option>
                            <option value="inscrit">Inscrit</option>
                            <option value="refuse">Refusé</option>
                        </select>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors"
                        >
                            Rechercher
                        </button>
                    </form>
                </div>

                {/* Liste avec tri */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {preInscriptions.data.length === 0 ? (
                        <div className="text-center py-12">
                            <ClipboardDocumentListIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500 text-sm">Aucune pré-inscription trouvée</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th
                                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                                            onClick={() => handleSort('nom_complet')}
                                        >
                                            <div className="flex items-center gap-1">
                                                Candidat
                                                <SortIcon field="nom_complet" />
                                            </div>
                                        </th>
                                        <th
                                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                                            onClick={() => handleSort('email')}
                                        >
                                            <div className="flex items-center gap-1">
                                                Contact
                                                <SortIcon field="email" />
                                            </div>
                                        </th>
                                        <th
                                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                                            onClick={() => handleSort('formation')}
                                        >
                                            <div className="flex items-center gap-1">
                                                Formation
                                                <SortIcon field="formation" />
                                            </div>
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Ville
                                        </th>
                                        <th
                                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                                            onClick={() => handleSort('statut')}
                                        >
                                            <div className="flex items-center gap-1">
                                                Statut
                                                <SortIcon field="statut" />
                                            </div>
                                        </th>
                                        <th
                                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                                            onClick={() => handleSort('created_at')}
                                        >
                                            <div className="flex items-center gap-1">
                                                Date
                                                <SortIcon field="created_at" />
                                            </div>
                                        </th>
                                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {preInscriptions.data.map((p) => (
                                        <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 rounded-full bg-cab-blue/10 text-cab-blue flex items-center justify-center text-sm font-bold">
                                                        {p.nom_complet.charAt(0).toUpperCase()}
                                                    </div>
                                                    <span className="font-medium text-gray-900">{p.nom_complet}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex flex-col text-xs">
                                                    <span className="flex items-center gap-1 text-gray-600">
                                                        <EnvelopeIcon className="w-3 h-3" />
                                                        {p.email}
                                                    </span>
                                                    <span className="flex items-center gap-1 text-gray-500 mt-0.5">
                                                        <PhoneIcon className="w-3 h-3" />
                                                        {p.telephone}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-gray-700 text-xs font-medium">
                                                {p.formation}
                                            </td>
                                            <td className="px-4 py-3">
                                                {p.ville ? (
                                                    <span className="flex items-center gap-1 text-xs text-gray-600">
                                                        <MapPinIcon className="w-3 h-3" />
                                                        {p.ville}
                                                    </span>
                                                ) : (
                                                    <span className="text-xs text-gray-400">-</span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${p.statut_color || 'bg-gray-100 text-gray-800'}`}>
                                                    {getStatutIcon(p.statut)}
                                                    {p.statut_label || p.statut}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-gray-500 text-xs">
                                                {p.created_at}
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    <select
                                                        value={p.statut}
                                                        onChange={(e) => handleUpdateStatut(p.id, e.target.value)}
                                                        className="text-xs border border-gray-300 rounded-lg px-2 py-1 focus:ring-2 focus:ring-cab-blue focus:border-cab-blue"
                                                    >
                                                        <option value="en_attente">En attente</option>
                                                        <option value="contacte">Contacté</option>
                                                        <option value="inscrit">Inscrit</option>
                                                        <option value="refuse">Refusé</option>
                                                    </select>
                                                    <button
                                                        onClick={() => handleDelete(p.id, p.nom_complet)}
                                                        className="p-1 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Supprimer"
                                                    >
                                                        <XCircleIcon className="w-4 h-4" />
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

                {/* Pagination */}
                <div className="mt-4">
                    <Pagination
                        links={preInscriptions.links}
                        from={preInscriptions.from}
                        to={preInscriptions.to}
                        total={preInscriptions.total}
                    />
                </div>
            </AdminLayout>
        </>
    );
}
