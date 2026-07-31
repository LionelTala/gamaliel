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
    // Nettoyage de la description pour les metas (limité à 160 caractères)
    const cleanDescription = livre.description
        ? livre.description.replace(/(\r\n|\n|\r)/gm, ' ').slice(0, 155) + '...'
        : `Découvrez le livre "${livre.titre}" ${livre.auteur ? `de ${livre.auteur}` : ''} disponible à la bibliothèque du centre de formation CAB Informatique au Cameroun.`;

    // ✅ Données structurées Schema.org pour le type Book
    const jsonLdBook = {
        "@context": "https://schema.org",
        "@type": "Book",
        "name": livre.titre,
        "description": livre.description,
        "url": `https://cab-informatique.com/bibliotheque/${livre.slug}`,
        "image": livre.image_url || "https://cab-informatique.com/assets/images/og-cab-informatique.jpg",
        "author": {
            "@type": "Person",
            "name": livre.auteur || "Auteur non spécifié"
        },
        "publisher": {
            "@type": "Organization",
            "name": livre.editeur || "CAB Informatique"
        },
        "genre": livre.categorie || "Informatique",
        "offers": {
            "@type": "Offer",
            "price": livre.prix ? livre.prix.toString() : "0",
            "priceCurrency": "XAF",
            "availability": livre.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            "url": livre.lien_achat || `https://cab-informatique.com/bibliotheque/${livre.slug}`
        }
    };

    return (
        <>
            <Head>
                {/* Title dynamique avec titre du livre et marque */}
                <title>{`${livre.titre} ${livre.auteur ? `par ${livre.auteur}` : ''} | Bibliothèque CAB Informatique`}</title>

                {/* Meta Description dynamique */}
                <meta name="description" content={cleanDescription} />
                <meta
                    name="keywords"
                    content={`${livre.titre}, livre ${livre.auteur || ''}, livre informatique Cameroun, bibliothèque CAB Informatique, manuel ${livre.categorie || ''}`}
                />
                <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />

                {/* Canonical URL */}
                <link rel="canonical" href={`https://cab-informatique.com/bibliotheque/${livre.slug}`} />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="book" />
                <meta property="og:title" content={`${livre.titre} | Bibliothèque CAB Informatique`} />
                <meta property="og:description" content={cleanDescription} />
                <meta property="og:image" content={livre.image_url || "https://cab-informatique.com/assets/images/og-cab-informatique.jpg"} />
                <meta property="og:site_name" content="CAB Informatique" />
                <meta property="og:locale" content="fr_CM" />
                <meta property="og:url" content={`https://cab-informatique.com/bibliotheque/${livre.slug}`} />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@cabinfo" />
                <meta name="twitter:title" content={`${livre.titre} | Bibliothèque CAB Informatique`} />
                <meta name="twitter:description" content={cleanDescription} />
                <meta name="twitter:image" content={livre.image_url || "https://cab-informatique.com/assets/images/og-cab-informatique.jpg"} />

                {/* Schema.org JSON-LD */}
                <script type="application/ld+json">
                    {JSON.stringify(jsonLdBook)}
                </script>
            </Head>

            <PublicLayout>
                <section className="py-12 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Bouton Retour */}
                        <Link
                            href="/bibliotheque"
                            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#1a56db] transition-colors mb-6"
                        >
                            <ArrowLeftIcon className="w-4 h-4" />
                            Retour à la bibliothèque
                        </Link>

                        {/* Fiche détaillée du livre */}
                        <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8">
                                {/* Image / Couverture */}
                                <div className="relative aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden">
                                    {livre.image_url ? (
                                        <img
                                            src={livre.image_url}
                                            alt={`Couverture du livre ${livre.titre} - Bibliothèque CAB Informatique`}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <BookOpenIcon className="w-24 h-24 text-gray-300" />
                                        </div>
                                    )}
                                    {livre.prix && (
                                        <div className="absolute top-4 right-4 bg-[#1a56db] text-white px-4 py-2 rounded-full text-lg font-semibold shadow-md">
                                            {livre.prix.toLocaleString()} FCFA
                                        </div>
                                    )}
                                </div>

                                {/* Contenu & Informations */}
                                <div className="flex flex-col">
                                    <div className="flex-1">
                                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                            {livre.titre}
                                        </h1>

                                        {livre.auteur && (
                                            <div className="flex items-center gap-2 text-gray-600 mb-1">
                                                <UserIcon className="w-4 h-4" />
                                                <span>Auteur : <strong>{livre.auteur}</strong></span>
                                            </div>
                                        )}

                                        {livre.editeur && (
                                            <div className="flex items-center gap-2 text-gray-600 mb-4">
                                                <BuildingOfficeIcon className="w-4 h-4" />
                                                <span>Éditeur : {livre.editeur}</span>
                                            </div>
                                        )}

                                        {livre.categorie && (
                                            <span className="inline-block text-xs bg-blue-50 text-[#1a56db] font-medium px-3 py-1 rounded-full mb-4">
                                                Catégorie : {livre.categorie}
                                            </span>
                                        )}

                                        <div className="prose prose-sm max-w-none">
                                            <h2 className="text-base font-semibold text-gray-900 mb-2">Résumé du livre :</h2>
                                            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                                {livre.description || "Aucune description disponible pour cet ouvrage."}
                                            </p>
                                        </div>

                                        {livre.stock > 0 ? (
                                            <div className="mt-4 flex items-center gap-2 text-green-600">
                                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                                <span className="text-sm font-medium">Disponible en stock ({livre.stock} exemplaires)</span>
                                            </div>
                                        ) : (
                                            <div className="mt-4 flex items-center gap-2 text-red-600">
                                                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                                <span className="text-sm font-medium">Actuellement en rupture de stock</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Actions & Liens */}
                                    <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
                                        {livre.lien_achat && (
                                            <a
                                                href={livre.lien_achat}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-[#1a56db] text-white rounded-xl font-semibold hover:bg-[#0d2a63] transition-colors"
                                            >
                                                <ShoppingBagIcon className="w-5 h-5" />
                                                Acheter ce livre
                                            </a>
                                        )}

                                        {livre.lien_achat && (
                                            <a
                                                href={livre.lien_achat}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center gap-2 w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                                            >
                                                <LinkIcon className="w-4 h-4" />
                                                Accéder au lien de vente externe
                                            </a>
                                        )}

                                        <Link
                                            href="/certification"
                                            className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-gradient-to-r from-[#1a56db] to-[#0d2a63] text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                                        >
                                            <SparklesIcon className="w-5 h-5" />
                                            Découvrir nos certifications professionnelles
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </article>

                        {/* Suggestions d'ouvrages */}
                        {suggestions.length > 0 && (
                            <aside className="mt-12">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                    Autres ouvrages recommandés
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                                    {suggestions.map((suggestion) => (
                                        <Link key={suggestion.id} href={`/bibliotheque/${suggestion.slug}`}>
                                            <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between">
                                                <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
                                                    {suggestion.image_url ? (
                                                        <img
                                                            src={suggestion.image_url}
                                                            alt={`Livre ${suggestion.titre} - CAB Informatique`}
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
                                                    <h3 className="font-medium text-gray-900 text-sm line-clamp-1 group-hover:text-[#1a56db] transition-colors">
                                                        {suggestion.titre}
                                                    </h3>
                                                    {suggestion.auteur && (
                                                        <p className="text-xs text-gray-500 mt-1">{suggestion.auteur}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </aside>
                        )}
                    </div>
                </section>
            </PublicLayout>
        </>
    );
}
