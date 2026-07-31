// resources/js/pages/Admin/Candidatures/Show.tsx
import {
    ArrowLeftIcon,
    UserIcon,
    EnvelopeIcon,
    PhoneIcon,
    AcademicCapIcon,
    ChatBubbleLeftIcon,
    CalendarIcon,
    CheckCircleIcon,
    XCircleIcon,
    ClockIcon,
    ClipboardDocumentListIcon,
    BuildingOfficeIcon,
    KeyIcon,
    IdentificationIcon,
    GlobeAltIcon,
    CheckBadgeIcon,
    ExclamationTriangleIcon,
    DocumentTextIcon
} from '@heroicons/react/24/outline';
import { Head, Link, router } from '@inertiajs/react';

import { useState } from 'react';
import AdminLayout from '@/Components/Layouts/AdminLayout';

interface Candidature {
    id: number;
    nom: string;
    prenom: string;
    nom_complet: string;
    email: string | null;
    telephone: string;
    niveau_scolaire: string | null;
    message: string | null;
    type: string;
    type_label: string;
    statut: string;
    statut_label: string;
    statut_color: string;
    formation: {
        id: number;
        name: string;
        abbreviation: string;
    } | null;
    certification: {
        id: number;
        titre: string;
    } | null;
    vague: {
        id: number;
        name: string;
    } | null;
    notes: string | null;
    created_at: string;
    traite_le: string | null;
    traite_par: string | null;
    user: {
        id: number;
        username: string;
        email: string | null;
        telephone: string | null;
    } | null;
    student: {
        id: number;
        matricule: string;
        nom_complet: string;
        vague_id: number | null;
        certification_id: number | null;
    } | null;
}

interface Vague {
    id: number;
    name: string;
    date_debut: string;
    places: string;
    is_full: boolean;
}

interface Props {
    candidature: Candidature;
    vagues?: Vague[];
}

export default function Show({ candidature, vagues = [] }: Props) {
    const [showVagueModal, setShowVagueModal] = useState(false);
    const [selectedVague, setSelectedVague] = useState<string>('');
    const [copied, setCopied] = useState(false);

    const getStatutBadge = (statut: string, label: string) => {
        const configs: Record<string, { color: string; icon: React.ReactNode }> = {
            en_attente: {
                color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
                icon: <ClockIcon className="w-4 h-4" />
            },
            en_cours: {
                color: 'bg-blue-100 text-blue-800 border-blue-200',
                icon: <ClipboardDocumentListIcon className="w-4 h-4" />
            },
            admis: {
                color: 'bg-green-100 text-green-800 border-green-200',
                icon: <CheckCircleIcon className="w-4 h-4" />
            },
            refuse: {
                color: 'bg-red-100 text-red-800 border-red-200',
                icon: <XCircleIcon className="w-4 h-4" />
            },
        };

        const config = configs[statut] || configs.en_attente;

        return (
            <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border ${config.color}`}>
                {config.icon}
                {label}
            </span>
        );
    };

    const handleAction = (action: string) => {
        if (!confirm(`Confirmer cette action ?`)) return;

        router.post(`/admin/candidatures/${candidature.id}/${action}`, {}, {
            preserveScroll: true,
            onSuccess: () => {
                router.reload();
            }
        });
    };

    const handleAttribuerVague = () => {
        if (!selectedVague) {
            alert('Veuillez sélectionner une vague.');
            return;
        }

        router.post(`/admin/candidatures/${candidature.id}/attribuer-vague`, {
            vague_id: selectedVague
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setShowVagueModal(false);
                router.reload();
            }
        });
    };

    // ✅ Récupérer l'identifiant de connexion (priorité email puis téléphone)
    const getLoginIdentifiant = () => {
        if (candidature.user?.email) {
            return candidature.user.email;
        }
        if (candidature.user?.telephone) {
            return candidature.user.telephone;
        }
        if (candidature.telephone) {
            return candidature.telephone;
        }
        return 'Non disponible';
    };

    // ✅ Récupérer le label de l'identifiant
    const getIdentifiantLabel = () => {
        if (candidature.user?.email) return '📧 Email';
        if (candidature.user?.telephone) return '📱 Téléphone';
        if (candidature.telephone) return '📱 Téléphone';
        return '📧 Identifiant';
    };

    // ✅ Construire le message pour le candidat
    const buildMessage = () => {
        const identifiant = getLoginIdentifiant();
        const label = getIdentifiantLabel();
        return `👋 Bonjour ${candidature.nom_complet},\n\nVotre compte CAB Informatique a été créé avec succès !\n\n🔑 Identifiants de connexion :\n${label} : ${identifiant}\n🔐 Mot de passe : ${candidature.student?.matricule}\n🎓 Matricule : ${candidature.student?.matricule}\n\n➡️ Connectez-vous sur : ${window.location.origin}/login\n\nBonne formation ! 🚀`;
    };

    // ✅ Copier les identifiants
    const copyIdentifiants = () => {
        const message = buildMessage();

        navigator.clipboard.writeText(message).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 3000);
        });
    };

    // ✅ Lien WhatsApp
    const getWhatsAppLink = () => {
        const message = buildMessage();
        const phone = candidature.telephone.replace(/[^0-9]/g, '');
        return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    };

    // ✅ Lien email (seulement si email existe)
    const getEmailLink = () => {
        if (!candidature.user?.email) return null;

        const message = buildMessage();
        const subject = 'Compte CAB Informatique';
        return `mailto:${candidature.user.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    };

    // ✅ Déterminer si l'étudiant a une vague ou une certification
    const getStudentType = () => {
        if (!candidature.student) return null;
        if (candidature.student.vague_id) return 'vague';
        if (candidature.student.certification_id) return 'certification';
        return null;
    };

    const studentType = getStudentType();

    // Déterminer si les actions sont disponibles
    const canAccept = candidature.statut === 'en_attente' || candidature.statut === 'en_cours';
    const canRefuse = candidature.statut === 'en_attente' || candidature.statut === 'en_cours';
    const canEnCours = candidature.statut === 'en_attente';
    const needsVague = candidature.type === 'formation' && !candidature.vague && canAccept;
    const isTraite = candidature.statut === 'admis' || candidature.statut === 'refuse';

    return (
        <>
            <Head title={`Candidature - ${candidature.nom_complet}`} />

            <AdminLayout title={`Candidature de ${candidature.nom_complet}`}>
                <div className="max-w-5xl">
                    {/* Lien retour */}
                    <Link
                        href="/admin/candidatures"
                        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-cab-blue transition-colors mb-4"
                    >
                        <ArrowLeftIcon className="w-4 h-4" />
                        Retour à la liste
                    </Link>

                    {/* En-tête avec statut et actions */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                        <div className="flex flex-wrap items-start justify-between gap-4">
                            <div className="flex items-start gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cab-blue to-cab-dark flex items-center justify-center text-white text-2xl font-bold shrink-0">
                                    {candidature.nom_complet.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">{candidature.nom_complet}</h2>
                                    <div className="flex flex-wrap items-center gap-2 mt-1">
                                        <span className="text-sm text-gray-500">{candidature.type_label}</span>
                                        <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                        <span className="text-sm text-gray-500">{candidature.created_at}</span>
                                    </div>
                                    <div className="mt-2">
                                        {getStatutBadge(candidature.statut, candidature.statut_label)}
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            {!isTraite && (
                                <div className="flex flex-wrap gap-2">
                                    {needsVague && (
                                        <button
                                            onClick={() => setShowVagueModal(true)}
                                            className="px-4 py-2 bg-purple-600 text-white rounded-xl text-sm font-semibold hover:bg-purple-700 transition-colors flex items-center gap-2 shadow-sm shadow-purple-200"
                                        >
                                            <BuildingOfficeIcon className="w-4 h-4" />
                                            Attribuer une vague
                                        </button>
                                    )}

                                    {canEnCours && (
                                        <button
                                            onClick={() => handleAction('en-cours')}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm shadow-blue-200"
                                        >
                                            <ClockIcon className="w-4 h-4" />
                                            Mettre en cours
                                        </button>
                                    )}

                                    {canAccept && (
                                        <button
                                            onClick={() => handleAction('accepter')}
                                            className="px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-semibold hover:bg-green-700 transition-colors flex items-center gap-2 shadow-sm shadow-green-200"
                                        >
                                            <CheckCircleIcon className="w-4 h-4" />
                                            Accepter
                                        </button>
                                    )}

                                    {canRefuse && (
                                        <button
                                            onClick={() => handleAction('refuser')}
                                            className="px-4 py-2 bg-red-600 text-white rounded-xl text-sm font-semibold hover:bg-red-700 transition-colors flex items-center gap-2 shadow-sm shadow-red-200"
                                        >
                                            <XCircleIcon className="w-4 h-4" />
                                            Refuser
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Informations de traitement */}
                        {isTraite && candidature.traite_le && (
                            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-4 text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                    <CalendarIcon className="w-4 h-4" />
                                    Traité le {candidature.traite_le}
                                </span>
                                {candidature.traite_par && (
                                    <span className="flex items-center gap-1">
                                        <UserIcon className="w-4 h-4" />
                                        Par {candidature.traite_par}
                                    </span>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Compte créé - Section spéciale pour les admis */}
                    {candidature.statut === 'admis' && candidature.user && candidature.student && (
                        <div className="mb-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200 shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-green-100 rounded-xl">
                                    <CheckBadgeIcon className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-green-800">Compte créé avec succès</h3>
                                    <p className="text-sm text-green-600">Les identifiants sont prêts à être transmis</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="bg-white/70 rounded-xl p-4 border border-green-100">
                                    <p className="text-xs text-green-600 font-medium">🎓 Matricule</p>
                                    <p className="font-mono font-bold text-green-900 text-lg mt-1">{candidature.student.matricule}</p>
                                </div>
                                <div className="bg-white/70 rounded-xl p-4 border border-green-100">
                                    <p className="text-xs text-green-600 font-medium">👤 Nom d'utilisateur</p>
                                    <p className="font-mono font-bold text-green-900 mt-1">{candidature.user.username}</p>
                                </div>

                                {/* ✅ Identifiant de connexion (email ou téléphone) */}
                                <div className="bg-white/70 rounded-xl p-4 border border-green-100">
                                    <p className="text-xs text-green-600 font-medium">
                                        {getIdentifiantLabel()}
                                    </p>
                                    <p className="text-green-900 text-sm mt-1 truncate font-medium">
                                        {getLoginIdentifiant()}
                                    </p>
                                </div>

                                <div className="bg-white/70 rounded-xl p-4 border border-green-100">
                                    <p className="text-xs text-green-600 font-medium">🔐 Mot de passe</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <code className="font-mono font-bold text-green-900 text-sm bg-white px-2 py-1 rounded border border-green-200">
                                            {candidature.student.matricule}
                                        </code>
                                        <span className="text-xs text-green-500">(matricule)</span>
                                    </div>
                                </div>
                            </div>

                            {/* ✅ Informations Vague / Certification */}
                            <div className="mt-4 pt-4 border-t border-green-200">
                                <p className="text-xs text-green-600 font-medium mb-2">📋 Affectation</p>
                                {studentType === 'vague' ? (
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                                        <BuildingOfficeIcon className="w-4 h-4" />
                                        Étudiant en ligne (Vague)
                                    </div>
                                ) : studentType === 'certification' ? (
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium">
                                        <AcademicCapIcon className="w-4 h-4" />
                                        Étudiant en certification
                                    </div>
                                ) : (
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium">
                                        <ExclamationTriangleIcon className="w-4 h-4" />
                                        Non affecté
                                    </div>
                                )}
                            </div>

                            {/* ✅ Actions de transmission */}
                            <div className="mt-4 pt-4 border-t border-green-200 flex flex-wrap gap-3">
                                <button
                                    onClick={copyIdentifiants}
                                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                                        copied
                                            ? 'bg-green-600 text-white'
                                            : 'bg-green-600 text-white hover:bg-green-700'
                                    }`}
                                >
                                    {copied ? (
                                        <>
                                            <CheckCircleIcon className="w-4 h-4" />
                                            Copié !
                                        </>
                                    ) : (
                                        <>
                                            📋 Copier les identifiants
                                        </>
                                    )}
                                </button>

                                <a
                                    href={getWhatsAppLink()}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-green-500 text-white rounded-xl text-sm font-semibold hover:bg-green-600 transition-colors flex items-center gap-2"
                                >
                                    💬 Envoyer sur WhatsApp
                                </a>

                                {getEmailLink() && (
                                    <a
                                        href={getEmailLink()}
                                        className="px-4 py-2 bg-blue-500 text-white rounded-xl text-sm font-semibold hover:bg-blue-600 transition-colors flex items-center gap-2"
                                    >
                                        ✉️ Envoyer par email
                                    </a>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Grille d'informations */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Informations personnelles */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                                <UserIcon className="w-5 h-5 text-cab-blue" />
                                Informations personnelles
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <UserIcon className="w-4 h-4 text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-xs text-gray-500">Nom complet</p>
                                        <p className="font-medium text-gray-900">{candidature.nom_complet}</p>
                                    </div>
                                </div>

                                {/* ✅ Email - affiché uniquement si présent */}
                                {candidature.email && (
                                    <div className="flex items-start gap-3">
                                        <EnvelopeIcon className="w-4 h-4 text-gray-400 mt-0.5" />
                                        <div>
                                            <p className="text-xs text-gray-500">Email</p>
                                            <a href={`mailto:${candidature.email}`} className="text-cab-blue hover:underline">
                                                {candidature.email}
                                            </a>
                                        </div>
                                    </div>
                                )}

                                {/* ✅ Téléphone - toujours affiché */}
                                <div className="flex items-start gap-3">
                                    <PhoneIcon className="w-4 h-4 text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-xs text-gray-500">Téléphone</p>
                                        <a href={`tel:${candidature.telephone}`} className="text-cab-blue hover:underline">
                                            {candidature.telephone}
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <AcademicCapIcon className="w-4 h-4 text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-xs text-gray-500">Niveau scolaire</p>
                                        <p className="text-gray-700">{candidature.niveau_scolaire || 'Non renseigné'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Informations candidature */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                                <ClipboardDocumentListIcon className="w-5 h-5 text-cab-blue" />
                                Informations candidature
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <DocumentTextIcon className="w-4 h-4 text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-xs text-gray-500">Type</p>
                                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                            candidature.type === 'formation'
                                                ? 'bg-blue-100 text-blue-700'
                                                : 'bg-purple-100 text-purple-700'
                                        }`}>
                                            {candidature.type_label}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <AcademicCapIcon className="w-4 h-4 text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-xs text-gray-500">Formation / Certification</p>
                                        <p className="text-gray-700">
                                            {candidature.formation?.name || candidature.certification?.titre || '-'}
                                        </p>
                                        {candidature.certification && candidature.formation && (
                                            <p className="text-xs text-gray-400 mt-0.5">
                                                Certification liée à la formation {candidature.formation.name}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                {candidature.vague && (
                                    <div className="flex items-start gap-3">
                                        <CalendarIcon className="w-4 h-4 text-gray-400 mt-0.5" />
                                        <div>
                                            <p className="text-xs text-gray-500">Vague</p>
                                            <p className="text-gray-700 font-medium">{candidature.vague.name}</p>
                                        </div>
                                    </div>
                                )}
                                <div className="flex items-start gap-3">
                                    <ClockIcon className="w-4 h-4 text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-xs text-gray-500">Date de soumission</p>
                                        <p className="text-gray-700">{candidature.created_at}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Message */}
                    {candidature.message && (
                        <div className="mt-6 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                <ChatBubbleLeftIcon className="w-5 h-5 text-cab-blue" />
                                Message du candidat
                            </h3>
                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                <p className="text-gray-700 whitespace-pre-wrap text-sm leading-relaxed">
                                    {candidature.message}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Notes */}
                    {candidature.notes && (
                        <div className="mt-6 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                <DocumentTextIcon className="w-5 h-5 text-gray-400" />
                                📝 Notes internes
                            </h3>
                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                <p className="text-gray-700 whitespace-pre-wrap text-sm leading-relaxed">
                                    {candidature.notes}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Modal Attribution Vague */}
                {showVagueModal && (
                    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                        <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl animate-scale-up">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-purple-100 rounded-xl">
                                    <BuildingOfficeIcon className="w-6 h-6 text-purple-600" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">Attribuer une vague</h3>
                            </div>

                            <p className="text-sm text-gray-600 mb-4">
                                Sélectionnez une vague pour la formation <strong className="text-gray-900">{candidature.formation?.name}</strong>
                            </p>

                            {vagues && vagues.length > 0 ? (
                                <select
                                    value={selectedVague}
                                    onChange={(e) => setSelectedVague(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors bg-white mb-4 text-sm"
                                >
                                    <option value="">-- Sélectionnez une vague --</option>
                                    {vagues.map((vague) => (
                                        <option
                                            key={vague.id}
                                            value={vague.id}
                                            disabled={vague.is_full}
                                        >
                                            {vague.name} ({vague.date_debut}) - {vague.is_full ? '🔴 Complète' : `🟢 ${vague.places} places`}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200 mb-4 flex items-start gap-3">
                                    <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600 mt-0.5 shrink-0" />
                                    <div>
                                        <p className="text-sm text-yellow-700 font-medium">
                                            Aucune vague disponible
                                        </p>
                                        <p className="text-xs text-yellow-600 mt-0.5">
                                            Veuillez créer une nouvelle vague dans la gestion des vagues avant d'accepter cette candidature.
                                        </p>
                                    </div>
                                </div>
                            )}

                            <div className="flex gap-3 mt-2">
                                <button
                                    onClick={handleAttribuerVague}
                                    disabled={!selectedVague || (vagues && vagues.length === 0)}
                                    className="flex-1 px-4 py-3 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    <CheckCircleIcon className="w-4 h-4" />
                                    Attribuer
                                </button>
                                <button
                                    onClick={() => setShowVagueModal(false)}
                                    className="px-4 py-3 border-2 border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                                >
                                    Annuler
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Styles d'animation */}
                <style>{`
                    @keyframes fade-in {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                    @keyframes scale-up {
                        from { transform: scale(0.95); opacity: 0; }
                        to { transform: scale(1); opacity: 1; }
                    }
                    .animate-fade-in {
                        animation: fade-in 0.2s ease-out forwards;
                    }
                    .animate-scale-up {
                        animation: scale-up 0.2s ease-out forwards;
                    }
                `}</style>
            </AdminLayout>
        </>
    );
}
