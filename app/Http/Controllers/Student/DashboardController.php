<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Cours;
use App\Models\Devoir;
use App\Models\Evaluation;
use App\Models\CoursVue;
use App\Models\SoumissionDevoir;
use App\Models\SoumissionEvaluation;
use App\Models\PaiementTranche;
use App\Models\Tranche;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        try {
            $user = auth()->user();
            $student = $user->student;

            if (!$student) {
                return redirect()->back()->with('error', '❌ Aucun profil étudiant trouvé.');
            }

            // ============================================
            // INFORMATIONS ÉTUDIANT + TRANCHES
            // ============================================
            $formationId = null;
            $tranchesData = [];
            $toutesTranchesPayees = false;

            if ($student->vague_id) {
                $formationId = $student->vague->formation_id;

                $tranches = Tranche::where('formation_id', $formationId)
                    ->orderBy('numero')
                    ->get();

                foreach ($tranches as $tranche) {
                    $paiement = PaiementTranche::where('student_id', $student->id)
                        ->where('tranche_id', $tranche->id)
                        ->first();

                    $tranchesData[] = [
                        'id' => $tranche->id,
                        'numero' => $tranche->numero,
                        'montant' => $tranche->montant,
                        'lien_paiement' => $tranche->lien_paiement,
                        'est_payee' => $paiement && !is_null($paiement->paye_le),
                        'est_en_attente' => $paiement && is_null($paiement->paye_le),
                        'paiement_id' => $paiement?->id,
                    ];
                }

                $toutesTranchesPayees = collect($tranchesData)->every(fn($t) => $t['est_payee']);
            }

            $studentInfo = [
                'id' => $student->id,
                'first_name' => $student->first_name,
                'last_name' => $student->last_name,
                'full_name' => $student->full_name,
                'matricule' => $student->matricule,
                'phone' => $student->phone,
                'student_type' => $student->student_type_label,
                'is_certification' => $student->isCertification(),
                'vague' => $student->vague ? [
                    'id' => $student->vague->id,
                    'name' => $student->vague->name,
                    'formation' => $student->vague->formation?->name,
                    'formation_id' => $student->vague->formation_id,
                    'lien_paiement_total' => $student->vague->formation?->lien_paiement_total,
                ] : null,
                'certification' => $student->certification ? [
                    'id' => $student->certification->id,
                    'titre' => $student->certification->titre,
                    'formation' => $student->certification->formation?->name,
                ] : null,
                'tranches' => $tranchesData,
                'toutes_tranches_payees' => $toutesTranchesPayees,
                'derniere_tranche_payee' => $student->derniereTranchePayeeNumero(),
            ];

            // ============================================
            // STATISTIQUES (Cours, Devoirs, Évaluations)
            // ============================================

            // --- COURS ---
            $coursQuery = Cours::where('is_active', true)
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
                });

            $coursAccessibles = $coursQuery->get()->filter(function ($cours) use ($student) {
                return $student->peutAccederContenu($cours->tranche_requise_id);
            });

            $totalCours = $coursAccessibles->count();
            $coursVus = CoursVue::where('student_id', $student->id)
                ->whereIn('cours_id', $coursAccessibles->pluck('id'))
                ->count();

            // --- DEVOIRS ---
            $devoirsQuery = Devoir::where('is_active', true)
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
                });

            $devoirsAccessibles = $devoirsQuery->get()->filter(function ($devoir) use ($student) {
                return $student->peutAccederContenu($devoir->tranche_requise_id);
            });

            $totalDevoirs = $devoirsAccessibles->count();
            $devoirsSoumis = SoumissionDevoir::where('student_id', $student->id)
                ->whereIn('devoir_id', $devoirsAccessibles->pluck('id'))
                ->where('statut', 'soumis')
                ->count();
            $devoirsCorriges = SoumissionDevoir::where('student_id', $student->id)
                ->whereIn('devoir_id', $devoirsAccessibles->pluck('id'))
                ->where('statut', 'corrige')
                ->count();

            // --- ÉVALUATIONS ---
            $evaluationsQuery = Evaluation::where('is_active', true)
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
                });

            $evaluationsAccessibles = $evaluationsQuery->get()->filter(function ($evaluation) use ($student) {
                return $student->peutAccederContenu($evaluation->tranche_requise_id);
            });

            $totalEvaluations = $evaluationsAccessibles->count();
            $evaluationsSoumis = SoumissionEvaluation::where('student_id', $student->id)
                ->whereIn('evaluation_id', $evaluationsAccessibles->pluck('id'))
                ->where('statut', 'soumis')
                ->count();
            $evaluationsCorriges = SoumissionEvaluation::where('student_id', $student->id)
                ->whereIn('evaluation_id', $evaluationsAccessibles->pluck('id'))
                ->where('statut', 'corrige')
                ->count();

            // --- MOYENNE GÉNÉRALE (Devoirs + Évaluations) ---
            $moyenneDevoirs = SoumissionDevoir::where('student_id', $student->id)
                ->whereIn('devoir_id', $devoirsAccessibles->pluck('id'))
                ->where('statut', 'corrige')
                ->avg('note');

            $moyenneEvaluations = SoumissionEvaluation::where('student_id', $student->id)
                ->whereIn('evaluation_id', $evaluationsAccessibles->pluck('id'))
                ->where('statut', 'corrige')
                ->avg('note');

            $notes = [];
            if ($moyenneDevoirs) $notes[] = $moyenneDevoirs;
            if ($moyenneEvaluations) $notes[] = $moyenneEvaluations;
            $moyenneGenerale = !empty($notes) ? round(array_sum($notes) / count($notes), 2) : null;

            // --- STATS GLOBALES ---
            $stats = [
                'total_cours' => $totalCours,
                'cours_vus' => $coursVus,
                'total_devoirs' => $totalDevoirs,
                'devoirs_soumis' => $devoirsSoumis,
                'devoirs_corriges' => $devoirsCorriges,
                'total_evaluations' => $totalEvaluations,
                'evaluations_soumis' => $evaluationsSoumis,
                'evaluations_corriges' => $evaluationsCorriges,
                'moyenne' => $moyenneGenerale,
            ];

            // ============================================
            // DERNIERS COURS
            // ============================================
            $derniersCours = $coursAccessibles
                ->sortByDesc('created_at')
                ->take(5)
                ->map(function ($cours) use ($student) {
                    $vue = CoursVue::where('cours_id', $cours->id)
                        ->where('student_id', $student->id)
                        ->first();

                    return [
                        'id' => $cours->id,
                        'titre' => $cours->titre,
                        'description' => $cours->description,
                        'has_video' => !empty($cours->video_url),
                        'has_files' => !empty($cours->contenu),
                        'vu' => $vue !== null,
                        'created_at' => $cours->created_at->diffForHumans(),
                        'link' => "/student/cours/{$cours->id}",
                    ];
                })->values();

            // ============================================
            // DEVOIRS À RENDRE
            // ============================================
            $devoirsARendre = $devoirsAccessibles
                ->filter(function ($devoir) use ($student) {
                    return !SoumissionDevoir::where('student_id', $student->id)
                        ->where('devoir_id', $devoir->id)
                        ->exists();
                })
                ->sortBy('date_limite')
                ->take(5)
                ->map(function ($devoir) {
                    return [
                        'id' => $devoir->id,
                        'titre' => $devoir->titre,
                        'date_limite' => $devoir->date_limite?->format('d/m/Y H:i'),
                        'est_depasse' => $devoir->est_depasse,
                        'jours_restants' => $devoir->jours_restants,
                        'has_files' => !empty($devoir->contenu),
                        'link' => "/student/devoirs/{$devoir->id}",
                    ];
                })->values();

            // ============================================
            // DERNIÈRES NOTES (Devoirs + Évaluations)
            // ============================================
            $dernieresNotes = collect();

            // Notes de devoirs
            $notesDevoirs = SoumissionDevoir::where('student_id', $student->id)
                ->where('statut', 'corrige')
                ->whereIn('devoir_id', $devoirsAccessibles->pluck('id'))
                ->with(['devoir' => function ($query) {
                    $query->select('id', 'titre');
                }])
                ->orderBy('corrected_at', 'desc')
                ->limit(5)
                ->get()
                ->map(function ($soumission) {
                    return [
                        'id' => $soumission->id,
                        'titre' => $soumission->devoir?->titre ?? 'Devoir',
                        'type' => 'Devoir',
                        'note' => $soumission->note,
                        'commentaire' => $soumission->commentaire,
                        'corrected_at' => $soumission->corrected_at?->diffForHumans(),
                        'link' => "/student/devoirs/{$soumission->devoir_id}",
                    ];
                });

            // Notes d'évaluations
            $notesEvaluations = SoumissionEvaluation::where('student_id', $student->id)
                ->where('statut', 'corrige')
                ->whereIn('evaluation_id', $evaluationsAccessibles->pluck('id'))
                ->with(['evaluation' => function ($query) {
                    $query->select('id', 'titre');
                }])
                ->orderBy('corrected_at', 'desc')
                ->limit(5)
                ->get()
                ->map(function ($soumission) {
                    return [
                        'id' => $soumission->id,
                        'titre' => $soumission->evaluation?->titre ?? 'Évaluation',
                        'type' => 'Évaluation',
                        'note' => $soumission->note,
                        'commentaire' => $soumission->commentaire,
                        'corrected_at' => $soumission->corrected_at?->diffForHumans(),
                        'link' => "/student/evaluations/{$soumission->evaluation_id}",
                    ];
                });

            $dernieresNotes = $notesDevoirs->concat($notesEvaluations)
                ->sortByDesc('corrected_at')
                ->take(5)
                ->values();

            return Inertia::render('Student/Dashboard', [
                'student' => $studentInfo,
                'stats' => $stats,
                'derniersCours' => $derniersCours,
                'devoirsARendre' => $devoirsARendre,
                'dernieresNotes' => $dernieresNotes,
            ]);

        } catch (\Exception $e) {
            Log::error('Erreur chargement dashboard étudiant', [
                'user_id' => auth()->id(),
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()->with('error', '❌ Une erreur est survenue.');
        }
    }
}
