<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Devoir;
use App\Models\SoumissionDevoir;
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

class DevoirController extends Controller
{
    public function index()
    {
        try {
            $student = auth()->user()->student;

            if (!$student) {
                return redirect()->back()->with('error', '❌ Aucun profil étudiant trouvé.');
            }

            Log::info('📄 [Student] Liste des devoirs', [
                'student_id' => $student->id,
                'student_name' => $student->full_name,
                'vague_id' => $student->vague_id,
                'certification_id' => $student->certification_id,
            ]);

            // ✅ Récupérer tous les devoirs de la formation/certification
            $allDevoirs = Devoir::where('is_active', true)
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
                ->orderBy('date_limite', 'asc')
                ->get();

            Log::info('📄 [Student] Devoirs trouvés', [
                'total' => $allDevoirs->count()
            ]);

            // ✅ Transformer les devoirs avec statut d'accès
            $devoirsList = $allDevoirs->map(function ($d) use ($student) {
                $soumission = SoumissionDevoir::where('devoir_id', $d->id)
                    ->where('student_id', $student->id)
                    ->first();

                // ✅ Vérifier si l'étudiant peut accéder au contenu
                $peutAcceder = $student->peutAccederContenu($d->tranche_requise_id);

                // ✅ Récupérer les infos de la tranche requise si elle existe
                $trancheInfo = null;
                if ($d->tranche_requise_id) {
                    $tranche = Tranche::find($d->tranche_requise_id);
                    if ($tranche) {
                        $trancheInfo = [
                            'id' => $tranche->id,
                            'numero' => $tranche->numero,
                            'montant' => $tranche->montant,
                            'lien' => $tranche->lien_paiement,
                        ];
                    }
                }

                return [
                    'id' => $d->id,
                    'titre' => $d->titre,
                    'description' => $d->description,
                    'date_limite' => $d->date_limite?->format('d/m/Y H:i'),
                    'est_depasse' => $d->est_depasse,
                    'jours_restants' => $d->jours_restants,
                    'has_files' => !empty($d->contenu),
                    'soumis' => $soumission !== null,
                    'soumission_statut' => $soumission?->statut,
                    'note' => $soumission?->note,
                    'formation' => [
                        'id' => $d->formation_id,
                        'name' => $d->formation?->name,
                    ],
                    // ✅ Nouveaux champs pour le blocage
                    'est_accessible' => $peutAcceder,
                    'tranche_requise' => $trancheInfo,
                    'est_verrouille' => !$peutAcceder && $trancheInfo !== null,
                ];
            });

            // ✅ Statistiques
            $stats = [
                'total' => $devoirsList->count(),
                'soumis' => $devoirsList->filter(fn($d) => $d['soumis'])->count(),
                'en_attente' => $devoirsList->filter(fn($d) => !$d['soumis'])->count(),
                'corriges' => $devoirsList->filter(fn($d) => $d['soumission_statut'] === 'corrige')->count(),
                'accessibles' => $devoirsList->filter(fn($d) => $d['est_accessible'])->count(),
                'verrouilles' => $devoirsList->filter(fn($d) => $d['est_verrouille'])->count(),
            ];

            Log::info('📄 [Student] Statistiques devoirs', $stats);

            return Inertia::render('Student/Devoirs/Index', [
                'devoirs' => $devoirsList,
                'stats' => $stats,
            ]);

        } catch (\Exception $e) {
            Log::error('❌ [Student] Erreur chargement devoirs', [
                'user_id' => auth()->id(),
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()->with('error', '❌ Une erreur est survenue.');
        }
    }

    public function show(Devoir $devoir)
    {
        try {
            $student = auth()->user()->student;

            if (!$student) {
                return redirect()->back()->with('error', '❌ Aucun profil étudiant trouvé.');
            }

            Log::info('👁️ [Student] Affichage devoir', [
                'student_id' => $student->id,
                'devoir_id' => $devoir->id,
                'devoir_titre' => $devoir->titre,
            ]);

            // ✅ Vérifier que l'étudiant a accès à ce devoir
            $hasAccess = false;
            if ($devoir->type === 'vague' && $student->vague_id === $devoir->vague_id) {
                $hasAccess = true;
            }
            if ($devoir->type === 'certification' && $student->certification_id === $devoir->certification_id) {
                $hasAccess = true;
            }

            if (!$hasAccess) {
                Log::warning('⚠️ [Student] Accès refusé au devoir', [
                    'student_id' => $student->id,
                    'devoir_id' => $devoir->id,
                    'type' => $devoir->type,
                    'vague_id' => $devoir->vague_id,
                    'student_vague_id' => $student->vague_id,
                ]);
                abort(403, '❌ Vous n\'avez pas accès à ce devoir.');
            }

            // ✅ Vérifier l'accès par tranche
            $peutAcceder = $student->peutAccederContenu($devoir->tranche_requise_id);

            // ✅ Récupérer les infos de la tranche requise
            $trancheInfo = null;
            if ($devoir->tranche_requise_id) {
                $tranche = Tranche::find($devoir->tranche_requise_id);
                if ($tranche) {
                    $trancheInfo = [
                        'id' => $tranche->id,
                        'numero' => $tranche->numero,
                        'montant' => $tranche->montant,
                        'lien' => $tranche->lien_paiement,
                    ];
                }
            }

            $soumission = SoumissionDevoir::where('devoir_id', $devoir->id)
                ->where('student_id', $student->id)
                ->first();

            Log::info('✅ [Student] Devoir affiché', [
                'devoir_id' => $devoir->id,
                'est_accessible' => $peutAcceder,
                'soumis' => $soumission !== null,
            ]);

            return Inertia::render('Student/Devoirs/Show', [
                'devoir' => [
                    'id' => $devoir->id,
                    'titre' => $devoir->titre,
                    'description' => $devoir->description,
                    'contenu' => $devoir->contenu,
                    'date_limite' => $devoir->date_limite?->format('d/m/Y H:i'),
                    'est_depasse' => $devoir->est_depasse,
                    'jours_restants' => $devoir->jours_restants,
                    'formation' => [
                        'id' => $devoir->formation_id,
                        'name' => $devoir->formation?->name,
                    ],
                    // ✅ Nouveaux champs
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
            Log::error('❌ [Student] Erreur affichage devoir', [
                'devoir_id' => $devoir->id,
                'user_id' => auth()->id(),
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->route('student.devoirs')
                ->with('error', '❌ Une erreur est survenue.');
        }
    }

    // ✅ SOUMISSION D'UN DEVOIR (Étudiant)
    public function soumettre(Request $request, Devoir $devoir)
    {
        try {
            $student = auth()->user()->student;

            if (!$student) {
                return response()->json(['error' => 'Étudiant non trouvé'], 404);
            }

            Log::info('📤 [Student] Soumission devoir', [
                'student_id' => $student->id,
                'devoir_id' => $devoir->id,
            ]);

            // ✅ Vérifier l'accès
            $hasAccess = false;
            if ($devoir->type === 'vague' && $student->vague_id === $devoir->vague_id) {
                $hasAccess = true;
            }
            if ($devoir->type === 'certification' && $student->certification_id === $devoir->certification_id) {
                $hasAccess = true;
            }

            // ✅ Vérifier l'accès par tranche
            if ($hasAccess) {
                $hasAccess = $student->peutAccederContenu($devoir->tranche_requise_id);
            }

            if (!$hasAccess) {
                Log::warning('⚠️ [Student] Tentative de soumission sans accès', [
                    'student_id' => $student->id,
                    'devoir_id' => $devoir->id,
                ]);
                return response()->json(['error' => 'Accès non autorisé'], 403);
            }

            // ✅ Vérifier si déjà soumis
            $existing = SoumissionDevoir::where('devoir_id', $devoir->id)
                ->where('student_id', $student->id)
                ->first();

            if ($existing) {
                Log::warning('⚠️ [Student] Tentative de double soumission', [
                    'student_id' => $student->id,
                    'devoir_id' => $devoir->id,
                ]);
                return response()->json(['error' => 'Vous avez déjà soumis ce devoir.'], 400);
            }

            $validated = $request->validate([
                'fichier' => 'required|file|max:20480',
                'commentaire' => 'nullable|string',
            ]);

            $soumission = DB::transaction(function () use ($request, $devoir, $student, $validated) {
                $path = $request->file('fichier')->store('soumissions', 'public');

                $soumission = SoumissionDevoir::create([
                    'devoir_id' => $devoir->id,
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

                // ✅ NOTIFICATION À L'ADMIN
                $this->notifyAdminSoumission($devoir, $student);

                Log::info('✅ [Student] Devoir soumis avec succès', [
                    'devoir_id' => $devoir->id,
                    'student_id' => $student->id,
                    'soumission_id' => $soumission->id,
                ]);

                return $soumission;
            });

            return redirect()->route('student.devoirs.show', $devoir->id)
                ->with('success', '✅ Devoir soumis avec succès !');

        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('❌ [Student] Validation échouée', [
                'devoir_id' => $devoir->id,
                'errors' => $e->errors(),
            ]);
            return redirect()->back()
                ->withInput()
                ->withErrors($e->errors());
        } catch (\Exception $e) {
            Log::error('❌ [Student] Erreur soumission devoir', [
                'devoir_id' => $devoir->id,
                'student_id' => auth()->user()->student?->id,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()
                ->with('error', '❌ Une erreur est survenue lors de la soumission.');
        }
    }

    // ✅ NOTIFICATION À L'ADMIN (Soumission)
    private function notifyAdminSoumission(Devoir $devoir, Student $student)
    {
        Log::info('🔔 [Student] Notification admin soumission', [
            'devoir_id' => $devoir->id,
            'student_id' => $student->id,
        ]);

        $admins = User::whereIn('role', ['super_admin', 'admin_centre', 'admin'])->get();

        foreach ($admins as $admin) {
            try {
                $notification = Notification::create([
                    'user_id' => $admin->id,
                    'user_creator_id' => $student->user_id,
                    'type' => 'devoir',
                    'notifiable_type' => Devoir::class,
                    'notifiable_id' => $devoir->id,
                    'title' => "📄 Devoir soumis",
                    'message' => "{$student->full_name} a soumis le devoir '{$devoir->titre}'.",
                    'link' => "/admin/devoirs/{$devoir->id}",
                    'data' => [
                        'action' => 'soumis',
                        'devoir_id' => $devoir->id,
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
