import { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Components/Layouts/AdminLayout';
import Pagination from '@/Components/UI/Pagination'; // ✅ IMPORT AJOUTÉ
import {
    MagnifyingGlassIcon,
    FunnelIcon,
    XMarkIcon,
    EyeIcon,
    PencilSquareIcon,
    TrashIcon,
    CheckCircleIcon,
    XCircleIcon,
    UserGroupIcon,
    AcademicCapIcon,
    UsersIcon,
    UserIcon,
} from '@heroicons/react/24/outline';

interface Student {
    id: number;
    first_name: string;
    last_name: string;
    full_name: string;
    email: string;
    phone: string;
    matricule: string;
    school_level: string | null;
    student_type: string;
    is_active: boolean;
    vague: {
        id: number;
        name: string;
        formation: string;
    } | null;
    certification: {
        id: number;
        titre: string;
        formation: string;
    } | null;
    created_at: string;
}

interface Formation {
    id: number;
    name: string;
}

interface Vague {
    id: number;
    name: string;
}

interface Certification {
    id: number;
    titre: string;
}

interface Stats {
    total: number;
    online: number;
    certification: number;
    inactifs: number;
}

interface Props {
    students: { // ✅ MODIFIÉ
        data: Student[];
        links: { url: string | null; label: string; active: boolean }[];
        from: number | null;
        to: number | null;
        total: number;
    };
    formations: Formation[];
    vagues: Vague[];
    certifications: Certification[];
    stats: Stats;
    filters: {
        formation_id: string | null;
        vague_id: string | null;
        certification_id: string | null;
        student_type: string | null;
        search: string | null;
    };
}

export default function Index({ students, formations, vagues, certifications, stats, filters }: Props) {
    const [showFilters, setShowFilters] = useState(false);
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [selectedFormation, setSelectedFormation] = useState(filters.formation_id || '');
    const [selectedVague, setSelectedVague] = useState(filters.vague_id || '');
    const [selectedCertification, setSelectedCertification] = useState(filters.certification_id || '');
    const [selectedType, setSelectedType] = useState(filters.student_type || '');

    const [availableVagues, setAvailableVagues] = useState<Vague[]>([]);
    const [availableCertifications, setAvailableCertifications] = useState<Certification[]>([]);

    useEffect(() => {
        if (selectedFormation) {
            fetch(`/admin/students/vagues/${selectedFormation}`)
                .then((res) => res.json())
                .then((data) => setAvailableVagues(data))
                .catch(() => setAvailableVagues([]));

            fetch(`/admin/students/certifications/${selectedFormation}`)
                .then((res) => res.json())
                .then((data) => setAvailableCertifications(data))
                .catch(() => setAvailableCertifications([]));
        } else {
            setAvailableVagues([]);
            setAvailableCertifications([]);
        }
    }, [selectedFormation]);

    const applyFilters = () => {
        const params = new URLSearchParams();
        if (searchTerm) params.set('search', searchTerm);
        if (selectedFormation) params.set('formation_id', selectedFormation);
        if (selectedVague) params.set('vague_id', selectedVague);
        if (selectedCertification) params.set('certification_id', selectedCertification);
        if (selectedType) params.set('student_type', selectedType);

        router.visit(`/admin/students${params.toString() ? '?' + params.toString() : ''}`);
    };

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedFormation('');
        setSelectedVague('');
        setSelectedCertification('');
        setSelectedType('');
        router.visit('/admin/students');
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        applyFilters();
    };

    const handleToggleActive = (student: Student) => {
        if (confirm(`Confirmer la ${student.is_active ? 'désactivation' : 'activation'} de ${student.full_name} ?`)) {
            router.post(`/admin/students/${student.id}/toggle-active`);
        }
    };

    const handleDelete = (student: Student) => {
        if (confirm(`Confirmer la suppression de ${student.full_name} ? Cette action est irréversible.`)) {
            router.delete(`/admin/students/${student.id}`);
        }
    };

    const getStatutBadge = (isActive: boolean) => {
        if (isActive) {
            return <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                <CheckCircleIcon className="w-3 h-3" />
                Actif
            </span>;
        }
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-medium">
            <XCircleIcon className="w-3 h-3" />
            Inactif
        </span>;
    };

    const getTypeBadge = (type: string) => {
        if (type === 'online') {
            return <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">En ligne</span>;
        }
        return <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">Certification</span>;
    };

    const statsCards = [
        { label: 'Total', value: stats.total, icon: <UserGroupIcon className="w-5 h-5" />, color: 'bg-cab-blue' },
        { label: 'En ligne', value: stats.online, icon: <UsersIcon className="w-5 h-5" />, color: 'bg-blue-500' },
        { label: 'Certification', value: stats.certification, icon: <AcademicCapIcon className="w-5 h-5" />, color: 'bg-purple-500' },
        { label: 'Inactifs', value: stats.inactifs, icon: <UserIcon className="w-5 h-5" />, color: 'bg-red-500' },
    ];

    return (
        <>
            <Head title="Gestion des étudiants - Admin" />

            <AdminLayout title="Gestion des étudiants">
                {/* Statistiques */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {statsCards.map((stat) => (
                        <div key={stat.label} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-gray-500">{stat.label}</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-0.5">{stat.value}</p>
                                </div>
                                <div className={`${stat.color} w-10 h-10 rounded-xl flex items-center justify-center text-white`}>
                                    {stat.icon}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Barre de recherche et filtres */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6">
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
                                    placeholder="Rechercher un étudiant..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors text-sm"
                                />
                            </div>
                        </form>

                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="px-4 py-2 border border-gray-300 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-2"
                        >
                            <FunnelIcon className="w-4 h-4" />
                            Filtres
                            {(filters.formation_id || filters.vague_id || filters.certification_id || filters.student_type || filters.search) && (
                                <span className="w-2 h-2 bg-cab-blue rounded-full" />
                            )}
                        </button>

                        {(filters.formation_id || filters.vague_id || filters.certification_id || filters.student_type || filters.search) && (
                            <button
                                onClick={clearFilters}
                                className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors flex items-center gap-1"
                            >
                                <XMarkIcon className="w-4 h-4" />
                                Effacer les filtres
                            </button>
                        )}
                    </div>

                    {showFilters && (
                        <>
                            <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Formation</label>
                                    <select
                                        value={selectedFormation}
                                        onChange={(e) => {
                                            setSelectedFormation(e.target.value);
                                            setSelectedVague('');
                                            setSelectedCertification('');
                                        }}
                                        className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors bg-white"
                                    >
                                        <option value="">Toutes</option>
                                        {formations.map((f) => (
                                            <option key={f.id} value={f.id}>{f.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Vague</label>
                                    <select
                                        value={selectedVague}
                                        onChange={(e) => setSelectedVague(e.target.value)}
                                        className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors bg-white"
                                    >
                                        <option value="">Toutes</option>
                                        {availableVagues.map((v) => (
                                            <option key={v.id} value={v.id}>{v.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Certification</label>
                                    <select
                                        value={selectedCertification}
                                        onChange={(e) => setSelectedCertification(e.target.value)}
                                        className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors bg-white"
                                    >
                                        <option value="">Toutes</option>
                                        {availableCertifications.map((c) => (
                                            <option key={c.id} value={c.id}>{c.titre}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Type</label>
                                    <select
                                        value={selectedType}
                                        onChange={(e) => setSelectedType(e.target.value)}
                                        className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors bg-white"
                                    >
                                        <option value="">Tous</option>
                                        <option value="online">En ligne</option>
                                        <option value="certification">Certification</option>
                                    </select>
                                </div>
                            </div>

                            {/* ✅ Bouton d'application manquant, ajouté ici */}
                            <div className="mt-3 flex justify-end">
                                <button
                                    onClick={applyFilters}
                                    className="px-4 py-2 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors"
                                >
                                    Appliquer le filtre
                                </button>
                            </div>
                        </>
                    )}
                </div>

                {/* Liste des étudiants */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {students.data.length === 0 ? (
                        <div className="text-center py-12">
                            <UserGroupIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500 text-sm">Aucun étudiant trouvé</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Étudiant
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Matricule
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Formation / Vague
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Type
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Statut
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Inscrit le
                                        </th>
                                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {students.data.map((student) => (
                                        <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 rounded-full bg-cab-blue/10 text-cab-blue flex items-center justify-center text-sm font-bold">
                                                        {student.first_name.charAt(0).toUpperCase()}{student.last_name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-900">{student.full_name}</p>
                                                        <p className="text-xs text-gray-400">{student.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded-md">
                                                    {student.matricule}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                {student.vague ? (
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">{student.vague.formation}</p>
                                                        <p className="text-xs text-gray-500">Vague: {student.vague.name}</p>
                                                    </div>
                                                ) : student.certification ? (
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">{student.certification.formation}</p>
                                                        <p className="text-xs text-gray-500">Certification: {student.certification.titre}</p>
                                                    </div>
                                                ) : (
                                                    <span className="text-xs text-gray-400">Non affecté</span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3">
                                                {getTypeBadge(student.student_type)}
                                            </td>
                                            <td className="px-4 py-3">
                                                {getStatutBadge(student.is_active)}
                                            </td>
                                            <td className="px-4 py-3 text-gray-500 text-xs">
                                                {student.created_at}
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => handleToggleActive(student)}
                                                        className={`p-1.5 rounded-lg transition-colors ${
                                                            student.is_active
                                                                ? 'text-yellow-600 hover:bg-yellow-50'
                                                                : 'text-green-600 hover:bg-green-50'
                                                        }`}
                                                        title={student.is_active ? 'Désactiver' : 'Activer'}
                                                    >
                                                        {student.is_active ? (
                                                            <XCircleIcon className="w-5 h-5" />
                                                        ) : (
                                                            <CheckCircleIcon className="w-5 h-5" />
                                                        )}
                                                    </button>

                                                    <Link
                                                        href={`/admin/students/${student.id}`}
                                                        className="p-1.5 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                                                        title="Voir"
                                                    >
                                                        <EyeIcon className="w-5 h-5" />
                                                    </Link>

                                                    <Link
                                                        href={`/admin/students/${student.id}/edit`}
                                                        className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                                                        title="Modifier"
                                                    >
                                                        <PencilSquareIcon className="w-5 h-5" />
                                                    </Link>

                                                    <button
                                                        onClick={() => handleDelete(student)}
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

                {/* ✅ PAGINATION AJOUTÉE */}
                <Pagination
                    links={students.links}
                    from={students.from}
                    to={students.to}
                    total={students.total}
                />
            </AdminLayout>
        </>
    );
}
