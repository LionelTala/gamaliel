 // resources/js/pages/Admin/Cours/Index.tsx
import {
    PlusIcon,
    PencilSquareIcon,
    TrashIcon,
    EyeIcon,
    EyeSlashIcon,
    BookOpenIcon,
    DocumentTextIcon,
    VideoCameraIcon,
    UserGroupIcon,
    UserIcon,
    MagnifyingGlassIcon,
    FunnelIcon,
    XMarkIcon,
    AcademicCapIcon,
} from '@heroicons/react/24/outline';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/Components/Layouts/AdminLayout';
import Pagination from '@/Components/UI/Pagination';

interface Cours {
    id: number;
    titre: string;
    description: string | null;
    type: string;
    viewed_count: number;
    is_active: boolean;
    has_video: boolean;
    has_files: boolean;
    total_students: number;
    lessons_count: number;
    mode_envoi: 'groupe' | 'individuel';
    tranche_requise: {
        id: number;
        numero: number;
        montant: number;
    } | null;
    formation: {
        id: number;
        name: string;
    } | null;
    vague: {
        id: number;
        name: string;
    } | null;
    certification: {
        id: number;
        titre: string;
    } | null;
    created_at: string;
    notification_sent: boolean;
}

interface Formation {
    id: number;
    name: string;
    abbreviation: string;
}

interface Stats {
    total: number;
    actifs: number;
    inactifs: number;
    vague: number;
    certification: number;
}

interface Props {
    cours: {
        data: Cours[];
        links: { url: string | null; label: string; active: boolean }[];
        from: number | null;
        to: number | null;
        total: number;
    };
    formations: Formation[];
    stats: Stats;
    filters: {
        search: string | null;
        formation_id: string | null;
    };
    sort: {
        field: string;
        direction: string;
    };
}

export default function Index({ cours, formations, stats, filters, sort }: Props) {
    const [showFilters, setShowFilters] = useState(false);
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [selectedFormation, setSelectedFormation] = useState(filters.formation_id || '');

    const handleToggleActive = (c: Cours) => {
        if (confirm(`Confirmer la ${c.is_active ? 'désactivation' : 'activation'} du cours "${c.titre}" ?`)) {
            router.post(`/admin/cours/${c.id}/toggle-active`);
        }
    };

    const handleDelete = (c: Cours) => {
        if (confirm(`Confirmer la suppression du cours "${c.titre}" ? Cette action est irréversible.`)) {
            router.delete(`/admin/cours/${c.id}`);
        }
    };

    const handleResendNotification = (c: Cours) => {
        if (confirm(`Renvoyer les notifications pour le cours "${c.titre}" ?`)) {
            router.post(`/admin/cours/${c.id}/resend-notifications`);
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        applyFilters();
    };

    const applyFilters = () => {
        const params = new URLSearchParams();
        if (searchTerm) params.set('search', searchTerm);
        if (selectedFormation) params.set('formation_id', selectedFormation);
        if (sort.field) params.set('sort', sort.field);
        if (sort.direction) params.set('direction', sort.direction);

        router.get(`/admin/cours${params.toString() ? '?' + params.toString() : ''}`);
    };

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedFormation('');
        router.get('/admin/cours');
    };

    // ✅ Gestion du tri par colonne
    const handleSort = (field: string) => {
        const newDirection = sort.field === field && sort.direction === 'asc' ? 'desc' : 'asc';

        const params = new URLSearchParams();
        if (searchTerm) params.set('search', searchTerm);
        if (selectedFormation) params.set('formation_id', selectedFormation);
        params.set('sort', field);
        params.set('direction', newDirection);

        router.get(`/admin/cours?${params.toString()}`);
    };

    const SortIcon = ({ field }: { field: string }) => {
        if (sort.field !== field) return <span className="text-gray-300 ml-1">↕</span>;
        return <span className="text-cab-blue ml-1">{sort.direction === 'asc' ? '↑' : '↓'}</span>;
    };

    const statsCards = [
        { label: 'Total', value: stats.total, color: 'bg-blue-500' },
        { label: 'Actifs', value: stats.actifs, color: 'bg-green-500' },
        { label: 'Inactifs', value: stats.inactifs, color: 'bg-gray-500' },
        { label: 'Vagues', value: stats.vague, color: 'bg-purple-500' },
        { label: 'Certifications', value: stats.certification, color: 'bg-orange-500' },
    ];

    return (
        <>
            <Head title="Gestion des cours - Admin" />

            <AdminLayout title="Gestion des cours">
                {/* Statistiques */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
                    {statsCards.map((stat) => (
                        <div
                            key={stat.label}
                            className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-0.5">{stat.value}</p>
                                </div>
                                <div className={`${stat.color} w-10 h-10 rounded-xl flex items-center justify-center text-white`}>
                                    <BookOpenIcon className="w-5 h-5" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Barre de recherche et filtre par formation */}
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
                                    placeholder="Rechercher un cours..."
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
                            {filters.formation_id && (
                                <span className="w-2 h-2 bg-cab-blue rounded-full"></span>
                            )}
                        </button>

                        {(filters.formation_id || filters.search) && (
                            <button
                                onClick={clearFilters}
                                className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors flex items-center gap-1"
                            >
                                <XMarkIcon className="w-4 h-4" />
                                Effacer
                            </button>
                        )}

                        <Link
                            href="/admin/cours/create"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors"
                        >
                            <PlusIcon className="w-5 h-5" />
                            Nouveau cours
                        </Link>
                    </div>

                    {showFilters && (
                        <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Formation</label>
                                <select
                                    value={selectedFormation}
                                    onChange={(e) => setSelectedFormation(e.target.value)}
                                    className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors bg-white"
                                >
                                    <option value="">Toutes les formations</option>
                                    {formations.map((f) => (
                                        <option key={f.id} value={f.id}>
                                            {f.name} ({f.abbreviation})
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}

                    {showFilters && (
                        <div className="mt-3 flex justify-end">
                            <button
                                onClick={applyFilters}
                                className="px-4 py-2 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors"
                            >
                                Appliquer le filtre
                            </button>
                        </div>
                    )}
                </div>

                {/* Tableau */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {cours.data.length === 0 ? (
                        <div className="text-center py-12">
                            <BookOpenIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500 text-sm">Aucun cours trouvé</p>
                            <Link
                                href="/admin/cours/create"
                                className="inline-block mt-4 text-cab-blue hover:text-cab-dark text-sm font-medium"
                            >
                                Créer votre premier cours →
                            </Link>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            <button onClick={() => handleSort('titre')} className="flex items-center hover:text-cab-blue transition-colors">
                                                Cours <SortIcon field="titre" />
                                            </button>
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Formation
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            <button onClick={() => handleSort('type')} className="flex items-center hover:text-cab-blue transition-colors">
                                                Type <SortIcon field="type" />
                                            </button>
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Envoi
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Leçons
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            <button onClick={() => handleSort('viewed_count')} className="flex items-center hover:text-cab-blue transition-colors">
                                                Vues <SortIcon field="viewed_count" />
                                            </button>
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Contenu
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Notif.
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            <button onClick={() => handleSort('is_active')} className="flex items-center hover:text-cab-blue transition-colors">
                                                Statut <SortIcon field="is_active" />
                                            </button>
                                        </th>
                                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {cours.data.map((c) => (
                                        <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-2">
                                                    <BookOpenIcon className="w-5 h-5 text-cab-blue" />
                                                    <div>
                                                        <p className="font-medium text-gray-900 line-clamp-1">
                                                            {c.titre}
                                                        </p>
                                                        <p className="text-xs text-gray-500 line-clamp-1">
                                                            {c.description || 'Aucune description'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-gray-600 text-xs">
                                                {c.formation?.name || '-'}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                                    c.type === 'vague'
                                                        ? 'bg-blue-100 text-blue-700'
                                                        : 'bg-purple-100 text-purple-700'
                                                }`}>
                                                    {c.type === 'vague' ? 'Vague' : 'Certification'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                                                    c.mode_envoi === 'individuel'
                                                        ? 'bg-purple-100 text-purple-700'
                                                        : 'bg-blue-100 text-blue-700'
                                                }`}>
                                                    {c.mode_envoi === 'individuel' ? (
                                                        <UserIcon className="w-3 h-3" />
                                                    ) : (
                                                        <UserGroupIcon className="w-3 h-3" />
                                                    )}
                                                    {c.mode_envoi === 'individuel' ? 'Individuel' : 'Groupe'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                                                    <AcademicCapIcon className="w-3 h-3" />
                                                    {c.lessons_count}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-gray-600 text-sm">
                                                {c.viewed_count} / {c.total_students}
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-1">
                                                    {c.has_video && (
                                                        <VideoCameraIcon className="w-4 h-4 text-red-500" title="Vidéo" />
                                                    )}
                                                    {c.has_files && (
                                                        <DocumentTextIcon className="w-4 h-4 text-blue-500" title="Fichiers" />
                                                    )}
                                                    {!c.has_video && !c.has_files && (
                                                        <span className="text-xs text-gray-400">-</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                {c.notification_sent ? (
                                                    <span className="text-xs text-green-600">✅ Envoyée</span>
                                                ) : (
                                                    <button
                                                        onClick={() => handleResendNotification(c)}
                                                        className="text-xs text-yellow-600 hover:text-yellow-800"
                                                    >
                                                        📤 Envoyer
                                                    </button>
                                                )}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                                                    c.is_active
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-red-100 text-red-700'
                                                }`}>
                                                    {c.is_active ? 'Actif' : 'Inactif'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => handleToggleActive(c)}
                                                        className={`p-1.5 rounded-lg transition-colors ${
                                                            c.is_active
                                                                ? 'text-yellow-600 hover:bg-yellow-50'
                                                                : 'text-green-600 hover:bg-green-50'
                                                        }`}
                                                        title={c.is_active ? 'Désactiver' : 'Activer'}
                                                    >
                                                        {c.is_active ? (
                                                            <EyeSlashIcon className="w-5 h-5" />
                                                        ) : (
                                                            <EyeIcon className="w-5 h-5" />
                                                        )}
                                                    </button>

                                                    <Link
                                                        href={`/admin/cours/${c.id}`}
                                                        className="p-1.5 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                                                        title="Voir"
                                                    >
                                                        <EyeIcon className="w-5 h-5" />
                                                    </Link>

                                                    <Link
                                                        href={`/admin/cours/${c.id}/edit`}
                                                        className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                                                        title="Modifier"
                                                    >
                                                        <PencilSquareIcon className="w-5 h-5" />
                                                    </Link>

                                                    <button
                                                        onClick={() => handleDelete(c)}
                                                        className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
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

                {/* Pagination */}
                <div className="mt-4">
                    <Pagination
                        links={cours.links}
                        from={cours.from}
                        to={cours.to}
                        total={cours.total}
                    />
                </div>
            </AdminLayout>
        </>
    );
}
