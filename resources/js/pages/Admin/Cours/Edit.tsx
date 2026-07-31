import {
    ArrowLeftIcon,
    XMarkIcon,
    DocumentIcon,
    VideoCameraIcon,
    PlusIcon,
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

interface Cours {
    id: number;
    titre: string;
    description: string | null;
    contenu: any[];
    video_url: string | null;
    video_title: string | null;
    formation_id: number;
    type: string;
    mode_envoi: 'groupe' | 'individuel';
    vague_id: number | null;
    certification_id: number | null;
    student_id: number | null;
    tranche_requise_id: number | null;
    is_active: boolean;
    order: number;
}

interface Props {
    cours: Cours;
    formations: Formation[];
}

export default function Edit({ cours, formations }: Props) {
    const [vagues, setVagues] = useState<Vague[]>([]);
    const [certifications, setCertifications] = useState<Certification[]>([]);
    const [students, setStudents] = useState<Student[]>([]);
    const [tranches, setTranches] = useState<Tranche[]>([]);
    const [files, setFiles] = useState<File[]>([]);
    const [filePreviews, setFilePreviews] = useState<string[]>([]);
    const [loadingVagues, setLoadingVagues] = useState(false);
    const [loadingCertifications, setLoadingCertifications] = useState(false);
    const [loadingStudents, setLoadingStudents] = useState(false);
    const [loadingTranches, setLoadingTranches] = useState(false);

    // Vidéo
    const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
    const [videoPreview, setVideoPreview] = useState<string | null>(null);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const initialTypeDestinataire = cours.type;

    const { data, setData, errors } = useForm({
        titre: cours.titre || '',
        description: cours.description || '',
        formation_id: cours.formation_id?.toString() || '',
        type_destinataire: initialTypeDestinataire || '',
        vague_id: cours.vague_id?.toString() || '',
        certification_id: cours.certification_id?.toString() || '',
        student_id: cours.student_id?.toString() || '',
        tranche_requise_id: cours.tranche_requise_id?.toString() || '',
        video_title: cours.video_title || '',
        is_active: !!cours.is_active,
        order: cours.order ?? 0,
        send_notification: false,
        files: [] as File[],
    });

    // 1. Charger les vagues et forcer la valeur sélectionnée du cours
    useEffect(() => {
        if (data.formation_id && data.type_destinataire === 'vague') {
            setLoadingVagues(true);
            fetch(`/admin/cours/vagues/${data.formation_id}`)
                .then((res) => {
                    if (!res.ok) throw new Error(`HTTP ${res.status}`);
                    return res.json();
                })
                .then((vaguesData) => {
                    const list = Array.isArray(vaguesData) ? vaguesData : [];
                    setVagues(list);
                    setLoadingVagues(false);
                    if (cours.vague_id && list.some((v) => v.id === cours.vague_id)) {
                        setData('vague_id', cours.vague_id.toString());
                    }
                })
                .catch(() => {
                    setVagues([]);
                    setLoadingVagues(false);
                });
        } else {
            setVagues([]);
        }
    }, [data.formation_id, data.type_destinataire]);

    // 2. Charger les certifications
    useEffect(() => {
        if (data.formation_id && data.type_destinataire === 'certification') {
            setLoadingCertifications(true);
            fetch(`/admin/cours/certifications/${data.formation_id}`)
                .then((res) => {
                    if (!res.ok) throw new Error(`HTTP ${res.status}`);
                    return res.json();
                })
                .then((certsData) => {
                    const list = Array.isArray(certsData) ? certsData : [];
                    setCertifications(list);
                    setLoadingCertifications(false);
                    if (cours.certification_id && list.some((c) => c.id === cours.certification_id)) {
                        setData('certification_id', cours.certification_id.toString());
                    }
                })
                .catch(() => {
                    setCertifications([]);
                    setLoadingCertifications(false);
                });
        } else {
            setCertifications([]);
        }
    }, [data.formation_id, data.type_destinataire]);

    // 3. Charger les tranches
    useEffect(() => {
        if (data.formation_id) {
            setLoadingTranches(true);
            fetch(`/admin/tranches/by-formation/${data.formation_id}`)
                .then((res) => {
                    if (!res.ok) throw new Error(`HTTP ${res.status}`);
                    return res.json();
                })
                .then((tranchesData) => {
                    const list = Array.isArray(tranchesData) ? tranchesData : [];
                    setTranches(list);
                    setLoadingTranches(false);
                    if (cours.tranche_requise_id && list.some((t) => t.id === cours.tranche_requise_id)) {
                        setData('tranche_requise_id', cours.tranche_requise_id.toString());
                    }
                })
                .catch(() => {
                    setTranches([]);
                    setLoadingTranches(false);
                });
        } else {
            setTranches([]);
        }
    }, [data.formation_id]);

    // 4. Charger les étudiants
    useEffect(() => {
        if (data.certification_id && data.type_destinataire === 'certification') {
            setLoadingStudents(true);
            fetch(`/admin/cours/students-by-certification/${data.certification_id}`)
                .then((res) => {
                    if (!res.ok) throw new Error(`HTTP ${res.status}`);
                    return res.json();
                })
                .then((studentsData) => {
                    const list = Array.isArray(studentsData) ? studentsData : [];
                    setStudents(list);
                    setLoadingStudents(false);
                    if (cours.student_id && list.some((s) => s.id === cours.student_id)) {
                        setData('student_id', cours.student_id.toString());
                    }
                })
                .catch(() => {
                    setStudents([]);
                    setLoadingStudents(false);
                });
        } else {
            setStudents([]);
        }
    }, [data.certification_id, data.type_destinataire]);

    // Gestion vidéo
    const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedVideo(file);
            setVideoPreview(URL.createObjectURL(file));
        }
    };

    const removeSelectedVideo = () => {
        setSelectedVideo(null);
        if (videoPreview) {
            URL.revokeObjectURL(videoPreview);
            setVideoPreview(null);
        }
    };

    // Gestion fichiers joints
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || []);
        const newFiles = [...files, ...selectedFiles];
        setFiles(newFiles);
        setData('files', newFiles);
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

        if (window.uploadState) {
            window.uploadState.active = true;
        }
        setIsSubmitting(true);
        setUploadProgress(0);
        uploadState.setActive(true);

        const formData = new FormData();
        formData.append('_method', 'PUT');

        formData.append('titre', data.titre);
        formData.append('description', data.description || '');
        formData.append('formation_id', data.formation_id);
        formData.append('type', data.type_destinataire);
        formData.append('mode_envoi', data.type_destinataire === 'vague' ? 'groupe' : 'individuel');

        if (data.type_destinataire === 'vague') {
            formData.append('vague_id', data.vague_id || '');
            formData.append('tranche_requise_id', data.tranche_requise_id || '');
            formData.append('certification_id', '');
            formData.append('student_id', '');
        } else {
            formData.append('certification_id', data.certification_id || '');
            formData.append('student_id', data.student_id || '');
            formData.append('vague_id', '');
            formData.append('tranche_requise_id', '');
        }

        if (selectedVideo) {
            formData.append('video', selectedVideo);
        }

        if (data.video_title) formData.append('video_title', data.video_title);
        formData.append('is_active', data.is_active ? '1' : '0');
        formData.append('order', String(data.order));
        formData.append('send_notification', data.send_notification ? '1' : '0');

        data.files.forEach((file) => {
            formData.append('files[]', file);
        });

        router.post(`/admin/cours/${cours.id}`, formData, {
            forceFormData: true,
            onProgress: (progress) => {
                if (progress.percentage) {
                    setUploadProgress(progress.percentage);
                }
            },
            onFinish: () => {
                if (window.uploadState) {
                    window.uploadState.active = false;
                }
                uploadState.setActive(false);
                setIsSubmitting(false);
            },
            onError: () => {
               
                setIsSubmitting(false);
            },
        });
    };

    return (
        <>
            <Head title="Modifier le cours - Admin" />

            <AdminLayout title="Modifier le cours">
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
                                                data.type_destinataire === 'vague'
                                                    ? 'border-cab-blue bg-blue-50'
                                                    : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                        >
                                            <UserGroupIcon
                                                className={`w-8 h-8 mx-auto mb-2 ${
                                                    data.type_destinataire === 'vague' ? 'text-cab-blue' : 'text-gray-400'
                                                }`}
                                            />
                                            <p
                                                className={`text-sm font-medium ${
                                                    data.type_destinataire === 'vague' ? 'text-cab-blue' : 'text-gray-600'
                                                }`}
                                            >
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
                                                data.type_destinataire === 'certification'
                                                    ? 'border-cab-blue bg-blue-50'
                                                    : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                        >
                                            <UserIcon
                                                className={`w-8 h-8 mx-auto mb-2 ${
                                                    data.type_destinataire === 'certification' ? 'text-cab-blue' : 'text-gray-400'
                                                }`}
                                            />
                                            <p
                                                className={`text-sm font-medium ${
                                                    data.type_destinataire === 'certification' ? 'text-cab-blue' : 'text-gray-600'
                                                }`}
                                            >
                                                Certification
                                            </p>
                                            <p className="text-xs text-gray-400 mt-1">Envoi individuel</p>
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Vague */}
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
                                            ) : (
                                                vagues.map((v) => (
                                                    <option key={v.id} value={v.id}>
                                                        {v.name} ({v.date_debut})
                                                    </option>
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
                                            <option value="">-- Tous les étudiants (aucune tranche requise) --</option>
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
                                    </div>
                                </>
                            )}

                            {/* Certification */}
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
                                                    <option key={c.id} value={c.id}>
                                                        {c.titre}
                                                    </option>
                                                ))
                                            )}
                                        </select>
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
                                                        <option key={s.id} value={s.id}>
                                                            {s.name} ({s.matricule})
                                                        </option>
                                                    ))
                                                )}
                                            </select>
                                        </div>
                                    )}
                                </>
                            )}

                            {/* Section Vidéo */}
                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                    <VideoCameraIcon className="w-5 h-5 text-cab-blue" />
                                    Vidéo du cours
                                </h3>

                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="video_title" className="block text-sm font-medium text-gray-700 mb-1">
                                            Titre de la vidéo
                                        </label>
                                        <input
                                            id="video_title"
                                            type="text"
                                            value={data.video_title}
                                            onChange={(e) => setData('video_title', e.target.value)}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                            placeholder="Ex: Leçon 1 - Introduction"
                                        />
                                    </div>

                                    {/* Previews / Sélection vidéo */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Fichier vidéo (MP4, WebM, MOV - max 500Mo)
                                        </label>

                                        {/* Nouvelle vidéo sélectionnée */}
                                        {selectedVideo && videoPreview ? (
                                            <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-black max-w-md">
                                                <video src={videoPreview} controls className="w-full max-h-48 object-contain" />
                                                <button
                                                    type="button"
                                                    onClick={removeSelectedVideo}
                                                    className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                                                    title="Supprimer la nouvelle vidéo"
                                                >
                                                    <XMarkIcon className="w-4 h-4" />
                                                </button>
                                                <p className="p-2 text-xs text-gray-200 bg-gray-900 truncate">
                                                    Nouvelle vidéo : {selectedVideo.name} ({(selectedVideo.size / (1024 * 1024)).toFixed(1)} Mo)
                                                </p>
                                            </div>
                                        ) : cours.video_url ? (
                                            /* Vidéo actuellement enregistrée */
                                            <div className="space-y-2">
                                                <div className="p-3 bg-white rounded-xl border border-gray-200 flex items-center justify-between">
                                                    <div className="flex items-center gap-3 truncate">
                                                        <VideoCameraIcon className="w-6 h-6 text-cab-blue flex-shrink-0" />
                                                        <div className="truncate">
                                                            <p className="text-xs font-semibold text-gray-800">Vidéo actuelle</p>
                                                            <a
                                                                href={cours.video_url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-xs text-cab-blue hover:underline truncate block"
                                                            >
                                                                {cours.video_url}
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <label className="inline-flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors">
                                                    <PlusIcon className="w-4 h-4" />
                                                    Remplacer cette vidéo
                                                    <input
                                                        type="file"
                                                        accept="video/mp4,video/webm,video/quicktime"
                                                        onChange={handleVideoChange}
                                                        className="hidden"
                                                    />
                                                </label>
                                            </div>
                                        ) : (
                                            /* Aucun fichier vidéo présent */
                                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-cab-blue transition-colors bg-white">
                                                <VideoCameraIcon className="w-8 h-8 text-gray-400" />
                                                <span className="text-xs text-gray-500 mt-1">Sélectionner un fichier vidéo</span>
                                                <input
                                                    type="file"
                                                    accept="video/mp4,video/webm,video/quicktime"
                                                    onChange={handleVideoChange}
                                                    className="hidden"
                                                />
                                            </label>
                                        )}
                                        {errors.video && <p className="mt-1 text-sm text-red-600">{errors.video}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Fichiers existants */}
                            {cours.contenu && cours.contenu.length > 0 && (
                                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Fichiers existants</h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {cours.contenu.map((file, index) => (
                                            <div key={index} className="bg-white rounded-xl p-3 border border-gray-200 flex items-center gap-2">
                                                <DocumentIcon className="w-4 h-4 text-blue-500" />
                                                <span className="text-xs text-gray-600 truncate flex-1">{file.name}</span>
                                                <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-cab-blue hover:text-cab-dark text-xs font-medium">
                                                    Voir
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Nouveaux fichiers joints */}
                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                <h3 className="text-sm font-semibold text-gray-700 mb-3">Ajouter des fichiers joints</h3>
                                <div className="flex items-center gap-4">
                                    <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-cab-blue transition-colors bg-white">
                                        <PlusIcon className="w-7 h-7 text-gray-400" />
                                        <span className="text-xs text-gray-500 mt-1">Sélectionner des documents</span>
                                        <input type="file" multiple onChange={handleFileChange} className="hidden" />
                                    </label>
                                </div>

                                {filePreviews.length > 0 && (
                                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {files.map((file, index) => (
                                            <div key={index} className="relative bg-white rounded-xl p-3 border border-gray-200 flex items-center gap-2">
                                                <DocumentIcon className="w-4 h-4 text-blue-500" />
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
                                    <label htmlFor="is_active" className="text-sm text-gray-700">
                                        Cours actif
                                    </label>
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
                                        🔔 Renvoyer une notification d'édition aux étudiants concernés
                                    </label>
                                </div>
                            </div>

                            {/* Barre de progression pendant l'upload */}
                            {isSubmitting && uploadProgress > 0 && (
                                <div className="space-y-1">
                                    <div className="flex justify-between text-xs text-gray-600 font-medium">
                                        <span>Envoi du cours en cours...</span>
                                        <span>{uploadProgress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                        <div
                                            className="bg-cab-blue h-2 rounded-full transition-all duration-200"
                                            style={{ width: `${uploadProgress}%` }}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Bouton de soumission */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors disabled:opacity-50"
                            >
                                {isSubmitting ? `Mise à jour (${uploadProgress}%)...` : 'Mettre à jour le cours'}
                            </button>
                        </form>
                    </div>
                </div>
            </AdminLayout>
        </>
    );
}
