// resources/js/pages/Admin/Cours/EditLesson.tsx
import {
    ArrowLeftIcon,
    DocumentIcon,
    VideoCameraIcon,
    PlusIcon,
    XMarkIcon,
    PencilSquareIcon,
} from '@heroicons/react/24/outline';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { useState, useRef } from 'react';
import AdminLayout from '@/Components/Layouts/AdminLayout';
import { uploadState } from '@/lib/uploadState';

interface Lesson {
    id: number;
    titre: string;
    description: string | null;
    contenu: string | null;
    video_url: string | null;
    video_stream_url: string | null; // ✅ Ajouté ici
    video_title: string | null;
    files: any[];
    order: number;
    is_active: boolean;
    cours: {
        id: number;
        titre: string;
        tranche_requise: {
            numero: number;
            montant: number;
        } | null;
    };
}

interface Props {
    lesson: Lesson;
    cours: {
        id: number;
        titre: string;
        tranche_requise: {
            numero: number;
            montant: number;
        } | null;
    };
}

export default function EditLesson({ lesson, cours }: Props) {
    const [files, setFiles] = useState<File[]>([]);
    const [filePreviews, setFilePreviews] = useState<string[]>([]);

    // ✅ On utilise video_stream_url par défaut pour la prévisualisation de la vidéo existante
    const [videoPreview, setVideoPreview] = useState<string | null>(lesson.video_stream_url || lesson.video_url || null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [progress, setProgress] = useState<number | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const videoInputRef = useRef<HTMLInputElement>(null);

    const { data, setData, errors } = useForm({
        titre: lesson.titre,
        description: lesson.description || '',
        contenu: lesson.contenu || '',
        video: null as File | null,
        video_title: lesson.video_title || '',
        order: lesson.order,
        is_active: lesson.is_active,
        files: [] as File[],
    });

    // Gestion du fichier vidéo local
    const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('video', file);
            if (videoPreview && videoPreview.startsWith('blob:')) {
                URL.revokeObjectURL(videoPreview);
            }
            setVideoPreview(URL.createObjectURL(file));
        }
    };

    const removeVideo = () => {
        setData('video', null);
        if (videoPreview && videoPreview.startsWith('blob:')) {
            URL.revokeObjectURL(videoPreview);
        }
        // ✅ Restaure l'URL de streaming de la vidéo initiale
        setVideoPreview(lesson.video_stream_url || lesson.video_url || null);
        if (videoInputRef.current) {
            videoInputRef.current.value = '';
        }
    };

    // Gestion des fichiers joints
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
        if (filePreviews[index] && filePreviews[index].startsWith('blob:')) {
            URL.revokeObjectURL(filePreviews[index]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setProgress(0);
        uploadState.setActive(true);

        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('titre', data.titre);
        formData.append('description', data.description || '');
        formData.append('contenu', data.contenu || '');
        formData.append('video_title', data.video_title || '');
        formData.append('order', String(data.order));
        formData.append('is_active', data.is_active ? '1' : '0');

        if (data.video) {
            formData.append('video', data.video);
        }

        data.files.forEach((file) => {
            formData.append('files[]', file);
        });

        router.post(`/admin/cours/lesson/${lesson.id}`, formData, {
            forceFormData: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onProgress: (event) => {
                if (event?.percentage != null) {
                    setProgress(event.percentage);
                }
            },
            onSuccess: () => {
                setIsSubmitting(false);
                setProgress(null);
                uploadState.setActive(false);
            },
            onError: () => {
                setIsSubmitting(false);
                setProgress(null);
                uploadState.setActive(false);
            },
            onFinish: () => {
                setIsSubmitting(false);
                setProgress(null);
                uploadState.setActive(false);
            },
        });
    };

    return (
        <>
            <Head title={`Modifier ${lesson.titre}`} />

            <AdminLayout title="Modifier la leçon">
                <div className="max-w-4xl">
                    <Link
                        href={`/admin/cours/${cours.id}`}
                        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-cab-blue transition-colors mb-4"
                    >
                        <ArrowLeftIcon className="w-4 h-4" />
                        Retour au cours
                    </Link>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="mb-6 bg-blue-50 rounded-xl p-4 border border-blue-100">
                            <p className="text-sm text-blue-700">
                                <span className="font-semibold">ℹ️ Accès hérité du cours</span>
                                <br />
                                {cours.tranche_requise ? (
                                    <>Cette leçon est accessible aux étudiants ayant payé la <strong>Tranche {cours.tranche_requise.numero}</strong></>
                                ) : (
                                    <>Cette leçon est accessible à <strong>tous les étudiants</strong> (aucune tranche requise)</>
                                )}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Titre */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Titre <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.titre}
                                    onChange={(e) => setData('titre', e.target.value)}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                    required
                                />
                                {errors.titre && <span className="text-xs text-red-500 mt-1">{errors.titre}</span>}
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
                                />
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
                                />
                            </div>

                            {/* Vidéo */}
                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 space-y-4">
                                <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <VideoCameraIcon className="w-5 h-5 text-cab-blue" />
                                    Vidéo de la leçon (optionnel)
                                </h3>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Titre de la vidéo
                                    </label>
                                    <input
                                        type="text"
                                        value={data.video_title}
                                        onChange={(e) => setData('video_title', e.target.value)}
                                        placeholder="Ex: Introduction aux concepts clés"
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Fichier Vidéo (MP4, WebM - Max 500Mo)
                                    </label>
                                    <input
                                        type="file"
                                        ref={videoInputRef}
                                        accept="video/mp4,video/webm,video/quicktime"
                                        onChange={handleVideoChange}
                                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-cab-blue hover:file:bg-blue-100 cursor-pointer"
                                    />
                                    {errors.video && <span className="text-xs text-red-500 mt-1 block">{errors.video}</span>}
                                </div>

                                {videoPreview && (
                                    <div className="mt-3 relative rounded-xl overflow-hidden border border-gray-200 bg-black max-w-md">
                                        <video src={videoPreview} controls className="w-full h-auto max-h-56" />
                                        {data.video && (
                                            <button
                                                type="button"
                                                onClick={removeVideo}
                                                className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 transition-colors shadow"
                                                title="Annuler la nouvelle vidéo"
                                            >
                                                <XMarkIcon className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Fichiers joints */}
                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                <h3 className="text-sm font-semibold text-gray-700 mb-3">Fichiers joints</h3>
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
                                </div>

                                {files.length > 0 && (
                                    <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
                                        {files.map((file, index) => (
                                            <div key={index} className="relative bg-white rounded-lg p-2 border border-gray-200 flex items-center gap-2">
                                                <DocumentIcon className="w-4 h-4 text-blue-500 flex-shrink-0" />
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

                                {/* Fichiers existants */}
                                {lesson.files && lesson.files.length > 0 && (
                                    <div className="mt-4 border-t border-gray-200 pt-3">
                                        <p className="text-xs font-medium text-gray-500 mb-2">Fichiers existants :</p>
                                        <div className="flex flex-wrap gap-2">
                                            {lesson.files.map((file, index) => (
                                                <a
                                                    key={index}
                                                    href={file.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-xs text-cab-blue hover:underline flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg border border-gray-200"
                                                >
                                                    <DocumentIcon className="w-3.5 h-3.5" />
                                                    {file.name}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Statut et ordre */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="is_active"
                                        checked={data.is_active}
                                        onChange={(e) => setData('is_active', e.target.checked)}
                                        className="w-4 h-4 text-cab-blue focus:ring-cab-blue border-gray-300 rounded cursor-pointer"
                                    />
                                    <label htmlFor="is_active" className="text-sm text-gray-700 cursor-pointer">Leçon active</label>
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

                            {/* Barre de progression d'upload */}
                            {progress !== null && (
                                <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl space-y-2">
                                    <div className="flex justify-between items-center text-xs font-medium text-cab-blue">
                                        <span>
                                            {progress < 100 ? 'Envoi des fichiers en cours...' : 'Traitement côté serveur...'}
                                        </span>
                                        <span>{progress}%</span>
                                    </div>
                                    <div className="w-full h-2 bg-blue-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-cab-blue transition-all duration-200 ease-out"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Boutons */}
                            <div className="flex gap-3 pt-4 border-t border-gray-100">
                                <Link
                                    href={`/admin/cours/${cours.id}`}
                                    className="flex-1 px-6 py-2.5 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors text-center"
                                >
                                    Annuler
                                </Link>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-1 flex items-center justify-center gap-2 px-6 py-2.5 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors disabled:opacity-50"
                                >
                                    {isSubmitting ? (
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
