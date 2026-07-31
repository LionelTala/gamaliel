<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class UserController extends Controller
{
    // Liste des utilisateurs
public function index()
{
    try {
        $actor = auth()->user();

        $users = User::with('student')
            ->when(!$actor->isSuperAdmin(), function ($query) {
                $query->where('role', '!=', 'super_admin');
            })
            ->latest()
            ->paginate(10)
            ->withQueryString()
            ->through(function ($user) use ($actor) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                    'is_active' => $user->is_active,
                    'last_login_at' => $user->last_login_at?->diffForHumans(),
                    'student' => $user->student ? [
                        'first_name' => $user->student->first_name,
                        'last_name' => $user->student->last_name,
                        'matricule' => $user->student->matricule,
                    ] : null,
                    'can_edit' => $this->canManage($actor, $user),
                    'can_toggle' => $this->canManage($actor, $user) && $user->id !== $actor->id,
                    'can_delete' => $this->canManage($actor, $user) && $user->id !== $actor->id,
                ];
            });

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
            'canCreate' => $actor->isAdmin(),
            'canCreateAdminCentre' => $actor->isSuperAdmin(),
        ]);
    } catch (\Exception $e) {
        Log::error('Erreur lors du chargement des utilisateurs', [
            'message' => $e->getMessage(),
            'trace' => $e->getTraceAsString(),
        ]);

        return redirect()->back()->with('error', '❌ Une erreur est survenue lors du chargement des utilisateurs.');
    }
}

    // Formulaire de création
    public function create()
    {
        try {
            if (!auth()->user()->isAdmin()) {
                abort(403, '❌ Vous n\'avez pas les droits pour créer un utilisateur.');
            }

            $roles = $this->getCreatableRoles(auth()->user());

            return Inertia::render('Admin/Users/Create', [
                'roles' => $roles,
            ]);
        } catch (\Exception $e) {
            Log::error('Erreur lors du chargement du formulaire de création', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->route('admin.users.index')
                ->with('error', '❌ Une erreur est survenue. Veuillez réessayer.');
        }
    }

    // Créer un utilisateur
    public function store(Request $request)
    {
        try {
            if (!auth()->user()->isAdmin()) {
                abort(403, '❌ Vous n\'avez pas les droits pour créer un utilisateur.');
            }

            $roles = $this->getCreatableRoles(auth()->user());

            $validated = $request->validate([
                'name' => 'required|string|max:255|unique:users,name',
                'email' => 'required|email|max:255|unique:users,email',
                'password' => 'required|string|min:8|confirmed',
                'role' => ['required', Rule::in($roles)],
                'is_active' => 'boolean',
            ]);

            $user = DB::transaction(function () use ($validated) {
                return User::create([
                    'name' => $validated['name'],
                    'email' => $validated['email'],
                    'password' => Hash::make($validated['password']),
                    'role' => $validated['role'],
                    'is_active' => $validated['is_active'] ?? true,
                ]);
            });

            Log::info('Utilisateur créé avec succès', [
                'user_id' => $user->id,
                'name' => $user->name,
                'role' => $user->role,
                'created_by' => auth()->id(),
            ]);

            return redirect()->route('admin.users.index')
                ->with('success', "✅ Utilisateur {$user->name} créé avec succès !");

        } catch (ValidationException $e) {
            throw $e;

        } catch (\Exception $e) {
            Log::error('Erreur lors de la création de l\'utilisateur', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'data' => $request->except(['password', 'password_confirmation']),
            ]);

            return redirect()->back()
                ->withInput()
                ->with('error', '❌ Une erreur est survenue lors de la création de l\'utilisateur. Veuillez réessayer.');
        }
    }

    // ✅ Formulaire d'édition
    public function edit(User $user)
    {
        try {
            $actor = auth()->user();

            if (!$this->canManage($actor, $user)) {
                abort(403, '❌ Vous n\'avez pas les droits pour modifier cet utilisateur.');
            }

            $editableRoles = $this->getEditableRolesFor($actor, $user);

            return Inertia::render('Admin/Users/Edit', [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                    'is_active' => $user->is_active,
                ],
                'roles' => $editableRoles,
                'canChangeRole' => count($editableRoles) > 1 || !in_array($user->role, $editableRoles),
            ]);

        } catch (\Exception $e) {
            Log::error('Erreur chargement formulaire édition utilisateur', [
                'user_id' => $user->id,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->route('admin.users.index')
                ->with('error', '❌ Une erreur est survenue.');
        }
    }

    // ✅ Mettre à jour un utilisateur
    public function update(Request $request, User $user)
    {
        try {
            $actor = auth()->user();

            if (!$this->canManage($actor, $user)) {
                abort(403, '❌ Vous n\'avez pas les droits pour modifier cet utilisateur.');
            }

            $editableRoles = $this->getEditableRolesFor($actor, $user);

            $rules = [
                'name' => ['required', 'string', 'max:255', Rule::unique('users', 'name')->ignore($user->id)],
                'email' => ['required', 'email', 'max:255', Rule::unique('users', 'email')->ignore($user->id)],
                'role' => ['required', Rule::in($editableRoles)],
                'is_active' => 'boolean',
                'password' => 'nullable|string|min:8|confirmed', // optionnel à l'édition
            ];

            $validated = $request->validate($rules);

            DB::transaction(function () use ($user, $validated) {
                $updateData = [
                    'name' => $validated['name'],
                    'email' => $validated['email'],
                    'role' => $validated['role'],
                    'is_active' => $validated['is_active'] ?? $user->is_active,
                ];

                if (!empty($validated['password'])) {
                    $updateData['password'] = Hash::make($validated['password']);
                }

                $user->update($updateData);
            });

            Log::info('Utilisateur mis à jour', [
                'user_id' => $user->id,
                'updated_by' => auth()->id(),
            ]);

            return redirect()->route('admin.users.index')
                ->with('success', "✅ Utilisateur {$user->name} mis à jour avec succès !");

        } catch (ValidationException $e) {
            throw $e;

        } catch (\Exception $e) {
            Log::error('Erreur mise à jour utilisateur', [
                'user_id' => $user->id,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()
                ->withInput()
                ->with('error', '❌ Une erreur est survenue lors de la mise à jour.');
        }
    }

    // Activer/Désactiver un utilisateur
    public function toggleActive(User $user)
    {
        try {
            $actor = auth()->user();

            if (!$this->canManage($actor, $user)) {
                abort(403, '❌ Vous n\'avez pas les droits pour modifier cet utilisateur.');
            }

            if ($user->id === $actor->id) {
                return redirect()->back()->with('error', '❌ Vous ne pouvez pas désactiver votre propre compte.');
            }

            $newStatus = !$user->is_active;
            $user->update(['is_active' => $newStatus]);

            $statusText = $newStatus ? 'activé' : 'désactivé';

            Log::info('Statut utilisateur modifié', [
                'user_id' => $user->id,
                'user_name' => $user->name,
                'new_status' => $newStatus,
                'modified_by' => $actor->id,
            ]);

            return redirect()->back()->with('success', "✅ Utilisateur {$user->name} {$statusText} avec succès !");

        } catch (\Exception $e) {
            Log::error('Erreur lors du changement de statut', [
                'user_id' => $user->id,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()->with('error', '❌ Une erreur est survenue lors du changement de statut.');
        }
    }

    // Supprimer un utilisateur
    public function destroy(User $user)
    {
        try {
            $actor = auth()->user();

            if (!$this->canManage($actor, $user)) {
                abort(403, '❌ Vous n\'avez pas les droits pour supprimer cet utilisateur.');
            }

            if ($user->id === $actor->id) {
                return redirect()->back()->with('error', '❌ Vous ne pouvez pas supprimer votre propre compte.');
            }

            $name = $user->name;

            DB::transaction(function () use ($user) {
                if ($user->student) {
                    $user->student->delete();
                }
                $user->delete();
            });

            Log::info('Utilisateur supprimé', [
                'deleted_user_id' => $user->id,
                'deleted_user_name' => $name,
                'deleted_by' => $actor->id,
            ]);

            return redirect()->back()->with('success', "✅ Utilisateur {$name} supprimé avec succès !");

        } catch (\Exception $e) {
            Log::error('Erreur lors de la suppression', [
                'user_id' => $user->id,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()->with('error', '❌ Une erreur est survenue lors de la suppression de l\'utilisateur.');
        }
    }

    /**
     * ✅ Règle centrale de permission : est-ce que $actor peut gérer (éditer/activer/supprimer) $target ?
     */
    private function canManage(User $actor, User $target): bool
    {
        return match ($actor->role) {
            'super_admin' => true,
            'admin_centre' => in_array($target->role, ['admin', 'student_online', 'student_certif']),
            'admin' => in_array($target->role, ['student_online', 'student_certif']),
            default => false,
        };
    }

    /**
     * Rôles que $actor peut attribuer lors de la CRÉATION d'un nouvel utilisateur.
     */
    private function getCreatableRoles(User $actor): array
    {
        return match ($actor->role) {
            'super_admin' => ['super_admin', 'admin_centre', 'admin'],
            'admin_centre' => ['admin'],
            default => [],
        };
    }

    /**
     * Rôles que $actor peut attribuer en ÉDITANT $target — inclut toujours
     * le rôle actuel de $target pour que le select ne soit jamais vide.
     */
    private function getEditableRolesFor(User $actor, User $target): array
    {
        $assignable = match ($actor->role) {
            'super_admin' => ['super_admin', 'admin_centre', 'admin', 'student_online', 'student_certif'],
            'admin_centre' => ['admin', 'student_online', 'student_certif'],
            'admin' => ['student_online', 'student_certif'],
            default => [],
        };

        if (!in_array($target->role, $assignable)) {
            $assignable[] = $target->role;
        }

        return $assignable;
    }
}
