// resources/js/pages/Admin/Users/Edit.tsx
import { ArrowLeftIcon, PencilSquareIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/Components/Layouts/AdminLayout';

interface UserData {
  id: number;
  name: string;
  email: string;
  role: string;
  is_active: boolean;
}

interface Props {
  user: UserData;
  roles: string[];
  canChangeRole: boolean;
}

const roleLabels: Record<string, string> = {
  super_admin: 'Super Administrateur',
  admin_centre: 'Admin Centre',
  admin: 'Administrateur',
  student_online: 'Étudiant En Ligne',
  student_certif: 'Étudiant Certification',
};

export default function Edit({ user, roles, canChangeRole }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  const { data, setData, put, processing, errors } = useForm({
    name: user.name,
    email: user.email,
    role: user.role,
    is_active: user.is_active,
    password: '',
    password_confirmation: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/admin/users/${user.id}`);
  };

  return (
    <>
      <Head title={`Modifier ${user.name} - Admin`} />

      <AdminLayout title="Modifier l'utilisateur">
        <div className="max-w-2xl">
          <Link
            href="/admin/users"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-cab-blue transition-colors mb-4"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Retour à la liste
          </Link>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nom d'utilisateur <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                  required
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                  required
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              {/* Changement de mot de passe optionnel */}
              <div className="border-t border-gray-100 pt-4">
                <label className="flex items-center gap-2 mb-3">
                  <input
                    type="checkbox"
                    checked={changePassword}
                    onChange={(e) => {
                      setChangePassword(e.target.checked);
                      if (!e.target.checked) {
                        setData('password', '');
                        setData('password_confirmation', '');
                      }
                    }}
                    className="w-4 h-4 text-cab-blue focus:ring-cab-blue border-gray-300 rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">Changer le mot de passe</span>
                </label>

                {changePassword && (
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Nouveau mot de passe
                      </label>
                      <div className="relative">
                        <input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          value={data.password}
                          onChange={(e) => setData('password', e.target.value)}
                          className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                          placeholder="••••••••"
                          minLength={8}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                        </button>
                      </div>
                      {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                    </div>

                    <div>
                      <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 mb-1">
                        Confirmer le nouveau mot de passe
                      </label>
                      <div className="relative">
                        <input
                          id="password_confirmation"
                          type={showPasswordConfirmation ? 'text' : 'password'}
                          value={data.password_confirmation}
                          onChange={(e) => setData('password_confirmation', e.target.value)}
                          className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors"
                          placeholder="••••••••"
                          minLength={8}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPasswordConfirmation ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Rôle */}
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                  Rôle <span className="text-red-500">*</span>
                </label>
                <select
                  id="role"
                  value={data.role}
                  onChange={(e) => setData('role', e.target.value)}
                  disabled={!canChangeRole}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cab-blue focus:border-cab-blue transition-colors bg-white disabled:bg-gray-50 disabled:text-gray-400"
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {roleLabels[role] || role}
                    </option>
                  ))}
                </select>
                {!canChangeRole && (
                  <p className="mt-1 text-xs text-gray-400">Vous n'avez pas les droits pour changer ce rôle.</p>
                )}
                {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role}</p>}
              </div>

              {/* Statut */}
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
