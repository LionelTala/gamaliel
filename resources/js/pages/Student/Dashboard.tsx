// resources/js/pages/Student/Dashboard.tsx
import { Head, Link, router } from '@inertiajs/react';
import StudentLayout from '@/Components/Layouts/StudentLayout';
import {
    BookOpenIcon,
    ClipboardDocumentListIcon,
    ChartBarIcon,
    CheckCircleIcon,
    ClockIcon,
    UserIcon,
    ArrowRightIcon,
    EyeIcon,
    DocumentTextIcon,
    VideoCameraIcon,
    CalendarIcon,
    CreditCardIcon,
} from '@heroicons/react/24/outline';

interface TrancheStatus {
    id: number;
    numero: number;
    montant: number;
    lien_paiement: string | null;
    est_payee: boolean;
    est_en_attente: boolean;
    paiement_id: number | null;
}

interface StudentInfo {
    id: number;
    first_name: string;
    last_name: string;
    full_name: string;
    matricule: string;
    phone: string;
    student_type: string;
    is_certification: boolean;
    vague: {
        id: number;
        name: string;
        formation: string;
        formation_id: number;
        lien_paiement_total: string | null;
    } | null;
    certification: {
        id: number;
        titre: string;
        formation: string;
    } | null;
    tranches: TrancheStatus[];
    toutes_tranches_payees: boolean;
    derniere_tranche_payee: number;
}

interface Stats {
    total_cours: number;
    cours_vus: number;
    total_devoirs: number;
    devoirs_soumis: number;
    devoirs_corriges: number;
    total_evaluations: number;
    evaluations_soumis: number;
    evaluations_corriges: number;
    moyenne: number | null;
}

interface DernierCours {
    id: number;
    titre: string;
    description: string | null;
    has_video: boolean;
    has_files: boolean;
    vu: boolean;
    created_at: string;
    link: string;
}

interface DevoirARendre {
    id: number;
    titre: string;
    date_limite: string | null;
    est_depasse: boolean;
    jours_restants: number | null;
    has_files: boolean;
    link: string;
}

interface DerniereNote {
    id: number;
    titre: string;
    type: string;
    note: number | null;
    commentaire: string | null;
    corrected_at: string | null;
    link: string;
}

interface DashboardProps {
    student: StudentInfo;
    stats: Stats;
    derniersCours: DernierCours[];
    devoirsARendre: DevoirARendre[];
    dernieresNotes: DerniereNote[];
}

export default function Dashboard({
    student,
    stats,
    derniersCours,
    devoirsARendre,
    dernieresNotes,
}: DashboardProps) {
    const handlePayerTranche = (trancheId: number) => {
        if (confirm('Confirmer le paiement de cette tranche ?')) {
            router.post('/student/paiements', {
                tranche_id: trancheId,
            });
        }
    };

    const statsCards = [
        {
            label: 'Cours',
            value: `${stats.cours_vus} / ${stats.total_cours}`,
            icon: <BookOpenIcon className="w-5 h-5" />,
            color: 'bg-blue-500',
        },
        {
            label: 'Devoirs',
            value: `${stats.devoirs_soumis} / ${stats.total_devoirs}`,
            icon: <ClipboardDocumentListIcon className="w-5 h-5" />,
            color: 'bg-orange-500',
        },
        {
            label: 'Évaluations',
            value: `${stats.evaluations_soumis} / ${stats.total_evaluations}`,
            icon: <ChartBarIcon className="w-5 h-5" />,
            color: 'bg-purple-500',
        },
    ];

    return (
        <>
            <Head title="Tableau de bord - Étudiant" />

            <StudentLayout title="Tableau de bord">
                {/* Informations étudiant */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-cab-blue text-white flex items-center justify-center text-2xl font-bold">
                                {student.full_name?.charAt(0)?.toUpperCase() || 'E'}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">{student.full_name}</h2>
                                <p className="text-sm text-gray-500">
                                    Matricule: <span className="font-mono font-semibold">{student.matricule}</span>
                                </p>
                                <div className="flex flex-wrap items-center gap-2 mt-1 text-sm">
                                    <span className="text-gray-500">{student.student_type}</span>
                                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                    {student.vague && (
                                        <span className="text-gray-500">
                                            {student.vague.formation} • Vague: {student.vague.name}
                                        </span>
                                    )}
                                    {student.certification && (
                                        <span className="text-gray-500">
                                            {student.certification.formation} • Certification: {student.certification.titre}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <Link
                            href="/profil"
                            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                        >
                            <UserIcon className="w-4 h-4" />
                            Modifier mon profil
                        </Link>
                    </div>
                </div>

                {/* Gestion des tranches - UNIQUEMENT pour formations */}
                {!student.is_certification && student.vague && student.tranches.length > 0 && (
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <CreditCardIcon className="w-5 h-5 text-cab-blue" />
                                Suivi des paiements
                            </h3>
                            {student.toutes_tranches_payees && (
                                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                    ✅ Toutes les tranches payées
                                </span>
                            )}
                        </div>

                        <div className="space-y-3">
                            {student.tranches.map((tranche) => (
                                <div
                                    key={tranche.id}
                                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-gray-50 rounded-xl gap-3"
                                >
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <span className="font-medium text-gray-900">
                                                Tranche {tranche.numero}
                                            </span>
                                            <span className="text-sm text-gray-600">
                                                {tranche.montant.toLocaleString()} FCFA
                                            </span>
                                        </div>
                                        {tranche.est_payee && (
                                            <span className="inline-flex items-center gap-1 text-sm text-green-600 font-medium">
                                                <CheckCircleIcon className="w-4 h-4" />
                                                Payée
                                            </span>
                                        )}
                                        {tranche.est_en_attente && (
                                            <span className="inline-flex items-center gap-1 text-sm text-yellow-600 font-medium">
                                                <ClockIcon className="w-4 h-4" />
                                                En attente de validation
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex gap-2">
                                        {tranche.est_payee ? (
                                            <span className="px-4 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                                                ✓ Payée
                                            </span>
                                        ) : tranche.est_en_attente ? (
                                            <span className="px-4 py-1.5 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-medium">
                                                En attente...
                                            </span>
                                        ) : (
                                            <>
                                                {tranche.lien_paiement ? (
                                                    <a
                                                        href={tranche.lien_paiement}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="px-4 py-1.5 bg-cab-blue text-white rounded-lg text-sm font-medium hover:bg-cab-dark transition-colors"
                                                    >
                                                        Payer
                                                    </a>
                                                ) : (
                                                    <button
                                                        onClick={() => handlePayerTranche(tranche.id)}
                                                        className="px-4 py-1.5 bg-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
                                                    >
                                                        Demander paiement
                                                    </button>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* ✅ Bouton "Payer toutes les tranches" - Bleu */}
                        {student.vague.lien_paiement_total && !student.toutes_tranches_payees && (
                            <div className="mt-4">
                                <a
                                    href={student.vague.lien_paiement_total}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full px-4 py-2.5 bg-cab-blue text-white rounded-xl text-sm font-semibold text-center hover:bg-cab-dark transition-colors"
                                >
                                    Payer toutes les tranches restantes
                                </a>
                            </div>
                        )}
                    </div>
                )}

                {/* Statistiques - 3 cartes (sans Moyenne) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    {statsCards.map((stat) => (
                        <div key={stat.label} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between">
                                <p className="text-xs text-gray-500">{stat.label}</p>
                                <div className={`${stat.color} w-8 h-8 rounded-xl flex items-center justify-center text-white`}>
                                    {stat.icon}
                                </div>
                            </div>
                            <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Derniers cours + Devoirs à rendre */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Derniers cours */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <BookOpenIcon className="w-5 h-5 text-cab-blue" />
                                Derniers cours
                            </h3>
                            <Link
                                href="/student/cours"
                                className="text-xs text-cab-blue hover:text-cab-dark font-medium flex items-center gap-1"
                            >
                                Voir tout
                                <ArrowRightIcon className="w-3 h-3" />
                            </Link>
                        </div>

                        {derniersCours.length === 0 ? (
                            <p className="text-sm text-gray-500 text-center py-4">Aucun cours disponible</p>
                        ) : (
                            <div className="space-y-3">
                                {derniersCours.map((cours) => (
                                    <Link
                                        key={cours.id}
                                        href={cours.link}
                                        className="block p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <p className="text-sm font-medium text-gray-900">{cours.titre}</p>
                                                    {cours.vu ? (
                                                        <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs">
                                                            Vu
                                                        </span>
                                                    ) : (
                                                        <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full text-xs">
                                                            Non vu
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-3 mt-1">
                                                    {cours.has_video && (
                                                        <span className="flex items-center gap-1 text-xs text-red-500">
                                                            <VideoCameraIcon className="w-3 h-3" />
                                                            Vidéo
                                                        </span>
                                                    )}
                                                    {cours.has_files && (
                                                        <span className="flex items-center gap-1 text-xs text-blue-500">
                                                            <DocumentTextIcon className="w-3 h-3" />
                                                            Fichiers
                                                        </span>
                                                    )}
                                                    <span className="text-xs text-gray-400">{cours.created_at}</span>
                                                </div>
                                            </div>
                                            <EyeIcon className="w-4 h-4 text-gray-400 shrink-0" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Devoirs à rendre */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <ClipboardDocumentListIcon className="w-5 h-5 text-orange-500" />
                                Devoirs à rendre
                            </h3>
                            <Link
                                href="/student/devoirs"
                                className="text-xs text-cab-blue hover:text-cab-dark font-medium flex items-center gap-1"
                            >
                                Voir tout
                                <ArrowRightIcon className="w-3 h-3" />
                            </Link>
                        </div>

                        {devoirsARendre.length === 0 ? (
                            <p className="text-sm text-gray-500 text-center py-4">Aucun devoir en attente</p>
                        ) : (
                            <div className="space-y-3">
                                {devoirsARendre.map((devoir) => (
                                    <Link
                                        key={devoir.id}
                                        href={devoir.link}
                                        className="block p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{devoir.titre}</p>
                                                <div className="flex items-center gap-3 mt-1">
                                                    {devoir.date_limite && (
                                                        <span className={`text-xs flex items-center gap-1 ${
                                                            devoir.est_depasse ? 'text-red-500' : 'text-gray-400'
                                                        }`}>
                                                            <CalendarIcon className="w-3 h-3" />
                                                            {devoir.est_depasse ? 'Dépassé' : `${devoir.jours_restants}j restants`}
                                                        </span>
                                                    )}
                                                    {devoir.has_files && (
                                                        <span className="text-xs text-blue-500 flex items-center gap-1">
                                                            <DocumentTextIcon className="w-3 h-3" />
                                                            Fichiers
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <ClockIcon className={`w-4 h-4 shrink-0 ${
                                                devoir.est_depasse ? 'text-red-500' : 'text-gray-400'
                                            }`} />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Dernières notes */}
                {dernieresNotes.length > 0 && (
                    <div className="mt-6 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <ChartBarIcon className="w-5 h-5 text-green-500" />
                                Dernières notes
                            </h3>
                            <Link
                                href="/student/devoirs"
                                className="text-xs text-cab-blue hover:text-cab-dark font-medium flex items-center gap-1"
                            >
                                Voir tout
                                <ArrowRightIcon className="w-3 h-3" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {dernieresNotes.map((note) => (
                                <Link
                                    key={note.id}
                                    href={note.link}
                                    className="block p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <p className="text-sm font-medium text-gray-900">{note.titre}</p>
                                                <span className="text-xs text-gray-400">{note.type}</span>
                                            </div>
                                            {note.commentaire && (
                                                <p className="text-xs text-gray-500 line-clamp-1">{note.commentaire}</p>
                                            )}
                                            <p className="text-xs text-gray-400 mt-1">{note.corrected_at}</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-xl font-bold text-green-600">{note.note}/20</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </StudentLayout>
        </>
    );
}
