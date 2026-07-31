// resources/js/pages/Admin/Certifications/Edit.tsx
import { ArrowLeftIcon, PencilSquareIcon, XMarkIcon } from '@heroicons/react/24/outline';

import { Head, Link, router } from '@inertiajs/react';

import { useState } from 'react';
import AdminLayout from '@/Components/Layouts/AdminLayout';

interface Formation {
    id: number;
    name: string;
    abbreviation: string;
}

interface Certification {
    id: number;
    formation_id: number;
    titre: string;
    description: string;
    prerequis: string | null;
    contenu: string | null;
    duree: string;
    frais: number;
    image: string | null;
    image_url: string;
    lien_externe: string | null;
    lien_label: string | null;
    is_active: boolean;
    order: number;
}

interface Props {
    certification: Certification;
    formations: Formation[];
}

export default function Edit({ certification, formations }: Props) {
    const [previewImage, setPreviewImage] = useState<string | null>(certification.image_url);
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [data, setData] = useState({
        formation_id: certification.formation_id.toString(),
        titre: certification.titre || '',
        description: certification.description || '',
        prerequis: certification.prerequis || '',
        contenu: certification.contenu || '',
        duree: certification.duree || '',
        frais: certification.frais?.toString() || '0',
        image: null as File | null,
        lien_externe: certification.lien_externe || '',
        lien_label: certification.lien_label || '',
        is_active: certification.is_active ?? true,
        order: certification.order ?? 0,
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData({ ...data, image: file });
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setData({ ...data, image: null });
        setPreviewImage(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        router.post(`/admin/certifications/${certification.id}`, {
            ...data,
            _method: 'put',
        }, {
            preserveState: false,
            preserveScroll: true,
            onSuccess: () => {
                setProcessing(false);
                router.visit('/admin/certifications');
            },
            onError: (errors) => {
                setProcessing(false);
                setErrors(errors);
            },
        });
    };

    return (
        <>
            <Head title="Modifier la certification - Admin" />

            <AdminLayout title="Modifier la certification">
                <div className="max-w-3xl">
                    <Link
                        href="/admin/certifications"
                        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-cab-blue transition-colors mb-4"
                    >
                        <ArrowLeftIcon className="w-4 h-4" />
                        Retour à la liste
                    </Link>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <form onSubmit={handleSubmit} className="space-y-5" encType="multipart/form-data">
                            {/* Formation associée */}
                            <div>
                                <label htmlFor="formation_id" className="block text-sm font-medium text-gray-700 mb-1">
                                    Formation associée <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="formation_id"
                                    value={data.formation_id}
                                    onChange={(e) => setData({ ...data, formation_id: e.target.value })}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors bg-white"
                                    required
                                >
                                    <option value="">-- Sélectionnez une formation --</option>
                                    {formations.map((formation) => (
                                        <option key={formation.id} value={formation.id}>
                                            {formation.name} ({formation.abbreviation})
                                        </option>
                                    ))}
                                </select>
                                {errors.formation_id && <p className="mt-1 text-sm text-red-600">{errors.formation_id}</p>}
                            </div>

                            {/* Titre */}
                            <div>
                                <label htmlFor="titre" className="block text-sm font-medium text-gray-700 mb-1">
                                    Titre de la certification <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="titre"
                                    type="text"
                                    value={data.titre}
                                    onChange={(e) => setData({ ...data, titre: e.target.value })}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                    required
                                />
                                {errors.titre && <p className="mt-1 text-sm text-red-600">{errors.titre}</p>}
                            </div>

                            {/* Image */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Image de la certification
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
                                <p className="text-xs text-gray-400 mt-1">Laissez vide pour utiliser l'image de la formation</p>
                                {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
                            </div>

                            {/* Grille 2 colonnes */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="duree" className="block text-sm font-medium text-gray-700 mb-1">
                                        Durée <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="duree"
                                        type="text"
                                        value={data.duree}
                                        onChange={(e) => setData({ ...data, duree: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                        required
                                    />
                                    {errors.duree && <p className="mt-1 text-sm text-red-600">{errors.duree}</p>}
                                </div>
                                <div>
                                    <label htmlFor="frais" className="block text-sm font-medium text-gray-700 mb-1">
                                        Frais (FCFA) <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="frais"
                                        type="number"
                                        value={data.frais}
                                        onChange={(e) => setData({ ...data, frais: e.target.value })}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                        min="0"
                                        step="1000"
                                        required
                                    />
                                    {errors.frais && <p className="mt-1 text-sm text-red-600">{errors.frais}</p>}
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                    Description <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData({ ...data, description: e.target.value })}
                                    rows={4}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors resize-none"
                                    required
                                />
                                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                            </div>

                            {/* Prérequis */}
                            <div>
                                <label htmlFor="prerequis" className="block text-sm font-medium text-gray-700 mb-1">
                                    Prérequis
                                </label>
                                <textarea
                                    id="prerequis"
                                    value={data.prerequis}
                                    onChange={(e) => setData({ ...data, prerequis: e.target.value })}
                                    rows={3}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors resize-none"
                                />
                                {errors.prerequis && <p className="mt-1 text-sm text-red-600">{errors.prerequis}</p>}
                            </div>

                            {/* Contenu */}
                            <div>
                                <label htmlFor="contenu" className="block text-sm font-medium text-gray-700 mb-1">
                                    Programme / Contenu
                                </label>
                                <textarea
                                    id="contenu"
                                    value={data.contenu}
                                    onChange={(e) => setData({ ...data, contenu: e.target.value })}
                                    rows={4}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors resize-none"
                                />
                                {errors.contenu && <p className="mt-1 text-sm text-red-600">{errors.contenu}</p>}
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
                                            onChange={(e) => setData({ ...data, lien_label: e.target.value })}
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
                                            onChange={(e) => setData({ ...data, lien_externe: e.target.value })}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                            placeholder="https://example.com/certification"
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
                                        onChange={(e) => setData({ ...data, is_active: e.target.checked })}
                                        className="w-4 h-4 text-cab-blue focus:ring-cab-blue border-gray-300 rounded"
                                    />
                                    <label htmlFor="is_active" className="text-sm text-gray-700">
                                        Certification active
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
                                        onChange={(e) => setData({ ...data, order: parseInt(e.target.value) || 0 })}
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
