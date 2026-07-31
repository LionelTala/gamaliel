// resources/js/pages/Admin/Galerie/Create.tsx
import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Components/Layouts/AdminLayout';
import { ArrowLeftIcon, PlusIcon, XMarkIcon, PhotoIcon } from '@heroicons/react/24/outline';

export default function Create() {
    const [preview, setPreview] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string>('');
    const [fichier, setFichier] = useState<File | null>(null);
    const [titre, setTitre] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [isActive, setIsActive] = useState<boolean>(true);
    const [ordre, setOrdre] = useState<number>(0);
    const [processing, setProcessing] = useState<boolean>(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // ✅ Stocker le fichier
            setFichier(file);
            setFileName(file.name);

            // ✅ Créer la prévisualisation IMMÉDIATEMENT
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeFile = () => {
        setFichier(null);
        setPreview(null);
        setFileName('');
        // Reset l'input file
        const fileInput = document.getElementById('file-input') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        const formData = new FormData();
        formData.append('titre', titre);
        formData.append('description', description || '');
        formData.append('is_active', isActive ? '1' : '0');
        formData.append('ordre', String(ordre));

        if (fichier) {
            formData.append('fichier', fichier);
        }

        router.post('/admin/galerie', formData, {
            forceFormData: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onSuccess: () => {
                setProcessing(false);
            },
            onError: (err) => {
                setProcessing(false);
                setErrors(err);
            },
        });
    };

    return (
        <>
            <Head title="Ajouter un média - Admin" />

            <AdminLayout title="Ajouter un média">
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
                                    value={titre}
                                    onChange={(e) => setTitre(e.target.value)}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                    placeholder="Ex: Photo de la rentrée"
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
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows={3}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors resize-none"
                                    placeholder="Description du média..."
                                />
                                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                            </div>

                            {/* Fichier avec prévisualisation */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Fichier <span className="text-red-500">*</span>
                                </label>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                    {/* Prévisualisation */}
                                    {preview ? (
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
                                            <p className="text-xs text-gray-500 mt-1 truncate max-w-[128px]">{fileName}</p>
                                        </div>
                                    ) : (
                                        <div className="w-32 h-32 bg-gray-100 rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-gray-300">
                                            <PhotoIcon className="w-10 h-10 text-gray-400" />
                                            <span className="text-xs text-gray-400 mt-1">Aucune image</span>
                                        </div>
                                    )}

                                    <div className="flex-1">
                                        <label className="block w-full cursor-pointer">
                                            <div className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl hover:border-cab-blue transition-colors bg-gray-50 hover:bg-gray-100">
                                                <PhotoIcon className="w-8 h-8 text-gray-400" />
                                                <span className="text-sm text-gray-500 mt-1">
                                                    {preview ? 'Changer l\'image' : 'Choisir une image'}
                                                </span>
                                                <span className="text-xs text-gray-400 mt-0.5">
                                                    JPG, PNG, GIF, WEBP jusqu'à 20MB
                                                </span>
                                            </div>
                                            <input
                                                id="file-input"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                                className="hidden"
                                            />
                                        </label>
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
                                        checked={isActive}
                                        onChange={(e) => setIsActive(e.target.checked)}
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
                                        value={ordre}
                                        onChange={(e) => setOrdre(parseInt(e.target.value) || 0)}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                        min="0"
                                    />
                                </div>
                            </div>

                            {/* Bouton */}
                            <button
                                type="submit"
                                disabled={processing || !fichier}
                                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Ajout en cours...
                                    </>
                                ) : (
                                    <>
                                        <PlusIcon className="w-5 h-5" />
                                        Ajouter le média
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
