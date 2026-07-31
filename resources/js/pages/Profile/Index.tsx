// resources/js/pages/Profile/Index.tsx
import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import {
    UserIcon,
    EnvelopeIcon,
    PhoneIcon,
    AcademicCapIcon,
    CalendarIcon,
    MapPinIcon,
    KeyIcon,
    EyeIcon,
    EyeSlashIcon,
} from '@heroicons/react/24/outline';
import { usePage } from '@inertiajs/react';

// ✅ Layout selon le rôle
import AdminLayout from '@/Components/Layouts/AdminLayout';
import StudentLayout from '@/Components/Layouts/StudentLayout';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    role_label: string;
    is_active: boolean;
    created_at: string;
}

interface Student {
    id: number;
    first_name: string;
    last_name: string;
    full_name: string;
    phone: string;
    matricule: string;
    school_level: string | null;
    birth_date: string | null;
    address: string | null;
    city: string | null;
    student_type: string;
    vague: string | null;
    certification: string | null;
}

interface Props {
    user: User;
    student?: Student;
}

export default function Profile({ user, student }: Props) {
    const { props } = usePage();
    const authUser = props.auth?.user;

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);

    const isStudent = !!student;
    const isAdmin = authUser?.role === 'super_admin' || authUser?.role === 'admin_centre' || authUser?.role === 'admin';

    // ✅ Layout selon le rôle
    const Layout = isAdmin ? AdminLayout : StudentLayout;
    const layoutTitle = isAdmin ? 'Mon profil' : 'Mon profil';

    // ✅ Champs selon le type d'utilisateur
    const initialData = isStudent
        ? {
            first_name: student?.first_name || '',
            last_name: student?.last_name || '',
            phone: student?.phone || '',
            school_level: student?.school_level || '',
            birth_date: student?.birth_date || '',
            address: student?.address || '',
            city: student?.city || '',
            current_password: '',
            new_password: '',
            new_password_confirmation: '',
        }
        : {
            name: user.name || '',
            email: user.email || '',
            current_password: '',
            new_password: '',
            new_password_confirmation: '',
        };

    const { data, setData, post, processing, errors } = useForm(initialData);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/profil', {
            preserveScroll: true,
            onSuccess: () => {
                setData('current_password', '');
                setData('new_password', '');
                setData('new_password_confirmation', '');
                setIsChangingPassword(false);
            },
        });
    };

    const ProfileContent = () => (
        <div className="max-w-3xl mx-auto">
             

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* En-tête */}
                <div className="bg-gradient-to-r from-cab-blue to-cab-blue/80 px-6 py-8 text-white">
                    <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold">
                            {isStudent
                                ? (student?.first_name?.charAt(0) || '') + (student?.last_name?.charAt(0) || '')
                                : user.name?.charAt(0)?.toUpperCase() || 'A'
                            }
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">
                                {isStudent ? student?.full_name : user.name}
                            </h2>
                            <p className="text-white/80 text-sm">{user.role_label}</p>
                            {isStudent && student?.matricule && (
                                <p className="text-white/60 text-sm mt-1">
                                    🎓 Matricule: <span className="font-mono font-semibold">{student.matricule}</span>
                                </p>
                            )}
                            {isStudent && (
                                <p className="text-white/60 text-sm">
                                    {student?.vague ? `Vague: ${student.vague}` : ''}
                                    {student?.certification ? `Certification: ${student.certification}` : ''}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* ============================================ */}
                    {/* ADMIN */}
                    {/* ============================================ */}
                    {!isStudent && (
                        <>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Nom d'utilisateur <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <UserIcon className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                        required
                                    />
                                </div>
                                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <EnvelopeIcon className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                        required
                                    />
                                </div>
                                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                            </div>
                        </>
                    )}

                    {/* ============================================ */}
                    {/* ÉTUDIANT */}
                    {/* ============================================ */}
                    {isStudent && (
                        <>
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
                                        required
                                    />
                                </div>
                                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                            </div>

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

                            <div>
                                <label htmlFor="birth_date" className="block text-sm font-medium text-gray-700 mb-1">
                                    Date de naissance
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <CalendarIcon className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="birth_date"
                                        type="date"
                                        value={data.birth_date}
                                        onChange={(e) => setData('birth_date', e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                    />
                                </div>
                                {errors.birth_date && <p className="mt-1 text-sm text-red-600">{errors.birth_date}</p>}
                            </div>

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
                                        placeholder="Votre adresse"
                                    />
                                </div>
                                {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                            </div>

                            <div>
                                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                                    Ville
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <MapPinIcon className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="city"
                                        type="text"
                                        value={data.city}
                                        onChange={(e) => setData('city', e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                        placeholder="Votre ville"
                                    />
                                </div>
                                {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                            </div>
                        </>
                    )}

                    {/* ============================================ */}
                    {/* CHANGEMENT DE MOT DE PASSE (TOUS) */}
                    {/* ============================================ */}
                    <div className="border-t border-gray-200 pt-6">
                        <button
                            type="button"
                            onClick={() => setIsChangingPassword(!isChangingPassword)}
                            className="flex items-center gap-2 text-sm font-medium text-cab-blue hover:text-cab-dark transition-colors"
                        >
                            <KeyIcon className="w-5 h-5" />
                            {isChangingPassword ? 'Annuler le changement de mot de passe' : 'Changer mon mot de passe'}
                        </button>

                        {isChangingPassword && (
                            <div className="mt-4 space-y-4">
                                <div>
                                    <label htmlFor="current_password" className="block text-sm font-medium text-gray-700 mb-1">
                                        Mot de passe actuel <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="current_password"
                                            type={showCurrentPassword ? 'text' : 'password'}
                                            value={data.current_password}
                                            onChange={(e) => setData('current_password', e.target.value)}
                                            className="w-full px-4 pr-12 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                            placeholder="Votre mot de passe actuel"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                        >
                                            {showCurrentPassword ? (
                                                <EyeSlashIcon className="w-5 h-5" />
                                            ) : (
                                                <EyeIcon className="w-5 h-5" />
                                            )}
                                        </button>
                                    </div>
                                    {errors.current_password && <p className="mt-1 text-sm text-red-600">{errors.current_password}</p>}
                                </div>

                                <div>
                                    <label htmlFor="new_password" className="block text-sm font-medium text-gray-700 mb-1">
                                        Nouveau mot de passe <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="new_password"
                                            type={showNewPassword ? 'text' : 'password'}
                                            value={data.new_password}
                                            onChange={(e) => setData('new_password', e.target.value)}
                                            className="w-full px-4 pr-12 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                            placeholder="Nouveau mot de passe (min 8 caractères)"
                                            minLength={8}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                        >
                                            {showNewPassword ? (
                                                <EyeSlashIcon className="w-5 h-5" />
                                            ) : (
                                                <EyeIcon className="w-5 h-5" />
                                            )}
                                        </button>
                                    </div>
                                    {errors.new_password && <p className="mt-1 text-sm text-red-600">{errors.new_password}</p>}
                                </div>

                                <div>
                                    <label htmlFor="new_password_confirmation" className="block text-sm font-medium text-gray-700 mb-1">
                                        Confirmer <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="new_password_confirmation"
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            value={data.new_password_confirmation}
                                            onChange={(e) => setData('new_password_confirmation', e.target.value)}
                                            className="w-full px-4 pr-12 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                                            placeholder="Confirmer le nouveau mot de passe"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                        >
                                            {showConfirmPassword ? (
                                                <EyeSlashIcon className="w-5 h-5" />
                                            ) : (
                                                <EyeIcon className="w-5 h-5" />
                                            )}
                                        </button>
                                    </div>
                                    {errors.new_password_confirmation && <p className="mt-1 text-sm text-red-600">{errors.new_password_confirmation}</p>}
                                </div>
                            </div>
                        )}
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
                                Enregistrement...
                            </>
                        ) : (
                            'Enregistrer les modifications'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );

    return (
        <>
            <Head title="Mon profil - CAB Informatique" />

            <Layout title={layoutTitle}>
                <ProfileContent />
            </Layout>
        </>
    );
}
