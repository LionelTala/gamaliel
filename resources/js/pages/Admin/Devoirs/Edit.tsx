// resources/js/pages/Admin/Devoirs/Edit.tsx
import {
    ArrowLeftIcon,
    PencilSquareIcon,
    PlusIcon, 
    XMarkIcon,
    DocumentIcon,
    CalendarIcon,
    UserGroupIcon,
    UserIcon,
} from '@heroicons/react/24/outline';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import AdminLayout from '@/Components/Layouts/AdminLayout';

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

interface Devoir {
    id: number;
    titre: string;
    description: string | null;
    contenu: any[];
    date_limite: string | null;
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
    devoir: Devoir;
    formations: Formation[];
}

export default function Edit({ devoir, formations }: Props) {
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

    const initialTypeDestinataire = devoir.type;

    const { data, setData, processing, errors } = useForm({
        titre: devoir.titre || '',
        description: devoir.description || '',
        formation_id: devoir.formation_id?.toString() || '',
        type_destinataire: initialTypeDestinataire || '',
        vague_id: devoir.vague_id?.toString() || '',
        certification_id: devoir.certification_id?.toString() || '',
        student_id: devoir.student_id?.toString() || '',
        tranche_requise_id: devoir.tranche_requise_id?.toString() || '',
        date_limite: devoir.date_limite || '',
        is_active: devoir.is_active,
        order: devoir.order,
        send_notification: false,
        files: [] as File[],
    });

    // Charger les vagues
    useEffect(() => {
        if (data.formation_id && data.type_destinataire === 'vague') {
            setLoadingVagues(true);
            fetch(`/admin/devoirs/vagues/${data.formation_id}`)
                .then((res) => {
                    if (!res.ok) throw new Error(`HTTP ${res.status}`);
                    return res.json();
                })
                .then((data) => {
                    const list = Array.isArray(data) ? data : [];
                    setVagues(list);
                    setLoadingVagues(false);
                    if (devoir.vague_id && list.some(v => v.id === devoir.vague_id)) {
                        setData('vague_id', devoir.vague_id.toString());
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

    // Charger les certifications
    useEffect(() => {
        if (data.formation_id && data.type_destinataire === 'certification') {
            setLoadingCertifications(true);
            fetch(`/admin/devoirs/certifications/${data.formation_id}`)
                .then((res) => {
                    if (!res.ok) throw new Error(`HTTP ${res.status}`);
                    return res.json();
                })
                .then((data) => {
                    const list = Array.isArray(data) ? data : [];
                    setCertifications(list);
                    setLoadingCertifications(false);
                    if (devoir.certification_id && list.some(c => c.id === devoir.certification_id)) {
                        setData('certification_id', devoir.certification_id.toString());
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

    // Charger les tranches
    useEffect(() => {
        if (data.formation_id) {
            setLoadingTranches(true);
            fetch(`/admin/devoirs/tranches/${data.formation_id}`)
                .then((res) => {
                    if (!res.ok) throw new Error(`HTTP ${res.status}`);
                    return res.json();
                })
                .then((data) => {
                    const list = Array.isArray(data) ? data : [];
                    setTranches(list);
                    setLoadingTranches(false);
                    if (devoir.tranche_requise_id && list.some(t => t.id === devoir.tranche_requise_id)) {
                        setData('tranche_requise_id', devoir.tranche_requise_id.toString());
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

    // Charger les étudiants
    useEffect(() => {
        if (data.certification_id && data.type_destinataire === 'certification') {
            setLoadingStudents(true);
            fetch(`/admin/devoirs/students-by-certification/${data.certification_id}`)
                .then((res) => {
                    if (!res.ok) throw new Error(`HTTP ${res.status}`);
                    return res.json();
                })
                .then((data) => {
                    const list = Array.isArray(data) ? data : [];
                    setStudents(list);
                    setLoadingStudents(false);
                    if (devoir.student_id && list.some(s => s.id === devoir.student_id)) {
                        setData('student_id', devoir.student_id.toString());
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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || []);
        setFiles([...files, ...selectedFiles]);
        setData('files', [...files, ...selectedFiles]);
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

        if (data.date_limite) formData.append('date_limite', data.date_limite);
        formData.append('is_active', data.is_active ? '1' : '0');
        formData.append('order', String(data.order));
        formData.append('send_notification', data.send_notification ? '1' : '0');

        data.files.forEach((file) => {
            formData.append('files[]', file);
        });

        router.post(`/admin/devoirs/${devoir.id}`, formData, {
            forceFormData: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    };

    return (
        <>
            <Head title="Modifier le devoir - Admin" />

            <AdminLayout title="Modifier le devoir">
                <div className="max-w-4xl">
                    <Link
                        href="/admin/devoirs"
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
                                    Titre du devoir <span className="text-red-500">*</span>
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
                                            <UserGroupIcon className={`w-8 h-8 mx-auto mb-2 ${
                                                data.type_destinataire === 'vague'
                                                    ? 'text-cab-blue'
                                                    : 'text-gray-400'
                                            }`} />
                                            <p className={`text-sm font-medium ${
                                                data.type_destinataire === 'vague'
                                                    ? 'text-cab-blue'
                                                    : 'text-gray-600'
                                            }`}>
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
                                            <UserIcon className={`w-8 h-8 mx-auto mb-2 ${
                                                data.type_destinataire === 'certification'
                                                    ? 'text-cab-blue'
                                                    : 'text-gray-400'
                                            }`} />
                                            <p className={`text-sm font-medium ${
                                                data.type_destinataire === 'certification'
                                                    ? 'text-cab-blue'
                                                    : 'text-gray-600'
                                            }`}>
                                                Certification
                                            </p>
                                            <p className="text-xs text-gray-400 mt-1">Envoi individuel</p>
                                        </button>
                                    </div>
                                    {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type}</p>}
                                </div>
                            )}

                            {/* Si Vague de formation */}
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
                                            Les étudiants devront avoir payé cette tranche pour accéder au devoir
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
                                                    <option key={c.id} value={c.id}>
                                                        {c.titre}
                                                    </option>
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
                                                        <option key={s.id} value={s.id}>
                                                            {s.name} ({s.matricule})
                                                        </option>
                                                    ))
                                                )}
                                            </select>
                                            {errors.student_id && <p className="mt-1 text-sm text-red-600">{errors.student_id}</p>}
                                        </div>
                                    )}

                                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                                        <p className="text-sm font-medium text-blue-800">Accès total pour les certifications</p>
                                        <p className="text-xs text-blue-600 mt-1">
                                            Les étudiants en certification ont accès à tous les devoirs sans restriction de tranche.
                                        </p>
                                    </div>
                                </>
                            )}

                            {/* Date limite */}
                            <div>
                                <label htmlFor="date_limite" className="block text-sm font-medium text-gray-700 mb-1">
                                    Date limite
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <CalendarIcon className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="date_limite"
                                        type="datetime-local"
                                        value={data.date_limite}
                                        onChange={(e) => setData('date_limite', e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                    />
                                </div>
                                {errors.date_limite && <p className="mt-1 text-sm text-red-600">{errors.date_limite}</p>}
                            </div>

                            {/* Fichiers existants */}
                            {devoir.contenu && devoir.contenu.length > 0 && (
                                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Fichiers existants</h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {devoir.contenu.map((file, index) => (
                                            <div key={index} className="bg-white rounded-xl p-3 border border-gray-200 flex items-center gap-2">
                                                <DocumentIcon className="w-4 h-4 text-blue-500" />
                                                <span className="text-xs text-gray-600 truncate flex-1">{file.name}</span>
                                                <a
                                                    href={file.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-cab-blue hover:text-cab-dark text-xs"
                                                >
                                                    Voir
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Nouveaux fichiers */}
                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                <h3 className="text-sm font-semibold text-gray-700 mb-3">Ajouter des fichiers</h3>
                                <div className="flex items-center gap-4">
                                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-cab-blue transition-colors">
                                        <PlusIcon className="w-8 h-8 text-gray-400" />
                                        <span className="text-xs text-gray-500 mt-1">Ajouter des fichiers</span>
                                        <input
                                            type="file"
                                            multiple
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                    </label>
                                </div>

                                {filePreviews.length > 0 && (
                                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {files.map((file, index) => (
                                            <div key={index} className="relative bg-white rounded-xl p-3 border border-gray-200 flex items-center gap-2">
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
                                        id="is_active"
                                        type="checkbox"
                                        checked={data.is_active}
                                        onChange={(e) => setData('is_active', e.target.checked)}
                                        className="w-4 h-4 text-cab-blue focus:ring-cab-blue border-gray-300 rounded"
                                    />
                                    <label htmlFor="is_active" className="text-sm text-gray-700">
                                        Devoir actif
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
                                        🔔 Renvoyer une notification (si non déjà envoyé)
                                    </label>
                                </div>
                            </div>

                            {/* Bouton */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors disabled:opacity-50"
                            >
                                {processing ? 'Mise à jour en cours...' : 'Mettre à jour le devoir'}
                            </button>
                        </form>
                    </div>
                </div>
            </AdminLayout>
        </>
    );
}
