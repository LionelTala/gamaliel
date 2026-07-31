// resources/js/pages/Student/Evaluations/Show.tsx
import {
    ArrowLeftIcon,
    DocumentIcon,
    CalendarIcon,
    ClockIcon,
    CheckCircleIcon,
    XCircleIcon,
    UserIcon,
    PaperAirplaneIcon,
    LockClosedIcon,
    LockOpenIcon,
    ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import StudentLayout from '@/Components/Layouts/StudentLayout';

interface Evaluation {
    id: number;
    titre: string;
    description: string | null;
    contenu: any[];
    date: string | null;
    coefficient: number;
    est_depasse: boolean;
    jours_restants: number | null;
    formation: {
        id: number;
        name: string;
    };
    est_accessible: boolean;
    tranche_requise: {
        id: number;
        numero: number;
        montant: number;
        lien_paiement: string | null;
    } | null;
    est_verrouille: boolean;
}

interface Soumission {
    id: number;
    fichier: any;
    commentaire: string | null;
    note: number | null;
    statut: string;
    statut_label: string;
    submitted_at: string | null;
    corrected_at: string | null;
    est_en_retard: boolean;
}

interface Props {
    evaluation: Evaluation;
    soumission: Soumission | null;
}

export default function Show({ evaluation, soumission }: Props) {
    const [file, setFile] = useState<File | null>(null);
    const [commentaire, setCommentaire] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) {
            alert('Veuillez sélectionner un fichier.');
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append('fichier', file);
        formData.append('commentaire', commentaire);

        router.post(`/student/evaluations/${evaluation.id}/soumettre`, formData, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setLoading(false);
                router.reload();
            },
            onError: () => {
                setLoading(false);
            },
        });
    };

    const getStatutBadge = () => {
        if (!soumission) {
            return <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">Non soumis</span>;
        }
        if (soumission.statut === 'corrige') {
            return <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium flex items-center gap-1">
                <CheckCircleIcon className="w-4 h-4" />
                Corrigé
            </span>;
        }
        return <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium flex items-center gap-1">
            <ClockIcon className="w-4 h-4" />
            Soumis
        </span>;
    };

    // ✅ Si l'évaluation est verrouillée
    if (evaluation.est_verrouille) {
        return (
            <>
                <Head title={`${evaluation.titre} - Verrouillé`} />

                <StudentLayout title={evaluation.titre}>
                    <div className="max-w-3xl">
                        <Link
                            href="/student/evaluations"
                            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-cab-blue transition-colors mb-4"
                        >
                            <ArrowLeftIcon className="w-4 h-4" />
                            Retour à mes évaluations
                        </Link>

                        <div className="bg-white rounded-2xl p-8 shadow-sm border-2 border-red-200/50 bg-red-50/30 text-center">
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                                    <LockClosedIcon className="w-10 h-10 text-red-500" />
                                </div>
                                <h1 className="text-2xl font-bold text-gray-900">{evaluation.titre}</h1>
                                <div className="flex items-center gap-2">
                                    <ExclamationTriangleIcon className="w-5 h-5 text-yellow-500" />
                                    <span className="text-lg font-medium text-yellow-700">
                                        🔒 Tranche {evaluation.tranche_requise?.numero} requise
                                    </span>
                                </div>
                                {evaluation.tranche_requise?.montant && (
                                    <p className="text-gray-600">
                                        Payez la tranche {evaluation.tranche_requise.numero} de{' '}
                                        <span className="font-semibold">{evaluation.tranche_requise.montant.toLocaleString()} FCFA</span>{' '}
                                        pour accéder à cette évaluation.
                                    </p>
                                )}
                                <p className="text-sm text-gray-500 max-w-md">
                                    Une fois la tranche payée et validée, vous pourrez soumettre votre évaluation.
                                </p>
                                {evaluation.tranche_requise?.lien_paiement ? (
                                    <a
                                        href={evaluation.tranche_requise.lien_paiement}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors"
                                    >
                                        <LockOpenIcon className="w-5 h-5" />
                                        Débloquer
                                    </a>
                                ) : (
                                    <span className="inline-flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-500 rounded-xl text-sm font-medium cursor-not-allowed">
                                        Lien indisponible
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </StudentLayout>
            </>
        );
    }

    // ✅ Évaluation accessible (normale)
    return (
        <>
            <Head title={`${evaluation.titre} - Détails de l'évaluation`} />

            <StudentLayout title={evaluation.titre}>
                <div className="max-w-3xl">
                    <Link
                        href="/student/evaluations"
                        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-cab-blue transition-colors mb-4"
                    >
                        <ArrowLeftIcon className="w-4 h-4" />
                        Retour à mes évaluations
                    </Link>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                        <div className="flex items-start justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">{evaluation.titre}</h1>
                                <p className="text-sm text-gray-500 mt-1">{evaluation.formation?.name}</p>
                                <div className="flex items-center gap-4 mt-2">
                                    {evaluation.date && (
                                        <span className={`text-sm flex items-center gap-1 ${evaluation.est_depasse ? 'text-red-500' : 'text-gray-500'}`}>
                                            <CalendarIcon className="w-4 h-4" />
                                            {evaluation.est_depasse ? 'Dépassé' : `${evaluation.jours_restants}j restants`}
                                        </span>
                                    )}
                                    <span className="text-sm text-gray-500 flex items-center gap-1">
                                        <UserIcon className="w-4 h-4" />
                                        {getStatutBadge()}
                                    </span>
                                    <span className="text-sm text-gray-500 flex items-center gap-1">
                                        Coeff. {evaluation.coefficient}
                                    </span>
                                </div>
                            </div>
                            {soumission && soumission.note !== null && (
                                <div className="text-center bg-green-50 rounded-xl px-6 py-3 border border-green-200">
                                    <p className="text-xs text-green-600">Note</p>
                                    <p className="text-2xl font-bold text-green-700">{soumission.note}/20</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Description */}
                    {evaluation.description && (
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                            <h2 className="text-sm font-semibold text-gray-700 mb-2">📝 Description</h2>
                            <p className="text-gray-600 leading-relaxed">{evaluation.description}</p>
                        </div>
                    )}

                    {/* Fichiers joints */}
                    {evaluation.contenu && evaluation.contenu.length > 0 && (
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                            <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                <DocumentIcon className="w-5 h-5 text-blue-500" />
                                Fichiers joints
                            </h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {evaluation.contenu.map((file, index) => (
                                    <a
                                        key={index}
                                        href={file.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                                    >
                                        <DocumentIcon className="w-5 h-5 text-blue-500" />
                                        <span className="text-sm text-gray-600 truncate">{file.name}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Soumission */}
                    {soumission ? (
                        <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
                            <h2 className="text-sm font-semibold text-green-800 mb-3 flex items-center gap-2">
                                <CheckCircleIcon className="w-5 h-5" />
                                Évaluation soumise
                            </h2>
                            {soumission.fichier && (
                                <div className="flex items-center gap-2 mb-3">
                                    <DocumentIcon className="w-5 h-5 text-blue-500" />
                                    <a
                                        href={soumission.fichier.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-cab-blue hover:underline text-sm"
                                    >
                                        {soumission.fichier.name}
                                    </a>
                                </div>
                            )}
                            {soumission.commentaire && (
                                <p className="text-sm text-gray-600 mt-2">{soumission.commentaire}</p>
                            )}
                            <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                                <span>Soumis le : {soumission.submitted_at}</span>
                                {soumission.est_en_retard && (
                                    <span className="text-red-500">⚠️ En retard</span>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h2 className="text-sm font-semibold text-gray-700 mb-3">📤 Soumettre mon évaluation</h2>

                            {evaluation.est_depasse ? (
                                <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                                    <p className="text-red-700 text-sm">⚠️ La date limite de cette évaluation est dépassée. Vous ne pouvez plus soumettre.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Fichier <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="file"
                                            onChange={(e) => setFile(e.target.files?.[0] || null)}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                            required
                                        />
                                        <p className="text-xs text-gray-400 mt-1">PDF, Images, etc. (Max 20MB)</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Commentaire (optionnel)
                                        </label>
                                        <textarea
                                            value={commentaire}
                                            onChange={(e) => setCommentaire(e.target.value)}
                                            rows={3}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors resize-none"
                                            placeholder="Votre commentaire..."
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loading ? (
                                            <>
                                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Envoi en cours...
                                            </>
                                        ) : (
                                            <>
                                                <PaperAirplaneIcon className="w-5 h-5" />
                                                Soumettre mon évaluation
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    )}
                </div>
            </StudentLayout>
        </>
    );
}
