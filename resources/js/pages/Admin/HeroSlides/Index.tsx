// resources/js/pages/Admin/HeroSlides/Index.tsx

import {
    PlusIcon,
    PencilSquareIcon,
    TrashIcon,
    EyeIcon,
    EyeSlashIcon,
    PhotoIcon,
    ArrowUpIcon,
    ArrowDownIcon
} from '@heroicons/react/24/outline';
import { Head, Link, router } from '@inertiajs/react';

import { useState } from 'react';


import AdminLayout from '@/Components/Layouts/AdminLayout';

interface Slide {
    id: number;
    titre: string;
    badge: string | null;
    image: string | null;
    image_url: string;
    is_active: boolean;
    ordre: number;
    created_at: string;
}

interface Props {
    slides: Slide[];
}

export default function Index({ slides }: Props) {
    const [showDeleteModal, setShowDeleteModal] = useState<number | null>(null);

    const handleToggleActive = (slide: Slide) => {
        if (confirm(`Confirmer la ${slide.is_active ? 'désactivation' : 'activation'} du slide "${slide.titre}" ?`)) {
            router.post(`/admin/hero-slides/${slide.id}/toggle-active`);
        }
    };

    const handleDelete = (slide: Slide) => {
        if (confirm(`Confirmer la suppression du slide "${slide.titre}" ? Cette action est irréversible.`)) {
            router.delete(`/admin/hero-slides/${slide.id}`);
        }
    };

    return (
        <>
            <Head title="Gestion du Hero - Admin" />

            <AdminLayout title="Gestion du Hero (Carrousel)">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <p className="text-sm text-gray-500">
                        {slides?.length ?? 0} slide{slides?.length !== 1 ? 's' : ''} au total
                    </p>
                    <Link
                        href="/admin/hero-slides/create"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors"
                    >
                        <PlusIcon className="w-5 h-5" />
                        Nouveau slide
                    </Link>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {!slides || slides.length === 0 ? (
                        <div className="text-center py-12">
                            <PhotoIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500 text-sm">Aucun slide trouvé</p>
                            <Link
                                href="/admin/hero-slides/create"
                                className="inline-block mt-4 text-cab-blue hover:text-cab-dark text-sm font-medium"
                            >
                                Créer votre premier slide →
                            </Link>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Ordre
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Aperçu
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Titre
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Badge
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Statut
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Créé le
                                        </th>
                                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {slides.map((slide) => (
                                        <tr key={slide.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-4 py-3 text-gray-600 text-sm">
                                                {slide.ordre}
                                            </td>
                                            <td className="px-4 py-3">
                                                <img
                                                    src={slide.image_url || '/assets/images/placeholder.jpg'}
                                                    alt={slide.titre}
                                                    className="w-16 h-12 rounded-lg object-cover border border-gray-200"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src = '/assets/images/placeholder.jpg';
                                                    }}
                                                />
                                            </td>
                                            <td className="px-4 py-3">
                                                <p className="font-medium text-gray-900 line-clamp-1">{slide.titre}</p>
                                            </td>
                                            <td className="px-4 py-3">
                                                {slide.badge ? (
                                                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs">
                                                        {slide.badge}
                                                    </span>
                                                ) : (
                                                    <span className="text-gray-400 text-xs">-</span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                                                    slide.is_active
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-red-100 text-red-700'
                                                }`}>
                                                    {slide.is_active ? 'Actif' : 'Inactif'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-gray-500 text-xs">
                                                {slide.created_at}
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => handleToggleActive(slide)}
                                                        className={`p-1.5 rounded-lg transition-colors ${
                                                            slide.is_active
                                                                ? 'text-yellow-600 hover:bg-yellow-50'
                                                                : 'text-green-600 hover:bg-green-50'
                                                        }`}
                                                        title={slide.is_active ? 'Désactiver' : 'Activer'}
                                                    >
                                                        {slide.is_active ? (
                                                            <EyeSlashIcon className="w-5 h-5" />
                                                        ) : (
                                                            <EyeIcon className="w-5 h-5" />
                                                        )}
                                                    </button>

                                                    <Link
                                                        href={`/admin/hero-slides/${slide.id}/edit`}
                                                        className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                                                        title="Modifier"
                                                    >
                                                        <PencilSquareIcon className="w-5 h-5" />
                                                    </Link>

                                                    <button
                                                        onClick={() => handleDelete(slide)}
                                                        className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                                                        title="Supprimer"
                                                    >
                                                        <TrashIcon className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </AdminLayout>
        </>
    );
}
