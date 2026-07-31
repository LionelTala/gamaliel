// resources/js/pages/Admin/Paiements/Create.tsx
import {
    ArrowLeftIcon,
    BanknotesIcon,
    UserIcon,
    CreditCardIcon,
    PlusIcon,
} from '@heroicons/react/24/outline';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Components/Layouts/AdminLayout';
import ToastContainer from '@/Components/UI/ToastContainer';

interface Formation {
    id: number;
    name: string;
    abbreviation: string;
}

interface Student {
    id: number;
    full_name: string;
    matricule: string;
    user: {
        email: string;
    };
}

interface Tranche {
    id: number;
    numero: number;
    montant: number;
}

interface Props {
    formations: Formation[];
    students: Student[];
    tranches: Tranche[];
    selectedFormationId?: string | null;
}

export default function Create({ formations, students, tranches, selectedFormationId }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        formation_id: selectedFormationId || '',
        student_id: '',
        tranche_id: '',
        reference_paiement: '',
        commentaire: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/paiements', {
            preserveScroll: true,
            onSuccess: () => {
                window.location.href = `/admin/paiements?formation_id=${data.formation_id}`;
            },
        });
    };

    // Filtrer les étudiants par formation
    const filteredStudents = students.filter(s => {
        // Logique de filtrage selon la formation
        return true;
    });

    // Filtrer les tranches par formation
    const filteredTranches = tranches.filter(t => {
        return true;
    });

    const selectedStudent = students.find(s => s.id === Number(data.student_id));
    const selectedTranche = tranches.find(t => t.id === Number(data.tranche_id));

    return (
        <>
            <Head title="Créer une demande de paiement - Admin" />

            <AdminLayout title="Créer une demande de paiement">
                <ToastContainer />

                <div className="max-w-3xl mx-auto">
                    <Link
                        href={`/admin/paiements${data.formation_id ? `?formation_id=${data.formation_id}` : ''}`}
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
                                <h1 className="text-xl font-bold text-gray-900">Créer une demande de paiement</h1>
                                <p className="text-sm text-gray-500">
                                    Créer une demande de paiement pour un étudiant
                                </p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Formation */}
                            <div>
                                <label htmlFor="formation_id" className="block text-sm font-medium text-gray-700 mb-1">
                                    Formation <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="formation_id"
                                    value={data.formation_id}
                                    onChange={(e) => setData('formation_id', e.target.value)}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors bg-white"
                                    required
                                >
                                    <option value="">-- Sélectionnez une formation --</option>
                                    {formations.map((f) => (
                                        <option key={f.id} value={f.id}>
                                            {f.name} ({f.abbreviation})
                                        </option>
                                    ))}
                                </select>
                                {errors.formation_id && (
                                    <p className="mt-1 text-sm text-red-600">{errors.formation_id}</p>
                                )}
                            </div>

                            {/* Étudiant */}
                            <div>
                                <label htmlFor="student_id" className="block text-sm font-medium text-gray-700 mb-1">
                                    Étudiant <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="student_id"
                                    value={data.student_id}
                                    onChange={(e) => setData('student_id', e.target.value)}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors bg-white"
                                    required
                                >
                                    <option value="">-- Sélectionnez un étudiant --</option>
                                    {students.map((s) => (
                                        <option key={s.id} value={s.id}>
                                            {s.full_name} ({s.matricule}) - {s.user.email}
                                        </option>
                                    ))}
                                </select>
                                {errors.student_id && (
                                    <p className="mt-1 text-sm text-red-600">{errors.student_id}</p>
                                )}
                            </div>

                            {/* Tranche */}
                            <div>
                                <label htmlFor="tranche_id" className="block text-sm font-medium text-gray-700 mb-1">
                                    Tranche <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="tranche_id"
                                    value={data.tranche_id}
                                    onChange={(e) => setData('tranche_id', e.target.value)}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors bg-white"
                                    required
                                >
                                    <option value="">-- Sélectionnez une tranche --</option>
                                    {tranches.map((t) => (
                                        <option key={t.id} value={t.id}>
                                            Tranche {t.numero} - {t.montant.toLocaleString()} FCFA
                                        </option>
                                    ))}
                                </select>
                                {errors.tranche_id && (
                                    <p className="mt-1 text-sm text-red-600">{errors.tranche_id}</p>
                                )}
                            </div>

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

                            {/* Commentaire */}
                            <div>
                                <label htmlFor="commentaire" className="block text-sm font-medium text-gray-700 mb-1">
                                    Commentaire
                                </label>
                                <textarea
                                    id="commentaire"
                                    value={data.commentaire}
                                    onChange={(e) => setData('commentaire', e.target.value)}
                                    rows={3}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors resize-none"
                                    placeholder="Note optionnelle sur le paiement..."
                                />
                                {errors.commentaire && (
                                    <p className="mt-1 text-sm text-red-600">{errors.commentaire}</p>
                                )}
                            </div>

                            {/* Résumé */}
                            {data.student_id && data.tranche_id && (
                                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Résumé</h4>
                                    <div className="space-y-1 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Étudiant :</span>
                                            <span className="font-medium text-gray-900">
                                                {selectedStudent?.full_name || '-'}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Matricule :</span>
                                            <span className="font-medium text-gray-900">
                                                {selectedStudent?.matricule || '-'}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Tranche :</span>
                                            <span className="font-medium text-gray-900">
                                                {selectedTranche ? `Tranche ${selectedTranche.numero}` : '-'}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Montant :</span>
                                            <span className="font-medium text-gray-900">
                                                {selectedTranche ? `${selectedTranche.montant.toLocaleString()} FCFA` : '-'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Boutons */}
                            <div className="flex gap-3 pt-4 border-t border-gray-100">
                                <Link
                                    href={`/admin/paiements${data.formation_id ? `?formation_id=${data.formation_id}` : ''}`}
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
                                            Création...
                                        </>
                                    ) : (
                                        <>
                                            <PlusIcon className="w-5 h-5" />
                                            Créer la demande
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
