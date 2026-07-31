// resources/js/pages/Admin/Students/Edit.tsx
import {
    ArrowLeftIcon,
    PencilSquareIcon,
    UserIcon,
    PhoneIcon,
    AcademicCapIcon,
    BuildingOfficeIcon,
    SparklesIcon,
    MapPinIcon,
    CalendarDaysIcon,
} from '@heroicons/react/24/outline';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import AdminLayout from '@/Components/Layouts/AdminLayout';

interface Formation { id: number; name: string; }
interface Vague { id: number; name: string; }
interface Certification { id: number; titre: string; }

interface Student {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    matricule: string;
    school_level: string | null;
    birth_date: string | null; // format Y-m-d
    address: string | null;
    city: string | null;
    student_type: string;
    is_active: boolean;
    vague_id: number | null;
    certification_id: number | null;
    formation_id: number | null; // ✅ nouveau, fourni par le backend pour pré-sélection
}

interface Props {
    student: Student;
    formations: Formation[];
    vagues: Vague[];
    certifications: Certification[];
}

export default function Edit({ student, formations, vagues, certifications }: Props) {
    // ✅ Pré-sélection correcte de la formation actuelle de l'étudiant
    const [selectedFormation, setSelectedFormation] = useState<string>(
        student.formation_id ? String(student.formation_id) : ''
    );
    const [availableVagues, setAvailableVagues] = useState<Vague[]>(vagues);
    const [availableCertifications, setAvailableCertifications] = useState<Certification[]>(certifications);
    const [loadingOptions, setLoadingOptions] = useState(false);

    const [type, setType] = useState<'vague' | 'certification' | 'none'>(
        student.vague_id ? 'vague' : student.certification_id ? 'certification' : 'none'
    );

    const { data, setData, put, processing, errors } = useForm({
        first_name: student.first_name,
        last_name: student.last_name,
        phone: student.phone,
        school_level: student.school_level || '',
        birth_date: student.birth_date || '',
        address: student.address || '',
        city: student.city || '',
        is_active: student.is_active,
        vague_id: student.vague_id?.toString() || '',
        certification_id: student.certification_id?.toString() || '',
    });

    // Recharge vagues/certifications quand la formation change (sauf au premier rendu, déjà fourni par le backend)
    const isFirstRender = useState(true);
    useEffect(() => {
        if (!selectedFormation) {
            setAvailableVagues([]);
            setAvailableCertifications([]);
            return;
        }

        setLoadingOptions(true);

        Promise.all([
            fetch(`/admin/students/vagues/${selectedFormation}`).then((res) => (res.ok ? res.json() : [])),
            fetch(`/admin/students/certifications/${selectedFormation}`).then((res) => (res.ok ? res.json() : [])),
        ])
            .then(([vaguesData, certificationsData]) => {
                setAvailableVagues(Array.isArray(vaguesData) ? vaguesData : []);
                setAvailableCertifications(Array.isArray(certificationsData) ? certificationsData : []);
            })
            .catch(() => {
                setAvailableVagues([]);
                setAvailableCertifications([]);
            })
            .finally(() => setLoadingOptions(false));
    }, [selectedFormation]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (data.vague_id && data.certification_id) {
            alert('Un étudiant ne peut pas être dans une vague ET une certification en même temps.');
            return;
        }

        put(`/admin/students/${student.id}`);
    };

    const handleTypeChange = (newType: 'vague' | 'certification' | 'none') => {
        setType(newType);
        setData('vague_id', '');
        setData('certification_id', '');
    };

    const handleFormationChange = (value: string) => {
        setSelectedFormation(value);
        setData('vague_id', '');
        setData('certification_id', '');
    };

    return (
        <>
            <Head title={`Modifier ${student.first_name} ${student.last_name}`} />

            <AdminLayout title="Modifier l'étudiant">
                <div className="max-w-3xl">
                    <Link
                        href="/admin/students"
                        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-cab-blue transition-colors mb-4"
                    >
                        <ArrowLeftIcon className="w-4 h-4" />
                        Retour à la liste
                    </Link>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-cab-blue/10 text-cab-blue flex items-center justify-center text-xl font-bold">
                                {student.first_name.charAt(0).toUpperCase()}{student.last_name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">{student.first_name} {student.last_name}</h2>
                                <p className="text-sm text-gray-500">Matricule: {student.matricule}</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
                                        Prénom <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <UserIcon className="w-5 h-5 text-gray-400" />
                                        </div>
                                        <input
                                            id="first_name"
                                            type="text"
                                            value={data.first_name}
                                            onChange={(e) => setData('first_name', e.target.value)}
                                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                            required
                                        />
                                    </div>
                                    {errors.first_name && <p className="mt-1 text-sm text-red-600">{errors.first_name}</p>}
                                </div>
                                <div>
                                    <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
                                        Nom <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <UserIcon className="w-5 h-5 text-gray-400" />
                                        </div>
                                        <input
                                            id="last_name"
                                            type="text"
                                            value={data.last_name}
                                            onChange={(e) => setData('last_name', e.target.value)}
                                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                            required
                                        />
                                    </div>
                                    {errors.last_name && <p className="mt-1 text-sm text-red-600">{errors.last_name}</p>}
                                </div>
                            </div>

                            {/* Téléphone */}
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                    Téléphone <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <PhoneIcon className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="phone"
                                        type="tel"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                        placeholder="+237 690 666 245"
                                        required
                                    />
                                </div>
                                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                            </div>

                            {/* ✅ Date de naissance */}
                            <div>
                                <label htmlFor="birth_date" className="block text-sm font-medium text-gray-700 mb-1">
                                    Date de naissance
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <CalendarDaysIcon className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="birth_date"
                                        type="date"
                                        value={data.birth_date}
                                        onChange={(e) => setData('birth_date', e.target.value)}
                                        max={new Date().toISOString().split('T')[0]}
                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                    />
                                </div>
                                {errors.birth_date && <p className="mt-1 text-sm text-red-600">{errors.birth_date}</p>}
                            </div>

                            {/* ✅ Adresse + Ville */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                                        Adresse
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <MapPinIcon className="w-5 h-5 text-gray-400" />
                                        </div>
                                        <input
                                            id="address"
                                            type="text"
                                            value={data.address}
                                            onChange={(e) => setData('address', e.target.value)}
                                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                            placeholder="Quartier, rue..."
                                        />
                                    </div>
                                    {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                                </div>
                                <div>
                                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                                        Ville
                                    </label>
                                    <input
                                        id="city"
                                        type="text"
                                        value={data.city}
                                        onChange={(e) => setData('city', e.target.value)}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                        placeholder="Douala, Yaoundé..."
                                    />
                                    {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                                </div>
                            </div>

                            {/* Niveau scolaire */}
                            <div>
                                <label htmlFor="school_level" className="block text-sm font-medium text-gray-700 mb-1">
                                    Niveau scolaire
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <AcademicCapIcon className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <select
                                        id="school_level"
                                        value={data.school_level}
                                        onChange={(e) => setData('school_level', e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors bg-white"
                                    >
                                        <option value="">-- Sélectionnez --</option>
                                        <option value="CEP">CEP</option>
                                        <option value="BEPC">BEPC</option>
                                        <option value="PROBATOIRE">Probatoire</option>
                                        <option value="BAC">Baccalauréat</option>
                                        <option value="BAC+2">BAC+2</option>
                                        <option value="LICENCE">Licence</option>
                                        <option value="MASTER">Master ou plus</option>
                                    </select>
                                </div>
                                {errors.school_level && <p className="mt-1 text-sm text-red-600">{errors.school_level}</p>}
                            </div>

                            {/* Type d'affectation */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Affectation</label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            checked={type === 'vague'}
                                            onChange={() => handleTypeChange('vague')}
                                            className="w-4 h-4 text-cab-blue focus:ring-cab-blue"
                                        />
                                        <span className="text-sm text-gray-700 flex items-center gap-1">
                                            <BuildingOfficeIcon className="w-4 h-4 text-blue-500" />
                                            Vague
                                        </span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            checked={type === 'certification'}
                                            onChange={() => handleTypeChange('certification')}
                                            className="w-4 h-4 text-cab-blue focus:ring-cab-blue"
                                        />
                                        <span className="text-sm text-gray-700 flex items-center gap-1">
                                            <SparklesIcon className="w-4 h-4 text-purple-500" />
                                            Certification
                                        </span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            checked={type === 'none'}
                                            onChange={() => handleTypeChange('none')}
                                            className="w-4 h-4 text-cab-blue focus:ring-cab-blue"
                                        />
                                        <span className="text-sm text-gray-700">Aucune</span>
                                    </label>
                                </div>
                            </div>

                            {/* Sélection de la formation */}
                            {(type === 'vague' || type === 'certification') && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Formation</label>
                                    <select
                                        value={selectedFormation}
                                        onChange={(e) => handleFormationChange(e.target.value)}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors bg-white"
                                    >
                                        <option value="">-- Sélectionnez une formation --</option>
                                        {formations.map((f) => (
                                            <option key={f.id} value={f.id}>{f.name}</option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            {/* Sélection de la vague */}
                            {type === 'vague' && selectedFormation && (
                                <div>
                                    <label htmlFor="vague_id" className="block text-sm font-medium text-gray-700 mb-1">
                                        Vague
                                    </label>
                                    <select
                                        id="vague_id"
                                        value={data.vague_id}
                                        onChange={(e) => setData('vague_id', e.target.value)}
                                        disabled={loadingOptions}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors bg-white disabled:bg-gray-50"
                                    >
                                        <option value="">-- Sélectionnez une vague --</option>
                                        {availableVagues.map((v) => (
                                            <option key={v.id} value={v.id}>{v.name}</option>
                                        ))}
                                    </select>
                                    {errors.vague_id && <p className="mt-1 text-sm text-red-600">{errors.vague_id}</p>}
                                </div>
                            )}

                            {/* Sélection de la certification */}
                            {type === 'certification' && selectedFormation && (
                                <div>
                                    <label htmlFor="certification_id" className="block text-sm font-medium text-gray-700 mb-1">
                                        Certification
                                    </label>
                                    <select
                                        id="certification_id"
                                        value={data.certification_id}
                                        onChange={(e) => setData('certification_id', e.target.value)}
                                        disabled={loadingOptions}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors bg-white disabled:bg-gray-50"
                                    >
                                        <option value="">-- Sélectionnez une certification --</option>
                                        {availableCertifications.map((c) => (
                                            <option key={c.id} value={c.id}>{c.titre}</option>
                                        ))}
                                    </select>
                                    {errors.certification_id && <p className="mt-1 text-sm text-red-600">{errors.certification_id}</p>}
                                </div>
                            )}

                            {/* Statut actif */}
                            <div className="flex items-center gap-2">
                                <input
                                    id="is_active"
                                    type="checkbox"
                                    checked={data.is_active}
                                    onChange={(e) => setData('is_active', e.target.checked)}
                                    className="w-4 h-4 text-cab-blue focus:ring-cab-blue border-gray-300 rounded"
                                />
                                <label htmlFor="is_active" className="text-sm text-gray-700">
                                    Compte actif
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Mise à jour en cours...
                                    </>
                                ) : (
                                    <>
                                        <PencilSquareIcon className="w-5 h-5" />
                                        Mettre à jour
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </AdminLayout>
        </>
    );
}
