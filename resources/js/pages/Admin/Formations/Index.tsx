// resources/js/pages/Admin/Formations/Index.tsx
import {
    PlusIcon,
    PencilSquareIcon,
    TrashIcon,
    EyeIcon,
    EyeSlashIcon,
    AcademicCapIcon,
    BookOpenIcon,
    ClockIcon,
    CurrencyDollarIcon,
} from '@heroicons/react/24/outline';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/Components/Layouts/AdminLayout';

interface Formation {
    id: number;
    name: string;
    abbreviation: string;
    slug: string;
    description: string;
    debouches: string | string[] | null;
    duration: string;
    diplome: string;
    frais: number;
    frais_formatted: string;
    image: string | null;
    image_url: string;
    lien_externe: string | null;
    lien_label: string | null;
    is_active: boolean;
    order: number;
    type: 'enligne' | 'presentiel';
    // Champs spécifiques présentiel
    icon?: string;
    tags?: string[];
    programme?: string[];
    couleur?: 'blue' | 'red';
}

interface Props {
    formations: Formation[];
    currentType: 'enligne' | 'presentiel';
}

export default function Index({ formations, currentType }: Props) {
    const [type, setType] = useState<'enligne' | 'presentiel'>(currentType || 'enligne');

    const handleToggleActive = (formation: Formation) => {
        if (confirm(`Confirmer la ${formation.is_active ? 'désactivation' : 'activation'} de la formation "${formation.name}" ?`)) {
            router.post(`/admin/formations/${formation.id}/toggle-active?type=${type}`);
        }
    };

    const handleDelete = (formation: Formation) => {
        if (confirm(`Confirmer la suppression de la formation "${formation.name}" ? Cette action est irréversible.`)) {
            router.delete(`/admin/formations/${formation.id}?type=${type}`);
        }
    };

    const handleTypeChange = (newType: 'enligne' | 'presentiel') => {
        setType(newType);
        router.get('/admin/formations', { type: newType }, { preserveState: true });
    };

    const getCreateRoute = () => {
        return type === 'enligne' ? '/admin/formations/create?type=enligne' : '/admin/formations/create-presentiel?type=presentiel';
    };

    const getEditRoute = (formation: Formation) => {
        return type === 'enligne'
            ? `/admin/formations/${formation.id}/edit?type=enligne`
            : `/admin/formations/${formation.id}/edit-presentiel?type=presentiel`;
    };

    return (
        <>
            <Head title="Gestion des formations - Admin" />

            <AdminLayout title="Gestion des formations">
                {/* ✅ Boutons de bascule et Ajouter */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div className="flex gap-2">
                        <button
                            onClick={() => handleTypeChange('enligne')}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                                type === 'enligne'
                                    ? 'bg-cab-blue text-white shadow-md'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            💻 En ligne
                        </button>
                        <button
                            onClick={() => handleTypeChange('presentiel')}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                                type === 'presentiel'
                                    ? 'bg-cab-blue text-white shadow-md'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            📍 Présentiel
                        </button>
                    </div>

                    <Link
                        href={getCreateRoute()}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors"
                    >
                        <PlusIcon className="w-5 h-5" />
                        {type === 'enligne' ? 'Nouvelle formation en ligne' : 'Nouvelle formation présentiel'}
                    </Link>
                </div>

                {/* Liste des formations */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {formations.length === 0 ? (
                        <div className="text-center py-12">
                            <AcademicCapIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500 text-sm">
                                {type === 'enligne'
                                    ? 'Aucune formation en ligne trouvée'
                                    : 'Aucune formation présentiel trouvée'}
                            </p>
                            <Link
                                href={getCreateRoute()}
                                className="inline-block mt-4 text-cab-blue hover:text-cab-dark text-sm font-medium"
                            >
                                {type === 'enligne'
                                    ? 'Créer votre première formation en ligne →'
                                    : 'Créer votre première formation présentiel →'}
                            </Link>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Formation
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Abrév.
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Durée
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Prix
                                        </th>
                                        {type === 'presentiel' && (
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Icône
                                            </th>
                                        )}
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Statut
                                        </th>
                                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {formations.map((formation) => (
                                        <tr key={formation.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-2">
                                                    {formation.image_url ? (
                                                        <img
                                                            src={formation.image_url}
                                                            alt={formation.name}
                                                            className="w-10 h-10 rounded-lg object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                                                            <AcademicCapIcon className="w-5 h-5 text-gray-400" />
                                                        </div>
                                                    )}
                                                    <div>
                                                        <p className="font-medium text-gray-900 line-clamp-1">
                                                            {formation.name}
                                                        </p>
                                                        <p className="text-xs text-gray-500 line-clamp-1">
                                                            {formation.description?.substring(0, 60) || 'Aucune description'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-gray-600 text-xs font-mono">
                                                {formation.abbreviation}
                                            </td>
                                            <td className="px-4 py-3 text-gray-600 text-xs">
                                                {formation.duration}
                                            </td>
                                            <td className="px-4 py-3 text-gray-900 font-medium text-xs">
                                                {formation.frais_formatted || '0 FCFA'}
                                            </td>
                                            {type === 'presentiel' && (
                                                <td className="px-4 py-3 text-2xl">
                                                    {formation.icon || '📚'}
                                                </td>
                                            )}
                                            <td className="px-4 py-3">
                                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                                                    formation.is_active
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-red-100 text-red-700'
                                                }`}>
                                                    {formation.is_active ? 'Actif' : 'Inactif'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => handleToggleActive(formation)}
                                                        className={`p-1.5 rounded-lg transition-colors ${
                                                            formation.is_active
                                                                ? 'text-yellow-600 hover:bg-yellow-50'
                                                                : 'text-green-600 hover:bg-green-50'
                                                        }`}
                                                        title={formation.is_active ? 'Désactiver' : 'Activer'}
                                                    >
                                                        {formation.is_active ? (
                                                            <EyeSlashIcon className="w-5 h-5" />
                                                        ) : (
                                                            <EyeIcon className="w-5 h-5" />
                                                        )}
                                                    </button>

                                                    <Link
                                                        href={getEditRoute(formation)}
                                                        className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                                                        title="Modifier"
                                                    >
                                                        <PencilSquareIcon className="w-5 h-5" />
                                                    </Link>

                                                    <button
                                                        onClick={() => handleDelete(formation)}
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
