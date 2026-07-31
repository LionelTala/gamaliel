// resources/js/pages/Admin/Certifications/Index.tsx
import {
    PlusIcon,
    PencilSquareIcon,
    TrashIcon,
    EyeIcon,
    EyeSlashIcon,
    AcademicCapIcon,
    DocumentTextIcon
} from '@heroicons/react/24/outline';
import { Head, Link, router } from '@inertiajs/react';

import { useState } from 'react';
import AdminLayout from '@/Components/Layouts/AdminLayout';


interface Certification {
    id: number;
    titre: string;
    slug: string;
    duree: string;
    frais: number;
    frais_formatted: string;
    image_url: string;
    lien_externe: string | null;
    lien_label: string | null;
    is_active: boolean;
    order: number;
    formation: {
        id: number;
        name: string;
        abbreviation: string;
    } | null;
}

interface Props {
    certifications: Certification[];
}

export default function Index({ certifications }: Props) {
    const [showDeleteModal, setShowDeleteModal] = useState<number | null>(null);

    const handleToggleActive = (certification: Certification) => {
        if (confirm(`Confirmer la ${certification.is_active ? 'désactivation' : 'activation'} de ${certification.titre} ?`)) {
            router.post(`/admin/certifications/${certification.id}/toggle-active`);
        }
    };

    const handleDelete = (certification: Certification) => {
        if (confirm(`Confirmer la suppression de ${certification.titre} ? Cette action est irréversible.`)) {
            router.delete(`/admin/certifications/${certification.id}`);
        }
    };

    return (
        <>
            <Head title="Gestion des certifications - Admin" />

            <AdminLayout title="Gestion des certifications">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <p className="text-sm text-gray-500">
                        {certifications?.length ?? 0} certification{certifications?.length !== 1 ? 's' : ''} au total
                    </p>
                    <Link
                        href="/admin/certifications/create"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors"
                    >
                        <PlusIcon className="w-5 h-5" />
                        Nouvelle certification
                    </Link>
                </div>

                {/* Liste */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {!certifications || certifications.length === 0 ? (
                        <div className="text-center py-12">
                            <DocumentTextIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500 text-sm">Aucune certification trouvée</p>
                            <Link
                                href="/admin/certifications/create"
                                className="inline-block mt-4 text-cab-blue hover:text-cab-dark text-sm font-medium"
                            >
                                Créer votre première certification →
                            </Link>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Certification
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Formation
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Durée
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Frais
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Statut
                                        </th>
                                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {certifications.map((certification) => (
                                        <tr key={certification.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={certification.image_url || '/assets/images/placeholder.jpg'}
                                                        alt={certification.titre}
                                                        className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                                                        onError={(e) => {
                                                            (e.target as HTMLImageElement).src = '/assets/images/placeholder.jpg';
                                                        }}
                                                    />
                                                    <div>
                                                        <p className="font-medium text-gray-900">{certification.titre}</p>
                                                        <p className="text-xs text-gray-500">{certification.formation?.name || 'Non associée'}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="px-2 py-1 bg-blue-50 text-cab-blue rounded-md text-xs font-medium">
                                                    {certification.formation?.abbreviation || '-'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-gray-600 text-sm">
                                                {certification.duree || '-'}
                                            </td>
                                            <td className="px-4 py-3 font-semibold text-gray-900">
                                                {certification.frais_formatted || '0 FCFA'}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                                                    certification.is_active
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-red-100 text-red-700'
                                                }`}>
                                                    {certification.is_active ? 'Active' : 'Inactive'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    {certification.lien_externe && certification.lien_label && (
                                                        <a
                                                            href={certification.lien_externe}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="p-1.5 rounded-lg text-cab-blue hover:bg-blue-50 transition-colors"
                                                            title={certification.lien_label}
                                                        >
                                                            <EyeIcon className="w-5 h-5" />
                                                        </a>
                                                    )}

                                                    <button
                                                        onClick={() => handleToggleActive(certification)}
                                                        className={`p-1.5 rounded-lg transition-colors ${
                                                            certification.is_active
                                                                ? 'text-yellow-600 hover:bg-yellow-50'
                                                                : 'text-green-600 hover:bg-green-50'
                                                        }`}
                                                        title={certification.is_active ? 'Désactiver' : 'Activer'}
                                                    >
                                                        {certification.is_active ? (
                                                            <EyeSlashIcon className="w-5 h-5" />
                                                        ) : (
                                                            <EyeIcon className="w-5 h-5" />
                                                        )}
                                                    </button>

                                                    <Link
                                                        href={`/admin/certifications/${certification.id}/edit`}
                                                        className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                                                        title="Modifier"
                                                    >
                                                        <PencilSquareIcon className="w-5 h-5" />
                                                    </Link>

                                                    <button
                                                        onClick={() => handleDelete(certification)}
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
            </AdminLayout>
        </>
    );
}
