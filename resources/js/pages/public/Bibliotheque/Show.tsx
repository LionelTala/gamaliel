// resources/js/pages/public/Bibliotheque/Show.tsx
import {
    ArrowLeftIcon,
    BookOpenIcon,
    UserIcon,
    BuildingOfficeIcon,
    ShoppingBagIcon,
    LinkIcon,
    SparklesIcon,
} from '@heroicons/react/24/outline';
import { Head, Link } from '@inertiajs/react';

import PublicLayout from '@/Components/PublicLayout';

interface Livre {
    id: number;
    titre: string;
    slug: string;
    description: string;
    auteur: string | null;
    editeur: string | null;
    prix: number | null;
    lien_achat: string | null;
    image_url: string | null;
    categorie: string | null;
    stock: number;
}

interface Props {
    livre: Livre;
    suggestions: Livre[];
}

export default function Show({ livre, suggestions }: Props) {
    return (
        <>
            <Head title={`${livre.titre} - Bibliothèque CAB Informatique`}>
                <meta name="description" content={livre.description.slice(0, 155)} />
            </Head>

            <PublicLayout>
                <section className="py-12 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Retour */}
                        <Link
                            href="/bibliotheque"
                            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#1a56db] transition-colors mb-6"
                        >
                            <ArrowLeftIcon className="w-4 h-4" />
                            Retour à la bibliothèque
                        </Link>

                        {/* Détail du livre */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8">
                                {/* Image */}
                                <div className="relative aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden">
                                    {livre.image_url ? (
                                        <img
                                            src={livre.image_url}
                                            alt={livre.titre}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <BookOpenIcon className="w-24 h-24 text-gray-300" />
                                        </div>
                                    )}
                                    {livre.prix && (
                                        <div className="absolute top-4 right-4 bg-[#1a56db] text-white px-4 py-2 rounded-full text-lg font-semibold">
                                            {livre.prix.toLocaleString()} FCFA
                                        </div>
                                    )}
                                </div>

                                {/* Informations */}
                                <div className="flex flex-col">
                                    <div className="flex-1">
                                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                            {livre.titre}
                                        </h1>

                                        {livre.auteur && (
                                            <div className="flex items-center gap-2 text-gray-600 mb-1">
                                                <UserIcon className="w-4 h-4" />
                                                <span>Par {livre.auteur}</span>
                                            </div>
                                        )}

                                        {livre.editeur && (
                                            <div className="flex items-center gap-2 text-gray-600 mb-4">
                                                <BuildingOfficeIcon className="w-4 h-4" />
                                                <span>{livre.editeur}</span>
                                            </div>
                                        )}

                                        {livre.categorie && (
                                            <span className="inline-block text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full mb-4">
                                                {livre.categorie}
                                            </span>
                                        )}

                                        <div className="prose prose-sm max-w-none">
                                            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                                {livre.description}
                                            </p>
                                        </div>

                                        {livre.stock > 0 ? (
                                            <div className="mt-4 flex items-center gap-2 text-green-600">
                                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                                <span className="text-sm font-medium">
                                                    En stock ({livre.stock} exemplaires)
                                                </span>
                                            </div>
                                        ) : (
                                            <div className="mt-4 flex items-center gap-2 text-red-600">
                                                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                                <span className="text-sm font-medium">Rupture de stock</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Actions */}
                                    <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
                                        {livre.lien_achat && (

                                             <a   href={livre.lien_achat}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-[#1a56db] text-white rounded-xl font-semibold hover:bg-[#0d2a63] transition-colors"
                                            >
                                                <ShoppingBagIcon className="w-5 h-5" />
                                                Acheter ce livre
                                            </a>
                                        )}

                                        {livre.lien_achat && (

                                            <a   href={livre.lien_achat}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center gap-2 w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                                            >
                                                <LinkIcon className="w-4 h-4" />
                                                Voir le lien d'achat
                                            </a>
                                        )}

                                        <Link
                                            href="/certification"
                                            className="flex items-center justify-center gap-2 w-full px-6 py-3 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                                            style={{ background: 'linear-gradient(to right, #1a56db, #0d2a63)' }}
                                        >
                                            <SparklesIcon className="w-5 h-5" />
                                            Découvrir nos certifications
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Suggestions */}
                        {suggestions.length > 0 && (
                            <div className="mt-12">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                    Vous aimerez aussi
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                                    {suggestions.map((suggestion) => (
                                        <Link key={suggestion.id} href={`/bibliotheque/${suggestion.slug}`}>
                                            <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                                                <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
                                                    {suggestion.image_url ? (
                                                        <img
                                                            src={suggestion.image_url}
                                                            alt={suggestion.titre}
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                            loading="lazy"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center">
                                                            <BookOpenIcon className="w-12 h-12 text-gray-300" />
                                                        </div>
                                                    )}
                                                    {suggestion.prix && (
                                                        <div className="absolute top-2 right-2 bg-[#1a56db] text-white px-2 py-0.5 rounded-full text-xs font-semibold">
                                                            {suggestion.prix.toLocaleString()} FCFA
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="p-3">
                                                    <h4 className="font-medium text-gray-900 text-sm line-clamp-1 group-hover:text-[#1a56db] transition-colors">
                                                        {suggestion.titre}
                                                    </h4>
                                                    {suggestion.auteur && (
                                                        <p className="text-xs text-gray-500">{suggestion.auteur}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </PublicLayout>
        </>
    );
}
