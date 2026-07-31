// resources/js/pages/Admin/Cours/Create.tsx
import {
    ArrowLeftIcon,
    PlusIcon,
    XMarkIcon,
    DocumentIcon,
    VideoCameraIcon,
    PhotoIcon,
    UserGroupIcon,
    UserIcon,
} from '@heroicons/react/24/outline';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import AdminLayout from '@/Components/Layouts/AdminLayout';
import { uploadState } from '@/lib/uploadState';


interface Formation {
    id: number;
    name: string;
    abbreviation: string;
}

interface Vague {
    id: number;
    name: string;
    date_debut: string;
    is_active: boolean;
}

interface Certification {
    id: number;
    titre: string;
}

interface Student {
    id: number;
    name: string;
    matricule: string;
}

interface Tranche {
    id: number;
    numero: number;
    montant: number;
}

interface Props {
    formations: Formation[];
}

export default function Create({ formations }: Props) {
    const [vagues, setVagues] = useState<Vague[]>([]);
    const [certifications, setCertifications] = useState<Certification[]>([]);
    const [students, setStudents] = useState<Student[]>([]);
    const [tranches, setTranches] = useState<Tranche[]>([]);
    const [files, setFiles] = useState<File[]>([]);
    const [filePreviews, setFilePreviews] = useState<string[]>([]);
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
    const [loadingVagues, setLoadingVagues] = useState(false);
    const [loadingCertifications, setLoadingCertifications] = useState(false);
    const [loadingStudents, setLoadingStudents] = useState(false);
    const [loadingTranches, setLoadingTranches] = useState(false);
    const [uploadProgress, setUploadProgress] = useState<number | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [serverErrors, setServerErrors] = useState<Record<string, string>>({});

    const { data, setData, errors: formErrors } = useForm({
        titre: '',
        description: '',
        formation_id: '',
        type_destinataire: '',
        vague_id: '',
        certification_id: '',
        student_id: '',
        tranche_requise_id: '',
        video_title: '',
        is_active: true,
        order: 0,
        send_notification: true,
        files: [] as File[],
    });

    const errors = { ...formErrors, ...serverErrors };

    useEffect(() => {
        if (data.formation_id && data.type_destinataire === 'vague') {
            setLoadingVagues(true);
            fetch(`/admin/cours/vagues/${data.formation_id}`)
                .then((res) => { if (!res.ok) throw new Error(); return res.json(); })
                .then((d) => { setVagues(Array.isArray(d) ? d : []); setLoadingVagues(false); })
                .catch(() => { setVagues([]); setLoadingVagues(false); });
        } else {
            setVagues([]);
        }
    }, [data.formation_id, data.type_destinataire]);

    useEffect(() => {
        if (data.formation_id && data.type_destinataire === 'certification') {
            setLoadingCertifications(true);
            fetch(`/admin/cours/certifications/${data.formation_id}`)
                .then((res) => { if (!res.ok) throw new Error(); return res.json(); })
                .then((d) => { setCertifications(Array.isArray(d) ? d : []); setLoadingCertifications(false); })
                .catch(() => { setCertifications([]); setLoadingCertifications(false); });
        } else {
            setCertifications([]);
        }
    }, [data.formation_id, data.type_destinataire]);

    useEffect(() => {
        if (data.formation_id) {
            setLoadingTranches(true);
            fetch(`/admin/tranches/by-formation/${data.formation_id}`)
                .then((res) => { if (!res.ok) throw new Error(); return res.json(); })
                .then((d) => { setTranches(Array.isArray(d) ? d : []); setLoadingTranches(false); })
                .catch(() => { setTranches([]); setLoadingTranches(false); });
        } else {
            setTranches([]);
        }
    }, [data.formation_id]);

    useEffect(() => {
        if (data.certification_id && data.type_destinataire === 'certification') {
            setLoadingStudents(true);
            fetch(`/admin/cours/students-by-certification/${data.certification_id}`)
                .then((res) => { if (!res.ok) throw new Error(); return res.json(); })
                .then((d) => { setStudents(Array.isArray(d) ? d : []); setLoadingStudents(false); })
                .catch(() => { setStudents([]); setLoadingStudents(false); });
        } else {
            setStudents([]);
        }
    }, [data.certification_id, data.type_destinataire]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || []);
        const updated = [...files, ...selectedFiles];
        setFiles(updated);
        setData('files', updated);
        setFilePreviews([...filePreviews, ...selectedFiles.map((f) => URL.createObjectURL(f))]);
    };

    const removeFile = (index: number) => {
        const newFiles = files.filter((_, i) => i !== index);
        URL.revokeObjectURL(filePreviews[index]);
        setFiles(newFiles);
        setFilePreviews(filePreviews.filter((_, i) => i !== index));
        setData('files', newFiles);
    };

    const getFileIcon = (file: File) =>
        file.type.startsWith('image/') ? <PhotoIcon className="w-5 h-5" /> : <DocumentIcon className="w-5 h-5" />;

    const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setVideoFile(file);
        if (videoPreviewUrl) URL.revokeObjectURL(videoPreviewUrl);
        setVideoPreviewUrl(file ? URL.createObjectURL(file) : null);
    };

    const removeVideo = () => {
        if (videoPreviewUrl) URL.revokeObjectURL(videoPreviewUrl);
        setVideoFile(null);
        setVideoPreviewUrl(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setServerErrors({});
        uploadState.setActive(true);

        const formData = new FormData();
        formData.append('titre', data.titre);
        formData.append('description', data.description || '');
        formData.append('formation_id', data.formation_id);
        formData.append('type', data.type_destinataire);
        formData.append('mode_envoi', data.type_destinataire === 'vague' ? 'groupe' : 'individuel');

        if (data.type_destinataire === 'vague') {
            formData.append('vague_id', data.vague_id || '');
            if (data.tranche_requise_id) formData.append('tranche_requise_id', data.tranche_requise_id);
        } else {
            formData.append('certification_id', data.certification_id || '');
            formData.append('student_id', data.student_id || '');
        }

        if (videoFile) formData.append('video', videoFile);
        if (data.video_title) formData.append('video_title', data.video_title);
        formData.append('is_active', data.is_active ? '1' : '0');
        formData.append('order', String(data.order));
        formData.append('send_notification', data.send_notification ? '1' : '0');

        data.files.forEach((file) => formData.append('files[]', file));

        setSubmitting(true);
        setUploadProgress(0);
        uploadState.active = true;

        router.post('/admin/cours', formData, {
            forceFormData: true,
            onProgress: (event) => {
                if (event?.percentage != null) {
                    setUploadProgress(event.percentage);
                }
            },
            onError: (errs) => {
                setServerErrors(errs as Record<string, string>);
                setSubmitting(false);
                setUploadProgress(null);
                uploadState.setActive(false);
            },
            onFinish: () => {
                setSubmitting(false);
                uploadState.setActive(false);
            },
        });
    };

    return (
        <>
            <Head title="Créer un cours - Admin" />

            <AdminLayout title="Créer un cours">
                <div className="max-w-4xl">
                    <Link
                        href="/admin/cours"
                        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-cab-blue transition-colors mb-4"
                    >
                        <ArrowLeftIcon className="w-4 h-4" />
                        Retour à la liste
                    </Link>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <form onSubmit={handleSubmit} className="space-y-5" encType="multipart/form-data">
                            {/* Titre */}
                            <div>
                                <label htmlFor="titre" className="block text-sm font-medium text-gray-700 mb-1">
                                    Titre du cours <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="titre"
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
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows={3}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors resize-none"
                                    placeholder="Description détaillée du cours..."
                                />
                                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                            </div>

                            {/* Formation */}
                            <div>
                                <label htmlFor="formation_id" className="block text-sm font-medium text-gray-700 mb-1">
                                    Formation <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="formation_id"
                                    value={data.formation_id}
                                    onChange={(e) => {
                                        setData('formation_id', e.target.value);
                                        setData('type_destinataire', '');
                                        setData('vague_id', '');
                                        setData('certification_id', '');
                                        setData('student_id', '');
                                    }}
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
                                {errors.formation_id && <p className="mt-1 text-sm text-red-600">{errors.formation_id}</p>}
                            </div>

                            {/* Type de destinataire */}
                            {data.formation_id && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Type de destinataire <span className="text-red-500">*</span>
                                    </label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setData('type_destinataire', 'vague');
                                                setData('certification_id', '');
                                                setData('student_id', '');
                                            }}
                                            className={`p-4 border-2 rounded-xl text-center transition-all ${
                                                data.type_destinataire === 'vague' ? 'border-cab-blue bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                        >
                                            <UserGroupIcon className={`w-8 h-8 mx-auto mb-2 ${data.type_destinataire === 'vague' ? 'text-cab-blue' : 'text-gray-400'}`} />
                                            <p className={`text-sm font-medium ${data.type_destinataire === 'vague' ? 'text-cab-blue' : 'text-gray-600'}`}>
                                                Vague de formation
                                            </p>
                                            <p className="text-xs text-gray-400 mt-1">Envoi groupé</p>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => {
                                                setData('type_destinataire', 'certification');
                                                setData('vague_id', '');
                                                setData('tranche_requise_id', '');
                                            }}
                                            className={`p-4 border-2 rounded-xl text-center transition-all ${
                                                data.type_destinataire === 'certification' ? 'border-cab-blue bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                        >
                                            <UserIcon className={`w-8 h-8 mx-auto mb-2 ${data.type_destinataire === 'certification' ? 'text-cab-blue' : 'text-gray-400'}`} />
                                            <p className={`text-sm font-medium ${data.type_destinataire === 'certification' ? 'text-cab-blue' : 'text-gray-600'}`}>
                                                Certification
                                            </p>
                                            <p className="text-xs text-gray-400 mt-1">Envoi individuel</p>
                                        </button>
                                    </div>
                                    {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type}</p>}
                                    {errors.mode_envoi && <p className="mt-1 text-sm text-red-600">{errors.mode_envoi}</p>}
                                </div>
                            )}

                            {/* Si Vague */}
                            {data.type_destinataire === 'vague' && (
                                <>
                                    <div>
                                        <label htmlFor="vague_id" className="block text-sm font-medium text-gray-700 mb-1">
                                            Vague de formation <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            id="vague_id"
                                            value={data.vague_id}
                                            onChange={(e) => setData('vague_id', e.target.value)}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors bg-white"
                                            required
                                        >
                                            <option value="">-- Sélectionnez une vague --</option>
                                            {loadingVagues ? (
                                                <option value="" disabled>Chargement...</option>
                                            ) : vagues.length === 0 ? (
                                                <option value="" disabled>Aucune vague active</option>
                                            ) : (
                                                vagues.map((v) => (
                                                    <option key={v.id} value={v.id}>{v.name} ({v.date_debut})</option>
                                                ))
                                            )}
                                        </select>
                                        {errors.vague_id && <p className="mt-1 text-sm text-red-600">{errors.vague_id}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="tranche_requise_id" className="block text-sm font-medium text-gray-700 mb-1">
                                            Accessible à partir de la tranche
                                        </label>
                                        <select
                                            id="tranche_requise_id"
                                            value={data.tranche_requise_id}
                                            onChange={(e) => setData('tranche_requise_id', e.target.value)}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors bg-white"
                                        >
                                            <option value="">-- Tous les étudiants --</option>
                                            {loadingTranches ? (
                                                <option value="" disabled>Chargement...</option>
                                            ) : (
                                                tranches.map((t) => (
                                                    <option key={t.id} value={t.id}>
                                                        Tranche {t.numero} - {t.montant.toLocaleString()} FCFA
                                                    </option>
                                                ))
                                            )}
                                        </select>
                                        <p className="text-xs text-gray-400 mt-1">
                                            Les étudiants devront avoir payé cette tranche pour accéder au cours
                                        </p>
                                        {errors.tranche_requise_id && <p className="mt-1 text-sm text-red-600">{errors.tranche_requise_id}</p>}
                                    </div>
                                </>
                            )}

                            {/* Si Certification */}
                            {data.type_destinataire === 'certification' && (
                                <>
                                    <div>
                                        <label htmlFor="certification_id" className="block text-sm font-medium text-gray-700 mb-1">
                                            Certification <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            id="certification_id"
                                            value={data.certification_id}
                                            onChange={(e) => {
                                                setData('certification_id', e.target.value);
                                                setData('student_id', '');
                                            }}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors bg-white"
                                            required
                                        >
                                            <option value="">-- Sélectionnez une certification --</option>
                                            {loadingCertifications ? (
                                                <option value="" disabled>Chargement...</option>
                                            ) : (
                                                certifications.map((c) => (
                                                    <option key={c.id} value={c.id}>{c.titre}</option>
                                                ))
                                            )}
                                        </select>
                                        {errors.certification_id && <p className="mt-1 text-sm text-red-600">{errors.certification_id}</p>}
                                    </div>

                                    {data.certification_id && (
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
                                                {loadingStudents ? (
                                                    <option value="" disabled>Chargement...</option>
                                                ) : (
                                                    students.map((s) => (
                                                        <option key={s.id} value={s.id}>{s.name} ({s.matricule})</option>
                                                    ))
                                                )}
                                            </select>
                                            {errors.student_id && <p className="mt-1 text-sm text-red-600">{errors.student_id}</p>}
                                        </div>
                                    )}

                                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                                        <p className="text-sm font-medium text-blue-800">Accès total pour les certifications</p>
                                        <p className="text-xs text-blue-600 mt-1">
                                            Les étudiants en certification ont accès à tous les cours sans restriction de tranche.
                                        </p>
                                    </div>
                                </>
                            )}

                            {/* Vidéo — upload local */}
                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                    <VideoCameraIcon className="w-5 h-5 text-cab-blue" />
                                    Vidéo (optionnel)
                                </h3>

                                <div className="mb-4">
                                    <label htmlFor="video_title" className="block text-sm font-medium text-gray-700 mb-1">
                                        Titre de la vidéo
                                    </label>
                                    <input
                                        id="video_title"
                                        type="text"
                                        value={data.video_title}
                                        onChange={(e) => setData('video_title', e.target.value)}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                        placeholder="Ex: Tutoriel réseau"
                                    />
                                </div>

                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Fichier vidéo
                                </label>

                                {!videoFile ? (
                                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-cab-blue transition-colors">
                                        <VideoCameraIcon className="w-8 h-8 text-gray-400" />
                                        <span className="text-xs text-gray-500 mt-1">Sélectionner une vidéo (MP4, WebM — max 500 Mo)</span>
                                        <input
                                            type="file"
                                            accept="video/mp4,video/webm,video/quicktime"
                                            onChange={handleVideoChange}
                                            className="hidden"
                                        />
                                    </label>
                                ) : (
                                    <div className="bg-white rounded-xl border border-gray-200 p-3">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-gray-700 truncate flex-1">
                                                {videoFile.name} ({(videoFile.size / (1024 * 1024)).toFixed(1)} Mo)
                                            </span>
                                            {!submitting && (
                                                <button
                                                    type="button"
                                                    onClick={removeVideo}
                                                    className="text-red-500 hover:text-red-700 ml-2"
                                                >
                                                    <XMarkIcon className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                        {videoPreviewUrl && (
                                            <video src={videoPreviewUrl} controls className="w-full rounded-lg max-h-64" />
                                        )}
                                    </div>
                                )}
                                {errors.video && <p className="mt-1 text-sm text-red-600">{errors.video}</p>}
                            </div>

                            {/* Fichiers */}
                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                <h3 className="text-sm font-semibold text-gray-700 mb-3">Fichiers (optionnel)</h3>
                                <div className="flex items-center gap-4">
                                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-cab-blue transition-colors">
                                        <PlusIcon className="w-8 h-8 text-gray-400" />
                                        <span className="text-xs text-gray-500 mt-1">Ajouter des fichiers</span>
                                        <input type="file" multiple onChange={handleFileChange} className="hidden" />
                                    </label>
                                    <p className="text-xs text-gray-400">PDF, Images, etc. (Max 20MB par fichier)</p>
                                </div>

                                {filePreviews.length > 0 && (
                                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {files.map((file, index) => (
                                            <div key={index} className="relative bg-white rounded-xl p-3 border border-gray-200 flex items-center gap-2">
                                                {getFileIcon(file)}
                                                <span className="text-xs text-gray-600 truncate flex-1">{file.name}</span>
                                                <button type="button" onClick={() => removeFile(index)} className="text-red-500 hover:text-red-700">
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
                                        id="is_active"
                                        type="checkbox"
                                        checked={data.is_active}
                                        onChange={(e) => setData('is_active', e.target.checked)}
                                        className="w-4 h-4 text-cab-blue focus:ring-cab-blue border-gray-300 rounded"
                                    />
                                    <label htmlFor="is_active" className="text-sm text-gray-700">Cours actif</label>
                                </div>
                                <div>
                                    <label htmlFor="order" className="block text-sm font-medium text-gray-700 mb-1">
                                        Ordre d'affichage
                                    </label>
                                    <input
                                        id="order"
                                        type="number"
                                        value={data.order}
                                        onChange={(e) => setData('order', parseInt(e.target.value) || 0)}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                        min="0"
                                    />
                                </div>
                            </div>

                            {/* Notification */}
                            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                                <div className="flex items-center gap-2">
                                    <input
                                        id="send_notification"
                                        type="checkbox"
                                        checked={data.send_notification}
                                        onChange={(e) => setData('send_notification', e.target.checked)}
                                        className="w-4 h-4 text-cab-blue focus:ring-cab-blue border-gray-300 rounded"
                                    />
                                    <label htmlFor="send_notification" className="text-sm text-blue-700 font-medium">
                                        🔔 Envoyer une notification aux étudiants concernés
                                    </label>
                                </div>
                            </div>

                            {/* Barre de progression upload */}
                            {uploadProgress !== null && (
                                <div>
                                    <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-cab-blue transition-all duration-200"
                                            style={{ width: `${uploadProgress}%` }}
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {uploadProgress < 100
                                            ? `Envoi en cours... ${uploadProgress}% — ne fermez pas cette page`
                                            : 'Traitement côté serveur...'}
                                    </p>
                                </div>
                            )}

                            {/* Bouton */}
                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {submitting ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        {videoFile ? 'Envoi de la vidéo...' : 'Création en cours...'}
                                    </>
                                ) : (
                                    <>
                                        <PlusIcon className="w-5 h-5" />
                                        Créer le cours
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </AdminLayout>
        </>
    );
}
