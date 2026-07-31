// resources/js/pages/Admin/Devoirs/Index.tsx
import {
    PlusIcon,
    PencilSquareIcon,
    TrashIcon,
    EyeIcon,
    EyeSlashIcon,
    ClipboardDocumentListIcon,
    ClockIcon,
    CheckCircleIcon,
    XCircleIcon,
    DocumentTextIcon,
    UserGroupIcon,
    UserIcon,
} from '@heroicons/react/24/outline';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/Components/Layouts/AdminLayout';
import Pagination from '@/Components/UI/Pagination';

interface Devoir {
    id: number;
    titre: string;
    description: string | null;
    date_limite: string | null;
    type: string;
    mode_envoi: 'groupe' | 'individuel';
    tranche_requise: {
        id: number;
        numero: number;
        montant: number;
    } | null;
    est_depasse: boolean;
    jours_restants: number | null;
    total_etudiants: number;
    soumissions_count: number;
    soumis_count: number;
    corrige_count: number;
    taux_soumission: number;
    is_active: boolean;
    has_notification_sent: boolean;
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
}

interface Props {
    devoirs: {
        data: Devoir[];
        links: { url: string | null; label: string; active: boolean }[];
        from: number | null;
        to: number | null;
        total: number;
    };
}

export default function Index({ devoirs }: Props) {
    const [showDeleteModal, setShowDeleteModal] = useState<number | null>(null);

    const handleToggleActive = (d: Devoir) => {
        if (confirm(`Confirmer la ${d.is_active ? 'désactivation' : 'activation'} du devoir "${d.titre}" ?`)) {
            router.post(`/admin/devoirs/${d.id}/toggle-active`);
        }
    };

    const handleDelete = (d: Devoir) => {
        if (confirm(`Confirmer la suppression du devoir "${d.titre}" ? Cette action est irréversible.`)) {
            router.delete(`/admin/devoirs/${d.id}`);
        }
    };

    const handleResendNotification = (d: Devoir) => {
        if (confirm(`Renvoyer les notifications pour le devoir "${d.titre}" ?`)) {
            router.post(`/admin/devoirs/${d.id}/resend-notifications`);
        }
    };

    const getStatutBadge = (devoir: Devoir) => {
        if (!devoir.is_active) {
            return <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">Inactif</span>;
        }
        if (devoir.est_depasse) {
            return <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-medium flex items-center gap-1">
                <XCircleIcon className="w-3 h-3" />
                Dépassé
            </span>;
        }
        if (devoir.jours_restants !== null && devoir.jours_restants <= 3) {
            return <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium flex items-center gap-1">
                <ClockIcon className="w-3 h-3" />
                Bientôt fin
            </span>;
        }
        return <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1">
            <CheckCircleIcon className="w-3 h-3" />
            Actif
        </span>;
    };

    return (
        <>
            <Head title="Gestion des devoirs - Admin" />

            <AdminLayout title="Gestion des devoirs">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <p className="text-sm text-gray-500">
                        {devoirs.total} devoir{devoirs.total !== 1 ? 's' : ''} au total
                    </p>
                    <Link
                        href="/admin/devoirs/create"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors"
                    >
                        <PlusIcon className="w-5 h-5" />
                        Nouveau devoir
                    </Link>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {devoirs.data.length === 0 ? (
                        <div className="text-center py-12">
                            <ClipboardDocumentListIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500 text-sm">Aucun devoir trouvé</p>
                            <Link
                                href="/admin/devoirs/create"
                                className="inline-block mt-4 text-cab-blue hover:text-cab-dark text-sm font-medium"
                            >
                                Créer votre premier devoir →
                            </Link>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Devoir
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Formation
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Type
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Envoi
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Tranche
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date limite
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Soumissions
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Statut
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Notif.
                                        </th>
                                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {devoirs.data.map((d) => (
                                        <tr key={d.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-2">
                                                    <ClipboardDocumentListIcon className="w-5 h-5 text-cab-blue" />
                                                    <div>
                                                        <p className="font-medium text-gray-900 line-clamp-1">
                                                            {d.titre}
                                                        </p>
                                                        <p className="text-xs text-gray-500 line-clamp-1">
                                                            {d.description || 'Aucune description'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-gray-600 text-xs">
                                                {d.formation?.name || '-'}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                                    d.type === 'vague'
                                                        ? 'bg-blue-100 text-blue-700'
                                                        : 'bg-purple-100 text-purple-700'
                                                }`}>
                                                    {d.type === 'vague' ? 'Vague' : 'Certification'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                                                    d.mode_envoi === 'individuel'
                                                        ? 'bg-purple-100 text-purple-700'
                                                        : 'bg-blue-100 text-blue-700'
                                                }`}>
                                                    {d.mode_envoi === 'individuel' ? (
                                                        <UserIcon className="w-3 h-3" />
                                                    ) : (
                                                        <UserGroupIcon className="w-3 h-3" />
                                                    )}
                                                    {d.mode_envoi === 'individuel' ? 'Individuel' : 'Groupe'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                {d.tranche_requise ? (
                                                    <span className="px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 text-xs font-medium">
                                                        T{d.tranche_requise.numero}
                                                    </span>
                                                ) : (
                                                    <span className="text-xs text-gray-400">Tous</span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex flex-col">
                                                    <span className="text-xs text-gray-600">
                                                        {d.date_limite || 'Non définie'}
                                                    </span>
                                                    {d.jours_restants !== null && (
                                                        <span className={`text-xs ${d.jours_restants <= 3 ? 'text-red-500' : 'text-gray-400'}`}>
                                                            {d.jours_restants === 0 ? 'Dépassé' : `${d.jours_restants}j restants`}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium text-gray-900">
                                                        {d.soumissions_count} / {d.total_etudiants}
                                                    </span>
                                                    <span className="text-xs text-gray-400">
                                                        {d.taux_soumission}% • {d.corrige_count} corrigés
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                {getStatutBadge(d)}
                                            </td>
                                            <td className="px-4 py-3">
                                                {d.has_notification_sent ? (
                                                    <span className="text-xs text-green-600">✅ Envoyée</span>
                                                ) : (
                                                    <button
                                                        onClick={() => handleResendNotification(d)}
                                                        className="text-xs text-yellow-600 hover:text-yellow-800"
                                                    >
                                                        📤 Envoyer
                                                    </button>
                                                )}
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => handleToggleActive(d)}
                                                        className={`p-1.5 rounded-lg transition-colors ${
                                                            d.is_active
                                                                ? 'text-yellow-600 hover:bg-yellow-50'
                                                                : 'text-green-600 hover:bg-green-50'
                                                        }`}
                                                        title={d.is_active ? 'Désactiver' : 'Activer'}
                                                    >
                                                        {d.is_active ? (
                                                            <EyeSlashIcon className="w-5 h-5" />
                                                        ) : (
                                                            <EyeIcon className="w-5 h-5" />
                                                        )}
                                                    </button>

                                                    <Link
                                                        href={`/admin/devoirs/${d.id}`}
                                                        className="p-1.5 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                                                        title="Voir"
                                                    >
                                                        <EyeIcon className="w-5 h-5" />
                                                    </Link>

                                                    <Link
                                                        href={`/admin/devoirs/${d.id}/edit`}
                                                        className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                                                        title="Modifier"
                                                    >
                                                        <PencilSquareIcon className="w-5 h-5" />
                                                    </Link>

                                                    <button
                                                        onClick={() => handleDelete(d)}
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

                {/* ✅ Pagination */}
                <div className="mt-4">
                    <Pagination
                        links={devoirs.links}
                        from={devoirs.from}
                        to={devoirs.to}
                        total={devoirs.total}
                    />
                </div>
            </AdminLayout>
        </>
    );
}
