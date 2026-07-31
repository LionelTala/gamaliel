// resources/js/pages/Student/Devoirs/Index.tsx
import {
    ClipboardDocumentListIcon,
    ClockIcon,
    CheckCircleIcon,
    XCircleIcon,
    DocumentIcon,
    CalendarIcon,
    LockClosedIcon,
    LockOpenIcon,
    ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import { Head, Link } from '@inertiajs/react';
import StudentLayout from '@/Components/Layouts/StudentLayout';

interface Devoir {
    id: number;
    titre: string;
    description: string | null;
    date_limite: string | null;
    est_depasse: boolean;
    jours_restants: number | null;
    has_files: boolean;
    soumis: boolean;
    soumission_statut: string | null;
    note: number | null;
    formation: {
        id: number;
        name: string;
    };
    est_accessible: boolean;
    tranche_requise: {
        id: number;
        numero: number;
        montant: number;
        lien : string
    } | null;
    est_verrouille: boolean;
}

interface Stats {
    total: number;
    soumis: number;
    en_attente: number;
    corriges: number;
    accessibles: number;
    verrouilles: number;
}

interface Props {
    devoirs: Devoir[];
    stats: Stats;
}

export default function Index({ devoirs, stats }: Props) {
    const getStatutBadge = (devoir: Devoir) => {
        // Si le devoir est verrouillé
        if (devoir.est_verrouille) {
            return <span className="px-2 py-0.5 bg-gray-200 text-gray-600 rounded-full text-xs font-medium flex items-center gap-1">
                <LockClosedIcon className="w-3 h-3" />
                Verrouillé
            </span>;
        }

        if (devoir.soumis) {
            if (devoir.soumission_statut === 'corrige') {
                return <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1">
                    <CheckCircleIcon className="w-3 h-3" />
                    Corrigé
                </span>;
            }
            return <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium flex items-center gap-1">
                <ClockIcon className="w-3 h-3" />
                Soumis
            </span>;
        }
        if (devoir.est_depasse) {
            return <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-medium flex items-center gap-1">
                <XCircleIcon className="w-3 h-3" />
                Dépassé
            </span>;
        }
        return <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium flex items-center gap-1">
            <ClockIcon className="w-3 h-3" />
            En attente
        </span>;
    };

    return (
        <>
            <Head title="Mes devoirs - Étudiant" />

            <StudentLayout title="Mes devoirs">
                {/* Statistiques */}
                <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-6">
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
                        <p className="text-2xl font-bold text-cab-blue">{stats.total}</p>
                        <p className="text-xs text-gray-500">Total</p>
                    </div>
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
                        <p className="text-2xl font-bold text-yellow-500">{stats.en_attente}</p>
                        <p className="text-xs text-gray-500">En attente</p>
                    </div>
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
                        <p className="text-2xl font-bold text-blue-500">{stats.soumis}</p>
                        <p className="text-xs text-gray-500">Soumis</p>
                    </div>
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
                        <p className="text-2xl font-bold text-green-500">{stats.corriges}</p>
                        <p className="text-xs text-gray-500">Corrigés</p>
                    </div>
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
                        <p className="text-2xl font-bold text-green-600">{stats.accessibles}</p>
                        <p className="text-xs text-gray-500">Accessibles</p>
                    </div>
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
                        <p className="text-2xl font-bold text-red-500">{stats.verrouilles}</p>
                        <p className="text-xs text-gray-500">Verrouillés</p>
                    </div>
                </div>

                {/* Liste des devoirs */}
                <div className="space-y-4">
                    {devoirs.length === 0 ? (
                        <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
                            <ClipboardDocumentListIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500 text-sm">Aucun devoir pour le moment</p>
                        </div>
                    ) : (
                        devoirs.map((d) => {
                            // Si le devoir est verrouillé
                            if (d.est_verrouille) {
                                return (
                                    <div
                                        key={d.id}
                                        className="bg-white rounded-2xl p-5 shadow-sm border-2 border-red-200/50 bg-red-50/30"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <LockClosedIcon className="w-5 h-5 text-red-500" />
                                                    <h3 className="text-lg font-semibold text-gray-500">{d.titre}</h3>
                                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs">
                                                        Verrouillé
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-500 mt-1">{d.formation?.name}</p>
                                                {d.description && (
                                                    <p className="text-sm text-gray-500 mt-2 line-clamp-2">{d.description}</p>
                                                )}
                                                <div className="flex items-center gap-2 mt-3">
                                                    <ExclamationTriangleIcon className="w-4 h-4 text-yellow-500" />
                                                    <span className="text-sm text-yellow-700 font-medium">
                                                        🔒 Tranche {d.tranche_requise?.numero} requise
                                                        {d.tranche_requise?.montant && (
                                                            <span className="ml-1 text-gray-500 font-normal">
                                                                ({d.tranche_requise.montant.toLocaleString()} FCFA)
                                                            </span>
                                                        )}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-4 mt-2">
                                                    {d.date_limite && (
                                                        <span className={`text-xs flex items-center gap-1 ${d.est_depasse ? 'text-red-500' : 'text-gray-400'}`}>
                                                            <CalendarIcon className="w-3 h-3" />
                                                            {d.est_depasse ? 'Dépassé' : `${d.jours_restants}j restants`}
                                                        </span>
                                                    )}
                                                    {d.has_files && (
                                                        <span className="flex items-center gap-1 text-xs text-blue-500">
                                                            <DocumentIcon className="w-3 h-3" />
                                                            Fichiers
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {
                                                d.tranche_requise?.lien ?(
                                                    <Link
                                                        href={d.tranche_requise.lien}
                                                        className="inline-flex items-center gap-1 px-4 py-2 bg-cab-blue text-white rounded-xl text-sm font-medium hover:bg-cab-dark transition-colors shrink-0 mt-1"
                                                    >
                                                        <LockOpenIcon className="w-4 h-4" />
                                                        Débloquer
                                                    </Link>
                                                ): (
                                                    <span className="inline-flex items-center gap-1 px-4 py-2 bg-gray-200 text-gray-500 rounded-xl text-sm font-medium shrink-0 mt-1 cursor-not-allowed">
                                                        <LockOpenIcon className="w-4 h-4" />
                                                        Lien indisponible
                                                    </span>
                                                )
                                            }


                                        </div>
                                    </div>
                                );
                            }

                            // Devoir accessible (normal)
                            return (
                                <Link
                                    key={d.id}
                                    href={`/student/devoirs/${d.id}`}
                                    className="block bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-lg font-semibold text-gray-900">{d.titre}</h3>
                                                {getStatutBadge(d)}
                                            </div>
                                            <p className="text-sm text-gray-500 mt-1">{d.formation?.name}</p>
                                            {d.description && (
                                                <p className="text-sm text-gray-600 mt-2 line-clamp-2">{d.description}</p>
                                            )}
                                            <div className="flex items-center gap-4 mt-3">
                                                {d.date_limite && (
                                                    <span className={`text-xs flex items-center gap-1 ${d.est_depasse ? 'text-red-500' : 'text-gray-400'}`}>
                                                        <CalendarIcon className="w-3 h-3" />
                                                        {d.est_depasse ? 'Dépassé' : `${d.jours_restants}j restants`}
                                                    </span>
                                                )}
                                                {d.has_files && (
                                                    <span className="flex items-center gap-1 text-xs text-blue-500">
                                                        <DocumentIcon className="w-3 h-3" />
                                                        Fichiers
                                                    </span>
                                                )}
                                                {d.soumis && d.note !== null && (
                                                    <span className="text-xs font-semibold text-green-600">
                                                        Note : {d.note}/20
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <ClipboardDocumentListIcon className="w-5 h-5 text-gray-400 shrink-0 mt-1" />
                                    </div>
                                </Link>
                            );
                        })
                    )}
                </div>
            </StudentLayout>
        </>
    );
}
