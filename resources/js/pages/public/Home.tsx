import {
    AcademicCapIcon,
    ClockIcon,
    ShieldCheckIcon,
    ArrowRightIcon,
    CheckBadgeIcon,
    StarIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    MapPinIcon,
    PhoneIcon,
    HeartIcon,
    ComputerDesktopIcon,
    BriefcaseIcon,
    CakeIcon,
    TruckIcon,
    XMarkIcon,
    AcademicCapIcon as AcademicCapOutline,
} from '@heroicons/react/24/outline';

import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Users } from 'lucide-react';

import { useState, useRef } from 'react';

import RevealSection from '@/Components/Home/RevealSection';
import Loader from '@/Components/Loader';
import PublicLayout from '@/Components/PublicLayout';

import { useCountUp } from '@/hooks/useCountUp';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface Activite {
    id: number;
    title: string;
    date: string;
    excerpt: string | null;
    image_url: string;
    tag: string | null;
    lien: string;
}

interface PoleData {
    id: number;
    slug: string;
    nom: string;
    description: string;
    description_courte: string;
    image: string | null;
    couleur: string;
    icone: string;
    nombre_formations: number;
}

interface HomeProps {
    activites: Activite[];
    poles: PoleData[];
}

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
    HeartIcon,
    ComputerDesktopIcon,
    BriefcaseIcon,
    CakeIcon,
    TruckIcon,
};

// Couleur d'action UNIQUE du site — le vert du logo, en plein (aucun dégradé)
const ACTION_COLOR = '#6FA30E';       // gamaliel-green-deep
const ACTION_COLOR_HOVER = '#5C8A0B'; // légèrement plus sombre pour le hover
const SECONDARY_COLOR = '#165DF3';    // gamaliel-blue — usage secondaire uniquement

const avantages = [
    { icon: AcademicCapIcon, title: '100% Pratique', desc: 'Ateliers, laboratoires et mises en situation réelle dès les premières semaines.' },
    { icon: ShieldCheckIcon, title: 'Institut agréé MINEFOP', desc: 'Diplômes et attestations reconnus par l\'État camerounais.' },
    { icon: Users, title: 'Formateurs de terrain', desc: 'Des professionnels en activité qui transmettent la réalité du métier.' },
    { icon: ClockIcon, title: 'Cours du jour & du soir', desc: 'Des horaires adaptés aux étudiants comme aux travailleurs en reconversion.' },
];

const centre = {
    nom: 'Campus de Logpom',
    adresse: 'Carrefour Andem, Logpom — Douala',
    tel: '+237 6 96 08 40 48',
    horaires: 'Lundi — Samedi, 06h00 – 22h00',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Institut+Gamaliel+Logpom+Carrefour+Andem+Douala',
};

export default function Home({ activites, poles }: HomeProps) {
    const { ref: statsRef, isRevealed: statsVisible } = useScrollReveal<HTMLDivElement>(0.4);

    const anneesCible = new Date().getFullYear() - 2014;
    const annees = useCountUp(anneesCible, statsVisible);
    const nbPoles = useCountUp(poles?.length || 5, statsVisible);

    const staticActivities = activites || [];

    const activityTrackRef = useRef<HTMLDivElement>(null);
    const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
    const totalActivities = staticActivities.length;
    const isScrollingProgrammatically = useRef(false);

    const getSlotWidth = () => {
        const track = activityTrackRef.current;
        const slot = track?.querySelector<HTMLElement>('[data-activity-slot]');
        if (!track || !slot) return 0;
        return slot.offsetWidth + 16;
    };

    const goToActivity = (index: number) => {
        const track = activityTrackRef.current;
        if (!track || totalActivities === 0) return;
        const clamped = ((index % totalActivities) + totalActivities) % totalActivities;
        const slotWidth = getSlotWidth();

        isScrollingProgrammatically.current = true;
        track.scrollTo({ left: clamped * slotWidth, behavior: 'smooth' });
        setCurrentActivityIndex(clamped);

        setTimeout(() => {
            isScrollingProgrammatically.current = false;
        }, 500);
    };

    const nextActivity = () => goToActivity(currentActivityIndex + 1);
    const prevActivity = () => goToActivity(currentActivityIndex - 1);

    const handleActivityScroll = () => {
        if (isScrollingProgrammatically.current) return;
        const track = activityTrackRef.current;
        if (!track) return;
        const slotWidth = getSlotWidth();
        if (!slotWidth) return;
        const index = Math.round(track.scrollLeft / slotWidth);
        const clamped = ((index % totalActivities) + totalActivities) % totalActivities;
        setCurrentActivityIndex(clamped);
    };

    const [selectedPole, setSelectedPole] = useState<PoleData | null>(null);

    const openPoleModal = (pole: PoleData) => {
        setSelectedPole(pole);
        document.body.style.overflow = 'hidden';
    };

    const closePoleModal = () => {
        setSelectedPole(null);
        document.body.style.overflow = '';
    };

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'EducationalOrganization',
        name: 'Institut de Formation Professionnelle Gamaliel',
        alternateName: ['Institut Gamaliel', 'IFPG'],
        description:
            "Institut de formation professionnelle et de recyclage agréé MINEFOP à Douala. Filières administratives et comptables, paramédicales, informatiques, logistique et hôtellerie. Diplômes CQP, DQP et BTS.",
        url: 'https://institutgamaliel.com',
        logo: 'https://institutgamaliel.com/assets/images/logo.png',
        image: 'https://institutgamaliel.com/assets/images/og-institut-gamaliel.jpg',
        foundingDate: '2014',
        telephone: '+237696084048',
        email: 'info@institutgamaliel.com',
        sameAs: ['https://www.instagram.com/institutgamaliel/', 'https://wa.me/237696084048'],
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'Carrefour Andem, Logpom',
            addressLocality: 'Douala',
            addressRegion: 'Littoral',
            addressCountry: 'CM',
        },
        openingHours: 'Mo-Sa 06:00-22:00',
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Filières de formation — Institut Gamaliel',
            itemListElement: (poles || []).map((p) => ({
                '@type': 'Course',
                name: p.nom,
                description: p.description_courte,
                provider: { '@type': 'EducationalOrganization', name: 'Institut de Formation Professionnelle Gamaliel' },
            })),
        },
    };

    return (
        <>
            <Head>
                <title>Institut Gamaliel — Centre de Formation Professionnelle Agréé à Douala</title>
                <meta
                    name="description"
                    content="Institut de Formation Professionnelle Gamaliel, agréé MINEFOP à Douala (Logpom). Formations administratives, paramédicales, informatiques, logistique et hôtellerie. Diplômes CQP, DQP, BTS."
                />
                <meta
                    name="keywords"
                    content="Institut Gamaliel, centre de formation professionnelle Douala, formation Logpom, MINEFOP, CQP DQP BTS, formation paramédicale Douala, formation informatique Douala, formation hôtellerie Douala"
                />
                <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
                <link rel="canonical" href="https://institutgamaliel.com" />

                <meta property="og:type" content="website" />
                <meta property="og:title" content="Institut Gamaliel — Centre de Formation Professionnelle Agréé à Douala" />
                <meta property="og:description" content="5 pôles de formation, diplômes reconnus (CQP, DQP, BTS), cours en présentiel à Logpom ou en ligne." />
                <meta property="og:image" content="https://institutgamaliel.com/assets/images/og-institut-gamaliel.jpg" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:site_name" content="Institut Gamaliel" />
                <meta property="og:locale" content="fr_CM" />
                <meta property="og:url" content="https://institutgamaliel.com" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Institut Gamaliel — Formation Professionnelle à Douala" />
                <meta name="twitter:description" content="Institut agréé MINEFOP. Présentiel & en ligne." />
                <meta name="twitter:image" content="https://institutgamaliel.com/assets/images/og-institut-gamaliel.jpg" />

                <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
            </Head>

            <Loader />

            <PublicLayout>

                {/* ============================================ */}
                {/* 1. HERO */}
                {/* ============================================ */}
                <section className="relative overflow-hidden bg-gamaliel-navy-deep text-white">
                    <div className="hidden md:block pointer-events-none absolute -top-32 -left-24 w-96 h-96 rounded-full bg-gamaliel-green/15 blur-[60px]" />
                    <div className="hidden md:block pointer-events-none absolute -bottom-40 -right-16 w-96 h-96 rounded-full bg-gamaliel-green/10 blur-[60px]" />

                    <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-28 pb-20 lg:pt-32 lg:pb-28">
                        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-16 items-center">

                            <div>
                                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/[0.06] text-[12px] font-semibold tracking-[0.14em] uppercase text-white/85">
                                    <ShieldCheckIcon className="w-4 h-4 text-gamaliel-green" />
                                    Agréé MINEFOP · Depuis 2014
                                </span>

                                <h1 className="font-display font-bold text-[2.6rem] leading-[1.08] sm:text-6xl lg:text-[3.4rem] mt-7 tracking-tight">
                                    Construisez votre avenir
                                    <br />
                                    <span className="text-gamaliel-green">professionnel à Douala</span>
                                </h1>

                                <p className="mt-6 text-lg text-white/70 max-w-lg leading-relaxed">
                                    L'Institut Gamaliel forme aux métiers de la gestion, du paramédical, du digital,
                                    de la logistique et de l'hôtellerie — au centre de Logpom ou entièrement en ligne.
                                </p>

                                <div className="flex flex-wrap items-center gap-4 mt-9">
                                    <Link
                                        href="/formations"
                                        className="group inline-flex items-center gap-2 px-7 py-4 rounded-full font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
                                        style={{ backgroundColor: ACTION_COLOR }}
                                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = ACTION_COLOR_HOVER)}
                                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = ACTION_COLOR)}
                                    >
                                        Découvrir nos formations
                                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                                    </Link>
                                    <Link
                                        href="/#activites"
                                        className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-semibold text-white/90 border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all duration-300"
                                    >
                                        Voir nos événements
                                    </Link>
                                </div>

                                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-10 pt-8 border-t border-white/10 text-sm text-white/60">
                                    <span className="flex items-center gap-2">
                                        <CheckBadgeIcon className="w-4 h-4 text-gamaliel-green" />
                                        {anneesCible}+ ans d'expérience
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <CheckBadgeIcon className="w-4 h-4 text-gamaliel-green" />
                                        {poles?.length || 5} pôles de formation
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <CheckBadgeIcon className="w-4 h-4 text-gamaliel-green" />
                                        CQP · DQP · BTS
                                    </span>
                                </div>
                            </div>

                            <div className="relative">
                                <div className="relative rounded-[2.25rem] overflow-hidden border border-white/10 aspect-[4/5] shadow-2xl">
                                    <img
                                        src="/assets/images/hero-campus.webp"
                                        alt="Étudiants de l'Institut Gamaliel en formation pratique à Douala"
                                        className="w-full h-full object-cover"
                                        loading="eager"
                                    />
                                    <div
                                        className="absolute inset-0"
                                        style={{ background: 'linear-gradient(200deg, rgba(13,40,68,0) 40%, rgba(13,40,68,0.55) 100%)' }}
                                    />
                                </div>

                                <div className="absolute -bottom-6 -left-6 sm:-left-10 bg-white text-gamaliel-navy rounded-2xl shadow-xl px-5 py-4 flex items-center gap-3 max-w-[240px]">
                                    <div className="w-10 h-10 rounded-xl bg-gamaliel-green/20 flex items-center justify-center shrink-0">
                                        <ShieldCheckIcon className="w-5 h-5 text-gamaliel-green-deep" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold leading-tight">Institut agréé</p>
                                        <p className="text-xs text-gamaliel-navy/60">Arrêté N°94 &amp; N°247 MINEFOP</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ============================================ */}
                {/* 2. CHIFFRES CLÉS — vert en couleur dominante */}
                {/* ============================================ */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <RevealSection className="text-center max-w-2xl mx-auto mb-14">
                            <span className="inline-block px-4 py-1.5 bg-gamaliel-green/15 text-gamaliel-green-deep rounded-full text-xs font-semibold tracking-wider mb-4">
                                POURQUOI CHOISIR L'INSTITUT GAMALIEL
                            </span>
                            <h2 className="font-display text-3xl md:text-4xl font-bold text-gamaliel-navy-deep">
                                Un institut agréé, cinq voies pour réussir
                            </h2>
                        </RevealSection>

                        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="text-center p-6 rounded-2xl bg-gamaliel-paper border border-gamaliel-navy/5">
                                <div className="font-display text-4xl font-extrabold text-gamaliel-green-deep">{annees}+</div>
                                <div className="text-sm font-medium text-gamaliel-navy/70 mt-1">Ans d'expérience</div>
                            </div>
                            <div className="text-center p-6 rounded-2xl bg-gamaliel-paper border border-gamaliel-navy/5">
                                <div className="font-display text-4xl font-extrabold text-gamaliel-green-deep">{nbPoles}</div>
                                <div className="text-sm font-medium text-gamaliel-navy/70 mt-1">Pôles de formation</div>
                            </div>
                            <div className="text-center p-6 rounded-2xl bg-gamaliel-paper border border-gamaliel-navy/5">
                                <div className="font-display text-4xl font-extrabold text-gamaliel-green-deep">100%</div>
                                <div className="text-sm font-medium text-gamaliel-navy/70 mt-1">Ateliers pratiques</div>
                            </div>
                            <div className="text-center p-6 rounded-2xl bg-gamaliel-paper border border-gamaliel-navy/5">
                                <div className="font-display text-xl sm:text-2xl font-extrabold text-gamaliel-green-deep leading-tight">CQP · DQP · BTS</div>
                                <div className="text-sm font-medium text-gamaliel-navy/70 mt-1">Diplômes reconnus</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ============================================ */}
                {/* 3. NOS PÔLES DE FORMATION — couleurs par pôle conservées (identité, pas thème UI) */}
                {/* ============================================ */}
                <RevealSection as="section" className="py-20 bg-gamaliel-paper">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-2xl mx-auto mb-14">
                            <span className="inline-block px-4 py-1.5 bg-gamaliel-navy/5 text-gamaliel-navy rounded-full text-xs font-semibold tracking-wider mb-4">
                                NOS FILIÈRES
                            </span>
                            <h2 className="font-display text-3xl md:text-4xl font-bold text-gamaliel-navy-deep">
                                Cinq pôles d'expertise, une même exigence de terrain
                            </h2>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
                            {(poles || []).map((pole) => {
                                const Icon = ICONS[pole.icone] || AcademicCapOutline;
                                return (
                                    <article
                                        key={pole.id}
                                        className="group bg-white rounded-[1.75rem] overflow-hidden border border-gamaliel-navy/5 h-full hover:-translate-y-1 hover:shadow-xl transition-transform duration-300 flex flex-col"
                                    >
                                        <div className="relative h-32 overflow-hidden">
                                            {pole.image ? (
                                                <img
                                                    src={pole.image}
                                                    alt={`${pole.nom} — Institut Gamaliel`}
                                                    className="w-full h-full object-cover"
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <div
                                                    className="w-full h-full flex items-center justify-center"
                                                    style={{ backgroundColor: `${pole.couleur}15` }}
                                                >
                                                    <Icon className="w-9 h-9" style={{ color: pole.couleur }} />
                                                </div>
                                            )}
                                            <div
                                                className="absolute bottom-2.5 left-2.5 w-9 h-9 rounded-xl flex items-center justify-center shadow-sm"
                                                style={{ backgroundColor: pole.couleur }}
                                            >
                                                <Icon className="w-4.5 h-4.5 text-white" />
                                            </div>
                                        </div>

                                        <div className="p-5 flex flex-col flex-1">
                                            <h3 className="font-display font-bold text-sm text-gamaliel-navy-deep mb-1.5 leading-snug">{pole.nom}</h3>
                                            <p className="text-xs text-gamaliel-navy/60 leading-relaxed mb-3 flex-1 line-clamp-3">
                                                {pole.description_courte}
                                            </p>
                                            <button
                                                onClick={() => openPoleModal(pole)}
                                                className="inline-flex items-center gap-1 text-xs font-semibold transition-colors"
                                                style={{ color: pole.couleur }}
                                            >
                                                Détails
                                                <ArrowRightIcon className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                </RevealSection>

                {selectedPole && (
                    <div
                        className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-gamaliel-navy-deep/60 backdrop-blur-sm"
                        onClick={closePoleModal}
                    >
                        <div
                            className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative h-48 overflow-hidden rounded-t-3xl">
                                {selectedPole.image ? (
                                    <img src={selectedPole.image} alt={selectedPole.nom} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full" style={{ backgroundColor: `${selectedPole.couleur}15` }} />
                                )}
                                <div
                                    className="absolute inset-0"
                                    style={{ background: 'linear-gradient(180deg, rgba(13,40,68,0) 50%, rgba(13,40,68,0.75) 100%)' }}
                                />
                                <button
                                    onClick={closePoleModal}
                                    className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
                                    aria-label="Fermer"
                                >
                                    <XMarkIcon className="w-5 h-5" />
                                </button>
                                <div className="absolute bottom-4 left-6">
                                    <h2 className="font-display text-2xl font-bold text-white">{selectedPole.nom}</h2>
                                    {selectedPole.nombre_formations > 0 && (
                                        <p className="text-sm text-white/70 mt-1">
                                            {selectedPole.nombre_formations} formation{selectedPole.nombre_formations > 1 ? 's' : ''} disponible{selectedPole.nombre_formations > 1 ? 's' : ''}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="p-6">
                                <p className="text-sm text-gamaliel-navy/70 leading-relaxed">{selectedPole.description}</p>

                                <div className="flex gap-3 mt-6 pt-6 border-t border-gamaliel-navy/5">
                                    <Link
                                        href={`/formations?pole=${selectedPole.slug}`}
                                        className="flex-1 text-center px-5 py-3 rounded-xl font-semibold text-white transition-all"
                                        style={{ backgroundColor: selectedPole.couleur }}
                                    >
                                        Voir les formations
                                    </Link>
                                    <button
                                        onClick={closePoleModal}
                                        className="px-5 py-3 border-2 border-gamaliel-navy/10 rounded-xl font-semibold text-gamaliel-navy/60 hover:bg-gamaliel-navy/5 transition-colors"
                                    >
                                        Fermer
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ============================================ */}
                {/* 4. AVANTAGES — vert primaire */}
                {/* ============================================ */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <RevealSection className="text-center max-w-2xl mx-auto mb-14">
                            <span className="inline-block px-4 py-1.5 bg-gamaliel-green/15 text-gamaliel-green-deep rounded-full text-xs font-semibold tracking-wider mb-4">
                                L'EXCELLENCE PÉDAGOGIQUE
                            </span>
                            <h2 className="font-display text-3xl md:text-4xl font-bold text-gamaliel-navy-deep">
                                Pourquoi se former à l'Institut Gamaliel ?
                            </h2>
                        </RevealSection>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {avantages.map((item, i) => {
                                const Icon = item.icon;
                                return (
                                    <RevealSection key={item.title} delay={i * 80}>
                                        <div className="bg-gamaliel-paper rounded-2xl p-6 border border-gamaliel-navy/5 h-full text-center">
                                            <div className="w-14 h-14 rounded-xl bg-gamaliel-green/15 text-gamaliel-green-deep flex items-center justify-center mx-auto mb-4">
                                                <Icon className="w-7 h-7" />
                                            </div>
                                            <h3 className="font-bold text-gamaliel-navy-deep mb-1">{item.title}</h3>
                                            <p className="text-sm text-gamaliel-navy/60">{item.desc}</p>
                                        </div>
                                    </RevealSection>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ============================================ */}
                {/* 5. PRÉSENTIEL (vert, primaire) OU EN LIGNE (bleu, secondaire) */}
                {/* ============================================ */}
                <RevealSection as="section" className="py-20 bg-gamaliel-paper">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-2xl mx-auto mb-12">
                            <span className="inline-block px-4 py-1.5 bg-gamaliel-green/15 text-gamaliel-green-deep rounded-full text-xs font-semibold tracking-wider mb-4">
                                NOS MODALITÉS DE FORMATION
                            </span>
                            <h2 className="font-display text-3xl md:text-4xl font-bold text-gamaliel-navy-deep">
                                Au centre de Logpom ou <span className="text-gamaliel-blue">100% en ligne</span>
                            </h2>
                            <p className="text-gamaliel-navy/60 mt-3 leading-relaxed">
                                Choisissez la formule adaptée à votre emploi du temps.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white rounded-3xl overflow-hidden border border-gamaliel-navy/5">
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src="/assets/images/presentiel.webp"
                                        alt="Formation en présentiel à l'Institut Gamaliel, Logpom, Douala"
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                    <div className="absolute top-4 left-4 px-3 py-1 bg-gamaliel-green-deep text-white rounded-full text-xs font-semibold">
                                        Présentiel
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="font-display text-xl font-bold text-gamaliel-navy-deep">Cours au centre (Jour & Soir)</h3>
                                    <ul className="mt-4 space-y-2">
                                        <li className="flex items-start gap-2 text-sm text-gamaliel-navy/70">
                                            <CheckBadgeIcon className="w-4 h-4 text-gamaliel-green-deep mt-0.5 shrink-0" />
                                            Centre équipé à Logpom, Carrefour Andem, Douala
                                        </li>
                                        <li className="flex items-start gap-2 text-sm text-gamaliel-navy/70">
                                            <CheckBadgeIcon className="w-4 h-4 text-gamaliel-green-deep mt-0.5 shrink-0" />
                                            Pédagogie active, 100% pratique dès les premières semaines
                                        </li>
                                        <li className="flex items-start gap-2 text-sm text-gamaliel-navy/70">
                                            <CheckBadgeIcon className="w-4 h-4 text-gamaliel-green-deep mt-0.5 shrink-0" />
                                            Préparation aux diplômes CQP, DQP et BTS
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="bg-white rounded-3xl overflow-hidden border border-gamaliel-navy/5">
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src="/assets/images/online.webp"
                                        alt="Formation en ligne Institut Gamaliel"
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                    <div className="absolute top-4 left-4 px-3 py-1 bg-gamaliel-blue text-white rounded-full text-xs font-semibold">
                                        En ligne
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="font-display text-xl font-bold text-gamaliel-navy-deep">Formations à distance</h3>
                                    <ul className="mt-4 space-y-2">
                                        <li className="flex items-start gap-2 text-sm text-gamaliel-navy/70">
                                            <CheckBadgeIcon className="w-4 h-4 text-gamaliel-blue mt-0.5 shrink-0" />
                                            Accessible partout au Cameroun, à votre rythme
                                        </li>
                                        <li className="flex items-start gap-2 text-sm text-gamaliel-navy/70">
                                            <CheckBadgeIcon className="w-4 h-4 text-gamaliel-blue mt-0.5 shrink-0" />
                                            Suivi personnalisé par nos formateurs
                                        </li>
                                        <li className="flex items-start gap-2 text-sm text-gamaliel-navy/70">
                                            <CheckBadgeIcon className="w-4 h-4 text-gamaliel-blue mt-0.5 shrink-0" />
                                            Idéal pour les travailleurs en reconversion
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="text-center mt-10">
                            <Link
                                href="/formations"
                                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
                                style={{ backgroundColor: ACTION_COLOR }}
                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = ACTION_COLOR_HOVER)}
                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = ACTION_COLOR)}
                            >
                                Consulter le catalogue des formations
                                <ArrowRightIcon className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </RevealSection>

                {/* ============================================ */}
                {/* 6. VIE DE L'INSTITUT & ÉVÉNEMENTS */}
                {/* ============================================ */}
                <section id="activites" className="py-20 bg-white scroll-mt-24 overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <RevealSection className="flex items-end justify-between mb-10 flex-wrap gap-4">
                            <div>
                                <span className="inline-block px-4 py-1.5 bg-gamaliel-blue/10 text-gamaliel-blue rounded-full text-xs font-semibold tracking-wider mb-4">
                                    VIE DE L'INSTITUT
                                </span>
                                <h2 className="font-display text-3xl md:text-4xl font-bold text-gamaliel-navy-deep">
                                    Actualités & événements
                                </h2>
                            </div>
                        </RevealSection>

                        <div className="relative">
                            {staticActivities.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-gamaliel-navy/50">Aucune activité programmée pour le moment.</p>
                                </div>
                            ) : (
                                <>
                                    <div
                                        ref={activityTrackRef}
                                        onScroll={handleActivityScroll}
                                        className="flex items-stretch gap-5 overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar lg:overflow-x-hidden cursor-grab active:cursor-grabbing"
                                    >
                                        {staticActivities.map((activity, index) => {
                                            const isCenter = index === currentActivityIndex;
                                            const hasLien = activity.lien && activity.lien.trim() !== '';

                                            return (
                                                <div
                                                    key={activity.id}
                                                    data-activity-slot
                                                    className="flex-shrink-0 w-[80%] sm:w-[56%] lg:w-[32%] snap-center transition-all duration-500 ease-out"
                                                    style={{
                                                        transform: isCenter ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.93)',
                                                        opacity: isCenter ? 1 : 0.5,
                                                    }}
                                                >
                                                    <div
                                                        className="group relative rounded-[1.75rem] overflow-hidden aspect-[4/5] transition-all duration-500"
                                                        style={{
                                                            boxShadow: isCenter
                                                                ? '0 24px 40px -12px rgba(13,40,68,0.35)'
                                                                : '0 4px 12px -4px rgba(13,40,68,0.1)',
                                                        }}
                                                    >
                                                        <img
                                                            src={activity.image_url}
                                                            alt={`${activity.title} - Institut Gamaliel`}
                                                            className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                                                            style={{ filter: isCenter ? 'none' : 'grayscale(60%)' }}
                                                            loading="lazy"
                                                        />
                                                        <div
                                                            className="absolute inset-0"
                                                            style={{
                                                                background:
                                                                    'linear-gradient(180deg, rgba(13,40,68,0.05) 0%, rgba(13,40,68,0.15) 45%, rgba(13,40,68,0.92) 100%)',
                                                            }}
                                                        />
                                                        {isCenter && (
                                                            <div
                                                                className="absolute inset-0 rounded-[1.75rem] pointer-events-none"
                                                                style={{ boxShadow: `inset 0 0 0 2px ${ACTION_COLOR}D9` }}
                                                            />
                                                        )}
                                                        <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-semibold">
                                                            {activity.date}
                                                        </div>
                                                        {activity.tag && (
                                                            <div
                                                                className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-bold text-white"
                                                                style={{ backgroundColor: SECONDARY_COLOR }}
                                                            >
                                                                {activity.tag}
                                                            </div>
                                                        )}
                                                        <div className="absolute bottom-0 left-0 right-0 p-6">
                                                            <h3 className="font-display font-bold text-lg text-white leading-snug line-clamp-2">
                                                                {activity.title}
                                                            </h3>
                                                            <p
                                                                className="text-sm text-white/70 mt-2 line-clamp-2 transition-all duration-500 overflow-hidden"
                                                                style={{
                                                                    maxHeight: isCenter ? '3.5rem' : '0',
                                                                    opacity: isCenter ? 1 : 0,
                                                                    marginTop: isCenter ? '0.5rem' : '0',
                                                                }}
                                                            >
                                                                {activity.excerpt}
                                                            </p>
                                                            {hasLien && (
                                                                <a
                                                                    href={activity.lien}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="inline-flex items-center gap-1.5 mt-4 px-4 py-2 rounded-full text-xs font-bold text-white transition-all duration-300 hover:gap-2.5"
                                                                    style={{
                                                                        backgroundColor: ACTION_COLOR,
                                                                        opacity: isCenter ? 1 : 0,
                                                                        pointerEvents: isCenter ? 'auto' : 'none',
                                                                    }}
                                                                >
                                                                    Voir l'événement
                                                                    <ArrowRightIcon className="w-3.5 h-3.5" />
                                                                </a>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <button
                                        onClick={prevActivity}
                                        className="hidden lg:flex absolute left-0 top-[42%] -translate-y-1/2 -translate-x-4 z-30 w-12 h-12 items-center justify-center rounded-full shadow-xl hover:scale-105 transition-transform duration-300 text-white bg-gamaliel-navy-deep"
                                        aria-label="Événement précédent"
                                    >
                                        <ChevronLeftIcon className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={nextActivity}
                                        className="hidden lg:flex absolute right-0 top-[42%] -translate-y-1/2 translate-x-4 z-30 w-12 h-12 items-center justify-center rounded-full shadow-xl hover:scale-105 transition-transform duration-300 text-white bg-gamaliel-navy-deep"
                                        aria-label="Événement suivant"
                                    >
                                        <ChevronRightIcon className="w-5 h-5" />
                                    </button>

                                    <div className="flex items-center justify-center gap-1.5 mt-8 max-w-xs mx-auto">
                                        {staticActivities.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => goToActivity(index)}
                                                className="h-1 rounded-full transition-all duration-500 flex-1"
                                                style={{
                                                    backgroundColor: index === currentActivityIndex ? ACTION_COLOR : '#E7EAF0',
                                                }}
                                                aria-label={`Aller à l'événement ${index + 1}`}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </section>

                <style>{`
                    .hide-scrollbar::-webkit-scrollbar { display: none; }
                    .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                `}</style>

                {/* ============================================ */}
                {/* 7. TÉMOIGNAGES */}
                {/* ============================================ */}
                <section className="py-20 bg-gamaliel-paper">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <RevealSection className="text-center max-w-2xl mx-auto mb-14">
                            <span className="inline-block px-4 py-1.5 bg-gamaliel-green/15 text-gamaliel-green-deep rounded-full text-xs font-semibold tracking-wider mb-4">
                                AVIS & TÉMOIGNAGES
                            </span>
                            <h2 className="font-display text-3xl md:text-4xl font-bold text-gamaliel-navy-deep">
                                Ce que disent nos anciens apprenants
                            </h2>
                        </RevealSection>

                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                { initials: 'FD', nom: 'Flore Djoumessi', filiere: 'Secrétariat médical — 2025', avis: "Formation très encadrée, avec des mises en situation réelles en cabinet. J'ai été recrutée dans une clinique à Douala dès la fin du stage." },
                                { initials: 'BT', nom: 'Boris Talla', filiere: 'Infographie — 2024', avis: "Les ateliers pratiques sur les logiciels m'ont permis de lancer mon activité de freelance en community management." },
                                { initials: 'SN', nom: 'Sandrine Nkeng', filiere: 'Cuisine & Pâtisserie — 2025', avis: "L'ambiance en atelier cuisine est exigeante mais très formatrice. J'ai ouvert mon propre service traiteur après le diplôme." },
                            ].map((t, i) => (
                                <RevealSection key={t.nom} delay={i * 100}>
                                    <div className="bg-white rounded-2xl p-6 border border-gamaliel-navy/5 hover:shadow-xl transition-shadow duration-300">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg bg-gamaliel-green/15 text-gamaliel-green-deep">
                                                {t.initials}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gamaliel-navy-deep">{t.nom}</p>
                                                <p className="text-xs text-gamaliel-navy/50">{t.filiere}</p>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gamaliel-navy/70 leading-relaxed">"{t.avis}"</p>
                                        <div className="flex gap-0.5 mt-3">
                                            {[...Array(5)].map((_, j) => (
                                                <StarIcon key={j} className="w-4 h-4 text-gamaliel-green-deep fill-gamaliel-green-deep" />
                                            ))}
                                        </div>
                                    </div>
                                </RevealSection>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ============================================ */}
                {/* 8. NOTRE CENTRE */}
                {/* ============================================ */}
                <section className="py-20 bg-white">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <RevealSection>
                            <div className="rounded-3xl overflow-hidden border border-gamaliel-navy/5 grid md:grid-cols-2">
                                <div className="relative h-64 md:h-full">
                                    <img
                                        src="/assets/images/centre-logpom.webp"
                                        alt="Institut Gamaliel — Centre de Logpom, Douala"
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="p-8 lg:p-10 flex flex-col justify-center">
                                    <span className="inline-block w-fit px-4 py-1.5 bg-gamaliel-green/15 text-gamaliel-green-deep rounded-full text-xs font-semibold tracking-wider mb-4">
                                        NOTRE CENTRE
                                    </span>
                                    <h2 className="font-display text-2xl md:text-3xl font-bold text-gamaliel-navy-deep mb-4">
                                        {centre.nom}
                                    </h2>
                                    <ul className="space-y-3 text-sm text-gamaliel-navy/70">
                                        <li className="flex items-start gap-2">
                                            <MapPinIcon className="w-4 h-4 text-gamaliel-green-deep mt-0.5 shrink-0" />
                                            {centre.adresse}
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <ClockIcon className="w-4 h-4 text-gamaliel-green-deep mt-0.5 shrink-0" />
                                            {centre.horaires}
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <PhoneIcon className="w-4 h-4 text-gamaliel-green-deep mt-0.5 shrink-0" />
                                            <a href={`tel:${centre.tel.replace(/\s/g, '')}`} className="hover:text-gamaliel-green-deep transition-colors">
                                                {centre.tel}
                                            </a>
                                        </li>
                                    </ul>
                                    <a
                                        href={centre.mapsUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-gamaliel-green-deep hover:underline w-fit"
                                    >
                                        Localiser sur Google Maps
                                        <ArrowRightIcon className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        </RevealSection>
                    </div>
                </section>

                {/* ============================================ */}
                {/* 9. CTA FINAL — vert plein, plus de dégradé */}
                {/* ============================================ */}
                <section className="py-20 relative overflow-hidden" style={{ backgroundColor: ACTION_COLOR }}>
                    <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
                            Rejoignez l'Institut Gamaliel dès aujourd'hui
                        </h2>
                        <p className="text-white/85 mt-3 max-w-xl mx-auto">
                            {poles?.length || 5} pôles de formation, un institut agréé, un accompagnement de terrain.
                        </p>
                        <Link
                            href="/formations"
                            className="inline-flex items-center gap-2 mt-8 px-10 py-4 bg-white text-gamaliel-green-deep rounded-full font-bold text-lg hover:bg-gamaliel-navy-deep hover:text-white hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-300"
                        >
                            Faire ma pré-inscription
                            <ArrowRightIcon className="w-5 h-5" />
                        </Link>
                    </div>
                </section>

            </PublicLayout>
        </>
    );
}