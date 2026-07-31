// resources/js/pages/Admin/Bibliotheque/Create.tsx
import { ArrowLeftIcon, PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

import AdminLayout from '@/Components/Layouts/AdminLayout';

export default function Create() {
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const { data, setData, post, processing, errors } = useForm({
        titre: '',
        description: '',
        prix: '',
        lien_achat: '',
        image: null as File | null,
        is_active: true as boolean,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/bibliotheque', { forceFormData: true });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file);
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <Head title="Ajouter un livre" />

            <AdminLayout title="Ajouter un livre">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-6">
                        <Link href="/admin/bibliotheque" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-cab-blue transition-colors">
                            <ArrowLeftIcon className="w-4 h-4" />
                            Retour à la liste
                        </Link>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-sm font-medium text-gray-700 mb-4">Image du livre</h3>
                            <div className="flex items-start gap-6">
                                <div className="relative">
                                    {imagePreview ? (
                                        <div className="relative group">
                                            <img src={imagePreview} alt="Aperçu" className="w-32 h-44 object-cover rounded-xl border border-gray-200" />
                                            <button
                                                type="button"
                                                onClick={() => { setImagePreview(null); setData('image', null); }}
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
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-cab-blue file:text-white hover:file:bg-cab-blue-dark cursor-pointer"
                                    />
                                    {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Titre <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.titre}
                                    onChange={(e) => setData('titre', e.target.value)}
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
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
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
                                        value={data.prix}
                                        onChange={(e) => setData('prix', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                        placeholder="Laissez vide si gratuit"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Lien d'achat</label>
                                    <input
                                        type="url"
                                        value={data.lien_achat}
                                        onChange={(e) => setData('lien_achat', e.target.value)}
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
                                    checked={data.is_active}
                                    onChange={(e) => setData('is_active', e.target.checked)}
                                    className="w-4 h-4 text-cab-blue focus:ring-cab-blue border-gray-300 rounded"
                                />
                                <label htmlFor="is_active" className="text-sm font-medium text-gray-700">Actif</label>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3">
                            <Link href="/admin/bibliotheque" className="px-6 py-2 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                                Annuler
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-2 bg-cab-blue text-white rounded-xl text-sm font-medium hover:bg-cab-blue-dark transition-colors disabled:opacity-50"
                            >
                                {processing ? 'Enregistrement...' : 'Ajouter le livre'}
                            </button>
                        </div>
                    </form>
                </div>
            </AdminLayout>
        </>
    );
}
