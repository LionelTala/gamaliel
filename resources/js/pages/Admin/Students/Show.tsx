// resources/js/pages/Admin/Students/Show.tsx
import {
    ArrowLeftIcon,
    UserIcon,
    AcademicCapIcon,
    IdentificationIcon,
    MapPinIcon,
    CalendarDaysIcon,
    CheckCircleIcon,
    XCircleIcon,
    PencilSquareIcon,
    BuildingOfficeIcon,
    SparklesIcon,
} from '@heroicons/react/24/outline';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Components/Layouts/AdminLayout';

interface Student {
    id: number;
    first_name: string;
    last_name: string;
    full_name: string;
    email: string;
    phone: string;
    matricule: string;
    school_level: string | null;
    birth_date: string | null;
    address: string | null;
    city: string | null;
    student_type: string;
    is_active: boolean;
    created_at: string;
    vague: { id: number; name: string; formation: { id: number; name: string } } | null;
    certification: { id: number; titre: string; formation: { id: number; name: string } } | null;
    user: { id: number; name: string; email: string } | null;
}

interface Props {
    student: Student;
}

export default function Show({ student }: Props) {
    const handleToggleActive = () => {
        if (confirm(`Confirmer la ${student.is_active ? 'désactivation' : 'activation'} de ${student.full_name} ?`)) {
            router.post(`/admin/students/${student.id}/toggle-active`);
        }
    };

    const getStatutBadge = (isActive: boolean) =>
        isActive ? (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                <CheckCircleIcon className="w-4 h-4" />
                Actif
            </span>
        ) : (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                <XCircleIcon className="w-4 h-4" />
                Inactif
            </span>
        );

    const getTypeBadge = (type: string) =>
        type === 'online' ? (
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">En ligne</span>
        ) : (
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">Certification</span>
        );

    const getAffectation = () => {
        if (student.vague) {
            return {
                type: 'Vague',
                name: student.vague.name,
                formation: student.vague.formation.name,
                icon: <BuildingOfficeIcon className="w-5 h-5 text-blue-500" />,
            };
        }
        if (student.certification) {
            return {
                type: 'Certification',
                name: student.certification.titre,
                formation: student.certification.formation.name,
                icon: <SparklesIcon className="w-5 h-5 text-purple-500" />,
            };
        }
        return null;
    };

    const affectation = getAffectation();

    return (
        <>
            <Head title={`${student.full_name} - Détails de l'étudiant`} />

            <AdminLayout title="Détails de l'étudiant">
                <div className="max-w-4xl">
                    <Link
                        href="/admin/students"
                        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-cab-blue transition-colors mb-4"
                    >
                        <ArrowLeftIcon className="w-4 h-4" />
                        Retour à la liste
                    </Link>

                    {/* En-tête */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                        <div className="flex items-start justify-between flex-wrap gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cab-blue to-cab-dark flex items-center justify-center text-white text-3xl font-bold">
                                    {student.first_name.charAt(0).toUpperCase()}{student.last_name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">{student.full_name}</h1>
                                    <div className="flex flex-wrap items-center gap-2 mt-1">
                                        <span className="text-sm text-gray-500">
                                            Matricule: <span className="font-mono font-semibold">{student.matricule}</span>
                                        </span>
                                        <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                        <span className="text-sm text-gray-500">{student.created_at}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {getStatutBadge(student.is_active)}
                                        {getTypeBadge(student.student_type)}
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={handleToggleActive}
                                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 ${
                                        student.is_active
                                            ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                                    }`}
                                >
                                    {student.is_active ? <XCircleIcon className="w-4 h-4" /> : <CheckCircleIcon className="w-4 h-4" />}
                                    {student.is_active ? 'Désactiver' : 'Activer'}
                                </button>
                                <Link
                                    href={`/admin/students/${student.id}/edit`}
                                    className="px-4 py-2 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors flex items-center gap-2"
                                >
                                    <PencilSquareIcon className="w-4 h-4" />
                                    Modifier
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Grille d'informations */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Informations personnelles */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h2 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                                <UserIcon className="w-5 h-5 text-cab-blue" />
                                Informations personnelles
                            </h2>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-xs text-gray-500">Nom complet</p>
                                    <p className="font-medium text-gray-900">{student.full_name}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Email</p>
                                    <a href={`mailto:${student.email}`} className="text-cab-blue hover:underline">
                                        {student.email}
                                    </a>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Téléphone</p>
                                    <a href={`tel:${student.phone}`} className="text-cab-blue hover:underline">
                                        {student.phone}
                                    </a>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 flex items-center gap-1">
                                        <CalendarDaysIcon className="w-3.5 h-3.5" />
                                        Date de naissance
                                    </p>
                                    <p className="text-gray-700">{student.birth_date || 'Non renseignée'}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 flex items-center gap-1">
                                        <MapPinIcon className="w-3.5 h-3.5" />
                                        Adresse
                                    </p>
                                    <p className="text-gray-700">{student.address || 'Non renseignée'}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Ville</p>
                                    <p className="text-gray-700">{student.city || 'Non renseignée'}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Niveau scolaire</p>
                                    <p className="text-gray-700">{student.school_level || 'Non renseigné'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Informations académiques */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h2 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                                <AcademicCapIcon className="w-5 h-5 text-cab-blue" />
                                Informations académiques
                            </h2>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-xs text-gray-500">Matricule</p>
                                    <p className="font-mono font-bold text-gray-900">{student.matricule}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Type</p>
                                    {getTypeBadge(student.student_type)}
                                </div>
                                {affectation && (
                                    <>
                                        <div className="pt-3 border-t border-gray-100">
                                            <p className="text-xs text-gray-500">{affectation.type}</p>
                                            <p className="font-medium text-gray-900">{affectation.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Formation associée</p>
                                            <p className="text-gray-700">{affectation.formation}</p>
                                        </div>
                                    </>
                                )}
                                {!affectation && (
                                    <div className="pt-3 border-t border-gray-100">
                                        <p className="text-sm text-gray-500">Non affecté à une vague ou certification</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Informations de connexion */}
                    {student.user && (
                        <div className="mt-6 bg-blue-50 rounded-2xl p-6 border border-blue-100">
                            <h2 className="text-sm font-semibold text-blue-800 mb-3 flex items-center gap-2">
                                <IdentificationIcon className="w-5 h-5 text-blue-600" />
                                Informations de connexion
                            </h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs text-blue-600">Nom d'utilisateur</p>
                                    <p className="font-mono font-bold text-blue-900">{student.user.name}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-blue-600">Email</p>
                                    <p className="text-blue-900">{student.user.email}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </AdminLayout>
        </>
    );
}
