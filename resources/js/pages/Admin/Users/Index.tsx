// resources/js/pages/Admin/Users/Index.tsx
import {
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon,
  UserIcon,
  ShieldCheckIcon,
  SparklesIcon,
  BuildingOfficeIcon,
} from '@heroicons/react/24/outline';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Components/Layouts/AdminLayout';
import Pagination from '@/Components/UI/Pagination';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  is_active: boolean;
  last_login_at: string | null;
  student: { first_name: string; last_name: string; matricule: string } | null;
  can_edit: boolean;
  can_toggle: boolean;
  can_delete: boolean;
}

interface Props {
  users: {
    data: User[];
    links: { url: string | null; label: string; active: boolean }[];
    from: number | null;
    to: number | null;
    total: number;
  };
  canCreate: boolean;
  canCreateAdminCentre: boolean;
}

export default function Index({ users, canCreate }: Props) {
  const getRoleBadge = (role: string) => {
    const configs: Record<string, { icon: React.ReactNode; color: string; label: string }> = {
      super_admin: { icon: <SparklesIcon className="w-4 h-4" />, color: 'bg-purple-100 text-purple-700', label: 'Super Admin' },
      admin_centre: { icon: <BuildingOfficeIcon className="w-4 h-4" />, color: 'bg-blue-100 text-blue-700', label: 'Admin Centre' },
      admin: { icon: <ShieldCheckIcon className="w-4 h-4" />, color: 'bg-green-100 text-green-700', label: 'Admin' },
      student_online: { icon: <UserIcon className="w-4 h-4" />, color: 'bg-orange-100 text-orange-700', label: 'Étudiant En Ligne' },
      student_certif: { icon: <UserIcon className="w-4 h-4" />, color: 'bg-red-100 text-red-700', label: 'Étudiant Certification' },
    };

    const config = configs[role] || configs.admin;
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.icon}
        {config.label}
      </span>
    );
  };

  const handleToggleActive = (user: User) => {
    if (confirm(`Confirmer la ${user.is_active ? 'désactivation' : 'activation'} de ${user.name} ?`)) {
      router.post(`/admin/users/${user.id}/toggle-active`);
    }
  };

  const handleDelete = (user: User) => {
    if (confirm(`Confirmer la suppression de ${user.name} ? Cette action est irréversible.`)) {
      router.delete(`/admin/users/${user.id}`);
    }
  };

  return (
    <>
      <Head title="Gestion des utilisateurs - Admin" />

      <AdminLayout title="Gestion des utilisateurs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <p className="text-sm text-gray-500">
            {users.total} utilisateur{users.total > 1 ? 's' : ''} au total
          </p>
          {canCreate && (
            <Link
              href="/admin/users/create"
              className="inline-flex items-center gap-2 px-4 py-2 bg-cab-blue text-white rounded-xl text-sm font-semibold hover:bg-cab-dark transition-colors"
            >
              <PlusIcon className="w-5 h-5" />
              Nouvel utilisateur
            </Link>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utilisateur</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rôle</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dernière connexion</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.data.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-cab-blue/10 text-cab-blue flex items-center justify-center text-sm font-bold">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-gray-900">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{user.email}</td>
                    <td className="px-4 py-3">{getRoleBadge(user.role)}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                        user.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {user.is_active ? <CheckCircleIcon className="w-3 h-3" /> : <XCircleIcon className="w-3 h-3" />}
                        {user.is_active ? 'Actif' : 'Inactif'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{user.last_login_at || 'Jamais'}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {user.can_edit && (
                          <Link
                            href={`/admin/users/${user.id}/edit`}
                            className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                            title="Modifier"
                          >
                            <PencilSquareIcon className="w-5 h-5" />
                          </Link>
                        )}
                        {user.can_toggle && (
                          <button
                            onClick={() => handleToggleActive(user)}
                            className={`p-1.5 rounded-lg transition-colors ${
                              user.is_active ? 'text-red-600 hover:bg-red-50' : 'text-green-600 hover:bg-green-50'
                            }`}
                            title={user.is_active ? 'Désactiver' : 'Activer'}
                          >
                            {user.is_active ? <XCircleIcon className="w-5 h-5" /> : <CheckCircleIcon className="w-5 h-5" />}
                          </button>
                        )}
                        {user.can_delete && (
                          <button
                            onClick={() => handleDelete(user)}
                            className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                            title="Supprimer"
                          >
                            <TrashIcon className="w-5 h-5" />
                          </button>
                        )}
                        {!user.can_edit && !user.can_toggle && !user.can_delete && (
                          <span className="text-xs text-gray-300">—</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {users.data.length === 0 && (
            <div className="text-center py-12">
              <UserIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">Aucun utilisateur trouvé</p>
            </div>
          )}
        </div>

        {/* ✅ Composant Pagination réutilisable, cohérent avec le reste du projet */}
        <Pagination
          links={users.links}
          from={users.from}
          to={users.to}
          total={users.total}
        />
      </AdminLayout>
    </>
  );
}
