// resources/js/pages/Student/Cours/Index.tsx
import {
    BookOpenIcon,
    VideoCameraIcon,
    DocumentIcon,
    EyeIcon,
    CheckCircleIcon,
    ClockIcon,
    LockClosedIcon,
    LockOpenIcon,
    ExclamationTriangleIcon,
    AcademicCapIcon,
} from '@heroicons/react/24/outline';
import { Head, Link } from '@inertiajs/react';
import StudentLayout from '@/Components/Layouts/StudentLayout';

interface Cours {
    id: number;
    titre: string;
    description: string | null;
    has_video: boolean;
    has_files: boolean;
    viewed: boolean;
    viewed_at: string | null;
    created_at: string;
    formation: {
        id: number;
        name: string;
    };
    est_accessible: boolean;
    tranche_requise: {
        numero: number;
        montant: number;
        lien: string;
    } | null;
    est_verrouille: boolean;
    lessons_count: number; // ✅ Maintenant requis
}

interface Props {
    cours: Cours[];
    stats: {
        total: number;
        viewed: number;
        not_viewed: number;
        accessibles: number;
        verrouilles: number;
    };
}

export default function Index({ cours, stats }: Props) {
    return (
        <>
            <Head title="Mes cours - Étudiant" />

            <StudentLayout title="Mes cours">
                {/* Statistiques */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
                        <p className="text-2xl font-bold text-cab-blue">{stats.total}</p>
                        <p className="text-xs text-gray-500">Total</p>
                    </div>
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
                        <p className="text-2xl font-bold text-green-600">{stats.viewed}</p>
                        <p className="text-xs text-gray-500">Vus</p>
                    </div>
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
                        <p className="text-2xl font-bold text-yellow-600">{stats.not_viewed}</p>
                        <p className="text-xs text-gray-500">Non vus</p>
                    </div>
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
                        <p className="text-2xl font-bold text-green-500">{stats.accessibles}</p>
                        <p className="text-xs text-gray-500">Accessibles</p>
                    </div>
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
                        <p className="text-2xl font-bold text-red-500">{stats.verrouilles}</p>
                        <p className="text-xs text-gray-500">Verrouillés</p>
                    </div>
                </div>

                {/* Liste des cours */}
                <div className="space-y-4">
                    {cours.length === 0 ? (
                        <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
                            <BookOpenIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500 text-sm">Aucun cours disponible pour le moment</p>
                        </div>
                    ) : (
                        cours.map((c) => {
                            // Si le cours est verrouillé
                            if (c.est_verrouille) {
                                return (
                                    <div
                                        key={c.id}
                                        className="bg-white rounded-2xl p-5 shadow-sm border-2 border-red-200/50 bg-red-50/30"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <LockClosedIcon className="w-5 h-5 text-red-500" />
                                                    <h3 className="text-lg font-semibold text-gray-500">{c.titre}</h3>
                                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs">
                                                        Verrouillé
                                                    </span>
                                                    {/* ✅ Nombre de leçons */}
                                                    {c.lessons_count > 0 && (
                                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full text-xs">
                                                            <AcademicCapIcon className="w-3 h-3" />
                                                            {c.lessons_count} leçon{c.lessons_count > 1 ? 's' : ''}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-sm text-gray-500 mt-1">{c.formation?.name}</p>
                                                {c.description && (
                                                    <p className="text-sm text-gray-500 mt-2 line-clamp-2">{c.description}</p>
                                                )}
                                                <div className="flex items-center gap-2 mt-3">
                                                    <ExclamationTriangleIcon className="w-4 h-4 text-yellow-500" />
                                                    <span className="text-sm text-yellow-700 font-medium">
                                                        🔒 Tranche {c.tranche_requise?.numero} requise
                                                        {c.tranche_requise?.montant && (
                                                            <span className="ml-1 text-gray-500 font-normal">
                                                                ({c.tranche_requise.montant.toLocaleString()} FCFA)
                                                            </span>
                                                        )}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-4 mt-2">
                                                    <span className="text-xs text-gray-400">{c.created_at}</span>
                                                    {c.has_video && (
                                                        <span className="flex items-center gap-1 text-xs text-red-500">
                                                            <VideoCameraIcon className="w-4 h-4" />
                                                            Vidéo
                                                        </span>
                                                    )}
                                                    {c.has_files && (
                                                        <span className="flex items-center gap-1 text-xs text-blue-500">
                                                            <DocumentIcon className="w-4 h-4" />
                                                            Fichiers
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            {c.tranche_requise?.lien ? (
                                                <div className="shrink-0 mt-1">
                                                    <a
                                                        href={c.tranche_requise.lien}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1 px-4 py-2 bg-cab-blue text-white rounded-xl text-sm font-medium hover:bg-cab-dark transition-colors"
                                                    >
                                                        <LockOpenIcon className="w-4 h-4" />
                                                        Débloquer
                                                    </a>
                                                </div>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 px-4 py-2 bg-gray-200 text-gray-500 rounded-xl text-sm font-medium shrink-0 mt-1 cursor-not-allowed">
                                                    <LockOpenIcon className="w-4 h-4" />
                                                    Lien indisponible
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                );
                            }

                            // Cours accessible (normal)
                            return (
                                <Link
                                    key={c.id}
                                    href={`/student/cours/${c.id}`}
                                    className="block bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-lg font-semibold text-gray-900">{c.titre}</h3>
                                                {c.viewed ? (
                                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs">
                                                        <CheckCircleIcon className="w-3 h-3" />
                                                        Vu
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full text-xs">
                                                        <ClockIcon className="w-3 h-3" />
                                                        Non vu
                                                    </span>
                                                )}
                                                {/* ✅ Nombre de leçons */}
                                                {c.lessons_count > 0 && (
                                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs">
                                                        <AcademicCapIcon className="w-3 h-3" />
                                                        {c.lessons_count} leçon{c.lessons_count > 1 ? 's' : ''}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-gray-500 mt-1">{c.formation?.name}</p>
                                            {c.description && (
                                                <p className="text-sm text-gray-600 mt-2 line-clamp-2">{c.description}</p>
                                            )}
                                            <div className="flex items-center gap-4 mt-3">
                                                <span className="text-xs text-gray-400">{c.created_at}</span>
                                                {c.has_video && (
                                                    <span className="flex items-center gap-1 text-xs text-red-500">
                                                        <VideoCameraIcon className="w-4 h-4" />
                                                        Vidéo
                                                    </span>
                                                )}
                                                {c.has_files && (
                                                    <span className="flex items-center gap-1 text-xs text-blue-500">
                                                        <DocumentIcon className="w-4 h-4" />
                                                        Fichiers
                                                    </span>
                                                )}
                                                {c.viewed_at && (
                                                    <span className="text-xs text-gray-400">
                                                        Vu le {c.viewed_at}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <EyeIcon className="w-5 h-5 text-gray-400 shrink-0 mt-1" />
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
