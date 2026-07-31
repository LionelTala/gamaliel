// resources/js/pages/public/Bibliotheque/Index.tsx
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { BookOpenIcon, MagnifyingGlassIcon, XMarkIcon, ShoppingBagIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

import PublicLayout from '@/Components/PublicLayout';

interface Livre {
    id: number;
    titre: string;
    description: string;
    prix: number | null;
    lien_achat: string | null;
    image_url: string | null;
}

interface Props {
    livres: {
        data: Livre[];
        links: { url: string | null; label: string; active: boolean }[];
    };
    filters: { search: string | null };
}

export default function Index({ livres, filters }: Props) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [expandedDescriptions, setExpandedDescriptions] = useState<Set<number>>(new Set());

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (searchTerm) params.set('search', searchTerm);
        router.get(`/bibliotheque${params.toString() ? '?' + params.toString() : ''}`);
    };

    const toggleDescription = (livreId: number) => {
        setExpandedDescriptions((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(livreId)) {
                newSet.delete(livreId);
            } else {
                newSet.add(livreId);
            }
            return newSet;
        });
    };

    // Fonction pour tronquer le texte
    const truncateText = (text: string, maxLength: number = 100) => {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength) + '...';
    };

    return (
        <>
            <Head title="Bibliothèque — CAB Informatique">
                <meta name="description" content="Découvrez notre sélection de livres de formation en informatique, gestion et métiers techniques." />
            </Head>

            <PublicLayout>
                <section className="relative pt-32 pb-16" style={{ background: 'linear-gradient(to right, #0a1f4d, #1a56db)' }}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h1 className="text-4xl md:text-5xl font-extrabold text-white">
                                Notre <span className="text-[#d21f2f]">Bibliothèque</span>
                            </h1>
                            <p className="mt-4 text-xl max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.8)' }}>
                                Des ouvrages sélectionnés pour accompagner votre formation
                            </p>
                        </div>
                    </div>
                </section>

                <section className="py-8 bg-white border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-wrap gap-3 items-center">
                            <form onSubmit={handleSearch} className="flex-1 min-w-[200px]">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder="Rechercher un livre..."
                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1a56db] focus:border-[#1a56db] transition-colors text-sm"
                                    />
                                </div>
                            </form>

                            {filters.search && (
                                <button
                                    onClick={() => { setSearchTerm(''); router.get('/bibliotheque'); }}
                                    className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors flex items-center gap-1"
                                >
                                    <XMarkIcon className="w-4 h-4" />
                                    Effacer
                                </button>
                            )}
                        </div>
                    </div>
                </section>

                <section className="py-12 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {livres.data.length === 0 ? (
                            <div className="text-center py-16">
                                <BookOpenIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-500 text-lg">Aucun livre trouvé</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {livres.data.map((livre) => {
                                    const isExpanded = expandedDescriptions.has(livre.id);
                                    const descriptionLength = livre.description?.length || 0;
                                    const shouldTruncate = descriptionLength > 100;

                                    return (
                                        <div key={livre.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col">
                                            <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
                                                {livre.image_url ? (
                                                    <img src={livre.image_url} alt={livre.titre} className="w-full h-full object-cover" loading="lazy" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <BookOpenIcon className="w-16 h-16 text-gray-300" />
                                                    </div>
                                                )}
                                                {livre.prix && (
                                                    <div className="absolute top-3 right-3 bg-[#1a56db] text-white px-3 py-1 rounded-full text-sm font-semibold">
                                                        {Number(livre.prix).toLocaleString()} FCFA
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-5 flex flex-col flex-1">
                                                <h3 className="font-bold text-gray-900 mb-2">{livre.titre}</h3>

                                                {/* ✅ Description avec déroulement */}
                                                <div className="flex-1">
                                                    <p className="text-sm text-gray-600 leading-relaxed">
                                                        {isExpanded || !shouldTruncate
                                                            ? livre.description
                                                            : truncateText(livre.description, 100)
                                                        }
                                                    </p>
                                                    {shouldTruncate && (
                                                        <button
                                                            onClick={() => toggleDescription(livre.id)}
                                                            className="mt-1 text-sm text-[#1a56db] hover:text-[#0d2a63] font-medium flex items-center gap-1 transition-colors"
                                                        >
                                                            {isExpanded ? (
                                                                <>
                                                                    Voir moins
                                                                    <ChevronUpIcon className="w-4 h-4" />
                                                                </>
                                                            ) : (
                                                                <>
                                                                    Voir plus
                                                                    <ChevronDownIcon className="w-4 h-4" />
                                                                </>
                                                            )}
                                                        </button>
                                                    )}
                                                </div>

                                                {livre.lien_achat && (
                                                    <div className="mt-4 pt-4 border-t border-gray-100">
                                                        <a
                                                            href={livre.lien_achat}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-[#1a56db] text-white rounded-xl text-sm font-semibold hover:bg-[#0d2a63] transition-colors"
                                                        >
                                                            <ShoppingBagIcon className="w-4 h-4" />
                                                            Acheter ce livre
                                                        </a>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </section>
            </PublicLayout>
        </>
    );
}
