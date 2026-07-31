<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Candidature;
use App\Models\User;
use App\Models\Student;
use App\Models\Vague;
use App\Models\Certification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CandidatureController extends Controller
{
    // Liste des candidatures
    public function index(Request $request)
{
    try {
        $query = Candidature::with(['formation', 'certification', 'vague'])
            ->orderBy('created_at', 'desc');

        // Filtres appliqués sur le Builder, AVANT la pagination
        if ($request->filled('statut')) {
            $query->where('statut', $request->statut);
        }

        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('nom', 'LIKE', "%{$search}%")
                    ->orWhere('prenom', 'LIKE', "%{$search}%")
                    ->orWhere('email', 'LIKE', "%{$search}%")
                    ->orWhere('telephone', 'LIKE', "%{$search}%");
            });
        }

        // Pagination faite APRÈS tous les filtres
        $candidatures = $query
            ->paginate(10)
            ->withQueryString()
            ->through(function ($candidature) {
                return [
                    'id' => $candidature->id,
                    'nom_complet' => $candidature->nom_complet,
                    'email' => $candidature->email,
                    'telephone' => $candidature->telephone,
                    'type' => $candidature->type,
                    'type_label' => $candidature->type_label,
                    'statut' => $candidature->statut,
                    'statut_label' => $candidature->statut_label,
                    'statut_color' => $candidature->statut_color,
                    'formation' => $candidature->formation ? [
                        'id' => $candidature->formation->id,
                        'name' => $candidature->formation->name,
                        'abbreviation' => $candidature->formation->abbreviation,
                    ] : null,
                    'certification' => $candidature->certification ? [
                        'id' => $candidature->certification->id,
                        'titre' => $candidature->certification->titre,
                    ] : null,
                    'vague' => $candidature->vague ? [
                        'id' => $candidature->vague->id,
                        'name' => $candidature->vague->name,
                    ] : null,
                    'created_at' => $candidature->created_at->diffForHumans(),
                    'created_at_full' => $candidature->created_at->format('d/m/Y H:i'),
                ];
            });

        $stats = [
            'total' => Candidature::count(),
            'en_attente' => Candidature::where('statut', 'en_attente')->count(),
            'en_cours' => Candidature::where('statut', 'en_cours')->count(),
            'admis' => Candidature::where('statut', 'admis')->count(),
            'refuse' => Candidature::where('statut', 'refuse')->count(),
        ];

        return Inertia::render('Admin/Candidatures/Index', [
            'candidatures' => $candidatures,
            'stats' => $stats,
            'filters' => [
                'statut' => $request->statut,
                'type' => $request->type,
                'search' => $request->search,
            ],
        ]);

    } catch (\Exception $e) {
        Log::error('Erreur chargement candidatures', [
            'message' => $e->getMessage(),
            'trace' => $e->getTraceAsString(),
        ]);

        return redirect()->back()->with('error', '❌ Une erreur est survenue.');
    }
}

    // Détail d'une candidature
    public function show(Candidature $candidature)
    {
        try {
            $candidature->load(['formation', 'certification', 'vague', 'user', 'student']);

            // ✅ Récupérer les vagues disponibles
            $vagues = [];
            if ($candidature->type === 'formation' && $candidature->formation_id) {
                $vagues = Vague::where('formation_id', $candidature->formation_id)
                    ->where('is_active', true)
                    ->where('date_debut', '>=', now())
                    ->orderBy('date_debut')
                    ->get()
                    ->map(function ($vague) {
                        return [
                            'id' => $vague->id,
                            'name' => $vague->name,
                            'date_debut' => $vague->date_debut->format('d/m/Y'),
                            'places' => $vague->capacite ? $vague->places_restantes : 'Illimité',
                            'is_full' => $vague->capacite && $vague->inscrits >= $vague->capacite,
                        ];
                    });
            }

            $data = [
                'id' => $candidature->id,
                'nom' => $candidature->nom,
                'prenom' => $candidature->prenom,
                'nom_complet' => $candidature->nom_complet,
                'email' => $candidature->email,
                'telephone' => $candidature->telephone,
                'niveau_scolaire' => $candidature->niveau_scolaire,
                'message' => $candidature->message,
                'type' => $candidature->type,
                'type_label' => $candidature->type_label,
                'statut' => $candidature->statut,
                'statut_label' => $candidature->statut_label,
                'statut_color' => $candidature->statut_color,
                'formation' => $candidature->formation ? [
                    'id' => $candidature->formation->id,
                    'name' => $candidature->formation->name,
                    'abbreviation' => $candidature->formation->abbreviation,
                ] : null,
                'certification' => $candidature->certification ? [
                    'id' => $candidature->certification->id,
                    'titre' => $candidature->certification->titre,
                ] : null,
                'vague' => $candidature->vague ? [
                    'id' => $candidature->vague->id,
                    'name' => $candidature->vague->name,
                ] : null,
                'notes' => $candidature->notes,
                'created_at' => $candidature->created_at->format('d/m/Y H:i'),
                'traite_le' => $candidature->traite_le?->format('d/m/Y H:i'),
                'traite_par' => $candidature->traitePar?->name,

                // ✅ INFOS DE CONNEXION (si la candidature est acceptée)
                'user' => $candidature->user ? [
                    'id' => $candidature->user->id,
                    'username' => $candidature->user->name,
                    'email' => $candidature->user->email,
                ] : null,
                'student' => $candidature->student ? [
                    'id' => $candidature->student->id,
                    'matricule' => $candidature->student->matricule,
                    'nom_complet' => $candidature->student->full_name,
                    'vague_id' => $candidature->student->vague_id,
                    'certification_id' => $candidature->student->certification_id,
                ] : null,
            ];

            return Inertia::render('Admin/Candidatures/Show', [
                'candidature' => $data,
                'vagues' => $vagues,
            ]);

        } catch (\Exception $e) {
            Log::error('Erreur chargement candidature', [
                'candidature_id' => $candidature->id,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->route('admin.candidatures.index')
                ->with('error', '❌ Une erreur est survenue.');
        }
    }

    // Accepter une candidature → Création du compte étudiant
public function accepter(Candidature $candidature)
{
    try {
        if ($candidature->statut !== 'en_attente' && $candidature->statut !== 'en_cours') {
            return redirect()->back()
                ->with('error', '❌ Cette candidature ne peut pas être acceptée.');
        }

        // ✅ Vérifier selon le type
        if ($candidature->type === 'formation') {
            if (!$candidature->formation_id) {
                return redirect()->back()
                    ->with('error', '❌ Aucune formation associée à cette candidature.');
            }

            if (!$candidature->vague_id) {
                return redirect()->back()
                    ->with('error', '❌ Veuillez d\'abord attribuer une vague à cette candidature.');
            }
        } else {
            if (!$candidature->certification_id) {
                return redirect()->back()
                    ->with('error', '❌ Aucune certification associée à cette candidature.');
            }

            $certification = Certification::with('formation')->find($candidature->certification_id);
            if (!$certification || !$certification->formation) {
                return redirect()->back()
                    ->with('error', '❌ La certification n\'a pas de formation associée.');
            }
        }

        // ✅ Vérifier si un compte existe déjà avec cet email OU ce téléphone
        $existingUser = null;
        if ($candidature->email) {
            $existingUser = User::where('email', $candidature->email)->first();
        }

        if (!$existingUser && $candidature->telephone) {
            $existingUser = User::where('telephone', $candidature->telephone)->first();
        }

        if ($existingUser) {
            $identifiant = $existingUser->email ?? $existingUser->telephone;
            return redirect()->back()
                ->with('error', "❌ Un compte existe déjà avec l'identifiant {$identifiant}.");
        }

        $result = DB::transaction(function () use ($candidature) {
            // ✅ Récupérer la formation
            $formationId = $candidature->formation_id;
            $role = 'student_online';

            if ($candidature->type === 'certification') {
                $certification = Certification::with('formation')->find($candidature->certification_id);
                if ($certification && $certification->formation) {
                    $formationId = $certification->formation->id;
                    $role = 'student_certif';
                }
            }

            // 1. Générer le matricule
            $matricule = $this->genererMatricule($formationId);

            // 2. Générer le username
            $username = $this->genererUsername($candidature->prenom, $candidature->nom);

            // ✅ 3. Créer l'utilisateur (avec email OU telephone)
            $userData = [
                'name' => $username,
                'password' => Hash::make($matricule),
                'role' => $role,
                'is_active' => true,
            ];

            // ✅ Si email existe, l'ajouter
            if ($candidature->email) {
                $userData['email'] = $candidature->email;
            }

            // ✅ Si telephone existe, l'ajouter
            if ($candidature->telephone) {
                $userData['telephone'] = $candidature->telephone;
            }

            $user = User::create($userData);

            // ✅ 4. Créer l'étudiant AVEC vague_id ou certification_id
            $studentData = [
                'user_id' => $user->id,
                'first_name' => $candidature->prenom,
                'last_name' => $candidature->nom,
                'phone' => $candidature->telephone,
                'matricule' => $matricule,
                'school_level' => $candidature->niveau_scolaire,
            ];

            // ✅ Assigner la vague ou la certification
            if ($candidature->type === 'formation' && $candidature->vague_id) {
                $studentData['vague_id'] = $candidature->vague_id;
                Log::info('Assignation vague', [
                    'student' => $candidature->prenom . ' ' . $candidature->nom,
                    'vague_id' => $candidature->vague_id,
                ]);
            } elseif ($candidature->type === 'certification' && $candidature->certification_id) {
                $studentData['certification_id'] = $candidature->certification_id;
                Log::info('Assignation certification', [
                    'student' => $candidature->prenom . ' ' . $candidature->nom,
                    'certification_id' => $candidature->certification_id,
                ]);
            } else {
                Log::error('Étudiant créé sans affectation', [
                    'candidature_id' => $candidature->id,
                    'type' => $candidature->type,
                    'vague_id' => $candidature->vague_id,
                    'certification_id' => $candidature->certification_id,
                ]);
            }

            $student = Student::create($studentData);

            // 5. Mettre à jour la candidature
            $candidature->update([
                'statut' => 'admis',
                'user_id' => $user->id,
                'student_id' => $student->id,
                'traite_le' => now(),
                'traite_par' => auth()->id(),
            ]);

            // 6. Incrémenter les inscrits dans la vague
            if ($candidature->type === 'formation' && $candidature->vague_id) {
                $vague = Vague::find($candidature->vague_id);
                if ($vague) {
                    $vague->increment('inscrits');
                    Log::info('Vague incrémentée', [
                        'vague_id' => $candidature->vague_id,
                        'nouveau_total' => $vague->inscrits,
                    ]);
                }
            }

            Log::info('Candidature acceptée - Compte créé', [
                'candidature_id' => $candidature->id,
                'type' => $candidature->type,
                'student_id' => $student->id,
                'matricule' => $matricule,
                'email' => $candidature->email,
                'telephone' => $candidature->telephone,
                'vague_id' => $candidature->vague_id,
                'certification_id' => $candidature->certification_id,
                'admin_id' => auth()->id(),
            ]);

            return [
                'student' => $student,
                'user' => $user,
                'matricule' => $matricule,
                'username' => $username,
            ];
        });

        $identifiant = $result['user']->email ?? $result['user']->telephone;
        $message = "✅ Candidature de {$candidature->nom_complet} acceptée ! Compte créé avec matricule {$result['matricule']}.";

        return redirect()->route('admin.candidatures.index')
            ->with('success', $message);

    } catch (\Exception $e) {
        Log::error('Erreur acceptation candidature', [
            'candidature_id' => $candidature->id,
            'type' => $candidature->type,
            'message' => $e->getMessage(),
            'trace' => $e->getTraceAsString(),
        ]);

        return redirect()->back()
            ->with('error', '❌ Une erreur est survenue lors de l\'acceptation.');
    }
}
    // Refuser une candidature
    public function refuser(Candidature $candidature)
    {
        try {
            if ($candidature->statut === 'admis' || $candidature->statut === 'refuse') {
                return redirect()->back()
                    ->with('error', '❌ Cette candidature a déjà été traitée.');
            }

            $candidature->update([
                'statut' => 'refuse',
                'traite_le' => now(),
                'traite_par' => auth()->id(),
            ]);

            Log::info('Candidature refusée', [
                'candidature_id' => $candidature->id,
                'admin_id' => auth()->id(),
            ]);

            return redirect()->route('admin.candidatures.index')
                ->with('success', "✅ Candidature de {$candidature->nom_complet} refusée.");

        } catch (\Exception $e) {
            Log::error('Erreur refus candidature', [
                'candidature_id' => $candidature->id,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()
                ->with('error', '❌ Une erreur est survenue.');
        }
    }

    // Mettre en cours
    public function mettreEnCours(Candidature $candidature)
    {
        try {
            if ($candidature->statut !== 'en_attente') {
                return redirect()->back()
                    ->with('error', '❌ Seules les candidatures en attente peuvent être mises en cours.');
            }

            $candidature->update([
                'statut' => 'en_cours',
                'notes' => $candidature->notes . "\n" . '📌 Mise en cours le ' . now()->format('d/m/Y H:i') . ' par ' . auth()->user()->name,
            ]);

            return redirect()->back()
                ->with('success', "✅ Candidature de {$candidature->nom_complet} mise en cours.");

        } catch (\Exception $e) {
            Log::error('Erreur mise en cours', [
                'candidature_id' => $candidature->id,
                'message' => $e->getMessage(),
            ]);

            return redirect()->back()
                ->with('error', '❌ Une erreur est survenue.');
        }
    }

    // Attribuer une vague
    public function attribuerVague(Request $request, Candidature $candidature)
    {
        try {
            $request->validate([
                'vague_id' => 'required|exists:vagues,id',
            ]);

            $vague = Vague::find($request->vague_id);

            // Vérifier les places disponibles
            if ($vague->capacite && $vague->inscrits >= $vague->capacite) {
                return redirect()->back()
                    ->with('error', '❌ Cette vague est complète.');
            }

            $candidature->update([
                'vague_id' => $request->vague_id,
            ]);

            return redirect()->back()
                ->with('success', "✅ Vague attribuée avec succès.");

        } catch (\Exception $e) {
            Log::error('Erreur attribution vague', [
                'candidature_id' => $candidature->id,
                'message' => $e->getMessage(),
            ]);

            return redirect()->back()
                ->with('error', '❌ Une erreur est survenue.');
        }
    }

    // Générer le matricule
    private function genererMatricule($formationId): string
    {
        $formation = \App\Models\Formation::find($formationId);
        $code = $formation?->abbreviation ?? 'XXX';
        $year = date('y');

        $last = Student::where('matricule', 'LIKE', "{$year}{$code}%")
            ->orderBy('matricule', 'desc')
            ->first();

        if ($last) {
            $num = intval(substr($last->matricule, -4)) + 1;
        } else {
            $num = 1;
        }

        return $year . $code . str_pad($num, 4, '0', STR_PAD_LEFT);
    }

    // Générer le username
    private function genererUsername($prenom, $nom): string
    {
        $base = strtolower(Str::slug($prenom . '.' . $nom));
        $username = $base;
        $counter = 1;

        while (User::where('name', $username)->exists()) {
            $username = $base . $counter;
            $counter++;
        }

        return $username;
    }
}
