// resources/js/pages/Admin/Paiements/Edit.tsx
import {
    ArrowLeftIcon,
    BanknotesIcon,
    UserIcon,
    CreditCardIcon,
    PencilSquareIcon,
    CheckCircleIcon,
    XCircleIcon,
} from '@heroicons/react/24/outline';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Components/Layouts/AdminLayout';
import ToastContainer from '@/Components/UI/ToastContainer';

interface Paiement {
    id: number;
    student_id: number;
    tranche_id: number;
    paye_le: string | null;
    confirme_par: number | null;
    reference_paiement: string | null;
    note: string | null;
    created_at: string;
    updated_at: string;
    student: {
        id: number;
        full_name: string;
        matricule: string;
        user: {
            email: string;
        };
    };
    tranche: {
        id: number;
        numero: number;
        montant: number;
        formation: {
            id: number;
            name: string;
        };
    };
    confirmateur: {
        id: number;
        name: string;
        email: string;
    } | null;
}

interface Props {
    paiement: Paiement;
}

export default function Edit({ paiement }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        reference_paiement: paiement.reference_paiement || '',
        note: paiement.note || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/paiements/${paiement.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                window.location.href = `/admin/paiements?formation_id=${paiement.tranche.formation.id}`;
            },
        });
    };

    const isPaid = !!paiement.paye_le;

    return (
        <>
            <Head title={`Modifier paiement - ${paiement.student.full_name}`} />

            <AdminLayout title="Modifier le paiement">
                <ToastContainer />

                <div className="max-w-3xl mx-auto">
                    <Link
                        href={`/admin/paiements?formation_id=${paiement.tranche.formation.id}`}
                        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-cab-blue transition-colors mb-4"
                    >
                        <ArrowLeftIcon className="w-4 h-4" />
                        Retour à la liste des paiements
                    </Link>

                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-blue-50 rounded-xl">
                                <CreditCardIcon className="w-6 h-6 text-cab-blue" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">
                                    Modifier le paiement
                                </h1>
                                <p className="text-sm text-gray-500">
                                    {paiement.student.full_name} - Tranche {paiement.tranche.numero}
                                </p>
                            </div>
                        </div>

                        {/* Informations du paiement (lecture seule) */}
                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-6">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="text-gray-500">Étudiant :</span>
                                    <span className="font-medium text-gray-900 ml-2">
                                        {paiement.student.full_name}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-gray-500">Matricule :</span>
                                    <span className="font-medium text-gray-900 ml-2">
                                        {paiement.student.matricule}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-gray-500">Formation :</span>
                                    <span className="font-medium text-gray-900 ml-2">
                                        {paiement.tranche.formation.name}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-gray-500">Tranche :</span>
                                    <span className="font-medium text-gray-900 ml-2">
                                        #{paiement.tranche.numero} - {paiement.tranche.montant.toLocaleString()} FCFA
                                    </span>
                                </div>
                                <div>
                                    <span className="text-gray-500">Statut :</span>
                                    <span className={`ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                                        isPaid
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-yellow-100 text-yellow-700'
                                    }`}>
                                        {isPaid ? (
                                            <>
                                                <CheckCircleIcon className="w-3 h-3" />
                                                Payé le {new Date(paiement.paye_le!).toLocaleDateString('fr-FR')}
                                            </>
                                        ) : (
                                            <>
                                                <XCircleIcon className="w-3 h-3" />
                                                En attente
                                            </>
                                        )}
                                    </span>
                                </div>
                                {paiement.confirmateur && (
                                    <div>
                                        <span className="text-gray-500">Confirmé par :</span>
                                        <span className="font-medium text-gray-900 ml-2">
                                            {paiement.confirmateur.name}
                                        </span>
                                    </div>
                                )}
                                <div>
                                    <span className="text-gray-500">Créé le :</span>
                                    <span className="font-medium text-gray-900 ml-2">
                                        {new Date(paiement.created_at).toLocaleDateString('fr-FR')}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Référence de paiement */}
                            <div>
                                <label htmlFor="reference_paiement" className="block text-sm font-medium text-gray-700 mb-1">
                                    Référence de paiement
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <BanknotesIcon className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="reference_paiement"
                                        type="text"
                                        value={data.reference_paiement}
                                        onChange={(e) => setData('reference_paiement', e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                        placeholder="Ex: ORANGE-123456"
                                    />
                                </div>
                                <p className="mt-1 text-xs text-gray-400">
                                    Référence du paiement (Orange Money, MTN Mobile Money, etc.)
                                </p>
                                {errors.reference_paiement && (
                                    <p className="mt-1 text-sm text-red-600">{errors.reference_paiement}</p>
                                )}
                            </div>

                            {/* Note */}
                            <div>
                                <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-1">
                                    Note
                                </label>
                                <textarea
                                    id="note"
                                    value={data.note}
                                    onChange={(e) => setData('note', e.target.value)}
                                    rows={3}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors resize-none"
                                    placeholder="Note sur le paiement..."
                                />
                                {errors.note && (
                                    <p className="mt-1 text-sm text-red-600">{errors.note}</p>
                                )}
                            </div>

                            {/* Statut (lecture seule) */}
                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-700">Statut du paiement</span>
                                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                                        isPaid
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-yellow-100 text-yellow-700'
                                    }`}>
                                        {isPaid ? '✅ Payé' : '⏳ En attente'}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-400 mt-1">
                                    {isPaid
                                        ? 'Le paiement a déjà été confirmé. Vous ne pouvez modifier que la référence et la note.'
                                        : 'Le paiement est en attente de validation.'}
                                </p>
                            </div>

                            {/* Boutons */}
                            <div className="flex gap-3 pt-4 border-t border-gray-100">
                                <Link
                                    href={`/admin/paiements?formation_id=${paiement.tranche.formation.id}`}
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
