// resources/js/pages/Admin/Galerie/Index.tsx
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Components/Layouts/AdminLayout';
import {
    PlusIcon,
    PencilSquareIcon,
    TrashIcon,
    EyeIcon,
    EyeSlashIcon,
    PhotoIcon,
    VideoCameraIcon,
    DocumentTextIcon,
    ArrowUpIcon,
    ArrowDownIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import Pagination from '@/Components/UI/Pagination';

interface Media {
    id: number;
    titre: string;
    description: string | null;
    fichier: string;
    url: string;
    type: string;
    type_label: string;
    type_icon: string;
    mime_type: string;
    taille: number;
    taille_formatted: string;
    is_image: boolean;
    is_video: boolean;
    is_pdf: boolean;
    is_active: boolean;
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
    medias: Media[];
    pagination: PaginationData;
}

export default function Index({ medias, pagination }: Props) {
    const [showDeleteModal, setShowDeleteModal] = useState<number | null>(null);

    const handleToggleActive = (media: Media) => {
        if (confirm(`Confirmer la ${media.is_active ? 'désactivation' : 'activation'} de "${media.titre}" ?`)) {
            router.post(`/admin/galerie/${media.id}/toggle-active`);
        }
    };

    const handleDelete = (media: Media) => {
        if (confirm(`Confirmer la suppression de "${media.titre}" ? Cette action est irréversible.`)) {
            router.delete(`/admin/galerie/${media.id}`);
        }
    };

    const getTypeIcon = (media: Media) => {
        if (media.is_image) return <PhotoIcon className="w-5 h-5 text-blue-500" />;
        if (media.is_video) return <VideoCameraIcon className="w-5 h-5 text-red-500" />;
        return <DocumentTextIcon className="w-5 h-5 text-gray-500" />;
    };

    const getTypeBadge = (media: Media) => {
        const colors: Record<string, string> = {
            image: 'bg-blue-100 text-blue-700',
            video: 'bg-red-100 text-red-700',
            pdf: 'bg-orange-100 text-orange-700',
            document: 'bg-gray-100 text-gray-700',
        };
        return (
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors[media.type] || colors.document}`}>
                {media.type_label}
            </span>
        );
    };

    return (
        <>
            <Head title="Gestion de la galerie - Admin" />

            <AdminLayout title="Galerie média">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <p className="text-sm text-gray-500">
                        {pagination.total} média{pagination.total > 1 ? 's' : ''} au total
                    </p>
                    <Link
                        href="/admin/galerie/create"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors"
                    >
                        <PlusIcon className="w-5 h-5" />
                        Ajouter un média
                    </Link>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {medias.length === 0 ? (
                        <div className="text-center py-12">
                            <PhotoIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500 text-sm">Aucun média dans la galerie</p>
                            <Link
                                href="/admin/galerie/create"
                                className="inline-block mt-4 text-cab-blue hover:text-cab-dark text-sm font-medium"
                            >
                                Ajouter votre premier média →
                            </Link>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Aperçu
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Titre
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Type
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Taille
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Statut
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Ordre
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Ajouté le
                                        </th>
                                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {medias.map((media) => (
                                        <tr key={media.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-4 py-3">
                                                {media.is_image ? (
                                                    <img
                                                        src={media.url}
                                                        alt={media.titre}
                                                        className="w-16 h-12 rounded-lg object-cover border border-gray-200"
                                                    />
                                                ) : media.is_video ? (
                                                    <video
                                                        src={media.url}
                                                        className="w-16 h-12 rounded-lg object-cover border border-gray-200"
                                                    />
                                                ) : (
                                                    <div className="w-16 h-12 rounded-lg bg-gray-100 flex items-center justify-center border border-gray-200">
                                                        {getTypeIcon(media)}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-4 py-3">
                                                <p className="font-medium text-gray-900 line-clamp-1">{media.titre}</p>
                                                {media.description && (
                                                    <p className="text-xs text-gray-500 line-clamp-1">{media.description}</p>
                                                )}
                                            </td>
                                            <td className="px-4 py-3">
                                                {getTypeBadge(media)}
                                            </td>
                                            <td className="px-4 py-3 text-gray-500 text-xs">
                                                {media.taille_formatted}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                                                    media.is_active 
                                                        ? 'bg-green-100 text-green-700' 
                                                        : 'bg-red-100 text-red-700'
                                                }`}>
                                                    {media.is_active ? 'Actif' : 'Inactif'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-gray-500 text-sm">
                                                {media.ordre}
                                            </td>
                                            <td className="px-4 py-3 text-gray-500 text-xs">
                                                {media.created_at}
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => handleToggleActive(media)}
                                                        className={`p-1.5 rounded-lg transition-colors ${
                                                            media.is_active
                                                                ? 'text-yellow-600 hover:bg-yellow-50'
                                                                : 'text-green-600 hover:bg-green-50'
                                                        }`}
                                                        title={media.is_active ? 'Désactiver' : 'Activer'}
                                                    >
                                                        {media.is_active ? (
                                                            <EyeSlashIcon className="w-5 h-5" />
                                                        ) : (
                                                            <EyeIcon className="w-5 h-5" />
                                                        )}
                                                    </button>

                                                    <Link
                                                        href={`/admin/galerie/${media.id}/edit`}
                                                        className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                                                        title="Modifier"
                                                    >
                                                        <PencilSquareIcon className="w-5 h-5" />
                                                    </Link>

                                                    <button
                                                        onClick={() => handleDelete(media)}
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