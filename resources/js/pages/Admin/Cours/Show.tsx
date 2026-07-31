// resources/js/pages/Admin/Cours/Show.tsx
import {
    ArrowLeftIcon,
    DocumentIcon,
    VideoCameraIcon,
    UserIcon,
    CheckCircleIcon,
    ClockIcon,
    EyeIcon,
    UserGroupIcon,
    UsersIcon,
    ShieldCheckIcon,
    BookOpenIcon,
    PlusIcon,
    PencilSquareIcon,
    TrashIcon,
    EyeSlashIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { useState, useRef } from 'react';
import AdminLayout from '@/Components/Layouts/AdminLayout';
import { uploadState } from '@/lib/uploadState';

interface Lesson {
    id: number;
    titre: string;
    description: string | null;
    contenu: string | null;
    video_url: string | null;
    video_stream_url: string | null; // ⬅️ Ajouté
    video_title: string | null;
    has_video: boolean;
    has_files: boolean;
    files: any[];
    order: number;
    is_active: boolean;
    viewed_count?: number;
    created_at: string;
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

interface TrancheRequise {
    id: number;
    numero: number;
    montant: number;
}

interface Cours {
    id: number;
    titre: string;
    description: string | null;
    contenu: any[];
    video_url: string | null;
    video_stream_url: string | null; // ⬅️ Ajouté si présent dans le cours également
    video_title: string | null;
    video_embed_url: string | null;
    video_thumbnail: string | null;
    type: string;
    mode_envoi: 'groupe' | 'individuel';
    viewed_count: number;
    total_students: number;
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
    tranche_requise: TrancheRequise | null;
    lessons: Lesson[];
}

interface Props {
    cours: Cours;
    viewedStudents: ViewedStudent[];
    notViewedStudents: NotViewedStudent[];
}

export default function Show({ cours, viewedStudents, notViewedStudents }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const videoInputRef = useRef<HTMLInputElement>(null);
    const [files, setFiles] = useState<File[]>([]);
    const [filePreviews, setFilePreviews] = useState<string[]>([]);
    const [uploadProgress, setUploadProgress] = useState<number | null>(null);

    // ✅ Correction 1: Utilisation du champ 'video' pour être conforme avec $request->file('video')
    const { data, setData, post, reset, errors, processing } = useForm({
        titre: '',
        description: '',
        contenu: '',
        video_title: '',
        video: null as File | null,
        order: 0,
        is_active: true,
        files: [] as File[],
    });

    const percentage = cours.total_students > 0
        ? Math.round((cours.viewed_count / cours.total_students) * 100)
        : 0;

    const handleResendNotification = () => {
        if (confirm(`Renvoyer les notifications pour le cours "${cours.titre}" ?`)) {
            router.post(`/admin/cours/${cours.id}/resend-notifications`);
        }
    };

    const handleToggleLesson = (lesson: Lesson) => {
        if (confirm(`Confirmer la ${lesson.is_active ? 'désactivation' : 'activation'} de la leçon "${lesson.titre}" ?`)) {
            router.post(`/admin/cours/lesson/${lesson.id}/toggle-active`);
        }
    };

    const handleDeleteLesson = (lesson: Lesson) => {
        if (confirm(`Supprimer la leçon "${lesson.titre}" ? Cette action est irréversible.`)) {
            router.delete(`/admin/cours/lesson/${lesson.id}`);
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setIsModalOpen(false);
        reset();
        setFiles([]);
        setFilePreviews([]);
        setUploadProgress(null);
        if (videoInputRef.current) videoInputRef.current.value = '';
        if (fileInputRef.current) fileInputRef.current.value = '';
        document.body.style.overflow = '';
    };

    const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedVideo = e.target.files?.[0] || null;
        setData('video', selectedVideo);
    };

    const removeVideo = () => {
        setData('video', null);
        if (videoInputRef.current) videoInputRef.current.value = '';
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || []);
        const updatedFiles = [...files, ...selectedFiles];
        setFiles(updatedFiles);
        setData('files', updatedFiles);
        const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
        setFilePreviews([...filePreviews, ...newPreviews]);
    };

    const removeFile = (index: number) => {
        const newFiles = files.filter((_, i) => i !== index);
        const newPreviews = filePreviews.filter((_, i) => i !== index);
        setFiles(newFiles);
        setFilePreviews(newPreviews);
        setData('files', newFiles);
        URL.revokeObjectURL(filePreviews[index]);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setUploadProgress(0);
        uploadState.setActive(true);

        // ✅ Correction 2: forceFormData: true est indispensable pour transmettre les fichiers Multipart
        post(`/admin/cours/${cours.id}/lessons`, {
            forceFormData: true,
            onProgress: (event) => {
                if (event?.percentage != null) {
                    setUploadProgress(event.percentage);
                }
            },
            onSuccess: () => {
                closeModal();
                uploadState.setActive(false);
            },
            onError: () => {
                setUploadProgress(null);
                uploadState.setActive(false);
            },
            onFinish: () => {
                setUploadProgress(null);
                uploadState.setActive(false);
            },
        });
    };

    const sortedLessons = [...(cours.lessons || [])].sort((a, b) => (a.order || 0) - (b.order || 0));

    return (
        <>
            <Head title={`${cours.titre} - Détails du cours`} />

            <AdminLayout title="Détails du cours">
                <div className="max-w-4xl">
                    <Link
                        href="/admin/cours"
                        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-cab-blue transition-colors mb-4"
                    >
                        <ArrowLeftIcon className="w-4 h-4" />
                        Retour à la liste
                    </Link>

                    {/* En-tête */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                            <div className="flex-1">
                                <h1 className="text-2xl font-bold text-gray-900">{cours.titre}</h1>

                                <div className="flex flex-wrap items-center gap-2 mt-2">
                                    <span className="text-sm text-gray-600">
                                        {cours.formation?.name}
                                    </span>
                                    <span className="text-gray-300">•</span>
                                    <span className="text-sm text-gray-600">
                                        {cours.type === 'vague'
                                            ? `Vague ${cours.vague?.name || '-'}`
                                            : `Certification ${cours.certification?.titre || '-'}`}
                                    </span>
                                </div>

                                <div className="flex flex-wrap items-center gap-3 mt-3">
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                                        cours.mode_envoi === 'individuel'
                                            ? 'bg-purple-100 text-purple-700'
                                            : 'bg-blue-100 text-blue-700'
                                    }`}>
                                        {cours.mode_envoi === 'individuel' ? (
                                            <UserIcon className="w-4 h-4" />
                                        ) : (
                                            <UserGroupIcon className="w-4 h-4" />
                                        )}
                                        {cours.mode_envoi === 'individuel' ? 'Envoi individuel' : 'Envoi groupe'}
                                    </span>

                                    {cours.mode_envoi === 'individuel' && cours.student && (
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-medium border border-purple-200">
                                            <UsersIcon className="w-4 h-4" />
                                            {cours.student.name} ({cours.student.matricule})
                                        </span>
                                    )}

                                    {cours.tranche_requise ? (
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-medium border border-yellow-200">
                                            <ShieldCheckIcon className="w-4 h-4" />
                                            Tranche {cours.tranche_requise.numero} requise
                                            <span className="ml-1 text-[10px] opacity-75">
                                                ({cours.tranche_requise.montant.toLocaleString()} FCFA)
                                            </span>
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium border border-green-200">
                                            <CheckCircleIcon className="w-4 h-4" />
                                            Accessible à tous
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-2 flex-shrink-0">
                                {!cours.has_notification_sent && (
                                    <button
                                        onClick={handleResendNotification}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors"
                                    >
                                        📤 Envoyer notification
                                    </button>
                                )}
                                <Link
                                    href={`/admin/cours/${cours.id}/edit`}
                                    className="px-4 py-2 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors"
                                >
                                    Modifier
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    {cours.description && (
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                            <h2 className="text-sm font-semibold text-gray-700 mb-2">📝 Description</h2>
                            <p className="text-gray-600 leading-relaxed whitespace-pre-line">{cours.description}</p>
                        </div>
                    )}

                    {/* Vidéo du cours */}
                    {cours.video_url && (
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                            <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                <VideoCameraIcon className="w-5 h-5 text-red-500" />
                                {cours.video_title || 'Vidéo'}
                            </h2>
                            <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-900">
                                {cours.video_stream_url ? (
                                    <video
                                        src={cours.video_stream_url}
                                        controls
                                        controlsList="nodownload"
                                        className="w-full h-full"
                                    />
                                ) : cours.video_embed_url ? (
                                    <iframe
                                        src={cours.video_embed_url}
                                        className="w-full h-full"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        title={cours.video_title || cours.titre}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <a
                                            href={cours.video_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-white hover:text-blue-400 transition-colors flex items-center gap-2"
                                        >
                                            ▶️ Voir la vidéo
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Fichiers */}
                    {cours.contenu && cours.contenu.length > 0 && (
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                            <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                <DocumentIcon className="w-5 h-5 text-blue-500" />
                                Fichiers joints ({cours.contenu.length})
                            </h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {cours.contenu.map((file, index) => (
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
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                        <h2 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                            <EyeIcon className="w-5 h-5 text-cab-blue" />
                            Statistiques de visionnage
                        </h2>
                        <div className="grid grid-cols-3 gap-4 mb-4">
                            <div className="bg-gray-50 rounded-xl p-4 text-center">
                                <p className="text-2xl font-bold text-cab-blue">{cours.viewed_count}</p>
                                <p className="text-xs text-gray-500">Vues</p>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-4 text-center">
                                <p className="text-2xl font-bold text-cab-blue">{cours.total_students}</p>
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

                        <div className="mt-4 text-xs text-gray-400 border-t border-gray-100 pt-3">
                            {cours.mode_envoi === 'individuel' ? (
                                <span>👤 Envoi individuel à un seul étudiant</span>
                            ) : (
                                <span>👥 Envoi groupé à {cours.total_students} étudiant{cours.total_students > 1 ? 's' : ''}</span>
                            )}
                            {cours.tranche_requise && (
                                <span className="ml-3">
                                    • 🔒 Tranche {cours.tranche_requise.numero} requise
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Visionnages étudiants */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                <CheckCircleIcon className="w-5 h-5 text-green-500" />
                                Ont vu ({viewedStudents.length})
                            </h3>
                            {viewedStudents.length === 0 ? (
                                <p className="text-sm text-gray-500">Aucun étudiant n'a encore vu ce cours</p>
                            ) : (
                                <ul className="space-y-2 max-h-96 overflow-y-auto pr-2">
                                    {viewedStudents.map((student) => (
                                        <li key={student.id} className="flex items-center justify-between text-sm p-2 bg-green-50 rounded-lg">
                                            <span className="font-medium text-gray-900">{student.name}</span>
                                            <span className="text-xs text-gray-400">{student.viewed_at}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                <ClockIcon className="w-5 h-5 text-yellow-500" />
                                N'ont pas vu ({notViewedStudents.length})
                            </h3>
                            {notViewedStudents.length === 0 ? (
                                <p className="text-sm text-gray-500">Tous les étudiants ont vu ce cours</p>
                            ) : (
                                <ul className="space-y-2 max-h-96 overflow-y-auto pr-2">
                                    {notViewedStudents.map((student) => (
                                        <li key={student.id} className="flex items-center justify-between text-sm p-2 bg-yellow-50 rounded-lg">
                                            <span className="font-medium text-gray-900">{student.name}</span>
                                            <span className="text-xs text-gray-400">{student.matricule}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    {/* LEÇONS */}
                    <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
                            <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <BookOpenIcon className="w-5 h-5 text-cab-blue" />
                                Leçons ({sortedLessons.length})
                            </h2>
                            <button
                                onClick={openModal}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-cab-blue text-white rounded-lg text-xs font-medium hover:bg-cab-dark transition-colors"
                            >
                                <PlusIcon className="w-4 h-4" />
                                Ajouter une leçon
                            </button>
                        </div>

                        {sortedLessons.length === 0 ? (
                            <div className="text-center py-8">
                                <BookOpenIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                <p className="text-gray-500 text-sm">Aucune leçon pour ce cours</p>
                                <button
                                    onClick={openModal}
                                    className="mt-2 inline-block text-cab-blue hover:text-cab-dark text-sm font-medium"
                                >
                                    Ajouter votre première leçon →
                                </button>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-100">
                                {sortedLessons.map((lesson) => (
                                    <div key={lesson.id} className="p-4 hover:bg-gray-50 transition-colors">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-medium text-gray-400">
                                                        {String(lesson.order || 0).padStart(2, '0')}.
                                                    </span>
                                                    <Link
                                                        href={`/admin/cours/lesson/${lesson.id}`}
                                                        className="text-sm font-medium text-gray-900 hover:text-cab-blue transition-colors truncate"
                                                    >
                                                        {lesson.titre}
                                                    </Link>
                                                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                                        lesson.is_active
                                                            ? 'bg-green-100 text-green-700'
                                                            : 'bg-gray-100 text-gray-600'
                                                    }`}>
                                                        {lesson.is_active ? 'Actif' : 'Inactif'}
                                                    </span>
                                                </div>
                                                {lesson.description && (
                                                    <p className="text-xs text-gray-500 ml-8 mt-0.5 line-clamp-1">
                                                        {lesson.description}
                                                    </p>
                                                )}
                                                <div className="flex items-center gap-3 ml-8 mt-1">
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
                                                    {lesson.viewed_count !== undefined && lesson.viewed_count > 0 && (
                                                        <span className="text-xs text-gray-400">
                                                            {lesson.viewed_count} vues
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1 flex-shrink-0">
                                                <Link
                                                    href={`/admin/cours/lesson/${lesson.id}`}
                                                    className="p-1.5 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                                                    title="Voir la leçon"
                                                >
                                                    <EyeIcon className="w-4 h-4" />
                                                </Link>
                                                <Link
                                                    href={`/admin/cours/lesson/${lesson.id}/edit`}
                                                    className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                                                    title="Modifier"
                                                >
                                                    <PencilSquareIcon className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleToggleLesson(lesson)}
                                                    className={`p-1.5 rounded-lg transition-colors ${
                                                        lesson.is_active
                                                            ? 'text-yellow-600 hover:bg-yellow-50'
                                                            : 'text-green-600 hover:bg-green-50'
                                                    }`}
                                                    title={lesson.is_active ? 'Désactiver' : 'Activer'}
                                                >
                                                    {lesson.is_active ? (
                                                        <EyeSlashIcon className="w-4 h-4" />
                                                    ) : (
                                                        <EyeIcon className="w-4 h-4" />
                                                    )}
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteLesson(lesson)}
                                                    className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                                                    title="Supprimer"
                                                >
                                                    <TrashIcon className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* MODAL AJOUT DE LEÇON */}
                {isModalOpen && (
                    <div
                        className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={closeModal}
                    >
                        <div
                            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 rounded-t-3xl flex items-center justify-between z-10">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                                        <BookOpenIcon className="w-5 h-5" />
                                    </div>
                                    <h2 className="text-lg font-bold text-gray-900">Ajouter une leçon</h2>
                                </div>
                                <button
                                    onClick={closeModal}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
                                >
                                    <XMarkIcon className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="p-6">
                                <div className="mb-6 bg-blue-50 rounded-xl p-4 border border-blue-100">
                                    <p className="text-sm text-blue-700">
                                        <span className="font-semibold">ℹ️ Accès hérité du cours</span>
                                        <br />
                                        {cours.tranche_requise ? (
                                            <>Cette leçon sera accessible aux étudiants ayant payé la <strong>Tranche {cours.tranche_requise.numero}</strong></>
                                        ) : (
                                            <>Cette leçon sera accessible à <strong>tous les étudiants</strong> (aucune tranche requise)</>
                                        )}
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {/* Titre */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Titre de la leçon <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={data.titre}
                                            onChange={(e) => setData('titre', e.target.value)}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                            placeholder="Ex: Introduction à la maintenance réseau"
                                            required
                                        />
                                        {errors.titre && <p className="mt-1 text-sm text-red-600">{errors.titre}</p>}
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Description
                                        </label>
                                        <textarea
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            rows={2}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors resize-none"
                                            placeholder="Description de la leçon..."
                                        />
                                        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                                    </div>

                                    {/* Contenu */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Contenu
                                        </label>
                                        <textarea
                                            value={data.contenu}
                                            onChange={(e) => setData('contenu', e.target.value)}
                                            rows={4}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors resize-none"
                                            placeholder="Contenu textuel de la leçon..."
                                        />
                                        {errors.contenu && <p className="mt-1 text-sm text-red-600">{errors.contenu}</p>}
                                    </div>

                                    {/* Upload Vidéo */}
                                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                        <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                            <VideoCameraIcon className="w-5 h-5 text-cab-blue" />
                                            Vidéo de la leçon (optionnel)
                                        </h3>
                                        <div className="space-y-3">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Titre de la vidéo
                                                </label>
                                                <input
                                                    type="text"
                                                    value={data.video_title}
                                                    onChange={(e) => setData('video_title', e.target.value)}
                                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                                    placeholder="Ex: Tutoriel réseau"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Fichier Vidéo (MP4, WebM, etc.)
                                                </label>
                                                {!data.video ? (
                                                    <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-cab-blue transition-colors bg-white">
                                                        <VideoCameraIcon className="w-6 h-6 text-gray-400" />
                                                        <span className="text-xs text-gray-500 mt-1">Sélectionner une vidéo</span>
                                                        <input
                                                            type="file"
                                                            accept="video/*"
                                                            onChange={handleVideoChange}
                                                            className="hidden"
                                                            ref={videoInputRef}
                                                        />
                                                    </label>
                                                ) : (
                                                    <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-200">
                                                        <div className="flex items-center gap-2 truncate">
                                                            <VideoCameraIcon className="w-5 h-5 text-red-500 flex-shrink-0" />
                                                            <span className="text-xs font-medium text-gray-700 truncate">
                                                                {data.video.name} ({(data.video.size / (1024 * 1024)).toFixed(1)} Mo)
                                                            </span>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={removeVideo}
                                                            className="p-1 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50 transition-colors"
                                                            title="Supprimer la vidéo"
                                                        >
                                                            <XMarkIcon className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                )}
                                                {errors.video && <p className="mt-1 text-sm text-red-600">{errors.video}</p>}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Fichiers joints */}
                                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                        <h3 className="text-sm font-semibold text-gray-700 mb-3">Fichiers joints (optionnel)</h3>
                                        <div className="flex items-center gap-4">
                                            <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-cab-blue transition-colors bg-white">
                                                <PlusIcon className="w-6 h-6 text-gray-400" />
                                                <span className="text-xs text-gray-500 mt-1">Ajouter des fichiers</span>
                                                <input
                                                    type="file"
                                                    multiple
                                                    onChange={handleFileChange}
                                                    className="hidden"
                                                    ref={fileInputRef}
                                                />
                                            </label>
                                            <p className="text-xs text-gray-400">Max 20MB par fichier</p>
                                        </div>

                                        {filePreviews.length > 0 && (
                                            <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
                                                {files.map((file, index) => (
                                                    <div key={index} className="relative bg-white rounded-lg p-2 border border-gray-200 flex items-center gap-2">
                                                        <DocumentIcon className="w-4 h-4 text-blue-500" />
                                                        <span className="text-xs text-gray-600 truncate flex-1">{file.name}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => removeFile(index)}
                                                            className="text-red-500 hover:text-red-700"
                                                        >
                                                            <XMarkIcon className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Statut et ordre */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={data.is_active}
                                                onChange={(e) => setData('is_active', e.target.checked)}
                                                className="w-4 h-4 text-cab-blue focus:ring-cab-blue border-gray-300 rounded"
                                            />
                                            <label className="text-sm text-gray-700">Leçon active</label>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Ordre
                                            </label>
                                            <input
                                                type="number"
                                                value={data.order}
                                                onChange={(e) => setData('order', parseInt(e.target.value) || 0)}
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                                min="0"
                                            />
                                        </div>
                                    </div>

                                    {/* Barre de progression pendant l'upload */}
                                    {uploadProgress !== null && (
                                        <div className="mt-2">
                                            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-cab-blue transition-all duration-200"
                                                    style={{ width: `${uploadProgress}%` }}
                                                />
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1 text-center">
                                                {uploadProgress < 100
                                                    ? `Envoi de la vidéo... ${uploadProgress}%`
                                                    : 'Traitement par le serveur...'}
                                            </p>
                                        </div>
                                    )}

                                    {/* Boutons */}
                                    <div className="flex gap-3 pt-4 border-t border-gray-100">
                                        <button
                                            type="button"
                                            onClick={closeModal}
                                            className="flex-1 px-6 py-2.5 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                                        >
                                            Annuler
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="flex-1 flex items-center justify-center gap-2 px-6 py-2.5 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors disabled:opacity-50"
                                        >
                                            {processing ? (
                                                <>
                                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Envoi en cours...
                                                </>
                                            ) : (
                                                <>
                                                    <PlusIcon className="w-5 h-5" />
                                                    Ajouter la leçon
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </AdminLayout>
        </>
    );
}
