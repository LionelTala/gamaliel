import { useState } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Components/Layouts/AdminLayout';
import { ArrowLeftIcon, PencilSquareIcon, XMarkIcon, PhotoIcon } from '@heroicons/react/24/outline';

interface Media {
    id: number;
    titre: string;
    description: string | null;
    fichier: string;
    url: string;
    type: string;
    type_label: string;
    is_image: boolean;
    is_video: boolean;
    is_active: boolean;
    ordre: number;
}

interface Props {
    media: Media;
}

export default function Edit({ media }: Props) {
    const [preview, setPreview] = useState<string | null>(media.is_image ? media.url : null);
    const [fileName, setFileName] = useState<string>(media.fichier);

    const { data, setData, processing, errors } = useForm({
        titre: media.titre || '',
        description: media.description || '',
        fichier: null as File | null,
        is_active: media.is_active ?? true,
        ordre: media.ordre ?? 0,
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('fichier', file);
            setFileName(file.name);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeFile = () => {
        setData('fichier', null);
        setPreview(null);
        setFileName(media.fichier);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // 1. Initialiser le FormData manuel requis pour les fichiers sous PHP
        const formData = new FormData();

        // 🚀 LA CORRECTION CRITIQUE MANQUANTE : Spoofing de méthode pour Laravel
        formData.append('_method', 'PUT');

        // 2. Remplir le FormData avec les données actuelles du useForm
        formData.append('titre', data.titre);
        formData.append('description', data.description || '');
        formData.append('is_active', data.is_active ? '1' : '0');
        formData.append('ordre', String(data.ordre));

        if (data.fichier) {
            formData.append('fichier', data.fichier);
        }

        // Debug local console pour s'assurer du contenu envoyé
        console.log('📤 Payload Galerie envoyé au serveur :');
        for (let pair of formData.entries()) {
            console.log(`${pair[0]}:`, pair[1]);
        }

        // 3. Soumettre via router.post vers l'URL d'administration de ta galerie
        router.post(`/admin/galerie/${media.id}`, formData, {
            forceFormData: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onSuccess: () => {
                console.log('✅ Galerie mise à jour avec succès !');
            },
            onError: (err) => {
                console.error('❌ Erreurs de validation reçues :', err);
            },
        });
    };

    return (
        <>
            <Head title="Modifier le média - Admin" />

            <AdminLayout title="Modifier le média">
                <div className="max-w-3xl">
                    <Link
                        href="/admin/galerie"
                        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-cab-blue transition-colors mb-4"
                    >
                        <ArrowLeftIcon className="w-4 h-4" />
                        Retour à la galerie
                    </Link>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <form onSubmit={handleSubmit} className="space-y-5" encType="multipart/form-data">
                            {/* Titre */}
                            <div>
                                <label htmlFor="titre" className="block text-sm font-medium text-gray-700 mb-1">
                                    Titre <span className="text-red-500">*</span>
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
                                    Description (optionnel)
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

                            {/* Fichier actuel */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Fichier actuel
                                </label>
                                <div className="flex items-center gap-4">
                                    {media.is_image ? (
                                        <img
                                            src={media.url}
                                            alt={media.titre}
                                            className="w-32 h-32 rounded-xl object-cover border border-gray-200"
                                        />
                                    ) : media.is_video ? (
                                        <video
                                            src={media.url}
                                            className="w-32 h-32 rounded-xl object-cover border border-gray-200"
                                        />
                                    ) : (
                                        <div className="w-32 h-32 rounded-xl bg-gray-100 flex items-center justify-center border border-gray-200">
                                            <PhotoIcon className="w-12 h-12 text-gray-400" />
                                        </div>
                                    )}
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">{media.fichier}</p>
                                        <p className="text-xs text-gray-500">{media.type_label}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Nouveau fichier */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Remplacer le fichier (optionnel)
                                </label>
                                <div className="flex items-center gap-4">
                                    {preview && data.fichier ? (
                                        <div className="relative">
                                            <img
                                                src={preview}
                                                alt="Aperçu"
                                                className="w-32 h-32 rounded-xl object-cover border border-gray-200"
                                            />
                                            <button
                                                type="button"
                                                onClick={removeFile}
                                                className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                            >
                                                <XMarkIcon className="w-4 h-4" />
                                            </button>
                                            <p className="text-xs text-gray-500 mt-1">{fileName}</p>
                                        </div>
                                    ) : (
                                        <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-cab-blue transition-colors bg-white">
                                            <PhotoIcon className="w-8 h-8 text-gray-400" />
                                            <span className="text-xs text-gray-500 mt-1">Choisir un fichier</span>
                                            <input
                                                type="file"
                                                accept="image/*,video/*,application/pdf,.doc,.docx"
                                                onChange={handleFileChange}
                                                className="hidden"
                                            />
                                        </label>
                                    )}
                                    <div>
                                        <p className="text-xs text-gray-400">
                                            Formats acceptés : images, vidéos, PDF, documents
                                        </p>
                                        <p className="text-xs text-gray-400">Taille max : 20MB</p>
                                    </div>
                                </div>
                                {errors.fichier && <p className="mt-1 text-sm text-red-600">{errors.fichier}</p>}
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
                                        Média actif
                                    </label>
                                </div>
                                <div>
                                    <label htmlFor="ordre" className="block text-sm font-medium text-gray-700 mb-1">
                                        Ordre d'affichage
                                    </label>
                                    <input
                                        id="ordre"
                                        type="number"
                                        value={data.ordre}
                                        onChange={(e) => setData('ordre', parseInt(e.target.value) || 0)}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                        min="0"
                                    />
                                </div>
                            </div>

                            {/* Bouton de soumission */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Mise à jour en cours...
                                    </>
                                ) : (
                                    <>
                                        <PencilSquareIcon className="w-5 h-5" />
                                        Mettre à jour
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
