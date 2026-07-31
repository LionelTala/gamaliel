// resources/js/pages/Admin/Paiements/Index.tsx
import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Components/Layouts/AdminLayout';
import Pagination from '@/Components/UI/Pagination';
import ToastContainer from '@/Components/UI/ToastContainer';
import {
    CreditCardIcon,
    CheckCircleIcon,
    XCircleIcon,
    ClockIcon,
    MagnifyingGlassIcon,
    UserIcon,
    BanknotesIcon,
    ArrowPathIcon,
    PlusIcon,
} from '@heroicons/react/24/outline';

interface TrancheStatus {
    tranche_id: number;
    numero: number;
    montant: number;
    est_payee: boolean;
    paye_le: string | null;
    confirme_par_nom?: string | null;
    note?: string | null;
}

interface StudentRow {
    id: number;
    nom_complet: string;
    matricule: string;
    tranches: TrancheStatus[];
}

interface Formation {
    id: number;
    name: string;
    abbreviation?: string;
}

interface Props {
    formations: Formation[];
    students: {
        data: StudentRow[];
        links: { url: string | null; label: string; active: boolean }[];
        from: number | null;
        to: number | null;
        total: number;
    };
    selectedFormationId: string | null;
}

export default function Index({ formations, students, selectedFormationId }: Props) {
    const [loadingKey, setLoadingKey] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'paid'>('all');

    const handleFormationChange = (formationId: string) => {
        router.get('/admin/paiements', formationId ? { formation_id: formationId } : {}, {
            preserveState: false,
        });
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/paiements', {
            formation_id: selectedFormationId || '',
            search: searchTerm,
        }, {
            preserveState: true,
        });
    };

    const confirmer = (studentId: number, trancheId: number, numero: number, studentName: string) => {
        const note = prompt(`Confirmer le paiement de la tranche ${numero} pour ${studentName} ?\n\nAjouter une note (optionnelle) :`);
        if (note === null) return;

        const key = `${studentId}-${trancheId}`;
        setLoadingKey(key);

        router.post(`/admin/paiements/${studentId}/${trancheId}/confirmer`, { note }, {
            preserveScroll: true,
            onSuccess: () => {
                setLoadingKey(null);
                router.reload();
            },
            onError: () => {
                setLoadingKey(null);
            },
            onFinish: () => {
                setLoadingKey(null);
            },
        });
    };

    const annuler = (studentId: number, trancheId: number, numero: number, studentName: string) => {
        if (!confirm(`Annuler la confirmation de la tranche ${numero} pour ${studentName} ?`)) return;

        const key = `${studentId}-${trancheId}`;
        setLoadingKey(key);

        router.delete(`/admin/paiements/${studentId}/${trancheId}/annuler`, {
            preserveScroll: true,
            onSuccess: () => {
                setLoadingKey(null);
                router.reload();
            },
            onError: () => {
                setLoadingKey(null);
            },
            onFinish: () => {
                setLoadingKey(null);
            },
        });
    };

    // ✅ Vérification de sécurité
    const studentsData = students?.data ?? [];
    const studentsLinks = students?.links ?? [];
    const studentsFrom = students?.from ?? null;
    const studentsTo = students?.to ?? null;
    const studentsTotal = students?.total ?? 0;

    // ✅ Statistiques avec formatage correct
    const totalStudents = studentsData.length;
    let totalPaid = 0;
    let totalPending = 0;
    let totalAmountPaid = 0;

    studentsData.forEach((student) => {
        if (student?.tranches && Array.isArray(student.tranches)) {
            student.tranches.forEach((t) => {
                if (t?.est_payee) {
                    totalPaid++;
                    totalAmountPaid += Number(t?.montant) || 0;
                } else {
                    totalPending++;
                }
            });
        }
    });

    // ✅ Formater correctement le montant
    const formatMontant = (montant: number): string => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'XAF',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(montant).replace('FCFA', '').trim() + ' FCFA';
    };

    // Récupérer tous les numéros de tranches
    const allTrancheNumeros = studentsData.length > 0 && studentsData[0]?.tranches
        ? studentsData[0].tranches.map((t) => t?.numero ?? 0)
        : [];

    // Filtrer les étudiants
    const filteredStudents = studentsData.filter((student) => {
        if (!student) return false;

        const matchSearch = (student.nom_complet?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                           (student.matricule?.toLowerCase() || '').includes(searchTerm.toLowerCase());

        if (filterStatus === 'all') return matchSearch;
        if (filterStatus === 'pending') {
            return matchSearch && student.tranches?.some((t) => !t?.est_payee);
        }
        if (filterStatus === 'paid') {
            return matchSearch && student.tranches?.every((t) => t?.est_payee);
        }
        return matchSearch;
    });

    return (
        <>
            <Head title="Paiements des tranches - Admin" />

            <AdminLayout title="Paiements des tranches">
                <ToastContainer />

                {/* Sélection de formation + Bouton Nouvelle demande */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Formation <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={selectedFormationId || ''}
                                onChange={(e) => handleFormationChange(e.target.value)}
                                className="w-full sm:w-96 px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors bg-white"
                            >
                                <option value="">-- Choisir une formation --</option>
                                {formations.map((f) => (
                                    <option key={f.id} value={f.id}>
                                        {f.name} {f.abbreviation ? `(${f.abbreviation})` : ''}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {selectedFormationId && (
                            <>
                                <div className="flex items-center gap-3 text-sm text-gray-500">
                                    <span className="flex items-center gap-1">
                                        <UserIcon className="w-4 h-4" />
                                        {totalStudents} étudiant{totalStudents > 1 ? 's' : ''}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <BanknotesIcon className="w-4 h-4" />
                                        {/* ✅ Formatage correct du montant */}
                                        <span className="font-medium text-gray-700">
                                            {formatMontant(totalAmountPaid)}
                                        </span>
                                    </span>
                                </div>
                                <Link
                                    href={`/admin/paiements/create?formation_id=${selectedFormationId}`}
                                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors whitespace-nowrap"
                                >
                                    <PlusIcon className="w-5 h-5" />
                                    Nouvelle demande
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                {!selectedFormationId ? (
                    <div className="bg-white rounded-2xl p-16 text-center shadow-sm border border-gray-100">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CreditCardIcon className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Sélectionnez une formation</h3>
                        <p className="text-sm text-gray-500">
                            Choisissez une formation pour gérer les paiements de ses étudiants
                        </p>
                    </div>
                ) : studentsData.length === 0 ? (
                    <div className="bg-white rounded-2xl p-16 text-center shadow-sm border border-gray-100">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <UserIcon className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Aucun étudiant</h3>
                        <p className="text-sm text-gray-500">
                            Aucun étudiant trouvé pour cette formation, ou aucune tranche définie
                        </p>
                        <Link
                            href={`/admin/paiements/create?formation_id=${selectedFormationId}`}
                            className="mt-4 text-cab-blue hover:text-cab-dark text-sm font-medium inline-block"
                        >
                            Créer une demande de paiement →
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* Statistiques */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium">Total étudiants</p>
                                        <p className="text-2xl font-bold text-gray-900 mt-0.5">{totalStudents}</p>
                                    </div>
                                    <div className="bg-blue-50 w-10 h-10 rounded-xl flex items-center justify-center">
                                        <UserIcon className="w-5 h-5 text-cab-blue" />
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium">Tranches payées</p>
                                        <p className="text-2xl font-bold text-green-600 mt-0.5">{totalPaid}</p>
                                    </div>
                                    <div className="bg-green-50 w-10 h-10 rounded-xl flex items-center justify-center">
                                        <CheckCircleIcon className="w-5 h-5 text-green-600" />
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium">En attente</p>
                                        <p className="text-2xl font-bold text-yellow-600 mt-0.5">{totalPending}</p>
                                    </div>
                                    <div className="bg-yellow-50 w-10 h-10 rounded-xl flex items-center justify-center">
                                        <ClockIcon className="w-5 h-5 text-yellow-600" />
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium">Montant total payé</p>
                                        <p className="text-2xl font-bold text-cab-blue mt-0.5">
                                            {formatMontant(totalAmountPaid)}
                                        </p>
                                    </div>
                                    <div className="bg-purple-50 w-10 h-10 rounded-xl flex items-center justify-center">
                                        <BanknotesIcon className="w-5 h-5 text-purple-600" />
                                    </div>
                                </div>
                            </div>
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

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setFilterStatus('all')}
                                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                                            filterStatus === 'all'
                                                ? 'bg-cab-blue text-white'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                    >
                                        Tous
                                    </button>
                                    <button
                                        onClick={() => setFilterStatus('pending')}
                                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                                            filterStatus === 'pending'
                                                ? 'bg-yellow-500 text-white'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                    >
                                        <ClockIcon className="w-4 h-4 inline mr-1" />
                                        En attente
                                    </button>
                                    <button
                                        onClick={() => setFilterStatus('paid')}
                                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                                            filterStatus === 'paid'
                                                ? 'bg-green-600 text-white'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                    >
                                        <CheckCircleIcon className="w-4 h-4 inline mr-1" />
                                        Payés
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Tableau */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-gray-50 border-b border-gray-100">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50">
                                                Étudiant
                                            </th>
                                            {allTrancheNumeros.map((numero) => (
                                                <th key={numero} className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">
                                                    Tranche {numero}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {filteredStudents.length === 0 ? (
                                            <tr>
                                                <td colSpan={allTrancheNumeros.length + 1} className="px-4 py-12 text-center text-gray-500">
                                                    Aucun étudiant trouvé
                                                </td>
                                            </tr>
                                        ) : (
                                            filteredStudents.map((student) => (
                                                <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-4 py-3 sticky left-0 bg-white hover:bg-gray-50 transition-colors">
                                                        <p className="font-medium text-gray-900">{student.nom_complet}</p>
                                                        <p className="text-xs text-gray-400 font-mono">{student.matricule}</p>
                                                    </td>
                                                    {student.tranches.map((t) => {
                                                        const key = `${student.id}-${t.tranche_id}`;
                                                        const isLoading = loadingKey === key;

                                                        return (
                                                            <td key={t.tranche_id} className="px-2 py-3 text-center">
                                                                {t.est_payee ? (
                                                                    <div className="flex flex-col items-center gap-1">
                                                                        <button
                                                                            onClick={() => annuler(student.id, t.tranche_id, t.numero, student.nom_complet)}
                                                                            disabled={isLoading}
                                                                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-medium hover:bg-green-200 transition-colors disabled:opacity-50 w-full justify-center"
                                                                            title={t.paye_le ? `Payé le ${t.paye_le}` : 'Payé'}
                                                                        >
                                                                            <CheckCircleIcon className="w-3.5 h-3.5" />
                                                                            {isLoading ? 'Annulation...' : 'Payée'}
                                                                        </button>
                                                                        {t.paye_le && (
                                                                            <span className="text-[10px] text-gray-400">
                                                                                {t.paye_le}
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                ) : (
                                                                    <button
                                                                        onClick={() => confirmer(student.id, t.tranche_id, t.numero, student.nom_complet)}
                                                                        disabled={isLoading}
                                                                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-500 rounded-full text-xs font-medium hover:bg-yellow-100 hover:text-yellow-700 transition-colors disabled:opacity-50 w-full justify-center"
                                                                    >
                                                                        {isLoading ? (
                                                                            <ArrowPathIcon className="w-3.5 h-3.5 animate-spin" />
                                                                        ) : (
                                                                            <XCircleIcon className="w-3.5 h-3.5" />
                                                                        )}
                                                                        {isLoading ? 'Chargement...' : 'Confirmer'}
                                                                    </button>
                                                                )}
                                                            </td>
                                                        );
                                                    })}
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Légende */}
                        <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                                <CheckCircleIcon className="w-4 h-4 text-green-600" />
                                Payée (cliquer pour annuler)
                            </span>
                            <span className="flex items-center gap-1">
                                <XCircleIcon className="w-4 h-4 text-gray-400" />
                                Non payée (cliquer pour confirmer)
                            </span>
                            <span className="flex items-center gap-1">
                                <ArrowPathIcon className="w-4 h-4 text-blue-500 animate-spin" />
                                Chargement...
                            </span>
                        </div>

                        {/* Pagination */}
                        <div className="mt-4">
                            <Pagination
                                links={studentsLinks}
                                from={studentsFrom}
                                to={studentsTo}
                                total={studentsTotal}
                            />
                        </div>
                    </>
                )}
            </AdminLayout>
        </>
    );
}
