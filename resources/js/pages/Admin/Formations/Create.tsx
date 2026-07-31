// resources/js/pages/Admin/Formations/Create.tsx
import { ArrowLeftIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';

import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

import AdminLayout from '@/Components/Layouts/AdminLayout';


export default function Create() {
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        abbreviation: '',
        description: '',
        debouches: '',
        duration: '',
        diplome: '',
        frais: '',
        image: null as File | null,
        lien_externe: '',
        lien_label: '',
        is_active: true,
        order: 0,
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setData('image', null);
        setPreviewImage(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/formations', {
            forceFormData: true,
        });
    };

    return (
        <>
            <Head title="Créer une formation - Admin" />

            <AdminLayout title="Créer une formation">
                <div className="max-w-3xl">
                    {/* Bouton retour */}
                    <Link
                        href="/admin/formations"
                        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-cab-blue transition-colors mb-4"
                    >
                        <ArrowLeftIcon className="w-4 h-4" />
                        Retour à la liste
                    </Link>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Nom */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Nom de la formation <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                    placeholder="Ex: Réseaux & Maintenance Informatique"
                                    required
                                />
                                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                            </div>

                            {/* Abréviation */}
                            <div>
                                <label htmlFor="abbreviation" className="block text-sm font-medium text-gray-700 mb-1">
                                    Abréviation <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="abbreviation"
                                    type="text"
                                    value={data.abbreviation}
                                    onChange={(e) => setData('abbreviation', e.target.value.toUpperCase())}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors uppercase"
                                    placeholder="Ex: RES"
                                    maxLength={10}
                                    required
                                />
                                {errors.abbreviation && <p className="mt-1 text-sm text-red-600">{errors.abbreviation}</p>}
                            </div>

                            {/* Image */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Image de la formation
                                </label>
                                <div className="mt-1 flex items-center gap-4">
                                    {previewImage ? (
                                        <div className="relative">
                                            <img
                                                src={previewImage}
                                                alt="Aperçu"
                                                className="w-32 h-32 rounded-xl object-cover border border-gray-200"
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
                                        <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-cab-blue transition-colors">
                                            <span className="text-2xl">📷</span>
                                            <span className="text-xs text-gray-500 mt-1">Ajouter</span>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="hidden"
                                            />
                                        </label>
                                    )}
                                </div>
                                {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
                            </div>

                            {/* Grille 2 colonnes */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Durée */}
                                <div>
                                    <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                                        Durée <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="duration"
                                        type="text"
                                        value={data.duration}
                                        onChange={(e) => setData('duration', e.target.value)}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                        placeholder="Ex: 8 mois + 2 mois de stage"
                                        required
                                    />
                                    {errors.duration && <p className="mt-1 text-sm text-red-600">{errors.duration}</p>}
                                </div>

                                {/* Diplôme */}
                                <div>
                                    <label htmlFor="diplome" className="block text-sm font-medium text-gray-700 mb-1">
                                        Diplôme obtenu <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="diplome"
                                        type="text"
                                        value={data.diplome}
                                        onChange={(e) => setData('diplome', e.target.value)}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                        placeholder="Ex: Certificat de Professionnalisation"
                                        required
                                    />
                                    {errors.diplome && <p className="mt-1 text-sm text-red-600">{errors.diplome}</p>}
                                </div>
                            </div>

                            {/* Frais */}
                            <div>
                                <label htmlFor="frais" className="block text-sm font-medium text-gray-700 mb-1">
                                    Frais de formation (FCFA) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="frais"
                                    type="number"
                                    value={data.frais}
                                    onChange={(e) => setData('frais', e.target.value)}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                    placeholder="Ex: 300000"
                                    min="0"
                                    required
                                />
                                {errors.frais && <p className="mt-1 text-sm text-red-600">{errors.frais}</p>}
                            </div>

                            {/* Description */}
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                    Description <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows={4}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors resize-none"
                                    placeholder="Description détaillée de la formation..."
                                    required
                                />
                                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                            </div>

                            {/* Débouchés */}
                            <div>
                                <label htmlFor="debouches" className="block text-sm font-medium text-gray-700 mb-1">
                                    Débouchés <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="debouches"
                                    value={data.debouches}
                                    onChange={(e) => setData('debouches', e.target.value)}
                                    rows={3}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors resize-none"
                                    placeholder="Liste des métiers possibles après la formation..."
                                    required
                                />
                                {errors.debouches && <p className="mt-1 text-sm text-red-600">{errors.debouches}</p>}
                            </div>

                            {/* Lien externe */}
                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                <h3 className="text-sm font-semibold text-gray-700 mb-3">Bouton dynamique (optionnel)</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="lien_label" className="block text-sm font-medium text-gray-700 mb-1">
                                            Libellé du bouton
                                        </label>
                                        <input
                                            id="lien_label"
                                            type="text"
                                            value={data.lien_label}
                                            onChange={(e) => setData('lien_label', e.target.value)}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                            placeholder="Ex: Voir les détails"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="lien_externe" className="block text-sm font-medium text-gray-700 mb-1">
                                            URL du lien
                                        </label>
                                        <input
                                            id="lien_externe"
                                            type="url"
                                            value={data.lien_externe}
                                            onChange={(e) => setData('lien_externe', e.target.value)}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                            placeholder="https://example.com/formation"
                                        />
                                    </div>
                                </div>
                                {errors.lien_label && <p className="mt-1 text-sm text-red-600">{errors.lien_label}</p>}
                                {errors.lien_externe && <p className="mt-1 text-sm text-red-600">{errors.lien_externe}</p>}
                            </div>

                            {/* Statut et ordre */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center gap-2">
                                    <input
                                        id="is_active"
                                        type="checkbox"
                                        checked={data.is_active}
                                        onChange={(e) => setData('is_active', e.target.checked)}
                                        className="w-4 h-4 text-cab-blue focus:ring-cab-blue border-gray-300 rounded"
                                    />
                                    <label htmlFor="is_active" className="text-sm text-gray-700">
                                        Formation active
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
                                        onChange={(e) => setData('order', parseInt(e.target.value))}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                        min="0"
                                    />
                                </div>
                            </div>

                            {/* Bouton */}
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
                                        Création en cours...
                                    </>
                                ) : (
                                    <>
                                        <PlusIcon className="w-5 h-5" />
                                        Créer la formation
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
