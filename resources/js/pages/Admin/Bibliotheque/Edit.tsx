// resources/js/pages/Admin/Bibliotheque/Edit.tsx
import { ArrowLeftIcon, PhotoIcon, XMarkIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/Components/Layouts/AdminLayout';

interface Props {
    livre: {
        id: number;
        titre: string;
        description: string;
        prix: number | null;
        lien_achat: string | null;
        is_active: boolean;
        image_url: string | null;
    };
}

export default function Edit({ livre }: Props) {
    const [imagePreview, setImagePreview] = useState<string | null>(livre.image_url);
    const [titre, setTitre] = useState<string>(livre.titre);
    const [description, setDescription] = useState<string>(livre.description);
    const [prix, setPrix] = useState<string>(livre.prix?.toString() || '');
    const [lienAchat, setLienAchat] = useState<string>(livre.lien_achat || '');
    const [isActive, setIsActive] = useState<boolean>(livre.is_active);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [processing, setProcessing] = useState<boolean>(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        // ✅ Créer le FormData avec _method: 'PUT'
        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('titre', titre);
        formData.append('description', description);
        formData.append('prix', prix || '');
        formData.append('lien_achat', lienAchat || '');
        formData.append('is_active', isActive ? '1' : '0');

        if (imageFile) {
            formData.append('image', imageFile);
        }

        // ✅ Debug
        console.log('📤 FormData envoyé avec _method PUT:');
        for (let pair of formData.entries()) {
            console.log(pair[0] + ':', pair[1]);
        }

        // ✅ Envoyer avec router.post
        router.post(`/admin/bibliotheque/${livre.id}`, formData, {
            forceFormData: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onSuccess: () => {
                setProcessing(false);
                console.log('✅ Mise à jour réussie');
            },
            onError: (err) => {
                setProcessing(false);
                setErrors(err);
                console.error('❌ Erreurs:', err);
            },
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setImagePreview(null);
        setImageFile(null);
        // Reset l'input file
        const fileInput = document.getElementById('image-input') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
    };

    return (
        <>
            <Head title="Modifier le livre" />

            <AdminLayout title="Modifier le livre">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-6">
                        <Link href="/admin/bibliotheque" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-cab-blue transition-colors">
                            <ArrowLeftIcon className="w-4 h-4" />
                            Retour à la liste
                        </Link>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Image */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-sm font-medium text-gray-700 mb-4">Image du livre</h3>
                            <div className="flex items-start gap-6">
                                <div className="relative">
                                    {imagePreview ? (
                                        <div className="relative group">
                                            <img
                                                src={imagePreview}
                                                alt="Aperçu"
                                                className="w-32 h-44 object-cover rounded-xl border border-gray-200"
                                            />
                                            <button
                                                type="button"
                                                onClick={removeImage}
                                                className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                            >
                                                <XMarkIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="w-32 h-44 bg-gray-100 rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-gray-300">
                                            <PhotoIcon className="w-8 h-8 text-gray-400" />
                                            <span className="text-xs text-gray-400 mt-1">Pas d'image</span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Changer l'image
                                    </label>
                                    <input
                                        id="image-input"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-cab-blue file:text-white hover:file:bg-cab-blue-dark cursor-pointer"
                                    />
                                    <p className="text-xs text-gray-400 mt-2">Laissez vide pour conserver l'image actuelle</p>
                                    {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Informations */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Titre <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={titre}
                                    onChange={(e) => setTitre(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                    required
                                />
                                {errors.titre && <p className="text-red-500 text-sm mt-1">{errors.titre}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows={4}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                    required
                                />
                                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Prix (FCFA)</label>
                                    <input
                                        type="number"
                                        value={prix}
                                        onChange={(e) => setPrix(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                        placeholder="Laissez vide si gratuit"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Lien d'achat</label>
                                    <input
                                        type="url"
                                        value={lienAchat}
                                        onChange={(e) => setLienAchat(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                        placeholder="https://..."
                                    />
                                    {errors.lien_achat && <p className="text-red-500 text-sm mt-1">{errors.lien_achat}</p>}
                                </div>
                            </div>

                            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                                <input
                                    type="checkbox"
                                    id="is_active"
                                    checked={isActive}
                                    onChange={(e) => setIsActive(e.target.checked)}
                                    className="w-4 h-4 text-cab-blue focus:ring-cab-blue border-gray-300 rounded"
                                />
                                <label htmlFor="is_active" className="text-sm font-medium text-gray-700">Actif</label>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end gap-3">
                            <Link href="/admin/bibliotheque" className="px-6 py-2 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                                Annuler
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-2 bg-cab-blue text-white rounded-xl text-sm font-medium hover:bg-cab-blue-dark transition-colors disabled:opacity-50 flex items-center gap-2"
                            >
                                {processing ? (
                                    <>
                                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Enregistrement...
                                    </>
                                ) : (
                                    <>
                                        <PencilSquareIcon className="w-4 h-4" />
                                        Mettre à jour
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </AdminLayout>
        </>
    );
}
