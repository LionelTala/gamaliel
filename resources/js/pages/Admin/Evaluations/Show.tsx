// resources/js/pages/Admin/Evaluations/Show.tsx
import {
    ArrowLeftIcon,
    DocumentIcon,
    UserIcon,
    CheckCircleIcon,
    ClockIcon,
    XCircleIcon,
    EyeIcon,
    PencilSquareIcon,
    CalendarIcon,
    UserGroupIcon,
    ChartBarIcon,
    UsersIcon,
    ShieldCheckIcon,
} from '@heroicons/react/24/outline';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/Components/Layouts/AdminLayout';

interface Soumission {
    id: number;
    student_id: number;
    student_name: string;
    matricule: string;
    fichier: any;
    commentaire: string | null;
    note: number | null;
    statut: string;
    statut_label: string;
    statut_color: string;
    est_en_retard: boolean;
    submitted_at: string | null;
    corrected_at: string | null;
}

interface Evaluation {
    id: number;
    titre: string;
    description: string | null;
    contenu: any[];
    date: string | null;
    coefficient: number;
    est_depasse: boolean;
    jours_restants: number | null;
    type: string;
    mode_envoi: 'groupe' | 'individuel';
    total_etudiants: number;
    soumissions_count: number;
    soumis_count: number;
    corrige_count: number;
    taux_soumission: number;
    has_notification_sent: boolean;
    notification_sent_at: string | null;
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
    student: {
        id: number;
        name: string;
        matricule: string;
    } | null;
    tranche_requise: {
        id: number;
        numero: number;
        montant: number;
    } | null;
}

interface Props {
    evaluation: Evaluation;
    soumissions: Soumission[];
    nonSoumis: {
        id: number;
        name: string;
        matricule: string;
    }[];
}

export default function Show({ evaluation, soumissions, nonSoumis }: Props) {
    const [showCorrectionModal, setShowCorrectionModal] = useState<number | null>(null);
    const [note, setNote] = useState<string>('');
    const [commentaire, setCommentaire] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const handleCorriger = (soumissionId: number) => {
        setLoading(true);
        router.post(`/admin/soumissions-evaluations/${soumissionId}/corriger`, {
            note: parseFloat(note),
            commentaire: commentaire,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setLoading(false);
                setShowCorrectionModal(null);
                setNote('');
                setCommentaire('');
                router.reload();
            },
            onError: () => {
                setLoading(false);
            },
        });
    };

    const getStatutBadge = (statut: string, label: string) => {
        const colors: Record<string, string> = {
            en_attente: 'bg-yellow-100 text-yellow-800',
            soumis: 'bg-blue-100 text-blue-800',
            corrige: 'bg-green-100 text-green-800',
        };

        const icons: Record<string, React.ReactNode> = {
            en_attente: <ClockIcon className="w-4 h-4" />,
            soumis: <ClockIcon className="w-4 h-4" />,
            corrige: <CheckCircleIcon className="w-4 h-4" />,
        };

        return (
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${colors[statut] || 'bg-gray-100 text-gray-800'}`}>
                {icons[statut]}
                {label}
            </span>
        );
    };

    return (
        <>
            <Head title={`${evaluation.titre} - Détails de l'évaluation`} />

            <AdminLayout title={`Détails de l'évaluation`}>
                <div className="max-w-5xl">
                    <Link
                        href="/admin/evaluations"
                        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-cab-blue transition-colors mb-4"
                    >
                        <ArrowLeftIcon className="w-4 h-4" />
                        Retour à la liste
                    </Link>

                    {/* En-tête */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                            <div className="flex-1">
                                <h1 className="text-2xl font-bold text-gray-900">{evaluation.titre}</h1>

                                <p className="text-sm text-gray-500 mt-1">
                                    {evaluation.formation?.name} •
                                    {evaluation.type === 'vague'
                                        ? ` Vague ${evaluation.vague?.name || '-'}`
                                        : ` Certification ${evaluation.certification?.titre || '-'}`}
                                </p>

                                {/* ✅ MODE D'ENVOI ET TRANCHES */}
                                <div className="flex flex-wrap items-center gap-3 mt-3">
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                                        evaluation.mode_envoi === 'individuel'
                                            ? 'bg-purple-100 text-purple-700'
                                            : 'bg-blue-100 text-blue-700'
                                    }`}>
                                        {evaluation.mode_envoi === 'individuel' ? (
                                            <UserIcon className="w-4 h-4" />
                                        ) : (
                                            <UserGroupIcon className="w-4 h-4" />
                                        )}
                                        {evaluation.mode_envoi === 'individuel' ? 'Envoi individuel' : 'Envoi groupe'}
                                    </span>

                                    {/* ✅ ÉTUDIANT CIBLÉ (si individuel) */}
                                    {evaluation.mode_envoi === 'individuel' && evaluation.student && (
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-medium border border-purple-200">
                                            <UsersIcon className="w-4 h-4" />
                                            {evaluation.student.name} ({evaluation.student.matricule})
                                        </span>
                                    )}

                                    {/* ✅ TRANCHES REQUISES */}
                                    {evaluation.tranche_requise ? (
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-medium border border-yellow-200">
                                            <ShieldCheckIcon className="w-4 h-4" />
                                            Tranche {evaluation.tranche_requise.numero} requise
                                            <span className="ml-1 text-[10px] opacity-75">
                                                ({evaluation.tranche_requise.montant.toLocaleString()} FCFA)
                                            </span>
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium border border-green-200">
                                            <CheckCircleIcon className="w-4 h-4" />
                                            Accessible à tous
                                        </span>
                                    )}
                                </div>

                                <div className="flex items-center gap-4 mt-2 text-sm">
                                    {evaluation.date && (
                                        <span className={`flex items-center gap-1 ${evaluation.est_depasse ? 'text-red-500' : 'text-gray-500'}`}>
                                            <CalendarIcon className="w-4 h-4" />
                                            Date : {evaluation.date}
                                            {evaluation.est_depasse && ' (Dépassée)'}
                                        </span>
                                    )}
                                    <span className="flex items-center gap-1 text-gray-500">
                                        <UserGroupIcon className="w-4 h-4" />
                                        {evaluation.total_etudiants} étudiant{evaluation.total_etudiants > 1 ? 's' : ''}
                                    </span>
                                    <span className="flex items-center gap-1 text-gray-500">
                                        <ChartBarIcon className="w-4 h-4" />
                                        Coeff. {evaluation.coefficient}
                                    </span>
                                </div>
                            </div>

                            <div className="flex gap-2 flex-shrink-0">
                                {!evaluation.has_notification_sent && (
                                    <button
                                        onClick={() => {
                                            if (confirm(`Renvoyer les notifications pour l'évaluation "${evaluation.titre}" ?`)) {
                                                router.post(`/admin/evaluations/${evaluation.id}/resend-notifications`);
                                            }
                                        }}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors"
                                    >
                                        📤 Envoyer notification
                                    </button>
                                )}
                                <Link
                                    href={`/admin/evaluations/${evaluation.id}/edit`}
                                    className="px-4 py-2 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors"
                                >
                                    Modifier
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    {evaluation.description && (
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                            <h2 className="text-sm font-semibold text-gray-700 mb-2">📝 Description</h2>
                            <p className="text-gray-600 leading-relaxed whitespace-pre-line">{evaluation.description}</p>
                        </div>
                    )}

                    {/* Fichiers joints */}
                    {evaluation.contenu && evaluation.contenu.length > 0 && (
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                            <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                <DocumentIcon className="w-5 h-5 text-blue-500" />
                                Fichiers joints ({evaluation.contenu.length})
                            </h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {evaluation.contenu.map((file, index) => (
                                    <a
                                        key={index}
                                        href={file.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
                                    >
                                        <DocumentIcon className="w-5 h-5 text-blue-500 flex-shrink-0" />
                                        <span className="text-sm text-gray-600 truncate flex-1">{file.name}</span>
                                        <span className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                            📎
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Info supplémentaire sur les destinataires */}
                    <div className="text-xs text-gray-400 bg-gray-50 rounded-xl p-3 mb-6 border border-gray-100">
                        {evaluation.mode_envoi === 'individuel' ? (
                            <span>👤 Envoi individuel à un seul étudiant</span>
                        ) : (
                            <span>👥 Envoi groupé à {evaluation.total_etudiants} étudiant{evaluation.total_etudiants > 1 ? 's' : ''}</span>
                        )}
                        {evaluation.tranche_requise && (
                            <span className="ml-3">
                                • 🔒 Tranche {evaluation.tranche_requise.numero} requise
                            </span>
                        )}
                    </div>

                    {/* Statistiques */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
                            <p className="text-2xl font-bold text-cab-blue">{evaluation.soumissions_count}</p>
                            <p className="text-xs text-gray-500">Soumissions</p>
                        </div>
                        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
                            <p className="text-2xl font-bold text-orange-500">{evaluation.soumis_count}</p>
                            <p className="text-xs text-gray-500">En attente de correction</p>
                        </div>
                        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
                            <p className="text-2xl font-bold text-green-500">{evaluation.corrige_count}</p>
                            <p className="text-xs text-gray-500">Corrigés</p>
                        </div>
                        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
                            <p className="text-2xl font-bold text-purple-500">{evaluation.taux_soumission}%</p>
                            <p className="text-xs text-gray-500">Taux de soumission</p>
                        </div>
                    </div>

                    {/* Liste des soumissions */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                        <h2 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                            <DocumentIcon className="w-5 h-5 text-cab-blue" />
                            Soumissions ({soumissions.length})
                        </h2>

                        {soumissions.length === 0 ? (
                            <p className="text-sm text-gray-500">Aucune soumission pour le moment</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Étudiant</th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Fichier</th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Statut</th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Date</th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Note</th>
                                            <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {soumissions.map((s) => (
                                            <tr key={s.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                                                <td className="px-4 py-2 font-medium text-gray-900">{s.student_name}</td>
                                                <td className="px-4 py-2">
                                                    {s.fichier && (
                                                        <a
                                                            href={s.fichier.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-cab-blue hover:underline text-xs flex items-center gap-1"
                                                        >
                                                            <DocumentIcon className="w-3 h-3" />
                                                            {s.fichier.name}
                                                        </a>
                                                    )}
                                                </td>
                                                <td className="px-4 py-2">
                                                    {getStatutBadge(s.statut, s.statut_label)}
                                                    {s.est_en_retard && (
                                                        <span className="ml-1 text-xs text-red-500">(En retard)</span>
                                                    )}
                                                </td>
                                                <td className="px-4 py-2 text-gray-500 text-xs">
                                                    {s.submitted_at || '-'}
                                                </td>
                                                <td className="px-4 py-2 font-semibold">
                                                    {s.note !== null ? `${s.note}/20` : '-'}
                                                </td>
                                                <td className="px-4 py-2 text-right">
                                                    {s.statut === 'soumis' && (
                                                        <button
                                                            onClick={() => {
                                                                setShowCorrectionModal(s.id);
                                                                setNote(s.note?.toString() || '');
                                                                setCommentaire(s.commentaire || '');
                                                            }}
                                                            className="px-3 py-1 bg-cab-blue text-white rounded-lg text-xs font-medium hover:bg-cab-dark transition-colors"
                                                        >
                                                            Corriger
                                                        </button>
                                                    )}
                                                    {s.statut === 'corrige' && (
                                                        <span className="text-xs text-green-600">✅ Corrigé</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    {/* Étudiants non soumis */}
                    {nonSoumis.length > 0 && (
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                <ClockIcon className="w-5 h-5 text-yellow-500" />
                                Non soumis ({nonSoumis.length})
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {nonSoumis.map((student) => (
                                    <span key={student.id} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                                        {student.name} ({student.matricule})
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Modal de correction */}
                {showCorrectionModal !== null && (
                    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Corriger l'évaluation</h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Entrez la note et éventuellement un commentaire pour cette évaluation.
                            </p>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Note /20 <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        value={note}
                                        onChange={(e) => setNote(e.target.value)}
                                        min="0"
                                        max="20"
                                        step="0.5"
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                        placeholder="Ex: 15.5"
                                    />
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
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => handleCorriger(showCorrectionModal)}
                                    disabled={loading || !note}
                                    className="flex-1 px-4 py-2.5 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? '⏳' : '✅ Valider la correction'}
                                </button>
                                <button
                                    onClick={() => setShowCorrectionModal(null)}
                                    className="px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                                >
                                    Annuler
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </AdminLayout>
        </>
    );
}
