// resources/js/pages/Admin/Activites/Edit.tsx
import { useState } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Components/Layouts/AdminLayout';
import { ArrowLeftIcon, PencilSquareIcon, XMarkIcon, PhotoIcon, CalendarIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';

interface Activite {
    id: number;
    title: string;
    excerpt: string | null;
    description: string | null;
    image: string | null;
    image_url: string;
    tag: string | null;
    date: string;
    lieu: string | null;
    heure: string | null;
    is_active: boolean;
    ordre: number;
    lien: string | null;
}

interface Props {
    activite: Activite;
}

export default function Edit({ activite }: Props) {
    const [preview, setPreview] = useState<string | null>(activite.image_url);

    const { data, setData, processing, errors } = useForm({
        title: activite.title || '',
        excerpt: activite.excerpt || '',
        description: activite.description || '',
        image: null as File | null,
        tag: activite.tag || '',
        date: activite.date || '',
        lieu: activite.lieu || '',
        heure: activite.heure || '',
        lien: activite.lien || '',
        is_active: !!activite.is_active,
        ordre: activite.ordre ?? 0,
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setData('image', null);
        setPreview(null);
        const fileInput = document.getElementById('image-input') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('_method', 'PUT');

        formData.append('title', data.title);
        formData.append('excerpt', data.excerpt || '');
        formData.append('description', data.description || '');
        formData.append('tag', data.tag || '');
        formData.append('date', data.date);
        formData.append('lieu', data.lieu || '');
        formData.append('heure', data.heure || '');
        formData.append('lien', data.lien || ''); // ✅ AJOUTÉ
        formData.append('is_active', data.is_active ? '1' : '0');
        formData.append('ordre', String(data.ordre));

        if (data.image) {
            formData.append('image', data.image);
        }

        router.post(`/admin/activites/${activite.id}`, formData, {
            forceFormData: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    };

    return (
        <>
            <Head title="Modifier l'activité - Admin" />

            <AdminLayout title="Modifier l'activité">
                <div className="max-w-3xl">
                    <Link
                        href="/admin/activites"
                        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-cab-blue transition-colors mb-4"
                    >
                        <ArrowLeftIcon className="w-4 h-4" />
                        Retour à la liste
                    </Link>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <form onSubmit={handleSubmit} className="space-y-5" encType="multipart/form-data">
                            {/* Titre */}
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                    Titre <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="title"
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                    required
                                />
                                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                            </div>

                            {/* Tag */}
                            <div>
                                <label htmlFor="tag" className="block text-sm font-medium text-gray-700 mb-1">
                                    Tag
                                </label>
                                <input
                                    id="tag"
                                    type="text"
                                    value={data.tag}
                                    onChange={(e) => setData('tag', e.target.value)}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                />
                                {errors.tag && <p className="mt-1 text-sm text-red-600">{errors.tag}</p>}
                            </div>

                            {/* Image */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Image
                                </label>
                                <div className="flex items-center gap-4">
                                    {preview ? (
                                        <div className="relative">
                                            <img
                                                src={preview}
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
                                        <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-cab-blue transition-colors bg-white">
                                            <PhotoIcon className="w-8 h-8 text-gray-400" />
                                            <span className="text-xs text-gray-500 mt-1">Ajouter une image</span>
                                            <input
                                                id="image-input"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="hidden"
                                            />
                                        </label>
                                    )}
                                    <p className="text-xs text-gray-400">Laissez vide pour conserver l'image actuelle</p>
                                </div>
                                {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
                            </div>

                            {/* Résumé */}
                            <div>
                                <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">
                                    Résumé
                                </label>
                                <textarea
                                    id="excerpt"
                                    value={data.excerpt}
                                    onChange={(e) => setData('excerpt', e.target.value)}
                                    rows={2}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors resize-none"
                                />
                                {errors.excerpt && <p className="mt-1 text-sm text-red-600">{errors.excerpt}</p>}
                            </div>

                            {/* Description */}
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                    Description complète
                                </label>
                                <textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows={4}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors resize-none"
                                />
                                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                            </div>

                            {/* Date, Lien, Lieu, Heure */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                                        Date <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <CalendarIcon className="w-5 h-5 text-gray-400" />
                                        </div>
                                        <input
                                            id="date"
                                            type="date"
                                            value={data.date}
                                            onChange={(e) => setData('date', e.target.value)}
                                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                            required
                                        />
                                    </div>
                                    {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
                                </div>

                                <div>
                                    <label htmlFor="lien" className="block text-sm font-medium text-gray-700 mb-1">
                                        Lien (optionnel)
                                    </label>
                                    <input
                                        id="lien"
                                        type="url"
                                        value={data.lien}
                                        onChange={(e) => setData('lien', e.target.value)}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                        placeholder="https://exemple.com/evenement"
                                    />
                                    <p className="text-xs text-gray-400 mt-1">
                                        Lien vers la page de l'événement ou vers une page externe
                                    </p>
                                </div>
                            </div>

                            {/* Lieu et Heure */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="lieu" className="block text-sm font-medium text-gray-700 mb-1">
                                        Lieu
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <MapPinIcon className="w-5 h-5 text-gray-400" />
                                        </div>
                                        <input
                                            id="lieu"
                                            type="text"
                                            value={data.lieu}
                                            onChange={(e) => setData('lieu', e.target.value)}
                                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                        />
                                    </div>
                                    {errors.lieu && <p className="mt-1 text-sm text-red-600">{errors.lieu}</p>}
                                </div>

                                <div>
                                    <label htmlFor="heure" className="block text-sm font-medium text-gray-700 mb-1">
                                        Heure
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <ClockIcon className="w-5 h-5 text-gray-400" />
                                        </div>
                                        <input
                                            id="heure"
                                            type="time"
                                            value={data.heure}
                                            onChange={(e) => setData('heure', e.target.value)}
                                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                        />
                                    </div>
                                    {errors.heure && <p className="mt-1 text-sm text-red-600">{errors.heure}</p>}
                                </div>
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
                                        Activité active
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
