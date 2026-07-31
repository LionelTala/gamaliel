// resources/js/pages/Admin/Tranches/Edit.tsx
import {
    ArrowLeftIcon,
    BanknotesIcon,
    LinkIcon,
    PencilSquareIcon,
    ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Components/Layouts/AdminLayout';

interface Tranche {
    id: number;
    numero: number;
    montant: number;
    lien_paiement: string | null;
    formation_id: number;
    paiements_count?: number;
    cours_count?: number;
    devoirs_count?: number;
    evaluations_count?: number;
}

interface Formation {
    id: number;
    name: string;
    abbreviation: string;
}

interface Props {
    tranche: Tranche;
    formations: Formation[];
}

export default function Edit({ tranche, formations }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        montant: tranche.montant.toString(),
        lien_paiement: tranche.lien_paiement || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/tranches/${tranche.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                window.location.href = `/admin/tranches?formation_id=${tranche.formation_id}`;
            },
        });
    };

    const formation = formations.find(f => f.id === tranche.formation_id);
    const hasPaiements = tranche.paiements_count && tranche.paiements_count > 0;
    const hasContenus = (tranche.cours_count && tranche.cours_count > 0) ||
                       (tranche.devoirs_count && tranche.devoirs_count > 0) ||
                       (tranche.evaluations_count && tranche.evaluations_count > 0);
    const isLocked = hasPaiements || hasContenus;

    return (
        <>
            <Head title={`Modifier tranche ${tranche.numero} - Admin`} />

            <AdminLayout title={`Modifier la tranche ${tranche.numero}`}>
                <div className="max-w-3xl mx-auto">
                    <Link
                        href={`/admin/tranches?formation_id=${tranche.formation_id}`}
                        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-cab-blue transition-colors mb-4"
                    >
                        <ArrowLeftIcon className="w-4 h-4" />
                        Retour à la liste des tranches
                    </Link>

                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-blue-50 rounded-xl">
                                <BanknotesIcon className="w-6 h-6 text-cab-blue" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">
                                    Tranche {tranche.numero}
                                </h1>
                                <p className="text-sm text-gray-500">
                                    {formation?.name || 'Formation'} ({formation?.abbreviation || '-'})
                                </p>
                            </div>
                        </div>

                        {/* Alertes */}
                        {isLocked && (
                            <div className="mb-6 bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                                <div className="flex items-start gap-3">
                                    <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-yellow-800">
                                            Cette tranche est verrouillée
                                        </p>
                                        <ul className="mt-1 text-xs text-yellow-700 space-y-1 list-disc list-inside">
                                            {hasPaiements && (
                                                <li>{tranche.paiements_count} paiement{tranche.paiements_count > 1 ? 's' : ''} existant{tranche.paiements_count > 1 ? 's' : ''}</li>
                                            )}
                                            {hasContenus && (
                                                <li>
                                                    {[
                                                        tranche.cours_count ? `${tranche.cours_count} cours` : null,
                                                        tranche.devoirs_count ? `${tranche.devoirs_count} devoirs` : null,
                                                        tranche.evaluations_count ? `${tranche.evaluations_count} évaluations` : null,
                                                    ].filter(Boolean).join(', ')} lié(s)
                                                </li>
                                            )}
                                        </ul>
                                        <p className="mt-1 text-xs text-yellow-700">
                                            Seul le montant et le lien de paiement peuvent être modifiés.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Numéro de tranche (lecture seule) */}
                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-700">Numéro de tranche</span>
                                    <span className="text-sm font-bold text-cab-blue">
                                        #{tranche.numero}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-400 mt-1">Le numéro est fixe et ne peut pas être modifié</p>
                            </div>

                            {/* Formation (lecture seule) */}
                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-700">Formation</span>
                                    <span className="text-sm font-semibold text-gray-900">
                                        {formation?.name || '-'} ({formation?.abbreviation || '-'})
                                    </span>
                                </div>
                                <p className="text-xs text-gray-400 mt-1">La formation ne peut pas être modifiée</p>
                            </div>

                            {/* Montant */}
                            <div>
                                <label htmlFor="montant" className="block text-sm font-medium text-gray-700 mb-1">
                                    Montant (FCFA) <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <BanknotesIcon className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="montant"
                                        type="number"
                                        min="0"
                                        step="100"
                                        value={data.montant}
                                        onChange={(e) => setData('montant', e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                        required
                                    />
                                </div>
                                {errors.montant && (
                                    <p className="mt-1 text-sm text-red-600">{errors.montant}</p>
                                )}
                            </div>

                            {/* Lien de paiement */}
                            <div>
                                <label htmlFor="lien_paiement" className="block text-sm font-medium text-gray-700 mb-1">
                                    Lien de paiement
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <LinkIcon className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="lien_paiement"
                                        type="url"
                                        value={data.lien_paiement}
                                        onChange={(e) => setData('lien_paiement', e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                        placeholder="https://exemple.com/paiement-tranche"
                                    />
                                </div>
                                <p className="mt-1 text-xs text-gray-400">
                                    Lien vers la page de paiement pour cette tranche spécifique
                                </p>
                                {errors.lien_paiement && (
                                    <p className="mt-1 text-sm text-red-600">{errors.lien_paiement}</p>
                                )}
                            </div>

                            {/* Résumé */}
                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                <h4 className="text-sm font-semibold text-gray-700 mb-2">Résumé</h4>
                                <div className="space-y-1 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Tranche :</span>
                                        <span className="font-medium text-gray-900">#{tranche.numero}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Formation :</span>
                                        <span className="font-medium text-gray-900">{formation?.name || '-'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Montant :</span>
                                        <span className="font-medium text-gray-900">
                                            {Number(data.montant).toLocaleString()} FCFA
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Lien de paiement :</span>
                                        <span className="font-medium text-gray-900 truncate max-w-[200px]">
                                            {data.lien_paiement || 'Non défini'}
                                        </span>
                                    </div>
                                    {isLocked && (
                                        <div className="flex justify-between text-yellow-600">
                                            <span className="text-gray-500">Statut :</span>
                                            <span className="font-medium">🔒 Verrouillé</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Boutons */}
                            <div className="flex gap-3 pt-4 border-t border-gray-100">
                                <Link
                                    href={`/admin/tranches?formation_id=${tranche.formation_id}`}
                                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors text-center"
                                >
                                    Annuler
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors disabled:opacity-50"
                                >
                                    {processing ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Enregistrement...
                                        </>
                                    ) : (
                                        <>
                                            <PencilSquareIcon className="w-5 h-5" />
                                            Mettre à jour
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </AdminLayout>
        </>
    );
}
