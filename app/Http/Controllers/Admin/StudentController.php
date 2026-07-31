<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Models\Formation;
use App\Models\Vague;
use App\Models\Certification;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class StudentController extends Controller
{
    // Liste des étudiants avec filtres
    public function index(Request $request)
{
    try {
        $query = Student::with(['user', 'vague', 'certification', 'vague.formation', 'certification.formation']);

        // ✅ FILTRE 1 : Recherche par nom, email, matricule
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('first_name', 'LIKE', "%{$search}%")
                    ->orWhere('last_name', 'LIKE', "%{$search}%")
                    ->orWhere('matricule', 'LIKE', "%{$search}%")
                    ->orWhereHas('user', function ($q2) use ($search) {
                        $q2->where('email', 'LIKE', "%{$search}%");
                    });
            });
        }

        // ✅ FILTRE 2 : Par formation (via vague OU certification)
        if ($request->filled('formation_id')) {
            $formationId = $request->formation_id;
            $query->where(function ($q) use ($formationId) {
                $q->whereHas('vague', function ($q2) use ($formationId) {
                    $q2->where('formation_id', $formationId);
                })->orWhereHas('certification', function ($q2) use ($formationId) {
                    $q2->where('formation_id', $formationId);
                });
            });
        }

        // ✅ FILTRE 3 : Par vague spécifique
        if ($request->filled('vague_id')) {
            $query->where('vague_id', $request->vague_id);
        }

        // ✅ FILTRE 4 : Par certification spécifique
        if ($request->filled('certification_id')) {
            $query->where('certification_id', $request->certification_id);
        }

        // ✅ FILTRE 5 : Par type d'étudiant (online / certification)
        if ($request->filled('student_type')) {
            if ($request->student_type === 'online') {
                $query->whereNotNull('vague_id');
            } elseif ($request->student_type === 'certification') {
                $query->whereNotNull('certification_id');
            } elseif ($request->student_type === 'none') {
                $query->whereNull('vague_id')->whereNull('certification_id');
            }
        }

        // ✅ FILTRE 6 : Statut actif/inactif
        if ($request->filled('status')) {
            if ($request->status === 'active') {
                $query->whereHas('user', function ($q) {
                    $q->where('is_active', true);
                });
            } elseif ($request->status === 'inactive') {
                $query->whereHas('user', function ($q) {
                    $q->where('is_active', false);
                });
            }
        }

        // ✅ PAGINATION AJOUTÉE
        $students = $query->orderBy('created_at', 'desc')
            ->paginate(15)
            ->withQueryString()
            ->through(function ($student) {
                return [
                    'id' => $student->id,
                    'first_name' => $student->first_name,
                    'last_name' => $student->last_name,
                    'full_name' => $student->full_name,
                    'email' => $student->user?->email,
                    'phone' => $student->phone,
                    'matricule' => $student->matricule,
                    'school_level' => $student->school_level,
                    'birth_date' => $student->birth_date?->format('d/m/Y'),
                    'address' => $student->address,
                    'city' => $student->city,
                    'student_type' => $student->student_type,
                    'student_type_label' => $student->student_type_label,
                    'is_active' => $student->isActive(),
                    'vague' => $student->vague ? [
                        'id' => $student->vague->id,
                        'name' => $student->vague->name,
                        'formation_id' => $student->vague->formation_id,
                        'formation' => $student->vague->formation?->name,
                    ] : null,
                    'certification' => $student->certification ? [
                        'id' => $student->certification->id,
                        'titre' => $student->certification->titre,
                        'formation_id' => $student->certification->formation_id,
                        'formation' => $student->certification->formation?->name,
                    ] : null,
                    'created_at' => $student->created_at->format('d/m/Y'),
                ];
            });

        // ✅ Données pour les filtres
        $formations = Formation::where('is_active', true)
            ->orderBy('name')
            ->get()
            ->map(function ($f) {
                return ['id' => $f->id, 'name' => $f->name];
            });

        $vagues = Vague::where('is_active', true)
            ->orderBy('name')
            ->get()
            ->map(function ($v) {
                return [
                    'id' => $v->id,
                    'name' => $v->name,
                    'formation_id' => $v->formation_id,
                    'formation' => $v->formation?->name,
                ];
            });

        $certifications = Certification::where('is_active', true)
            ->orderBy('titre')
            ->get()
            ->map(function ($c) {
                return [
                    'id' => $c->id,
                    'titre' => $c->titre,
                    'formation_id' => $c->formation_id,
                    'formation' => $c->formation?->name,
                ];
            });

        // ✅ Statistiques
        $stats = [
            'total' => Student::count(),
            'online' => Student::whereNotNull('vague_id')->count(),
            'certification' => Student::whereNotNull('certification_id')->count(),
            'none' => Student::whereNull('vague_id')->whereNull('certification_id')->count(),
            'active' => Student::whereHas('user', function ($q) {
                $q->where('is_active', true);
            })->count(),
            'inactive' => Student::whereHas('user', function ($q) {
                $q->where('is_active', false);
            })->count(),
        ];

        return Inertia::render('Admin/Students/Index', [
            'students' => $students,
            'formations' => $formations,
            'vagues' => $vagues,
            'certifications' => $certifications,
            'stats' => $stats,
            'filters' => [
                'search' => $request->search,
                'formation_id' => $request->formation_id,
                'vague_id' => $request->vague_id,
                'certification_id' => $request->certification_id,
                'student_type' => $request->student_type,
                'status' => $request->status,
            ],
        ]);

    } catch (\Exception $e) {
        Log::error('Erreur chargement étudiants', [
            'message' => $e->getMessage(),
            'trace' => $e->getTraceAsString(),
        ]);

        return redirect()->back()->with('error', '❌ Une erreur est survenue.');
    }
}
    // Détail d'un étudiant
    public function show(Student $student)
{
    try {
        $student->load(['user', 'vague', 'certification', 'vague.formation', 'certification.formation']);

        return Inertia::render('Admin/Students/Show', [
            'student' => [
                'id' => $student->id,
                'first_name' => $student->first_name,
                'last_name' => $student->last_name,
                'full_name' => $student->full_name,
                'email' => $student->user?->email,
                'phone' => $student->phone,
                'matricule' => $student->matricule,
                'school_level' => $student->school_level,
                'birth_date' => $student->birth_date?->format('d/m/Y'),
                'address' => $student->address,
                'city' => $student->city,
                'student_type' => $student->student_type,
                'is_active' => $student->user?->is_active ?? false,
                'created_at' => $student->created_at->format('d/m/Y H:i'),
                'vague' => $student->vague ? [
                    'id' => $student->vague->id,
                    'name' => $student->vague->name,
                    'formation' => $student->vague->formation ? [
                        'id' => $student->vague->formation->id,
                        'name' => $student->vague->formation->name,
                    ] : null,
                ] : null,
                'certification' => $student->certification ? [
                    'id' => $student->certification->id,
                    'titre' => $student->certification->titre,
                    'formation' => $student->certification->formation ? [
                        'id' => $student->certification->formation->id,
                        'name' => $student->certification->formation->name,
                    ] : null,
                ] : null,
                'user' => $student->user ? [
                    'id' => $student->user->id,
                    'name' => $student->user->name,
                    'email' => $student->user->email,
                ] : null,
            ],
        ]);

    } catch (\Exception $e) {
        Log::error('Erreur chargement étudiant', [
            'student_id' => $student->id,
            'message' => $e->getMessage(),
            'trace' => $e->getTraceAsString(),
        ]);

        return redirect()->route('admin.students.index')
            ->with('error', '❌ Une erreur est survenue.');
    }
}

    // Formulaire d'édition
    public function edit(Student $student)
{
    try {
        $student->load(['user', 'vague', 'certification']);

        // ✅ Détermine la formation actuelle (via vague ou certification) pour pré-sélection
        $currentFormationId = $student->vague?->formation_id
            ?? $student->certification?->formation_id
            ?? null;

        $vagues = [];
        $certifications = [];

        if ($currentFormationId) {
            $vagues = Vague::where('formation_id', $currentFormationId)
                ->where('is_active', true)
                ->orderBy('name')
                ->get()
                ->map(fn ($v) => ['id' => $v->id, 'name' => $v->name]);

            $certifications = Certification::where('formation_id', $currentFormationId)
                ->where('is_active', true)
                ->orderBy('titre')
                ->get()
                ->map(fn ($c) => ['id' => $c->id, 'titre' => $c->titre]);
        }

        $formations = Formation::where('is_active', true)
            ->orderBy('name')
            ->get()
            ->map(fn ($f) => ['id' => $f->id, 'name' => $f->name]);

        return Inertia::render('Admin/Students/Edit', [
            'student' => [
                'id' => $student->id,
                'first_name' => $student->first_name,
                'last_name' => $student->last_name,
                'email' => $student->user?->email,
                'phone' => $student->phone,
                'matricule' => $student->matricule,
                'school_level' => $student->school_level,
                'birth_date' => $student->birth_date?->format('Y-m-d'), // format ISO pour <input type="date">
                'address' => $student->address,
                'city' => $student->city,
                'student_type' => $student->student_type,
                'is_active' => $student->user?->is_active ?? false,
                'vague_id' => $student->vague_id,
                'certification_id' => $student->certification_id,
                'formation_id' => $currentFormationId, // ✅ nouveau champ pour pré-sélection
            ],
            'formations' => $formations,
            'vagues' => $vagues,
            'certifications' => $certifications,
        ]);

    } catch (\Exception $e) {
        Log::error('Erreur chargement formulaire', [
            'student_id' => $student->id,
            'message' => $e->getMessage(),
            'trace' => $e->getTraceAsString(),
        ]);

        return redirect()->route('admin.students.index')
            ->with('error', '❌ Une erreur est survenue.');
    }
}

    // Mettre à jour un étudiant
    public function update(Request $request, Student $student)
    {
        try {
            $validated = $request->validate([
                'first_name' => 'required|string|max:255',
                'last_name' => 'required|string|max:255',
                'phone' => 'required|string|max:20',
                'school_level' => 'nullable|string|max:255',
                'is_active' => 'boolean',
                'vague_id' => 'nullable|exists:vagues,id',
                'certification_id' => 'nullable|exists:certifications,id',
            ]);

            // ✅ Vérifier qu'un étudiant ne peut pas avoir à la fois vague et certification
            if ($validated['vague_id'] && $validated['certification_id']) {
                return redirect()->back()
                    ->with('error', '❌ Un étudiant ne peut pas être dans une vague ET une certification en même temps.');
            }

            DB::transaction(function () use ($request, $student, $validated) {
                // Mettre à jour l'étudiant
                $student->update([
                    'first_name' => $validated['first_name'],
                    'last_name' => $validated['last_name'],
                    'phone' => $validated['phone'],
                    'school_level' => $validated['school_level'] ?? null,
                    'vague_id' => $validated['vague_id'] ?? null,
                    'certification_id' => $validated['certification_id'] ?? null,
                ]);

                // Mettre à jour l'utilisateur associé
                if ($student->user) {
                    $student->user->update([
                        'is_active' => $validated['is_active'] ?? true,
                    ]);
                }
            });

            Log::info('Étudiant mis à jour', [
                'student_id' => $student->id,
                'updated_by' => auth()->id(),
            ]);

            return redirect()->route('admin.students.index')
                ->with('success', "✅ Étudiant {$student->full_name} mis à jour avec succès !");

        } catch (\Exception $e) {
            Log::error('Erreur mise à jour étudiant', [
                'student_id' => $student->id,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()
                ->withInput()
                ->with('error', '❌ Une erreur est survenue lors de la mise à jour.');
        }
    }

    // Activer/Désactiver un étudiant
    public function toggleActive(Student $student)
    {
        try {
            if (!$student->user) {
                return redirect()->back()
                    ->with('error', '❌ Cet étudiant n\'a pas de compte utilisateur associé.');
            }

            $student->user->update(['is_active' => !$student->user->is_active]);

            $status = $student->user->is_active ? 'activé' : 'désactivé';

            Log::info('Étudiant ' . $status, [
                'student_id' => $student->id,
                'updated_by' => auth()->id(),
            ]);

            return redirect()->back()
                ->with('success', "✅ Étudiant {$student->full_name} {$status} avec succès !");

        } catch (\Exception $e) {
            Log::error('Erreur changement statut étudiant', [
                'student_id' => $student->id,
                'message' => $e->getMessage(),
            ]);

            return redirect()->back()
                ->with('error', '❌ Une erreur est survenue.');
        }
    }

    // Supprimer un étudiant
    public function destroy(Student $student)
    {
        try {
            $name = $student->full_name;

            DB::transaction(function () use ($student) {
                // Supprimer l'utilisateur associé
                if ($student->user) {
                    $student->user->delete();
                }
                $student->delete();
            });

            Log::info('Étudiant supprimé', [
                'student_id' => $student->id,
                'name' => $name,
                'deleted_by' => auth()->id(),
            ]);

            return redirect()->back()
                ->with('success', "✅ Étudiant {$name} supprimé avec succès !");

        } catch (\Exception $e) {
            Log::error('Erreur suppression étudiant', [
                'student_id' => $student->id,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()
                ->with('error', '❌ Une erreur est survenue lors de la suppression.');
        }
    }

    // Récupérer les vagues par formation (pour le formulaire)
    public function getVaguesByFormation($formationId)
    {
        $vagues = Vague::where('formation_id', $formationId)
            ->where('is_active', true)
            ->orderBy('name')
            ->get()
            ->map(function ($v) {
                return ['id' => $v->id, 'name' => $v->name];
            });

        return response()->json($vagues);
    }

    // Récupérer les certifications par formation (pour le formulaire)
    public function getCertificationsByFormation($formationId)
    {
        $certifications = Certification::where('formation_id', $formationId)
            ->where('is_active', true)
            ->orderBy('titre')
            ->get()
            ->map(function ($c) {
                return ['id' => $c->id, 'titre' => $c->titre];
            });

        return response()->json($certifications);
    }
}
