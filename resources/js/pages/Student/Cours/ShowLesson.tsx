// resources/js/pages/Student/Cours/ShowLesson.tsx
import {
    ArrowLeftIcon,
    VideoCameraIcon,
    DocumentIcon,
    CheckCircleIcon,
    BookOpenIcon,
    EyeIcon,
    ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import StudentLayout from '@/Components/Layouts/StudentLayout';
import VideoPlayer from '@/Components/UI/VideoPlayer';

interface Lesson {
    id: number;
    titre: string;
    description: string | null;
    contenu: string | null;
    video_url: string | null;
    video_title: string | null;
    video_embed_url: string | null;
    has_video: boolean;
    has_files: boolean;
    files: any[];
    order: number;
    vu: boolean;
    viewed_at: string | null;
    created_at: string;
    cours: {
        id: number;
        titre: string;
        formation: {
            name: string;
        };
    };
}

interface Props {
    lesson: Lesson;
}

// Extrait l'ID YouTube d'une URL (classique, courte, ou déjà embed)
const extractYoutubeId = (url: string): string => {
    const match = url.match(
        /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/
    );
    return match ? match[1] : '';
};

export default function ShowLesson({ lesson }: Props) {
    const [loading, setLoading] = useState(false);

    const handleMarkAsViewed = () => {
        setLoading(true);
        router.post(`/student/cours/lesson/${lesson.id}/view`, {}, {
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

    return (
        <>
            <Head title={`${lesson.titre} - Leçon`} />

            <StudentLayout title={lesson.titre}>
                <div className="max-w-4xl">
                    <Link
                        href={`/student/cours/${lesson.cours.id}`}
                        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-cab-blue transition-colors mb-4"
                    >
                        <ArrowLeftIcon className="w-4 h-4" />
                        Retour au cours
                    </Link>

                    {/* En-tête de la leçon */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                        <div className="flex items-start justify-between">
                            <div>
                                <div className="flex items-center gap-2">
                                    <BookOpenIcon className="w-5 h-5 text-cab-blue" />
                                    <h1 className="text-2xl font-bold text-gray-900">{lesson.titre}</h1>
                                </div>
                                <p className="text-sm text-gray-500 mt-1">
                                    {lesson.cours.formation?.name} • {lesson.cours.titre}
                                </p>
                                {lesson.description && (
                                    <p className="text-sm text-gray-600 mt-2">{lesson.description}</p>
                                )}
                            </div>
                            {lesson.vu ? (
                                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                    <CheckCircleIcon className="w-5 h-5" />
                                    Vu
                                    {lesson.viewed_at && (
                                        <span className="text-xs text-gray-500 ml-1">
                                            le {lesson.viewed_at}
                                        </span>
                                    )}
                                </span>
                            ) : (
                                <button
                                    onClick={handleMarkAsViewed}
                                    disabled={loading}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? '⏳' : <EyeIcon className="w-4 h-4" />}
                                    Marquer comme vu
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Contenu textuel */}
                    {lesson.contenu && (
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                            <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                <DocumentIcon className="w-5 h-5 text-blue-500" />
                                Contenu
                            </h2>
                            <div className="text-gray-600 leading-relaxed whitespace-pre-line prose prose-sm max-w-none">
                                {lesson.contenu}
                            </div>
                        </div>
                    )}

                    {/* Vidéo — via Plyr, plus d'iframe YouTube brut */}
                    {lesson.video_url && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
                            <div className="p-4 border-b border-gray-100 bg-gray-50">
                                <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <VideoCameraIcon className="w-5 h-5 text-red-500" />
                                    {lesson.video_title || 'Vidéo de la leçon'}
                                </h2>
                            </div>
                            <div className="p-4">
                                <div className="relative rounded-xl overflow-hidden bg-black max-w-full">
                                    <video
                                        src={lesson.video_url}
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
                            </div>
                        </div>
                    )}
                    {/* Fichiers */}
                    {lesson.files && lesson.files.length > 0 && (
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
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

                    {/* Si la leçon est vide */}
                    {!lesson.contenu && !lesson.video_url && (!lesson.files || lesson.files.length === 0) && (
                        <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
                            <BookOpenIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500 text-sm">Cette leçon ne contient pas encore de contenu</p>
                        </div>
                    )}
                </div>
            </StudentLayout>
        </>
    );
}
