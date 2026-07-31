// resources/js/pages/Admin/Vagues/Index.tsx
import {
    PlusIcon,
    PencilSquareIcon,
    TrashIcon,
    EyeIcon,
    EyeSlashIcon,
    CalendarIcon,
    UserGroupIcon
} from '@heroicons/react/24/outline';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

import AdminLayout from '@/Components/Layouts/AdminLayout';


interface Vague {
    id: number;
    name: string;
    date_debut: string;
    date_fin: string;
    formatted_dates: string;
    capacite: number | null;
    inscrits: number;
    places_restantes: number;
    taux_remplissage: number;
    statut: string;
    is_active: boolean;
    order: number;
    formation: {
        id: number;
        name: string;
        abbreviation: string;
    } | null;
}

interface Props {
    vagues: Vague[];
}

export default function Index({ vagues }: Props) {
    const [showDeleteModal, setShowDeleteModal] = useState<number | null>(null);

    const handleToggleActive = (vague: Vague) => {
        if (confirm(`Confirmer la ${vague.is_active ? 'désactivation' : 'activation'} de ${vague.name} ?`)) {
            router.post(`/admin/vagues/${vague.id}/toggle-active`);
        }
    };

    const handleDelete = (vague: Vague) => {
        if (confirm(`Confirmer la suppression de ${vague.name} ? Cette action est irréversible.`)) {
            router.delete(`/admin/vagues/${vague.id}`);
        }
    };

    const getStatutColor = (statut: string) => {
        const colors: Record<string, string> = {
            'À venir': 'bg-blue-100 text-blue-700',
            'En cours': 'bg-green-100 text-green-700',
            'Terminée': 'bg-gray-100 text-gray-700',
            'Inactive': 'bg-red-100 text-red-700',
        };
        return colors[statut] || 'bg-gray-100 text-gray-700';
    };

    const getTauxColor = (taux: number) => {
        if (taux >= 80) return 'text-green-600';
        if (taux >= 50) return 'text-yellow-600';
        return 'text-red-600';
    };

    return (
        <>
            <Head title="Gestion des vagues - Admin" />

            <AdminLayout title="Gestion des vagues">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <p className="text-sm text-gray-500">
                        {vagues?.length ?? 0} vague{vagues?.length !== 1 ? 's' : ''} au total
                    </p>
                    <Link
                        href="/admin/vagues/create"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors"
                    >
                        <PlusIcon className="w-5 h-5" />
                        Nouvelle vague
                    </Link>
                </div>

                {/* Liste */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {!vagues || vagues.length === 0 ? (
                        <div className="text-center py-12">
                            <CalendarIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500 text-sm">Aucune vague trouvée</p>
                            <Link
                                href="/admin/vagues/create"
                                className="inline-block mt-4 text-cab-blue hover:text-cab-dark text-sm font-medium"
                            >
                                Créer votre première vague →
                            </Link>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Vague
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Formation
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Période
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Places
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Taux
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
                                    {vagues.map((vague) => (
                                        <tr key={vague.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-lg bg-cab-blue/10 text-cab-blue flex items-center justify-center">
                                                        <CalendarIcon className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-900">{vague.name}</p>
                                                        <p className="text-xs text-gray-500">Ordre: {vague.order}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="px-2 py-1 bg-blue-50 text-cab-blue rounded-md text-xs font-medium">
                                                    {vague.formation?.abbreviation || '-'}
                                                </span>
                                                <p className="text-xs text-gray-500 mt-0.5">{vague.formation?.name || 'Non associée'}</p>
                                            </td>
                                            <td className="px-4 py-3 text-gray-600 text-sm">
                                                {vague.formatted_dates}
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium text-gray-900">
                                                        {vague.inscrits} / {vague.capacite ?? '∞'}
                                                    </span>
                                                    {vague.capacite && (
                                                        <span className="text-xs text-gray-500">
                                                            {vague.places_restantes} restantes
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                {vague.capacite ? (
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                                            <div
                                                                className={`h-full rounded-full ${
                                                                    vague.taux_remplissage >= 80 ? 'bg-green-500' :
                                                                    vague.taux_remplissage >= 50 ? 'bg-yellow-500' :
                                                                    'bg-red-500'
                                                                }`}
                                                                style={{ width: `${Math.min(vague.taux_remplissage, 100)}%` }}
                                                            />
                                                        </div>
                                                        <span className={`text-xs font-medium ${getTauxColor(vague.taux_remplissage)}`}>
                                                            {vague.taux_remplissage}%
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <span className="text-xs text-gray-400">Illimitée</span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatutColor(vague.statut)}`}>
                                                    {vague.statut}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => handleToggleActive(vague)}
                                                        className={`p-1.5 rounded-lg transition-colors ${
                                                            vague.is_active
                                                                ? 'text-yellow-600 hover:bg-yellow-50'
                                                                : 'text-green-600 hover:bg-green-50'
                                                        }`}
                                                        title={vague.is_active ? 'Désactiver' : 'Activer'}
                                                    >
                                                        {vague.is_active ? (
                                                            <EyeSlashIcon className="w-5 h-5" />
                                                        ) : (
                                                            <EyeIcon className="w-5 h-5" />
                                                        )}
                                                    </button>

                                                    <Link
                                                        href={`/admin/vagues/${vague.id}/edit`}
                                                        className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                                                        title="Modifier"
                                                    >
                                                        <PencilSquareIcon className="w-5 h-5" />
                                                    </Link>

                                                    <button
                                                        onClick={() => handleDelete(vague)}
                                                        className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                                                        title="Supprimer"
                                                        disabled={vague.inscrits > 0}
                                                    >
                                                        <TrashIcon className={`w-5 h-5 ${vague.inscrits > 0 ? 'opacity-40 cursor-not-allowed' : ''}`} />
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
