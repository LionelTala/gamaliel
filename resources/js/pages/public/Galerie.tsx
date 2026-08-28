import { useState, useEffect, useMemo } from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Components/PublicLayout';
import {
    PhotoIcon,
    VideoCameraIcon,
    DocumentTextIcon,
    XMarkIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ArrowDownTrayIcon,
    Squares2X2Icon,
} from '@heroicons/react/24/outline';

interface Media {
    id: number;
    titre: string;
    description: string | null;
    url: string;
    type: string;
    type_label: string;
    is_image: boolean;
    is_video: boolean;
    taille_formatted: string;
}

interface Props {
    medias: Media[];
}

// Chaque type de média porte sa propre couleur Gamaliel, comme les pôles de formation
const typeStyles = {
    image: { color: '#165DF3', bg: 'rgba(22,93,243,0.9)', label: 'Photo', icon: PhotoIcon },
    video: { color: '#E13A4B', bg: 'rgba(225,58,75,0.9)', label: 'Vidéo', icon: VideoCameraIcon },
    doc: { color: '#FD7D0F', bg: 'rgba(253,125,15,0.9)', label: 'Document', icon: DocumentTextIcon },
};

const getStyle = (media: Media) => {
    if (media.is_image) return typeStyles.image;
    if (media.is_video) return typeStyles.video;
    return typeStyles.doc;
};

export default function Galerie({ medias }: Props) {
    const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);
    const [activeFilter, setActiveFilter] = useState<'tous' | 'image' | 'video' | 'doc'>('tous');

    useEffect(() => {
        document.body.style.overflow = selectedMedia ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [selectedMedia]);

    const filteredMedias = useMemo(() => {
        if (activeFilter === 'tous') return medias;
        if (activeFilter === 'image') return medias.filter((m) => m.is_image);
        if (activeFilter === 'video') return medias.filter((m) => m.is_video);
        return medias.filter((m) => !m.is_image && !m.is_video);
    }, [medias, activeFilter]);

    const openLightbox = (media: Media) => {
        const index = filteredMedias.findIndex((m) => m.id === media.id);
        setSelectedMedia(media);
        setSelectedIndex(index);
    };

    const closeLightbox = () => {
        setSelectedMedia(null);
        setSelectedIndex(-1);
    };

    const navigateLightbox = (direction: 'prev' | 'next') => {
        if (selectedIndex === -1 || filteredMedias.length === 0) return;
        const newIndex =
            direction === 'prev'
                ? (selectedIndex - 1 + filteredMedias.length) % filteredMedias.length
                : (selectedIndex + 1) % filteredMedias.length;
        setSelectedMedia(filteredMedias[newIndex]);
        setSelectedIndex(newIndex);
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!selectedMedia) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') navigateLightbox('prev');
            if (e.key === 'ArrowRight') navigateLightbox('next');
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedMedia, selectedIndex, filteredMedias]);

    const mediaList = (medias || []).map((m, idx) => ({
        '@type': m.is_video ? 'VideoObject' : 'ImageObject',
        position: idx + 1,
        name: m.titre,
        description: m.description || `Média de la galerie Institut Gamaliel — ${m.titre}`,
        contentUrl: m.url,
        thumbnailUrl: m.url,
    }));

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'ImageGallery',
        name: 'Galerie médias — Institut Gamaliel',
        description:
            "Photos et vidéos de la vie de l'Institut Gamaliel : ateliers pratiques, remises de diplômes CQP/DQP/BTS, événements au centre de Logpom, Douala.",
        url: 'https://institutgamaliel.com/galerie',
        publisher: {
            '@type': 'EducationalOrganization',
            name: 'Institut de Formation Professionnelle Gamaliel',
            sameAs: 'https://institutgamaliel.com',
        },
        image: mediaList,
    };

    const filters: { key: typeof activeFilter; label: string }[] = [
        { key: 'tous', label: 'Tout voir' },
        { key: 'image', label: 'Photos' },
        { key: 'video', label: 'Vidéos' },
        { key: 'doc', label: 'Documents' },
    ];

    return (
        <>
            <Head>
                <title>Galerie — Photos & Vidéos de l'Institut Gamaliel, Douala</title>
                <meta
                    name="description"
                    content="Galerie photos et vidéos de l'Institut Gamaliel à Douala : ateliers pratiques, remises de diplômes CQP, DQP, BTS, vie du centre de Logpom."
                />
                <meta
                    name="keywords"
                    content="galerie Institut Gamaliel, photos centre de formation Douala, remise de diplôme CQP DQP BTS, vie étudiante Logpom"
                />
                <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
                <link rel="canonical" href="https://institutgamaliel.com/galerie" />

                <meta property="og:type" content="website" />
                <meta property="og:title" content="Galerie — Institut Gamaliel" />
                <meta property="og:description" content="La vie du centre de Logpom en images : ateliers, événements, remises de diplômes." />
                <meta property="og:image" content="https://institutgamaliel.com/assets/images/og-institut-gamaliel.jpg" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:site_name" content="Institut Gamaliel" />
                <meta property="og:locale" content="fr_CM" />
                <meta property="og:url" content="https://institutgamaliel.com/galerie" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Galerie — Institut Gamaliel" />
                <meta name="twitter:description" content="Photos et vidéos de la vie du centre de Logpom, Douala." />
                <meta name="twitter:image" content="https://institutgamaliel.com/assets/images/og-institut-gamaliel.jpg" />

                <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
            </Head>

            <PublicLayout>
                {/* ============================================ */}
                {/* HEADER */}
                {/* ============================================ */}
                <section className="relative overflow-hidden bg-gamaliel-navy-deep text-white pt-32 pb-14">
                    <div className="hidden md:block pointer-events-none absolute -top-24 -right-16 w-96 h-96 rounded-full bg-gamaliel-green/15 blur-[60px]" />
                    <div className="hidden md:block pointer-events-none absolute -bottom-28 -left-16 w-80 h-80 rounded-full bg-gamaliel-blue/10 blur-[60px]" />

                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/[0.06] text-[12px] font-semibold tracking-[0.14em] uppercase text-white/85">
                            <PhotoIcon className="w-4 h-4 text-gamaliel-green" />
                            Vie du centre
                        </span>

                        <h1 className="font-display font-bold text-4xl md:text-5xl mt-6 tracking-tight">
                            Notre <span className="text-gamaliel-green">Galerie</span>
                        </h1>
                        <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
                            Ateliers pratiques, événements et remises de diplômes au centre de Logpom, en images.
                        </p>

                        {/* Filtres */}
                        <div className="mt-8 flex flex-wrap justify-center gap-2.5">
                            {filters.map((f) => {
                                const active = activeFilter === f.key;
                                const style = f.key !== 'tous' ? typeStyles[f.key] : null;
                                return (
                                    <button
                                        key={f.key}
                                        onClick={() => setActiveFilter(f.key)}
                                        className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-300"
                                        style={
                                            active
                                                ? {
                                                    backgroundColor: style ? style.color : '#fff',
                                                    borderColor: style ? style.color : '#fff',
                                                    color: style ? '#fff' : '#153B62',
                                                }
                                                : { borderColor: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)' }
                                        }
                                    >
                                        {f.key === 'tous' ? <Squares2X2Icon className="w-4 h-4" /> : null}
                                        {f.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ============================================ */}
                {/* GRILLE MOSAÏQUE */}
                {/* ============================================ */}
                <section className="py-16 bg-gamaliel-paper">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="sr-only">Photos et vidéos de l'Institut Gamaliel</h2>

                        {filteredMedias.length === 0 ? (
                            <div className="text-center py-16">
                                <PhotoIcon className="w-16 h-16 text-gamaliel-navy/15 mx-auto mb-4" />
                                <p className="text-gamaliel-navy/60 text-lg">Aucun média disponible pour ce filtre.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] gap-4">
                                {filteredMedias.map((media, index) => {
                                    const style = getStyle(media);
                                    const Icon = style.icon;
                                    // Une image sur 5 occupe 2x2 cases pour casser la grille uniforme
                                    const isFeatured = media.is_image && index % 5 === 0;

                                    return (
                                        <article
                                            key={media.id}
                                            onClick={() => openLightbox(media)}
                                            className={`group relative rounded-2xl overflow-hidden cursor-pointer border border-gamaliel-navy/5 shadow-sm hover:shadow-xl transition-all duration-300 opacity-0 animate-slide-up ${
                                                isFeatured ? 'col-span-2 row-span-2' : ''
                                            }`}
                                            style={{ animationDelay: `${(index % 8) * 50}ms` }}
                                        >
                                            {media.is_image ? (
                                                <img
                                                    src={media.url}
                                                    alt={`${media.titre} — Institut Gamaliel, Douala`}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    loading="lazy"
                                                />
                                            ) : media.is_video ? (
                                                <video
                                                    src={media.url}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    muted
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-white flex items-center justify-center">
                                                    <Icon className="w-10 h-10" style={{ color: style.color }} />
                                                </div>
                                            )}

                                            {/* Overlay dégradé navy — remplace le noir plat de CAB */}
                                            <div
                                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4"
                                                style={{ background: 'linear-gradient(180deg, rgba(13,40,68,0) 35%, rgba(13,40,68,0.85) 100%)' }}
                                            >
                                                <h3 className="text-white font-semibold text-sm line-clamp-1">{media.titre}</h3>
                                                {media.description && (
                                                    <p className="text-white/75 text-xs line-clamp-1 mt-0.5">{media.description}</p>
                                                )}
                                            </div>

                                            {/* Badge de type — couleur dédiée par type */}
                                            <div
                                                className="absolute top-3 right-3 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1"
                                                style={{ backgroundColor: style.bg }}
                                            >
                                                <Icon className="w-3.5 h-3.5 text-white" />
                                                <span className="text-white text-xs font-medium">{style.label}</span>
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </section>

                {/* ============================================ */}
                {/* LIGHTBOX */}
                {/* ============================================ */}
                {selectedMedia && (
                    <div
                        className="fixed inset-0 z-[9999] bg-gamaliel-navy-deep/97 flex items-center justify-center animate-fade-in"
                        style={{ animationDuration: '0.2s' }}
                        onClick={closeLightbox}
                    >
                        <button
                            onClick={closeLightbox}
                            className="absolute top-5 right-5 text-white/70 hover:text-white transition-colors p-2 z-10 hover:bg-white/10 rounded-full"
                            aria-label="Fermer la vue agrandie"
                        >
                            <XMarkIcon className="w-7 h-7" />
                        </button>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                navigateLightbox('prev');
                            }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-3 bg-white/10 rounded-full hover:bg-white/20 z-10"
                            aria-label="Média précédent"
                        >
                            <ChevronLeftIcon className="w-6 h-6" />
                        </button>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                navigateLightbox('next');
                            }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-3 bg-white/10 rounded-full hover:bg-white/20 z-10"
                            aria-label="Média suivant"
                        >
                            <ChevronRightIcon className="w-6 h-6" />
                        </button>

                        <div className="max-w-5xl max-h-[90vh] p-4" onClick={(e) => e.stopPropagation()}>
                            {selectedMedia.is_image ? (
                                <img
                                    src={selectedMedia.url}
                                    alt={`${selectedMedia.titre} — Institut Gamaliel`}
                                    className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
                                    loading="lazy"
                                />
                            ) : selectedMedia.is_video ? (
                                <video
                                    src={selectedMedia.url}
                                    controls
                                    className="max-w-full max-h-[80vh] rounded-2xl shadow-2xl"
                                    autoPlay
                                    muted
                                />
                            ) : (
                                <div className="bg-white rounded-3xl p-12 text-center max-w-md">
                                    <DocumentTextIcon className="w-20 h-20 text-gamaliel-orange mx-auto mb-4" />
                                    <h3 className="font-display text-xl font-bold text-gamaliel-navy-deep">{selectedMedia.titre}</h3>
                                    {selectedMedia.description && (
                                        <p className="text-gamaliel-navy/60 mt-2 text-sm">{selectedMedia.description}</p>
                                    )}
                                    <p className="text-sm text-gamaliel-navy/40 mt-2">{selectedMedia.type_label}</p>
                            
                                    <a   href={selectedMedia.url}
                                        download
                                        className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 rounded-xl font-semibold text-white transition-all"
                                        style={{ background: 'linear-gradient(135deg, #FD7D0F 0%, #E13A4B 100%)' }}
                                    >
                                        <ArrowDownTrayIcon className="w-5 h-5" />
                                        Télécharger le document
                                    </a>
                                </div>
                            )}

                            <div className="text-center text-white/50 text-sm mt-5">
                                {selectedMedia.titre} • {selectedMedia.type_label} • {selectedMedia.taille_formatted}
                            </div>
                        </div>
                    </div>
                )}
            </PublicLayout>
        </>
    );
}
