// resources/js/pages/Admin/HeroSlides/Edit.tsx
import { ArrowLeftIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { Head, Link, useForm } from '@inertiajs/react';

import { useState } from 'react';
import AdminLayout from '@/Components/Layouts/AdminLayout';

interface Slide {
    id: number;
    titre: string;
    description: string | null;
    badge: string | null;
    image: string | null;
    image_url: string;
    carte_titre: string | null;
    carte_date: string | null;
    carte_tags: string[];
    statistiques: { label: string; sub: string }[];
    cta_secondary_text: string | null;
    cta_secondary_link: string | null;
    is_active: boolean;
    ordre: number;
}

interface Props {
    slide: Slide;
}

export default function Edit({ slide }: Props) {
    const [previewImage, setPreviewImage] = useState<string | null>(slide.image_url);

    const { data, setData, put, processing, errors } = useForm({
        titre: slide.titre,
        description: slide.description || '',
        badge: slide.badge || '',
        image: null as File | null,
        carte_titre: slide.carte_titre || 'Rentrée académique',
        carte_date: slide.carte_date || 'Lundi 05 Octobre 2026',
        carte_tags: slide.carte_tags || [],
        statistiques: slide.statistiques || [],
        cta_secondary_text: slide.cta_secondary_text || '',
        cta_secondary_link: slide.cta_secondary_link || '',
        is_active: slide.is_active,
        ordre: slide.ordre,
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file);
            const reader = new FileReader();
            reader.onloadend = () => setPreviewImage(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setData('image', null);
        setPreviewImage(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/hero-slides/${slide.id}`, { forceFormData: true });
    };

    const displayImage = previewImage || '/assets/images/img1.jpeg';

    return (
        <>
            <Head title="Modifier un slide" />

            <AdminLayout title="Modifier le slide Hero">
                <div className="max-w-6xl mx-auto">
                    <Link href="/admin/hero-slides" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-cab-blue mb-4">
                        <ArrowLeftIcon className="w-4 h-4" />
                        Retour
                    </Link>

                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Formulaire */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-2xl p-6 shadow-sm border">
                                <form onSubmit={handleSubmit} encType="multipart/form-data">
                                    {/* Titre */}
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Titre *</label>
                                        <input
                                            type="text"
                                            value={data.titre}
                                            onChange={(e) => setData('titre', e.target.value)}
                                            className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-cab-blue"
                                            required
                                        />
                                        {errors.titre && <p className="text-sm text-red-600 mt-1">{errors.titre}</p>}
                                    </div>

                                    {/* Badge */}
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Badge</label>
                                        <input
                                            type="text"
                                            value={data.badge}
                                            onChange={(e) => setData('badge', e.target.value)}
                                            className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-cab-blue"
                                        />
                                    </div>

                                    {/* Description */}
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                        <textarea
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            rows={2}
                                            className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-cab-blue resize-none"
                                        />
                                    </div>

                                    {/* Image */}
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                                        <div className="flex items-center gap-4">
                                            <label className="flex items-center gap-2 px-4 py-2.5 border rounded-xl cursor-pointer hover:bg-gray-50">
                                                <span>📷</span>
                                                <span className="text-sm">Changer l'image</span>
                                                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                                            </label>
                                            {previewImage && (
                                                <button type="button" onClick={removeImage} className="text-sm text-red-500 hover:text-red-700">
                                                    Supprimer
                                                </button>
                                            )}
                                        </div>
                                        {errors.image && <p className="text-sm text-red-600 mt-1">{errors.image}</p>}
                                    </div>

                                    {/* Bouton personnalisé */}
                                    <div className="mb-4 p-4 bg-gray-50 rounded-xl">
                                        <p className="text-sm font-medium text-gray-700 mb-2">Bouton personnalisé (optionnel)</p>
                                        <div className="grid grid-cols-2 gap-3">
                                            <input
                                                type="text"
                                                value={data.cta_secondary_text}
                                                onChange={(e) => setData('cta_secondary_text', e.target.value)}
                                                className="px-4 py-2 border rounded-xl focus:ring-2 focus:ring-cab-blue"
                                                placeholder="Texte du bouton"
                                            />
                                            <input
                                                type="text"
                                                value={data.cta_secondary_link}
                                                onChange={(e) => setData('cta_secondary_link', e.target.value)}
                                                className="px-4 py-2 border rounded-xl focus:ring-2 focus:ring-cab-blue"
                                                placeholder="Lien (URL)"
                                            />
                                        </div>
                                    </div>

                                    {/* Actif / Ordre */}
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={data.is_active}
                                                onChange={(e) => setData('is_active', e.target.checked)}
                                                className="w-4 h-4 text-cab-blue rounded"
                                            />
                                            <label className="text-sm text-gray-700">Slide actif</label>
                                        </div>
                                        <div>
                                            <input
                                                type="number"
                                                value={data.ordre}
                                                onChange={(e) => setData('ordre', parseInt(e.target.value) || 0)}
                                                className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-cab-blue"
                                                placeholder="Ordre"
                                                min="0"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full py-3 bg-cab-blue text-white rounded-xl font-semibold hover:bg-cab-dark transition-colors disabled:opacity-50"
                                    >
                                        {processing ? 'Mise à jour...' : 'Mettre à jour'}
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Prévisualisation */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl p-4 shadow-sm border sticky top-20">
                                <h3 className="text-sm font-semibold text-gray-700 mb-3">Aperçu en direct</h3>

                                <div className="relative rounded-xl overflow-hidden bg-gray-900 aspect-[16/9]">
                                    <img
                                        src={displayImage}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = '/assets/images/img1.jpeg';
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>

                                    <div className="absolute inset-0 p-4 flex flex-col justify-center">
                                        {data.badge && (
                                            <span className="inline-block w-fit bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs mb-2">
                                                {data.badge}
                                            </span>
                                        )}
                                        <h4 className="text-white font-bold text-sm leading-tight line-clamp-2">
                                            {data.titre || 'Titre du slide'}
                                        </h4>
                                        {data.description && (
                                            <p className="text-white/70 text-xs mt-1 line-clamp-2">{data.description}</p>
                                        )}
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-[10px]">Certification</span>
                                            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-[10px]">Découvrir</span>
                                            {data.cta_secondary_text && (
                                                <span className="px-3 py-1 bg-cab-red rounded-full text-white text-[10px]">{data.cta_secondary_text}</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="absolute bottom-2 right-2 bg-white/95 backdrop-blur-sm rounded-xl p-2 w-28 text-center">
                                        <div className="w-8 h-8 mx-auto rounded-full border-2 border-cab-blue bg-white"></div>
                                        <p className="text-[10px] font-bold text-gray-800 mt-1">{data.carte_titre || 'CAB'}</p>
                                        {data.carte_date && (
                                            <p className="text-[8px] text-cab-red font-semibold">{data.carte_date}</p>
                                        )}
                                    </div>
                                </div>

                                <p className="text-xs text-gray-400 mt-3 text-center">Aperçu en temps réel</p>
                            </div>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </>
    );
}
