<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Evaluation;
use App\Models\SoumissionEvaluation;
use App\Models\Notification;
use App\Models\Student;
use App\Models\User;
use App\Models\Tranche;
use App\Events\NotificationCreated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class EvaluationController extends Controller
{
    public function index()
    {
        try {
            $student = auth()->user()->student;

            if (!$student) {
                return redirect()->back()->with('error', '❌ Aucun profil étudiant trouvé.');
            }

            Log::info('📝 [Student] Liste des évaluations', [
                'student_id' => $student->id,
                'student_name' => $student->full_name,
                'vague_id' => $student->vague_id,
                'certification_id' => $student->certification_id,
            ]);

            $allEvaluations = Evaluation::where('is_active', true)
                ->where(function ($query) use ($student) {
                    if ($student->vague_id) {
                        $query->orWhere(function ($q) use ($student) {
                            $q->where('type', 'vague')
                                ->where('vague_id', $student->vague_id);
                        });
                    }
                    if ($student->certification_id) {
                        $query->orWhere(function ($q) use ($student) {
                            $q->where('type', 'certification')
                                ->where('certification_id', $student->certification_id);
                        });
                    }
                })
                ->orderBy('date', 'asc')
                ->get();

            Log::info('📝 [Student] Évaluations trouvées', [
                'total' => $allEvaluations->count()
            ]);

            $evaluationsList = $allEvaluations->map(function ($e) use ($student) {
                $soumission = SoumissionEvaluation::where('evaluation_id', $e->id)
                    ->where('student_id', $student->id)
                    ->first();

                $peutAcceder = $student->peutAccederContenu($e->tranche_requise_id);

                $trancheInfo = null;
                if ($e->tranche_requise_id) {
                    $tranche = Tranche::find($e->tranche_requise_id);
                    if ($tranche) {
                        $trancheInfo = [
                            'id' => $tranche->id,
                            'numero' => $tranche->numero,
                            'montant' => $tranche->montant,
                            'lien_paiement' => $tranche->lien_paiement, // ✅ AJOUTÉ
                        ];
                    }
                }

                return [
                    'id' => $e->id,
                    'titre' => $e->titre,
                    'description' => $e->description,
                    'date' => $e->date?->format('d/m/Y H:i'),
                    'coefficient' => $e->coefficient,
                    'est_depasse' => $e->est_depasse,
                    'jours_restants' => $e->jours_restants,
                    'has_files' => !empty($e->contenu),
                    'soumis' => $soumission !== null,
                    'soumission_statut' => $soumission?->statut,
                    'note' => $soumission?->note,
                    'formation' => [
                        'id' => $e->formation_id,
                        'name' => $e->formation?->name,
                    ],
                    'est_accessible' => $peutAcceder,
                    'tranche_requise' => $trancheInfo,
                    'est_verrouille' => !$peutAcceder && $trancheInfo !== null,
                ];
            });

            $stats = [
                'total' => $evaluationsList->count(),
                'soumis' => $evaluationsList->filter(fn($e) => $e['soumis'])->count(),
                'en_attente' => $evaluationsList->filter(fn($e) => !$e['soumis'])->count(),
                'corriges' => $evaluationsList->filter(fn($e) => $e['soumission_statut'] === 'corrige')->count(),
                'accessibles' => $evaluationsList->filter(fn($e) => $e['est_accessible'])->count(),
                'verrouilles' => $evaluationsList->filter(fn($e) => $e['est_verrouille'])->count(),
            ];

            Log::info('📝 [Student] Statistiques évaluations', $stats);

            return Inertia::render('Student/Evaluations/Index', [
                'evaluations' => $evaluationsList,
                'stats' => $stats,
            ]);

        } catch (\Exception $e) {
            Log::error('❌ [Student] Erreur chargement évaluations', [
                'user_id' => auth()->id(),
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()->with('error', '❌ Une erreur est survenue.');
        }
    }

    public function show(Evaluation $evaluation)
    {
        try {
            $student = auth()->user()->student;

            if (!$student) {
                return redirect()->back()->with('error', '❌ Aucun profil étudiant trouvé.');
            }

            Log::info('👁️ [Student] Affichage évaluation', [
                'student_id' => $student->id,
                'evaluation_id' => $evaluation->id,
                'evaluation_titre' => $evaluation->titre,
            ]);

            $hasAccess = false;
            if ($evaluation->type === 'vague' && $student->vague_id === $evaluation->vague_id) {
                $hasAccess = true;
            }
            if ($evaluation->type === 'certification' && $student->certification_id === $evaluation->certification_id) {
                $hasAccess = true;
            }

            if (!$hasAccess) {
                Log::warning('⚠️ [Student] Accès refusé à l\'évaluation', [
                    'student_id' => $student->id,
                    'evaluation_id' => $evaluation->id,
                    'type' => $evaluation->type,
                    'vague_id' => $evaluation->vague_id,
                    'student_vague_id' => $student->vague_id,
                ]);
                abort(403, '❌ Vous n\'avez pas accès à cette évaluation.');
            }

            $peutAcceder = $student->peutAccederContenu($evaluation->tranche_requise_id);

            $trancheInfo = null;
            if ($evaluation->tranche_requise_id) {
                $tranche = Tranche::find($evaluation->tranche_requise_id);
                if ($tranche) {
                    $trancheInfo = [
                        'id' => $tranche->id,
                        'numero' => $tranche->numero,
                        'montant' => $tranche->montant,
                        'lien_paiement' => $tranche->lien_paiement, // ✅ AJOUTÉ
                    ];
                }
            }

            $soumission = SoumissionEvaluation::where('evaluation_id', $evaluation->id)
                ->where('student_id', $student->id)
                ->first();

            Log::info('✅ [Student] Évaluation affichée', [
                'evaluation_id' => $evaluation->id,
                'est_accessible' => $peutAcceder,
                'soumis' => $soumission !== null,
            ]);

            return Inertia::render('Student/Evaluations/Show', [
                'evaluation' => [
                    'id' => $evaluation->id,
                    'titre' => $evaluation->titre,
                    'description' => $evaluation->description,
                    'contenu' => $evaluation->contenu,
                    'date' => $evaluation->date?->format('d/m/Y H:i'),
                    'coefficient' => $evaluation->coefficient,
                    'est_depasse' => $evaluation->est_depasse,
                    'jours_restants' => $evaluation->jours_restants,
                    'formation' => [
                        'id' => $evaluation->formation_id,
                        'name' => $evaluation->formation?->name,
                    ],
                    'est_accessible' => $peutAcceder,
                    'tranche_requise' => $trancheInfo,
                    'est_verrouille' => !$peutAcceder && $trancheInfo !== null,
                ],
                'soumission' => $soumission ? [
                    'id' => $soumission->id,
                    'fichier' => $soumission->fichier,
                    'commentaire' => $soumission->commentaire,
                    'note' => $soumission->note,
                    'statut' => $soumission->statut,
                    'statut_label' => $soumission->statut_label,
                    'submitted_at' => $soumission->submitted_at?->format('d/m/Y H:i'),
                    'corrected_at' => $soumission->corrected_at?->format('d/m/Y H:i'),
                    'est_en_retard' => $soumission->est_en_retard,
                ] : null,
            ]);

        } catch (\Exception $e) {
            Log::error('❌ [Student] Erreur affichage évaluation', [
                'evaluation_id' => $evaluation->id,
                'user_id' => auth()->id(),
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->route('student.evaluations')
                ->with('error', '❌ Une erreur est survenue.');
        }
    }

    // ✅ SOUMISSION D'UNE ÉVALUATION (Étudiant)
    public function soumettre(Request $request, Evaluation $evaluation)
    {
        try {
            $student = auth()->user()->student;

            if (!$student) {
                return response()->json(['error' => 'Étudiant non trouvé'], 404);
            }

            Log::info('📤 [Student] Soumission évaluation', [
                'student_id' => $student->id,
                'evaluation_id' => $evaluation->id,
            ]);

            $hasAccess = false;
            if ($evaluation->type === 'vague' && $student->vague_id === $evaluation->vague_id) {
                $hasAccess = true;
            }
            if ($evaluation->type === 'certification' && $student->certification_id === $evaluation->certification_id) {
                $hasAccess = true;
            }

            if ($hasAccess) {
                $hasAccess = $student->peutAccederContenu($evaluation->tranche_requise_id);
            }

            if (!$hasAccess) {
                Log::warning('⚠️ [Student] Tentative de soumission sans accès', [
                    'student_id' => $student->id,
                    'evaluation_id' => $evaluation->id,
                ]);
                return response()->json(['error' => 'Accès non autorisé'], 403);
            }

            $existing = SoumissionEvaluation::where('evaluation_id', $evaluation->id)
                ->where('student_id', $student->id)
                ->first();

            if ($existing) {
                Log::warning('⚠️ [Student] Tentative de double soumission', [
                    'student_id' => $student->id,
                    'evaluation_id' => $evaluation->id,
                ]);
                return response()->json(['error' => 'Vous avez déjà soumis cette évaluation.'], 400);
            }

            $validated = $request->validate([
                'fichier' => 'required|file|max:20480',
                'commentaire' => 'nullable|string',
            ]);

            $soumission = DB::transaction(function () use ($request, $evaluation, $student, $validated) {
                $path = $request->file('fichier')->store('soumissions_evaluations', 'public');

                $soumission = SoumissionEvaluation::create([
                    'evaluation_id' => $evaluation->id,
                    'student_id' => $student->id,
                    'fichier' => [
                        'url' => asset('storage/' . $path),
                        'name' => $request->file('fichier')->getClientOriginalName(),
                        'size' => $request->file('fichier')->getSize(),
                        'extension' => $request->file('fichier')->getClientOriginalExtension(),
                    ],
                    'commentaire' => $validated['commentaire'] ?? null,
                    'statut' => 'soumis',
                    'submitted_at' => now(),
                ]);

                $this->notifyAdminSoumission($evaluation, $student);

                Log::info('✅ [Student] Évaluation soumise avec succès', [
                    'evaluation_id' => $evaluation->id,
                    'student_id' => $student->id,
                    'soumission_id' => $soumission->id,
                ]);

                return $soumission;
            });

            return redirect()->route('student.evaluations.show', $evaluation->id)
                ->with('success', '✅ Évaluation soumise avec succès !');

        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('❌ [Student] Validation échouée', [
                'evaluation_id' => $evaluation->id,
                'errors' => $e->errors(),
            ]);
            return redirect()->back()
                ->withInput()
                ->withErrors($e->errors());
        } catch (\Exception $e) {
            Log::error('❌ [Student] Erreur soumission évaluation', [
                'evaluation_id' => $evaluation->id,
                'student_id' => auth()->user()->student?->id,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()
                ->with('error', '❌ Une erreur est survenue lors de la soumission.');
        }
    }

    // ✅ NOTIFICATION À L'ADMIN (Soumission)
    private function notifyAdminSoumission(Evaluation $evaluation, Student $student)
    {
        Log::info('🔔 [Student] Notification admin soumission évaluation', [
            'evaluation_id' => $evaluation->id,
            'student_id' => $student->id,
        ]);

        $admins = User::whereIn('role', ['super_admin', 'admin_centre', 'admin'])->get();

        foreach ($admins as $admin) {
            try {
                $notification = Notification::create([
                    'user_id' => $admin->id,
                    'user_creator_id' => $student->user_id,
                    'type' => 'evaluation',
                    'notifiable_type' => Evaluation::class,
                    'notifiable_id' => $evaluation->id,
                    'title' => "📤 Évaluation soumise",
                    'message' => "{$student->full_name} a soumis l'évaluation '{$evaluation->titre}'.",
                    'link' => "/admin/evaluations/{$evaluation->id}",
                    'data' => [
                        'action' => 'soumis',
                        'evaluation_id' => $evaluation->id,
                        'student_id' => $student->id,
                        'student_name' => $student->full_name,
                    ],
                    'read_at' => null,
                ]);

                event(new NotificationCreated($notification));
                Log::info('✅ [Student] Notification envoyée à l\'admin', [
                    'admin_id' => $admin->id,
                    'notification_id' => $notification->id,
                ]);
            } catch (\Exception $e) {
                Log::warning('⚠️ [Student] Erreur broadcast admin', [
                    'admin_id' => $admin->id,
                    'message' => $e->getMessage(),
                ]);
            }
        }
    }
}
