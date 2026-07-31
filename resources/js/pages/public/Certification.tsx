import {
    AcademicCapIcon,
    ClockIcon,
    CurrencyDollarIcon,
    ArrowRightIcon,
    XMarkIcon,
    CheckBadgeIcon,
    UserPlusIcon
} from '@heroicons/react/24/outline';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

import PublicLayout from '@/Components/PublicLayout';

interface Certification {
    id: number;
    titre: string;
    slug: string;
    description: string;
    prerequis: string | null;
    contenu: string | null;
    duree: string;
    frais: number;
    frais_formatted: string;
    image_url: string;
    lien_externe: string | null;
    lien_label: string | null;
    formation: {
        id: number;
        name: string;
        abbreviation: string;
    } | null;
}

interface Props {
    certifications: Certification[];
}

export default function Certification({ certifications }: Props) {
    const [selectedCertification, setSelectedCertification] = useState<Certification | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = (certification: Certification) => {
        setSelectedCertification(certification);
        setModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setModalOpen(false);
        document.body.style.overflow = '';
        setSelectedCertification(null);
    };

    const certTitles = (certifications || []).map(c => c.titre).join(', ');
    const formationNames = (certifications || []).map(c => c.formation?.name).filter(Boolean).join(', ');

    // ✅ JSON-LD Schema.org enrichi
    const jsonLdCourses = (certifications || []).map((c, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
            "@type": "Course",
            "name": c.titre,
            "description": c.description,
            "courseMode": "online",
            "inLanguage": "fr",
            "provider": {
                "@type": "EducationalOrganization",
                "name": "CAB Informatique",
                "sameAs": "https://cab-informatique.com"
            },
            "offers": {
                "@type": "Offer",
                "price": c.frais ? c.frais.toString() : '0',
                "priceCurrency": "XAF",
                "availability": "https://schema.org/InStock"
            },
            "educationalCredentialAwarded": {
                "@type": "EducationalOccupationalCredential",
                "name": "Certification professionnelle reconnue",
                "credentialCategory": "Certificate"
            }
        }
    }));

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Certifications Professionnelles en Ligne CAB Informatique",
        "description": "Faites valider vos compétences avec nos certifications professionnelles 100% en ligne au Cameroun : Infographie, Secrétariat, Comptabilité, Maintenance, Vidéosurveillance.",
        "itemListElement": jsonLdCourses
    };

    return (
        <>
            <Head>
                {/* Title optimisé pour mots-clés d'intention */}
                <title>Certifications Professionnelles en Ligne au Cameroun | CAB Informatique</title>

                {/* Meta Description */}
                <meta
                    name="description"
                    content="Validez vos acquis et obtenez une certification professionnelle reconnue 100% en ligne au Cameroun. Certifications à distance en Infographie, Secrétariat, Comptabilité, Maintenance, Réseaux, Vidéosurveillance chez CAB Informatique."
                />
                <meta
                    name="keywords"
                    content={`certification en ligne Cameroun, certification professionnelle Douala, certification Yaoundé, examen en ligne, ${certTitles}, ${formationNames}, CAB Informatique, VAE Cameroun`}
                />
                <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

                {/* Canonical URL */}
                <link rel="canonical" href="https://cab-informatique.com/certification" />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Certifications Professionnelles en Ligne au Cameroun | CAB Informatique" />
                <meta property="og:description" content="Validez vos compétences et obtenez une certification professionnelle officielle à distance. Formations certifiantes adaptées à votre rythme." />
                <meta property="og:image" content="https://cab-informatique.com/assets/images/og-cab-informatique.jpg" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:site_name" content="CAB Informatique" />
                <meta property="og:locale" content="fr_CM" />
                <meta property="og:url" content="https://cab-informatique.com/certification" />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@cabinfo" />
                <meta name="twitter:creator" content="@cabinfo" />
                <meta name="twitter:title" content="Certifications Professionnelles en Ligne au Cameroun | CAB Informatique" />
                <meta name="twitter:description" content="Faites valider vos compétences professionnelles en ligne avec CAB Informatique." />
                <meta name="twitter:image" content="https://cab-informatique.com/assets/images/og-cab-informatique.jpg" />

                {/* JSON-LD Schema.org */}
                <script type="application/ld+json">
                    {JSON.stringify(jsonLd)}
                </script>
            </Head>

            <PublicLayout>

                {/* Header */}
                <section
                    className="relative pt-32 pb-16 text-white"
                    style={{ background: 'linear-gradient(to right, #0a1f4d, #1a56db)' }}
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <div
                                className="inline-flex items-center gap-2 px-4 py-2 backdrop-blur-sm rounded-full text-sm font-medium mb-4"
                                style={{
                                    backgroundColor: 'rgba(255,255,255,0.1)',
                                    color: 'rgba(255,255,255,0.9)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                }}
                            >
                                <CheckBadgeIcon className="w-4 h-4" />
                                Accréditation & Valorisation des compétences
                            </div>
                            <h1 className="text-4xl md:text-5xl font-extrabold text-white">
                                Certifications Professionnelles <span className="text-[#d21f2f]">En Ligne</span>
                            </h1>
                            <p
                                className="mt-4 text-xl max-w-2xl mx-auto"
                                style={{ color: 'rgba(255,255,255,0.85)' }}
                            >
                                Validez votre expérience professionnelle à distance et obtenez un certificat reconnu pour propulser votre carrière
                            </p>
                            <div className="mt-6 flex flex-wrap justify-center gap-4">
                                <span
                                    className="px-4 py-2 rounded-full text-sm"
                                    style={{
                                        backgroundColor: 'rgba(255,255,255,0.1)',
                                        color: 'rgba(255,255,255,0.8)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                    }}
                                >
                                    🎓 100% à distance
                                </span>
                                <span
                                    className="px-4 py-2 rounded-full text-sm"
                                    style={{
                                        backgroundColor: 'rgba(255,255,255,0.1)',
                                        color: 'rgba(255,255,255,0.8)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                    }}
                                >
                                    ⏱️ Apprentissage flexible
                                </span>
                                <span
                                    className="px-4 py-2 rounded-full text-sm"
                                    style={{
                                        backgroundColor: 'rgba(255,255,255,0.1)',
                                        color: 'rgba(255,255,255,0.8)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                    }}
                                >
                                    📜 Titre professionnel officiel
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Liste des certifications */}
                <section className="py-16 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center sm:text-left">
                            Toutes nos certifications professionnelles disponibles à distance
                        </h2>
                        {certifications && certifications.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {certifications.map((certification) => (
                                    <article
                                        key={certification.id}
                                        className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 group flex flex-col justify-between"
                                    >
                                        <div>
                                            <div className="relative h-48 overflow-hidden">
                                                <img
                                                    src={certification.image_url || '/assets/images/placeholder.jpg'}
                                                    alt={`Certification en ligne ${certification.titre} - CAB Informatique Cameroun`}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    loading="lazy"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src = '/assets/images/placeholder.jpg';
                                                    }}
                                                />
                                                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-cab-blue">
                                                    {certification.frais_formatted}
                                                </div>
                                                <div className="absolute bottom-3 left-3 bg-cab-blue/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-white flex items-center gap-1">
                                                    <AcademicCapIcon className="w-3 h-3" />
                                                    {certification.formation?.abbreviation || 'Certification'}
                                                </div>
                                            </div>
                                            <div className="p-6">
                                                <div className="flex items-start justify-between mb-2">
                                                    <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
                                                        {certification.titre}
                                                    </h3>
                                                </div>
                                                <p className="text-sm text-gray-500 mb-2">
                                                    Filière : {certification.formation?.name || 'Formation associée'}
                                                </p>
                                                <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                                                    <span className="flex items-center gap-1">
                                                        <ClockIcon className="w-4 h-4" />
                                                        ⏱️ Durée : {certification.duree}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                                                    {certification.description}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="p-6 pt-0">
                                            <button
                                                onClick={() => openModal(certification)}
                                                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-all group"
                                            >
                                                Voir les détails & prérequis
                                                <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <CheckBadgeIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-500 text-lg">Aucune certification disponible pour le moment.</p>
                                <p className="text-gray-400 text-sm mt-2">Revenez plus tard pour découvrir nos sessions d'examen en ligne.</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* ============================================================
                    MODAL DÉTAILS CERTIFICATION
                    ============================================================ */}
                {modalOpen && selectedCertification && (
                    <div
                        key={`modal-${selectedCertification.id}`}
                        className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={closeModal}
                    >
                        <div
                            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header Modal */}
                            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 rounded-t-3xl flex items-center justify-between z-10">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-cab-blue/10 text-cab-blue flex items-center justify-center">
                                        <CheckBadgeIcon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900 notranslate">
                                            {selectedCertification.titre}
                                        </h2>
                                        <p className="text-xs text-gray-500">
                                            Filière : {selectedCertification.formation?.name || 'Formation associée'}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={closeModal}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
                                    aria-label="Fermer la boîte de dialogue"
                                >
                                    <XMarkIcon className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="p-6 space-y-6">
                                {/* Image */}
                                <div className="rounded-xl overflow-hidden">
                                    <img
                                        src={selectedCertification.image_url || '/assets/images/placeholder.jpg'}
                                        alt={`Détails certification ${selectedCertification.titre} - CAB Informatique`}
                                        className="w-full h-56 object-cover"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = '/assets/images/placeholder.jpg';
                                        }}
                                    />
                                </div>

                                {/* Infos clés */}
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    <div className="bg-gray-50 rounded-xl p-3 text-center notranslate">
                                        <ClockIcon className="w-5 h-5 text-cab-blue mx-auto mb-1" />
                                        <p className="text-xs text-gray-500">Durée</p>
                                        <p className="text-sm font-semibold text-gray-900">
                                            {selectedCertification.duree || 'Non définie'}
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-3 text-center notranslate">
                                        <CurrencyDollarIcon className="w-5 h-5 text-cab-blue mx-auto mb-1" />
                                        <p className="text-xs text-gray-500">Frais d'évaluation</p>
                                        <p className="text-sm font-semibold text-gray-900">
                                            {selectedCertification.frais_formatted}
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-3 text-center notranslate">
                                        <AcademicCapIcon className="w-5 h-5 text-cab-blue mx-auto mb-1" />
                                        <p className="text-xs text-gray-500">Formation</p>
                                        <p className="text-sm font-semibold text-gray-900">
                                            {selectedCertification.formation?.abbreviation || '-'}
                                        </p>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="notranslate">
                                    <h3 className="font-semibold text-gray-900 mb-2">📌 Description de la certification</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {selectedCertification.description || 'Description non disponible'}
                                    </p>
                                </div>

                                {/* Prérequis */}
                                {selectedCertification.prerequis && (
                                    <div className="notranslate">
                                        <h3 className="font-semibold text-gray-900 mb-2">📋 Prérequis recommandés</h3>
                                        <div className="bg-gray-50 rounded-xl p-4">
                                            <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                                                {selectedCertification.prerequis}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Contenu */}
                                {selectedCertification.contenu && (
                                    <div className="notranslate">
                                        <h3 className="font-semibold text-gray-900 mb-2">📚 Programme d'évaluation / Contenu</h3>
                                        <div className="bg-gray-50 rounded-xl p-4">
                                            <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                                                {selectedCertification.contenu}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Boutons d'action */}
                                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
                                    {selectedCertification.lien_externe && selectedCertification.lien_label && (
                                        <a
                                            href={selectedCertification.lien_externe}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 text-center px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors notranslate"
                                        >
                                            {selectedCertification.lien_label}
                                        </a>
                                    )}

                                    <Link
                                        href={`/preinscription?certification=${selectedCertification.id}&type=certification`}
                                        className="flex-1 text-center px-6 py-3 text-white rounded-xl font-semibold transition-all duration-300 notranslate flex items-center justify-center gap-2"
                                        style={{
                                            background: 'linear-gradient(to right, #1a56db, rgba(26,86,219,0.8))',
                                            boxShadow: '0 10px 15px -3px rgba(26,86,219,0.25)',
                                        }}
                                    >
                                        <UserPlusIcon className="w-5 h-5" />
                                        📝 Me pré-inscrire
                                    </Link>

                                    <button
                                        onClick={closeModal}
                                        className="px-6 py-3 border-2 border-gray-200 rounded-xl font-semibold text-gray-600 hover:bg-gray-50 transition-colors notranslate"
                                    >
                                        Fermer
                                    </button>
                                </div>

                                {/* Note supplémentaire */}
                                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                                    <p className="text-xs text-blue-700 flex items-start gap-2">
                                        <span className="text-blue-500">ℹ️</span>
                                        Cette certification est accessible 100% à distance depuis Douala, Yaoundé, Bafoussam ou partout ailleurs au Cameroun et à l'international.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </PublicLayout>
        </>
    );
}
