// resources/js/pages/Admin/Cours/ShowLesson.tsx
import {
    ArrowLeftIcon,
    DocumentIcon,
    VideoCameraIcon,
    EyeIcon,
    BookOpenIcon,
} from '@heroicons/react/24/outline';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Components/Layouts/AdminLayout';

interface Lesson {
    id: number;
    titre: string;
    description: string | null;
    contenu: string | null;
    video_url: string | null;
    video_stream_url: string | null; // ✅ Ajouté ici
    video_title: string | null;
    video_embed_url: string | null;
    has_video: boolean;
    has_files: boolean;
    files: any[];
    order: number;
    is_active: boolean;
    created_at: string;
    cours: {
        id: number;
        titre: string;
        formation: {
            name: string;
        };
    };
}

interface ViewedStudent {
    id: number;
    name: string;
    matricule: string;
    viewed_at: string;
}

interface NotViewedStudent {
    id: number;
    name: string;
    matricule: string;
}

interface Props {
    lesson: Lesson;
    viewedStudents: ViewedStudent[];
    notViewedStudents: NotViewedStudent[];
}

export default function ShowLesson({ lesson, viewedStudents, notViewedStudents }: Props) {
    const percentage = (viewedStudents.length + notViewedStudents.length) > 0
        ? Math.round((viewedStudents.length / (viewedStudents.length + notViewedStudents.length)) * 100)
        : 0;

    const isExternalUrl = (url: string) => url.startsWith('http');

    return (
        <>
            <Head title={`${lesson.titre} - Détails de la leçon`} />

            <AdminLayout title="Détails de la leçon">
                <div className="max-w-4xl">
                    <Link
                        href={`/admin/cours/${lesson.cours.id}`}
                        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-cab-blue transition-colors mb-4"
                    >
                        <ArrowLeftIcon className="w-4 h-4" />
                        Retour au cours
                    </Link>

                    {/* En-tête */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                            <div>
                                <div className="flex items-center gap-2">
                                    <BookOpenIcon className="w-5 h-5 text-cab-blue" />
                                    <h1 className="text-2xl font-bold text-gray-900">{lesson.titre}</h1>
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                        lesson.is_active
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-gray-100 text-gray-600'
                                    }`}>
                                        {lesson.is_active ? 'Actif' : 'Inactif'}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500 mt-1">
                                    {lesson.cours.formation?.name} • {lesson.cours.titre}
                                </p>
                                <div className="flex items-center gap-3 mt-2">
                                    {lesson.has_video && (
                                        <span className="flex items-center gap-1 text-xs text-red-500">
                                            <VideoCameraIcon className="w-3 h-3" />
                                            Vidéo
                                        </span>
                                    )}
                                    {lesson.has_files && (
                                        <span className="flex items-center gap-1 text-xs text-blue-500">
                                            <DocumentIcon className="w-3 h-3" />
                                            Fichiers
                                        </span>
                                    )}
                                    <span className="text-xs text-gray-400">
                                        Ordre: {lesson.order || 0}
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Link
                                    href={`/admin/cours/lesson/${lesson.id}/edit`}
                                    className="px-4 py-2 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors"
                                >
                                    Modifier
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    {lesson.description && (
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                            <h2 className="text-sm font-semibold text-gray-700 mb-2">📝 Description</h2>
                            <p className="text-gray-600 leading-relaxed whitespace-pre-line">{lesson.description}</p>
                        </div>
                    )}

                    {/* Contenu */}
                    {lesson.contenu && (
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                            <h2 className="text-sm font-semibold text-gray-700 mb-2">📖 Contenu</h2>
                            <div className="text-gray-600 leading-relaxed whitespace-pre-line prose prose-sm max-w-none">
                                {lesson.contenu}
                            </div>
                        </div>
                    )}

                    {/* Vidéo */}
                    {lesson.video_url && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
                            <div className="p-4 border-b border-gray-100 bg-gray-50">
                                <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <VideoCameraIcon className="w-5 h-5 text-red-500" />
                                    {lesson.video_title || 'Vidéo de la leçon'}
                                </h2>
                            </div>
                            <div className="p-4">
                                {isExternalUrl(lesson.video_url) && !lesson.video_stream_url ? (
                                    <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-900">
                                        <iframe
                                            src={lesson.video_embed_url || lesson.video_url}
                                            className="w-full h-full"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            title={lesson.video_title || lesson.titre}
                                        />
                                    </div>
                                ) : (
                                    <div className="relative rounded-xl overflow-hidden bg-black max-w-full">
                                        <video
                                            src={lesson.video_stream_url || lesson.video_url} // ✅ Utilise la route de stream sécurisée
                                            controls
                                            controlsList="nodownload noremoteplayback"
                                            disablePictureInPicture
                                            onContextMenu={(e) => e.preventDefault()}
                                            onDragStart={(e) => e.preventDefault()}
                                            className="w-full h-auto rounded-xl max-h-[500px]"
                                        >
                                            Votre navigateur ne prend pas en charge la lecture de cette vidéo.
                                        </video>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Fichiers */}
                    {lesson.files && lesson.files.length > 0 && (
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                            <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                <DocumentIcon className="w-5 h-5 text-blue-500" />
                                Fichiers joints ({lesson.files.length})
                            </h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {lesson.files.map((file, index) => (
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

                    {/* Statistiques de visionnage */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h2 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                            <EyeIcon className="w-5 h-5 text-cab-blue" />
                            Statistiques de visionnage
                        </h2>
                        <div className="grid grid-cols-3 gap-4 mb-4">
                            <div className="bg-gray-50 rounded-xl p-4 text-center">
                                <p className="text-2xl font-bold text-cab-blue">{viewedStudents.length}</p>
                                <p className="text-xs text-gray-500">Vues</p>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-4 text-center">
                                <p className="text-2xl font-bold text-cab-blue">{viewedStudents.length + notViewedStudents.length}</p>
                                <p className="text-xs text-gray-500">Étudiants</p>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-4 text-center">
                                <p className="text-2xl font-bold text-cab-blue">{percentage}%</p>
                                <p className="text-xs text-gray-500">Taux de visionnage</p>
                            </div>
                        </div>

                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-cab-blue rounded-full transition-all duration-500"
                                style={{ width: `${Math.min(percentage, 100)}%` }}
                            />
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </>
    );
}
