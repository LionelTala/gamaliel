// resources/js/pages/Admin/Activites/Index.tsx
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Components/Layouts/AdminLayout';
import {
    PlusIcon,
    PencilSquareIcon,
    TrashIcon,
    EyeIcon,
    EyeSlashIcon,
    CalendarIcon,
    TagIcon,
    MapPinIcon,
    ClockIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import Pagination from '@/Components/UI/Pagination';

interface Activite {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    description: string | null;
    image: string | null;
    image_url: string;
    tag: string | null;
    date: string;
    formatted_date: string;
    lieu: string | null;
    heure: string | null;
    is_active: boolean;
    status: string;
    status_color: string;
    ordre: number;
    created_at: string;
}

interface PaginationData {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: { url: string | null; label: string; active: boolean }[];
}

interface Props {
    activites: Activite[];
    pagination: PaginationData;
}

export default function Index({ activites, pagination }: Props) {
    const [showDeleteModal, setShowDeleteModal] = useState<number | null>(null);

    const handleToggleActive = (activite: Activite) => {
        if (confirm(`Confirmer la ${activite.is_active ? 'désactivation' : 'activation'} de "${activite.title}" ?`)) {
            router.post(`/admin/activites/${activite.id}/toggle-active`);
        }
    };

    const handleDelete = (activite: Activite) => {
        if (confirm(`Confirmer la suppression de "${activite.title}" ? Cette action est irréversible.`)) {
            router.delete(`/admin/activites/${activite.id}`);
        }
    };

    const getStatusBadge = (status: string, color: string) => {
        const colors: Record<string, string> = {
            green: 'bg-green-100 text-green-700',
            red: 'bg-red-100 text-red-700',
            gray: 'bg-gray-100 text-gray-600',
        };

        return (
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${colors[color] || colors.gray}`}>
                {status}
            </span>
        );
    };

    return (
        <>
            <Head title="Gestion des activités - Admin" />

            <AdminLayout title="Gestion des activités">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <p className="text-sm text-gray-500">
                        {pagination.total} activité{pagination.total > 1 ? 's' : ''} au total
                    </p>
                    <Link
                        href="/admin/activites/create"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors"
                    >
                        <PlusIcon className="w-5 h-5" />
                        Nouvelle activité
                    </Link>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {activites.length === 0 ? (
                        <div className="text-center py-12">
                            <CalendarIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500 text-sm">Aucune activité</p>
                            <Link
                                href="/admin/activites/create"
                                className="inline-block mt-4 text-cab-blue hover:text-cab-dark text-sm font-medium"
                            >
                                Créer votre première activité →
                            </Link>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Activité
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Tag
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Statut
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Ordre
                                        </th>
                                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {activites.map((activite) => (
                                        <tr key={activite.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={activite.image_url}
                                                        alt={activite.title}
                                                        className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                                                    />
                                                    <div>
                                                        <p className="font-medium text-gray-900 line-clamp-1">{activite.title}</p>
                                                        <p className="text-xs text-gray-500 line-clamp-1">{activite.excerpt}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex flex-col">
                                                    <span className="text-sm text-gray-600">{activite.formatted_date}</span>
                                                    {activite.heure && (
                                                        <span className="text-xs text-gray-400 flex items-center gap-1">
                                                            <ClockIcon className="w-3 h-3" />
                                                            {activite.heure}
                                                        </span>
                                                    )}
                                                    {activite.lieu && (
                                                        <span className="text-xs text-gray-400 flex items-center gap-1">
                                                            <MapPinIcon className="w-3 h-3" />
                                                            {activite.lieu}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                {activite.tag ? (
                                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                                                        <TagIcon className="w-3 h-3" />
                                                        {activite.tag}
                                                    </span>
                                                ) : (
                                                    <span className="text-xs text-gray-400">-</span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3">
                                                {getStatusBadge(activite.status, activite.status_color)}
                                            </td>
                                            <td className="px-4 py-3 text-gray-500 text-sm">
                                                {activite.ordre}
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => handleToggleActive(activite)}
                                                        className={`p-1.5 rounded-lg transition-colors ${
                                                            activite.is_active
                                                                ? 'text-yellow-600 hover:bg-yellow-50'
                                                                : 'text-green-600 hover:bg-green-50'
                                                        }`}
                                                        title={activite.is_active ? 'Désactiver' : 'Activer'}
                                                    >
                                                        {activite.is_active ? (
                                                            <EyeSlashIcon className="w-5 h-5" />
                                                        ) : (
                                                            <EyeIcon className="w-5 h-5" />
                                                        )}
                                                    </button>

                                                    <Link
                                                        href={`/admin/activites/${activite.id}/edit`}
                                                        className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                                                        title="Modifier"
                                                    >
                                                        <PencilSquareIcon className="w-5 h-5" />
                                                    </Link>

                                                    <button
                                                        onClick={() => handleDelete(activite)}
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
                {pagination && pagination.last_page > 1 && (
                    <Pagination
                        links={pagination.links}
                        currentPage={pagination.current_page}
                        lastPage={pagination.last_page}
                        total={pagination.total}
                        perPage={pagination.per_page}
                    />
                )}
            </AdminLayout>
        </>
    );
}