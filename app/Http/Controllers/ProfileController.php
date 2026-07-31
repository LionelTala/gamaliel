<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $student = $user->student;

        $data = [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'role_label' => $this->getRoleLabel($user->role),
                'is_active' => $user->is_active,
                'created_at' => $user->created_at->format('d/m/Y H:i'),
            ],
        ];

        if ($student) {
            $data['student'] = [
                'id' => $student->id,
                'first_name' => $student->first_name,
                'last_name' => $student->last_name,
                'full_name' => $student->full_name,
                'phone' => $student->phone,
                'matricule' => $student->matricule,
                'school_level' => $student->school_level,
                'birth_date' => $student->birth_date?->format('Y-m-d'),
                'address' => $student->address,
                'city' => $student->city,
                'student_type' => $student->student_type_label,
                'vague' => $student->vague?->name,
                'certification' => $student->certification?->titre,
            ];
        }

        return Inertia::render('Profile/Index', $data);
    }

    public function update(Request $request)
    {
        try {
            $user = Auth::user();
            $student = $user->student;

            // ✅ Si c'est un admin
            if ($user->isAdmin()) {
                $validated = $request->validate([
                    'name' => 'required|string|max:255',
                    'email' => ['required', 'email', 'max:255', Rule::unique('users', 'email')->ignore($user->id)],
                ]);

                // Mettre à jour l'admin
                $user->update([
                    'name' => $validated['name'],
                    'email' => $validated['email'],
                ]);

                // Changer le mot de passe si demandé
                if ($request->filled('current_password') && $request->filled('new_password')) {
                    $request->validate([
                        'current_password' => 'required|string',
                        'new_password' => 'required|string|min:8|confirmed',
                    ]);

                    if (!Hash::check($request->current_password, $user->password)) {
                        return redirect()->back()->with('error', '❌ Le mot de passe actuel est incorrect.');
                    }

                    $user->password = Hash::make($request->new_password);
                    $user->save();
                }
            }

            // ✅ Si c'est un étudiant
            if ($user->isStudent() && $student) {
                $validated = $request->validate([
                    'first_name' => 'required|string|max:255',
                    'last_name' => 'required|string|max:255',
                    'phone' => 'required|string|max:20',
                    'school_level' => 'nullable|string|max:255',
                    'birth_date' => 'nullable|date|before:today',
                    'address' => 'nullable|string|max:255',
                    'city' => 'nullable|string|max:255',
                ]);

                $student->update([
                    'first_name' => $validated['first_name'],
                    'last_name' => $validated['last_name'],
                    'phone' => $validated['phone'],
                    'school_level' => $validated['school_level'] ?? null,
                    'birth_date' => $validated['birth_date'] ?? null,
                    'address' => $validated['address'] ?? null,
                    'city' => $validated['city'] ?? null,
                ]);

                // Changer le mot de passe si demandé
                if ($request->filled('current_password') && $request->filled('new_password')) {
                    $request->validate([
                        'current_password' => 'required|string',
                        'new_password' => 'required|string|min:8|confirmed',
                    ]);

                    if (!Hash::check($request->current_password, $user->password)) {
                        return redirect()->back()->with('error', '❌ Le mot de passe actuel est incorrect.');
                    }

                    $user->password = Hash::make($request->new_password);
                    $user->save();
                }
            }

            Log::info('Profil mis à jour', [
                'user_id' => $user->id,
                'role' => $user->role,
            ]);

            return redirect()->back()->with('success', '✅ Profil mis à jour avec succès !');

        } catch (\Exception $e) {
            Log::error('Erreur mise à jour profil', [
                'user_id' => auth()->id(),
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()
                ->withInput()
                ->with('error', '❌ Une erreur est survenue lors de la mise à jour.');
        }
    }

    private function getRoleLabel($role)
    {
        $labels = [
            'super_admin' => 'Super Administrateur',
            'admin_centre' => 'Admin Centre',
            'admin' => 'Administrateur',
            'student_online' => 'Étudiant en ligne',
            'student_certif' => 'Étudiant certification',
        ];
        return $labels[$role] ?? $role;
    }
}
