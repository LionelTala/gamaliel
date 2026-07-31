import {
    AcademicCapIcon,
    ClockIcon,
    CurrencyDollarIcon,
    UserPlusIcon,
    ArrowRightIcon,
    XMarkIcon,
    CheckCircleIcon,
    EnvelopeIcon,
    PhoneIcon,
    UserIcon,
    MapPinIcon,
    HeartIcon,
    ComputerDesktopIcon,
    BriefcaseIcon,
    CakeIcon,
    Squares2X2Icon,
    SignalIcon,
} from '@heroicons/react/24/outline';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState, useEffect, useMemo } from 'react';

import PublicLayout from '@/Components/PublicLayout';

interface FormationEnLigne {
    id: number;
    name: string;
    abbreviation: string;
    description: string;
    debouches: string;
    duration: string;
    diplome: string;
    frais: number;
    frais_formatted: string;
    image_url: string;
    lien_externe: string | null;
    lien_label: string | null;
    pole?: 'paramedical' | 'informatique' | 'gestion' | 'hotellerie';
}

interface FormationPresentiel {
    id: number;
    title: string;
    abbreviation: string;
    description: string;
    duration: string;
    diplome: string;
    price: string;
    image: string;
    icon: string;
    tags: string[];
    debouches: string[];
    programme: string[];
    pole?: 'paramedical' | 'informatique' | 'gestion' | 'hotellerie';
}

interface Props {
    formationsEnLigne: FormationEnLigne[];
    formationsPresentiel: FormationPresentiel[];
}

const poles = [
    { slug: 'paramedical', label: 'Paramédical & Santé', icon: HeartIcon, color: '#E13A4B' },
    { slug: 'informatique', label: 'Informatique & Digital', icon: ComputerDesktopIcon, color: '#165DF3' },
    { slug: 'gestion', label: 'Gestion & Management', icon: BriefcaseIcon, color: '#153B62' },
    { slug: 'hotellerie', label: 'Hôtellerie & Métiers de bouche', icon: CakeIcon, color: '#FD7D0F' },
] as const;

// Couleur d'action par défaut du site — remplace le bleu CAB partout où il n'y a pas
// de pôle spécifique à représenter (CTA, focus, puces, badges génériques).
const ACTION_COLOR = '#FD7D0F'; // gamaliel-orange
const ACTION_GRADIENT = 'linear-gradient(135deg, #FD7D0F 0%, #E13A4B 100%)';

export default function Formations({ formationsEnLigne, formationsPresentiel }: Props) {
    const { url } = usePage();

    const getInitialTab = () => {
        if (typeof window !== 'undefined') {
            const hash = window.location.hash;
            if (hash === '#enligne') return 'enligne';
            if (hash === '#presentiel') return 'presentiel';
        }
        return 'presentiel';
    };

    const getInitialPole = () => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const p = params.get('pole');
            if (p && poles.some((pole) => pole.slug === p)) return p;
        }
        return 'tous';
    };

    const [activeTab, setActiveTab] = useState<'presentiel' | 'enligne'>(getInitialTab);
    const [activePole, setActivePole] = useState<string>(getInitialPole);
    const [selectedFormation, setSelectedFormation] = useState<any>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [inscriptionModalOpen, setInscriptionModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        nom_complet: '',
        email: '',
        telephone: '',
        ville: '',
        formation_id: '',
        formation_nom: '',
    });

    const handleTabChange = (tab: 'presentiel' | 'enligne') => {
        setActiveTab(tab);
        if (typeof window !== 'undefined') {
            window.location.hash = tab;
        }
    };

    useEffect(() => {
        const handleHashChange = () => {
            if (typeof window !== 'undefined') {
                const hash = window.location.hash;
                if (hash === '#enligne') setActiveTab('enligne');
                else if (hash === '#presentiel') setActiveTab('presentiel');
            }
        };
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const openModal = (formation: any) => {
        const scrollY = window.scrollY;
        const formationData = {
            ...formation,
            debouches: formation.debouches || [],
            programme: formation.programme || [],
        };
        setSelectedFormation(formationData);
        setModalOpen(true);
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100%';
    };

    const closeModal = () => {
        const scrollY = parseInt(document.body.style.top || '0') * -1;
        setModalOpen(false);
        setSelectedFormation(null);
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        if (scrollY > 0) window.scrollTo(0, scrollY);
    };

    const closeInscriptionModal = () => {
        const scrollY = parseInt(document.body.style.top || '0') * -1;
        setInscriptionModalOpen(false);
        setSubmitSuccess(false);
        setSubmitError(null);
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        if (scrollY > 0) window.scrollTo(0, scrollY);
    };

    const openInscriptionModal = (formation: any) => {
        closeModal();
        setFormData({
            nom_complet: '',
            email: '',
            telephone: '',
            ville: '',
            formation_id: formation.id?.toString() || '',
            formation_nom: formation.title || formation.name || '',
        });
        setSubmitSuccess(false);
        setSubmitError(null);
        setInscriptionModalOpen(true);
        const scrollY = window.scrollY;
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100%';
    };

    const handleInscriptionSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);

        if (!formData.nom_complet.trim()) {
            setSubmitError('Veuillez entrer votre nom complet');
            setIsSubmitting(false);
            return;
        }
        if (!formData.telephone.trim()) {
            setSubmitError('Veuillez entrer votre numéro de téléphone');
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await fetch('/pre-inscription', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({
                    nom_complet: formData.nom_complet,
                    email: formData.email,
                    telephone: formData.telephone,
                    ville: formData.ville,
                    formation: formData.formation_nom,
                    formation_id: formData.formation_id,
                }),
            });

            const data = await response.json();

            if (data.success) {
                setIsSubmitting(false);
                setSubmitSuccess(true);
                setTimeout(() => closeInscriptionModal(), 3000);
            } else {
                setIsSubmitting(false);
                setSubmitError(data.message || 'Une erreur est survenue');
            }
        } catch {
            setIsSubmitting(false);
            setSubmitError('Une erreur est survenue. Veuillez réessayer.');
        }
    };

    const filteredPresentiel = useMemo(() => {
        if (activePole === 'tous') return formationsPresentiel || [];
        return (formationsPresentiel || []).filter((f) => !f.pole || f.pole === activePole);
    }, [formationsPresentiel, activePole]);

    const filteredEnLigne = useMemo(() => {
        if (activePole === 'tous') return formationsEnLigne || [];
        return (formationsEnLigne || []).filter((f) => !f.pole || f.pole === activePole);
    }, [formationsEnLigne, activePole]);

    const formationNames = (formationsEnLigne || []).map((f) => f.name).join(', ');
    const presentielNames = (formationsPresentiel || []).map((f) => f.title).join(', ');

    const jsonLdCourses = [
        ...(formationsPresentiel || []).map((f, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
                '@type': 'Course',
                name: f.title,
                description: f.description,
                courseMode: 'onsite',
                inLanguage: 'fr',
                provider: {
                    '@type': 'EducationalOrganization',
                    name: 'Institut de Formation Professionnelle Gamaliel',
                    sameAs: 'https://institutgamaliel.com',
                },
                offers: {
                    '@type': 'Offer',
                    price: f.price ? f.price.replace(/\D/g, '') : '0',
                    priceCurrency: 'XAF',
                    availability: 'https://schema.org/InStock',
                },
            },
        })),
        ...(formationsEnLigne || []).map((f, index) => ({
            '@type': 'ListItem',
            position: (formationsPresentiel || []).length + index + 1,
            item: {
                '@type': 'Course',
                name: f.name,
                description: f.description,
                courseMode: 'online',
                inLanguage: 'fr',
                provider: {
                    '@type': 'EducationalOrganization',
                    name: 'Institut de Formation Professionnelle Gamaliel',
                    sameAs: 'https://institutgamaliel.com',
                },
                offers: {
                    '@type': 'Offer',
                    price: f.frais ? f.frais.toString() : '0',
                    priceCurrency: 'XAF',
                    availability: 'https://schema.org/InStock',
                },
            },
        })),
    ];

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Catalogue des formations — Institut Gamaliel',
        description:
            'Formations professionnelles certifiantes à Douala (Logpom) et en ligne : Paramédical & Santé, Informatique & Digital, Gestion & Management, Hôtellerie & Métiers de bouche.',
        itemListElement: jsonLdCourses,
    };

    const hasPresentiel = filteredPresentiel.length > 0;
    const hasEnLigne = filteredEnLigne.length > 0;

    return (
        <>
            <Head>
                <title>Nos Formations — Institut Gamaliel | Douala & En Ligne</title>
                <meta
                    name="description"
                    content="Catalogue des formations de l'Institut Gamaliel à Douala (Logpom) et en ligne : Paramédical, Informatique & Digital, Gestion, Hôtellerie. Diplômes CQP, DQP, BTS."
                />
                <meta
                    name="keywords"
                    content={`formation professionnelle Douala, Institut Gamaliel, CQP DQP BTS, ${formationNames}, ${presentielNames}, formation paramédicale Douala, formation informatique Douala`}
                />
                <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
                <link rel="canonical" href="https://institutgamaliel.com/formations" />

                <meta property="og:type" content="website" />
                <meta property="og:title" content="Nos Formations — Institut Gamaliel" />
                <meta property="og:description" content="4 pôles de formation, en présentiel à Logpom ou 100% en ligne. Diplômes reconnus." />
                <meta property="og:image" content="https://institutgamaliel.com/assets/images/og-institut-gamaliel.jpg" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:site_name" content="Institut Gamaliel" />
                <meta property="og:locale" content="fr_CM" />
                <meta property="og:url" content="https://institutgamaliel.com/formations" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Nos Formations — Institut Gamaliel" />
                <meta name="twitter:description" content="Formations en présentiel à Douala ou en ligne. Diplômes CQP, DQP, BTS." />
                <meta name="twitter:image" content="https://institutgamaliel.com/assets/images/og-institut-gamaliel.jpg" />

                <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
            </Head>

            <PublicLayout>
                {/* ============================================ */}
                {/* HEADER */}
                {/* ============================================ */}
                <section className="relative overflow-hidden bg-gamaliel-navy-deep text-white pt-32 pb-14">
                    <div className="pointer-events-none absolute -top-24 -left-20 w-96 h-96 rounded-full bg-gamaliel-green/15 blur-[100px]" />
                    <div className="pointer-events-none absolute -bottom-32 -right-10 w-[26rem] h-[26rem] rounded-full bg-gamaliel-orange/20 blur-[110px]" />

                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center animate-fade-in" style={{ animationDelay: '0ms' }}>
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/[0.06] text-[12px] font-semibold tracking-[0.14em] uppercase text-white/85">
                                <AcademicCapIcon className="w-4 h-4 text-gamaliel-green" />
                                4 pôles · CQP · DQP · BTS
                            </span>

                            <h1 className="font-display font-bold text-4xl md:text-5xl mt-6 tracking-tight">
                                Nos{' '}
                                <span
                                    className="bg-clip-text text-transparent"
                                    style={{ backgroundImage: ACTION_GRADIENT }}
                                >
                                    Formations
                                </span>
                            </h1>
                            <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
                                Choisissez votre filière, en présentiel au centre de Logpom (Douala) ou en ligne, à votre rythme.
                            </p>

                            {/* Tabs présentiel / en ligne — indicateur glissant orange */}
                            <div className="relative mt-9 inline-flex rounded-full p-1 bg-white/[0.08] border border-white/10">
                                <div
                                    className="absolute top-1 bottom-1 rounded-full transition-all duration-300 ease-out"
                                    style={{
                                        background: ACTION_GRADIENT,
                                        width: 'calc(50% - 4px)',
                                        left: activeTab === 'presentiel' ? '4px' : 'calc(50% + 0px)',
                                    }}
                                />

                                <a    href="#presentiel"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleTabChange('presentiel');
                                    }}
                                    className={`relative z-10 px-6 py-2.5 rounded-full text-sm font-semibold transition-colors duration-300 ${
                                        activeTab === 'presentiel' ? 'text-white' : 'text-white/70 hover:text-white'
                                    }`}
                                >
                                    En présentiel
                                </a>

                                 <a   href="#enligne"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleTabChange('enligne');
                                    }}
                                    className={`relative z-10 px-6 py-2.5 rounded-full text-sm font-semibold transition-colors duration-300 ${
                                        activeTab === 'enligne' ? 'text-white' : 'text-white/70 hover:text-white'
                                    }`}
                                >
                                    En ligne
                                </a>
                            </div>
                        </div>

                        {/* Filtres par pôle */}
                        <div className="mt-8 flex flex-wrap justify-center gap-2.5">
                            <button
                                onClick={() => setActivePole('tous')}
                                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-300 ${
                                    activePole === 'tous'
                                        ? 'bg-white text-gamaliel-navy-deep border-white'
                                        : 'text-white/70 border-white/20 hover:border-white/50 hover:text-white'
                                }`}
                            >
                                <Squares2X2Icon className="w-4 h-4" />
                                Toutes les filières
                            </button>
                            {poles.map((pole) => {
                                const Icon = pole.icon;
                                const active = activePole === pole.slug;
                                return (
                                    <button
                                        key={pole.slug}
                                        onClick={() => setActivePole(pole.slug)}
                                        className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-300"
                                        style={
                                            active
                                                ? { backgroundColor: pole.color, borderColor: pole.color, color: '#fff' }
                                                : { borderColor: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)' }
                                        }
                                    >
                                        <Icon className="w-4 h-4" />
                                        {pole.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ============================================ */}
                {/* CONTENU */}
                {/* ============================================ */}
                <section className="py-16 bg-gamaliel-paper">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {activeTab === 'presentiel' ? (
                            <div id="presentiel">
                                <h2 className="font-display text-2xl font-bold text-gamaliel-navy-deep mb-8 text-center sm:text-left">
                                    Formations en présentiel — Centre de Logpom, Douala
                                </h2>
                                {!hasPresentiel ? (
                                    <EmptyState label="Aucune formation en présentiel disponible pour ce filtre." />
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {filteredPresentiel.map((formation, i) => {
                                            const poleInfo = poles.find((p) => p.slug === formation.pole);
                                            const accent = poleInfo?.color || ACTION_COLOR;
                                            const PoleIcon = poleInfo?.icon;

                                            return (
                                                <article
                                                    key={formation.id}
                                                    className="group bg-white rounded-[1.75rem] overflow-hidden border border-gamaliel-navy/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col opacity-0 animate-slide-up"
                                                    style={{ animationDelay: `${(i % 6) * 60}ms` }}
                                                >
                                                    <div className="h-1" style={{ backgroundColor: accent }} />

                                                    <div className="relative h-52 overflow-hidden">
                                                        <img
                                                            src={formation.image}
                                                            alt={`Formation ${formation.title} en présentiel — Institut Gamaliel`}
                                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                            loading="lazy"
                                                            onError={(e) => {
                                                                (e.target as HTMLImageElement).src = '/assets/images/placeholder.jpg';
                                                            }}
                                                        />
                                                        <div
                                                            className="absolute inset-0"
                                                            style={{ background: 'linear-gradient(180deg, rgba(13,40,68,0) 55%, rgba(13,40,68,0.55) 100%)' }}
                                                        />

                                                        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gamaliel-navy-deep shadow-sm">
                                                            {formation.price}
                                                        </div>

                                                        <div
                                                            className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white shadow-sm"
                                                            style={{ backgroundColor: accent }}
                                                        >
                                                            {PoleIcon ? <PoleIcon className="w-3.5 h-3.5" /> : <span>{formation.icon}</span>}
                                                            {formation.abbreviation}
                                                        </div>
                                                    </div>

                                                    <div className="p-6 flex flex-col flex-1">
                                                        <h3 className="font-display text-lg font-bold text-gamaliel-navy-deep mb-2 leading-snug">
                                                            {formation.title}
                                                        </h3>

                                                        <div className="flex items-center gap-4 mb-3 text-xs font-medium text-gamaliel-navy/50">
                                                            <span className="flex items-center gap-1.5">
                                                                <ClockIcon className="w-3.5 h-3.5" style={{ color: accent }} />
                                                                {formation.duration}
                                                            </span>
                                                            {formation.diplome && (
                                                                <span className="flex items-center gap-1.5">
                                                                    <AcademicCapIcon className="w-3.5 h-3.5" style={{ color: accent }} />
                                                                    {formation.diplome}
                                                                </span>
                                                            )}
                                                        </div>

                                                        <p className="text-sm text-gamaliel-navy/60 line-clamp-2 mb-5">
                                                            {formation.description}
                                                        </p>

                                                        <button
                                                            onClick={() => openModal({ ...formation, type: 'presentiel' })}
                                                            className="mt-auto w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all group/btn"
                                                            style={{ backgroundColor: accent }}
                                                            onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(0.9)')}
                                                            onMouseLeave={(e) => (e.currentTarget.style.filter = 'brightness(1)')}
                                                        >
                                                            Découvrir le programme
                                                            <ArrowRightIcon className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                                        </button>
                                                    </div>
                                                </article>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div id="enligne">
                                <h2 className="font-display text-2xl font-bold text-gamaliel-navy-deep mb-8 text-center sm:text-left">
                                    Formations en ligne
                                </h2>
                                {!hasEnLigne ? (
                                    <EmptyState label="Aucune formation en ligne disponible pour ce filtre." />
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {filteredEnLigne.map((formation, i) => {
                                            const poleInfo = poles.find((p) => p.slug === formation.pole);
                                            const accent = poleInfo?.color || ACTION_COLOR;
                                            const PoleIcon = poleInfo?.icon;

                                            return (
                                                <article
                                                    key={formation.id}
                                                    className="group bg-white rounded-[1.75rem] overflow-hidden border border-gamaliel-navy/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col opacity-0 animate-slide-up"
                                                    style={{ animationDelay: `${(i % 6) * 60}ms` }}
                                                >
                                                    {/* Même liseré de pôle que le présentiel — cohérence entre les deux listes */}
                                                    <div className="h-1" style={{ backgroundColor: accent }} />

                                                    <div className="relative h-52 overflow-hidden">
                                                        <img
                                                            src={formation.image_url || '/assets/images/placeholder.jpg'}
                                                            alt={`Formation en ligne ${formation.name || ''} — Institut Gamaliel`}
                                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                            loading="lazy"
                                                            onError={(e) => {
                                                                (e.target as HTMLImageElement).src = '/assets/images/placeholder.jpg';
                                                            }}
                                                        />
                                                        <div
                                                            className="absolute inset-0"
                                                            style={{ background: 'linear-gradient(180deg, rgba(13,40,68,0) 55%, rgba(13,40,68,0.55) 100%)' }}
                                                        />

                                                        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gamaliel-navy-deep shadow-sm">
                                                            {formation.frais_formatted || 'FCFA'}
                                                        </div>

                                                        {/* Badge "en ligne" — vert, se distingue du bleu présentiel d'origine */}
                                                        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white shadow-sm bg-gamaliel-green-deep">
                                                            <SignalIcon className="w-3.5 h-3.5" />
                                                            {formation.abbreviation || 'En ligne'}
                                                        </div>
                                                    </div>

                                                    <div className="p-6 flex flex-col flex-1">
                                                        <h3 className="font-display text-lg font-bold text-gamaliel-navy-deep mb-2 leading-snug">
                                                            {formation.name || 'Formation en ligne'}
                                                        </h3>

                                                        <div className="flex items-center gap-4 mb-3 text-xs font-medium text-gamaliel-navy/50">
                                                            <span className="flex items-center gap-1.5">
                                                                <ClockIcon className="w-3.5 h-3.5" style={{ color: accent }} />
                                                                {formation.duration || 'À votre rythme'}
                                                            </span>
                                                            <span className="flex items-center gap-1.5">
                                                                <AcademicCapIcon className="w-3.5 h-3.5" style={{ color: accent }} />
                                                                {formation.diplome || 'Certification'}
                                                            </span>
                                                        </div>

                                                        <p className="text-sm text-gamaliel-navy/60 line-clamp-2 mb-5">
                                                            {formation.description || 'Description non disponible'}
                                                        </p>

                                                        <button
                                                            onClick={() => openModal({ ...formation, type: 'enligne' })}
                                                            className="mt-auto w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all group/btn"
                                                            style={{ backgroundColor: accent }}
                                                            onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(0.9)')}
                                                            onMouseLeave={(e) => (e.currentTarget.style.filter = 'brightness(1)')}
                                                        >
                                                            Voir le programme complet
                                                            <ArrowRightIcon className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                                        </button>
                                                    </div>
                                                </article>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </section>

                {/* ============================================ */}
                {/* MODAL DÉTAILS */}
                {/* ============================================ */}
                {modalOpen && selectedFormation && (
                    <div
                        key={`modal-${selectedFormation.id || selectedFormation.title || Date.now()}`}
                        className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-gamaliel-navy-deep/60 backdrop-blur-sm animate-fade-in"
                        style={{ animationDuration: '0.2s' }}
                        onClick={closeModal}
                    >
                        <div
                            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="sticky top-0 bg-white border-b border-gamaliel-navy/5 px-6 py-4 rounded-t-3xl flex items-center justify-between z-10">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-gamaliel-orange/10 text-gamaliel-orange flex items-center justify-center text-2xl">
                                        {selectedFormation.icon || '📚'}
                                    </div>
                                    <h2 className="text-xl font-bold text-gamaliel-navy-deep notranslate">
                                        {selectedFormation.title || selectedFormation.name}
                                    </h2>
                                </div>
                                <button
                                    onClick={closeModal}
                                    className="p-2 hover:bg-gamaliel-navy/5 rounded-full transition-colors text-gamaliel-navy/40 hover:text-gamaliel-navy"
                                    aria-label="Fermer la boîte de dialogue"
                                >
                                    <XMarkIcon className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="p-6 space-y-6">
                                <div className="rounded-xl overflow-hidden">
                                    <img
                                        src={selectedFormation.image || selectedFormation.image_url || '/assets/images/placeholder.jpg'}
                                        alt={`Détails formation ${selectedFormation.title || selectedFormation.name} — Institut Gamaliel`}
                                        className="w-full h-64 object-cover"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = '/assets/images/placeholder.jpg';
                                        }}
                                    />
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    <div className="bg-gamaliel-paper rounded-xl p-3 text-center notranslate">
                                        <ClockIcon className="w-5 h-5 text-gamaliel-orange mx-auto mb-1" />
                                        <p className="text-xs text-gamaliel-navy/50">Durée</p>
                                        <p className="text-sm font-semibold text-gamaliel-navy-deep">
                                            {selectedFormation.duration || 'Non définie'}
                                        </p>
                                    </div>
                                    <div className="bg-gamaliel-paper rounded-xl p-3 text-center notranslate">
                                        <AcademicCapIcon className="w-5 h-5 text-gamaliel-orange mx-auto mb-1" />
                                        <p className="text-xs text-gamaliel-navy/50">Diplôme</p>
                                        <p className="text-sm font-semibold text-gamaliel-navy-deep">
                                            {selectedFormation.diplome || 'Non défini'}
                                        </p>
                                    </div>
                                    <div className="bg-gamaliel-paper rounded-xl p-3 text-center notranslate">
                                        <CurrencyDollarIcon className="w-5 h-5 text-gamaliel-orange mx-auto mb-1" />
                                        <p className="text-xs text-gamaliel-navy/50">Frais</p>
                                        <p className="text-sm font-semibold text-gamaliel-navy-deep">
                                            {selectedFormation.price || selectedFormation.frais_formatted || '0 FCFA'}
                                        </p>
                                    </div>
                                </div>

                                <div className="notranslate">
                                    <h3 className="font-semibold text-gamaliel-navy-deep mb-2">Description de la formation</h3>
                                    <p className="text-sm text-gamaliel-navy/70 leading-relaxed">
                                        {selectedFormation.description || 'Description non disponible'}
                                    </p>
                                </div>

                                {selectedFormation.programme && (
                                    <div className="notranslate">
                                        <h3 className="font-semibold text-gamaliel-navy-deep mb-2">Programme d'études</h3>
                                        {Array.isArray(selectedFormation.programme) ? (
                                            <ul className="grid grid-cols-1 gap-1.5">
                                                {selectedFormation.programme.map((item: string, index: number) => (
                                                    <li key={index} className="flex items-start gap-2 text-sm text-gamaliel-navy/70">
                                                        <span className="text-gamaliel-orange mt-0.5">▸</span>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-sm text-gamaliel-navy/70 leading-relaxed whitespace-pre-line">
                                                {selectedFormation.programme}
                                            </p>
                                        )}
                                    </div>
                                )}

                                {selectedFormation.debouches && (
                                    <div className="notranslate">
                                        <h3 className="font-semibold text-gamaliel-navy-deep mb-2">Débouchés professionnels</h3>
                                        {Array.isArray(selectedFormation.debouches) ? (
                                            <div className="flex flex-wrap gap-2">
                                                {selectedFormation.debouches.map((item: string, index: number) => (
                                                    <span
                                                        key={index}
                                                        className="px-3 py-1.5 bg-gamaliel-green/20 text-gamaliel-green-deep rounded-full text-sm font-medium"
                                                    >
                                                        {item}
                                                    </span>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-sm text-gamaliel-navy/70 leading-relaxed whitespace-pre-line">
                                                {selectedFormation.debouches}
                                            </p>
                                        )}
                                    </div>
                                )}

                                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gamaliel-navy/5">
                                    {selectedFormation.lien_externe && selectedFormation.lien_label && (

                                         <a   href={selectedFormation.lien_externe}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 text-center px-6 py-3 bg-gamaliel-navy/5 text-gamaliel-navy rounded-xl font-semibold hover:bg-gamaliel-navy/10 transition-colors notranslate"
                                        >
                                            {selectedFormation.lien_label}
                                        </a>
                                    )}

                                    {selectedFormation.type === 'presentiel' ? (
                                        <button
                                            onClick={() => openInscriptionModal(selectedFormation)}
                                            className="flex-1 text-center px-6 py-3 text-white rounded-xl font-semibold transition-all duration-300 notranslate flex items-center justify-center gap-2"
                                            style={{
                                                background: ACTION_GRADIENT,
                                                boxShadow: '0 10px 20px -6px rgba(225,58,75,0.4)',
                                            }}
                                        >
                                            <UserPlusIcon className="w-5 h-5" />
                                            Je m'inscris
                                        </button>
                                    ) : (
                                        <Link
                                            href={`/preinscription?formation=${selectedFormation.id}&type=formation`}
                                            className="flex-1 text-center px-6 py-3 text-white rounded-xl font-semibold transition-all duration-300 notranslate flex items-center justify-center gap-2"
                                            style={{
                                                background: ACTION_GRADIENT,
                                                boxShadow: '0 10px 20px -6px rgba(225,58,75,0.4)',
                                            }}
                                        >
                                            <UserPlusIcon className="w-5 h-5" />
                                            Me pré-inscrire
                                        </Link>
                                    )}

                                    <button
                                        onClick={closeModal}
                                        className="px-6 py-3 border-2 border-gamaliel-navy/10 rounded-xl font-semibold text-gamaliel-navy/60 hover:bg-gamaliel-navy/5 transition-colors notranslate"
                                    >
                                        Fermer
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ============================================ */}
                {/* MODAL INSCRIPTION PRÉSENTIEL */}
                {/* ============================================ */}
                {inscriptionModalOpen && (
                    <div
                        className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-gamaliel-navy-deep/60 backdrop-blur-sm animate-fade-in"
                        style={{ animationDuration: '0.2s' }}
                        onClick={closeInscriptionModal}
                    >
                        <div
                            className="bg-white rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="sticky top-0 bg-white border-b border-gamaliel-navy/5 px-6 py-4 rounded-t-3xl flex items-center justify-between z-10">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-gamaliel-green/20 text-gamaliel-green-deep flex items-center justify-center">
                                        <UserPlusIcon className="w-5 h-5" />
                                    </div>
                                    <h2 className="text-lg font-bold text-gamaliel-navy-deep">Inscription en présentiel</h2>
                                </div>
                                <button
                                    onClick={closeInscriptionModal}
                                    className="p-2 hover:bg-gamaliel-navy/5 rounded-full transition-colors text-gamaliel-navy/40 hover:text-gamaliel-navy"
                                    aria-label="Fermer la boîte de dialogue"
                                >
                                    <XMarkIcon className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="p-6">
                                {submitSuccess ? (
                                    <div className="text-center py-8">
                                        <div className="w-16 h-16 bg-gamaliel-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <CheckCircleIcon className="w-8 h-8 text-gamaliel-green-deep" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gamaliel-navy-deep mb-2">Inscription envoyée !</h3>
                                        <p className="text-gamaliel-navy/60 text-sm">
                                            Votre demande d'inscription pour <strong>{formData.formation_nom}</strong> a été enregistrée.
                                            Notre équipe pédagogique vous contactera rapidement.
                                        </p>
                                        <p className="text-gamaliel-navy/30 text-xs mt-4">Fermeture automatique...</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleInscriptionSubmit} className="space-y-4">
                                        <p className="text-sm text-gamaliel-navy/60">
                                            Inscription en présentiel pour la formation <strong>{formData.formation_nom}</strong>
                                        </p>

                                        <input type="hidden" value={formData.formation_id} />

                                        <div>
                                            <label className="block text-sm font-medium text-gamaliel-navy/80 mb-1">
                                                Nom complet <span className="text-gamaliel-red">*</span>
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <UserIcon className="w-5 h-5 text-gamaliel-navy/30" />
                                                </div>
                                                <input
                                                    type="text"
                                                    value={formData.nom_complet}
                                                    onChange={(e) => setFormData({ ...formData, nom_complet: e.target.value })}
                                                    className="w-full pl-10 pr-4 py-2.5 border border-gamaliel-navy/15 rounded-xl focus:ring-2 focus:ring-gamaliel-orange focus:border-gamaliel-orange transition-colors"
                                                    placeholder="Votre nom et prénom"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gamaliel-navy/80 mb-1">
                                                Email <span className="text-gamaliel-navy/30 text-xs">(Optionnel)</span>
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <EnvelopeIcon className="w-5 h-5 text-gamaliel-navy/30" />
                                                </div>
                                                <input
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className="w-full pl-10 pr-4 py-2.5 border border-gamaliel-navy/15 rounded-xl focus:ring-2 focus:ring-gamaliel-orange focus:border-gamaliel-orange transition-colors"
                                                    placeholder="votre@email.com"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gamaliel-navy/80 mb-1">
                                                Téléphone <span className="text-gamaliel-red">*</span>
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <PhoneIcon className="w-5 h-5 text-gamaliel-navy/30" />
                                                </div>
                                                <input
                                                    type="tel"
                                                    value={formData.telephone}
                                                    onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                                                    className="w-full pl-10 pr-4 py-2.5 border border-gamaliel-navy/15 rounded-xl focus:ring-2 focus:ring-gamaliel-orange focus:border-gamaliel-orange transition-colors"
                                                    placeholder="6XX XXX XXX"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gamaliel-navy/80 mb-1">
                                                Ville de résidence
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <MapPinIcon className="w-5 h-5 text-gamaliel-navy/30" />
                                                </div>
                                                <input
                                                    type="text"
                                                    value={formData.ville}
                                                    onChange={(e) => setFormData({ ...formData, ville: e.target.value })}
                                                    className="w-full pl-10 pr-4 py-2.5 border border-gamaliel-navy/15 rounded-xl focus:ring-2 focus:ring-gamaliel-orange focus:border-gamaliel-orange transition-colors"
                                                    placeholder="Douala, Yaoundé, Bafoussam..."
                                                />
                                            </div>
                                        </div>

                                        {submitError && (
                                            <div className="bg-gamaliel-red/10 border border-gamaliel-red/20 rounded-xl p-3">
                                                <p className="text-sm text-gamaliel-red">{submitError}</p>
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full flex items-center justify-center gap-2 py-3 px-4 text-white rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                            style={{
                                                background: ACTION_GRADIENT,
                                                boxShadow: '0 10px 20px -6px rgba(225,58,75,0.4)',
                                            }}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Traitement en cours...
                                                </>
                                            ) : (
                                                <>
                                                    <UserPlusIcon className="w-5 h-5" />
                                                    Valider mon inscription
                                                </>
                                            )}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </PublicLayout>
        </>
    );
}

function EmptyState({ label }: { label: string }) {
    return (
        <div className="text-center py-16">
            <AcademicCapIcon className="w-16 h-16 text-gamaliel-navy/15 mx-auto mb-4" />
            <p className="text-gamaliel-navy/60 text-lg">{label}</p>
            <p className="text-gamaliel-navy/35 text-sm mt-2">Essayez un autre filtre ou revenez plus tard.</p>
        </div>
    );
}
