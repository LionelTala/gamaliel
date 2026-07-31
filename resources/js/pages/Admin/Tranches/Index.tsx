// resources/js/pages/Admin/Tranches/Index.tsx
import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Components/Layouts/AdminLayout';
import ToastContainer from '@/Components/UI/ToastContainer';
import {
    BanknotesIcon,
    PlusIcon,
    PencilSquareIcon,
    TrashIcon,
    LinkIcon,
    CheckCircleIcon,
    ExclamationTriangleIcon,
    DocumentTextIcon,
} from '@heroicons/react/24/outline';

interface Formation {
    id: number;
    name: string;
    abbreviation?: string;
    lien_paiement_total?: string | null;
}

interface Tranche {
    id: number;
    numero: number;
    montant: number;
    lien_paiement: string | null;
    paiements_count?: number;
    cours_count?: number;
    devoirs_count?: number;
    evaluations_count?: number;
}

interface Props {
    formations: Formation[];
    tranches: Tranche[];
    selectedFormationId: string | null;
    formation?: Formation | null;
}

export default function Index({ formations, tranches, selectedFormationId, formation }: Props) {
    const [showLienTotal, setShowLienTotal] = useState(false);
    const [lienTotal, setLienTotal] = useState(formation?.lien_paiement_total || '');
    const [isSubmittingLien, setIsSubmittingLien] = useState(false);

    const handleFormationChange = (formationId: string) => {
        router.get('/admin/tranches', formationId ? { formation_id: formationId } : {}, {
            preserveState: false,
        });
    };

    const handleDelete = (tranche: Tranche) => {
        const hasPaiements = tranche.paiements_count && tranche.paiements_count > 0;
        const hasContenus = (tranche.cours_count && tranche.cours_count > 0) ||
                           (tranche.devoirs_count && tranche.devoirs_count > 0) ||
                           (tranche.evaluations_count && tranche.evaluations_count > 0);

        if (hasPaiements || hasContenus) {
            alert('❌ Impossible de supprimer cette tranche car elle est liée à des paiements ou contenus.');
            return;
        }

        if (confirm(`Supprimer la tranche ${tranche.numero} ? Cette action est irréversible.`)) {
            router.delete(`/admin/tranches/${tranche.id}`, {
                preserveScroll: true,
                onSuccess: () => router.reload({ only: ['tranches'] }),
            });
        }
    };

    const handleLienTotalSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedFormationId) return;

        setIsSubmittingLien(true);
        router.put(`/admin/formations/${selectedFormationId}/lien-paiement-total`, {
            lien_paiement_total: lienTotal,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setIsSubmittingLien(false);
                setShowLienTotal(false);
                router.reload({ only: ['formation'] });
            },
            onError: () => setIsSubmittingLien(false),
        });
    };

    const totalTranches = tranches.length;
    const montantTotal = tranches.reduce((sum, t) => sum + Number(t.montant), 0);

    return (
        <>
            <Head title="Tranches de paiement - Admin" />

            <AdminLayout title="Gestion des tranches de paiement">
                <ToastContainer />

                {/* Sélection de formation */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Formation <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={selectedFormationId || ''}
                                onChange={(e) => handleFormationChange(e.target.value)}
                                className="w-full sm:w-96 px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors bg-white"
                            >
                                <option value="">-- Choisir une formation --</option>
                                {formations.map((f) => (
                                    <option key={f.id} value={f.id}>
                                        {f.name} {f.abbreviation ? `(${f.abbreviation})` : ''}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {selectedFormationId && (
                            <div className="flex items-center gap-3 text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                    <BanknotesIcon className="w-4 h-4" />
                                    {totalTranches} tranche{totalTranches > 1 ? 's' : ''}
                                </span>
                                {totalTranches > 0 && (
                                    <span className="flex items-center gap-1">
                                        <span className="font-medium text-gray-700">
                                            {montantTotal.toLocaleString()} FCFA
                                        </span>
                                        au total
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {!selectedFormationId ? (
                    // Message si aucune formation sélectionnée
                    <div className="bg-white rounded-2xl p-16 text-center shadow-sm border border-gray-100">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <BanknotesIcon className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Sélectionnez une formation</h3>
                        <p className="text-sm text-gray-500">
                            Choisissez une formation pour gérer ses tranches de paiement
                        </p>
                    </div>
                ) : (
                    <>
                        {/* Lien de paiement total */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-blue-50 rounded-xl">
                                        <LinkIcon className="w-5 h-5 text-cab-blue" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-700">
                                            Lien de paiement total
                                        </h3>
                                        <p className="text-xs text-gray-500">
                                            Lien pour payer toutes les tranches d'un coup
                                        </p>
                                        {formation?.lien_paiement_total && !showLienTotal && (
                                            <a
                                                href={formation.lien_paiement_total}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs text-cab-blue hover:underline mt-1 inline-block truncate max-w-md"
                                            >
                                                {formation.lien_paiement_total}
                                            </a>
                                        )}
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowLienTotal(!showLienTotal)}
                                    className="px-4 py-2 text-sm font-medium text-cab-blue hover:bg-blue-50 rounded-xl transition-colors whitespace-nowrap"
                                >
                                    {formation?.lien_paiement_total ? 'Modifier' : 'Ajouter un lien'}
                                </button>
                            </div>

                            {showLienTotal && (
                                <form onSubmit={handleLienTotalSubmit} className="mt-4 flex flex-col sm:flex-row gap-3">
                                    <input
                                        type="url"
                                        value={lienTotal}
                                        onChange={(e) => setLienTotal(e.target.value)}
                                        placeholder="https://exemple.com/paiement-total"
                                        className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                        required
                                    />
                                    <div className="flex gap-2">
                                        <button
                                            type="submit"
                                            disabled={isSubmittingLien}
                                            className="px-6 py-2.5 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors disabled:opacity-50"
                                        >
                                            {isSubmittingLien ? 'Enregistrement...' : 'Enregistrer'}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setShowLienTotal(false);
                                                setLienTotal(formation?.lien_paiement_total || '');
                                            }}
                                            className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
                                        >
                                            Annuler
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>

                        {/* Bouton Ajouter */}
                        <div className="flex justify-end mb-6">
                            <Link
                                href={`/admin/tranches/create?formation_id=${selectedFormationId}`}
                                className="inline-flex items-center gap-2 px-6 py-2.5 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors"
                            >
                                <PlusIcon className="w-5 h-5" />
                                Ajouter une tranche
                            </Link>
                        </div>

                        {/* Liste des tranches */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-semibold text-gray-700">
                                        Liste des tranches
                                    </h3>
                                    <span className="text-xs text-gray-500">
                                        {totalTranches} tranche{totalTranches > 1 ? 's' : ''}
                                    </span>
                                </div>
                            </div>

                            {tranches.length === 0 ? (
                                <div className="text-center py-16">
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <BanknotesIcon className="w-8 h-8 text-gray-400" />
                                    </div>
                                    <p className="text-gray-500 text-sm">Aucune tranche définie pour cette formation</p>
                                    <Link
                                        href={`/admin/tranches/create?formation_id=${selectedFormationId}`}
                                        className="mt-4 text-cab-blue hover:text-cab-dark text-sm font-medium inline-block"
                                    >
                                        Ajouter votre première tranche →
                                    </Link>
                                </div>
                            ) : (
                                <div className="divide-y divide-gray-100">
                                    {tranches.map((tranche) => {
                                        const hasPaiements = tranche.paiements_count && tranche.paiements_count > 0;
                                        const hasContenus = (tranche.cours_count && tranche.cours_count > 0) ||
                                                           (tranche.devoirs_count && tranche.devoirs_count > 0) ||
                                                           (tranche.evaluations_count && tranche.evaluations_count > 0);
                                        const isLocked = hasPaiements || hasContenus;

                                        return (
                                            <div key={tranche.id} className="p-6 hover:bg-gray-50 transition-colors">
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                                    <div className="flex items-start gap-4">
                                                        <div className="flex items-center justify-center w-10 h-10 bg-blue-50 rounded-xl flex-shrink-0">
                                                            <span className="text-sm font-bold text-cab-blue">
                                                                #{tranche.numero}
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <div className="flex items-center gap-3 flex-wrap">
                                                                <p className="font-semibold text-gray-900">
                                                                    Tranche {tranche.numero}
                                                                </p>
                                                                <span className="text-sm font-medium text-gray-700">
                                                                    {Number(tranche.montant).toLocaleString()} FCFA
                                                                </span>
                                                                {hasPaiements && (
                                                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                                                        <CheckCircleIcon className="w-3 h-3" />
                                                                        {tranche.paiements_count} paiement{tranche.paiements_count > 1 ? 's' : ''}
                                                                    </span>
                                                                )}
                                                                {hasContenus && (
                                                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                                                                        <DocumentTextIcon className="w-3 h-3" />
                                                                        {[
                                                                            tranche.cours_count ? `${tranche.cours_count} cours` : null,
                                                                            tranche.devoirs_count ? `${tranche.devoirs_count} devoirs` : null,
                                                                            tranche.evaluations_count ? `${tranche.evaluations_count} évals` : null,
                                                                        ].filter(Boolean).join(', ')}
                                                                    </span>
                                                                )}
                                                                {isLocked && (
                                                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                                                                        <ExclamationTriangleIcon className="w-3 h-3" />
                                                                        Verrouillée
                                                                    </span>
                                                                )}
                                                            </div>
                                                            {tranche.lien_paiement ? (
                                                                <a
                                                                    href={tranche.lien_paiement}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-xs text-cab-blue hover:underline inline-flex items-center gap-1 mt-1"
                                                                >
                                                                    <LinkIcon className="w-3 h-3" />
                                                                    Lien de paiement
                                                                </a>
                                                            ) : (
                                                                <p className="text-xs text-gray-400 mt-1">Aucun lien de paiement</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Link
                                                            href={`/admin/tranches/${tranche.id}/edit`}
                                                            className="p-2 rounded-xl text-blue-600 hover:bg-blue-50 transition-colors"
                                                            title="Modifier"
                                                        >
                                                            <PencilSquareIcon className="w-5 h-5" />
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(tranche)}
                                                            className={`p-2 rounded-xl transition-colors ${
                                                                isLocked
                                                                    ? 'text-gray-300 cursor-not-allowed'
                                                                    : 'text-red-600 hover:bg-red-50'
                                                            }`}
                                                            title={isLocked ? 'Cette tranche ne peut pas être supprimée' : 'Supprimer'}
                                                            disabled={isLocked}
                                                        >
                                                            <TrashIcon className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Résumé des tranches */}
                        {tranches.length > 0 && (
                            <div className="mt-6 bg-blue-50 rounded-2xl p-4 border border-blue-100">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm">
                                    <div>
                                        <span className="text-gray-600">Total des tranches :</span>
                                        <span className="font-semibold text-gray-900 ml-1">{totalTranches}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Montant total :</span>
                                        <span className="font-semibold text-gray-900 ml-1">{montantTotal.toLocaleString()} FCFA</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Dernière tranche :</span>
                                        <span className="font-semibold text-gray-900 ml-1">
                                            {Number(tranches[tranches.length - 1].montant).toLocaleString()} FCFA
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </AdminLayout>
        </>
    );
}
