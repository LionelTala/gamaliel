<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Devoir;
use App\Models\Formation;
use App\Models\Vague;
use App\Models\Certification;
use App\Models\SoumissionDevoir;
use App\Models\Student;
use App\Models\Notification;
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
    public function index(Request $request)
    {
        try {
            // ✅ Pagination avec 20 éléments par page
            $devoirs = Devoir::with(['formation', 'vague', 'certification', 'trancheRequise', 'student'])
                ->orderBy('created_at', 'desc')
                ->paginate(10) // ✅ Pagination 20 éléments
                ->withQueryString() // ✅ Garder les paramètres de recherche
                ->through(function ($d) {
                    // ✅ Calcul dynamique des destinataires
                    $destinataires = $this->getDestinataires($d);

                    return [
                        'id' => $d->id,
                        'titre' => $d->titre,
                        'description' => $d->description,
                        'date_limite' => $d->date_limite?->format('d/m/Y H:i'),
                        'type' => $d->type,
                        'est_depasse' => $d->est_depasse,
                        'jours_restants' => $d->jours_restants,
                        'total_etudiants' => $destinataires->count(),
                        'soumissions_count' => $d->soumissions_count,
                        'soumis_count' => $d->soumis_count,
                        'corrige_count' => $d->corrige_count,
                        'taux_soumission' => $destinataires->count() > 0
                            ? round(($d->soumissions_count / $destinataires->count()) * 100, 1)
                            : 0,
                        'is_active' => $d->is_active,
                        'has_notification_sent' => $d->has_notification_sent,
                        'mode_envoi' => $d->student_id ? 'individuel' : 'groupe',
                        'tranche_requise' => $d->trancheRequise ? [
                            'id' => $d->trancheRequise->id,
                            'numero' => $d->trancheRequise->numero,
                            'montant' => $d->trancheRequise->montant,
                        ] : null,
                        'formation' => $d->formation ? [
                            'id' => $d->formation->id,
                            'name' => $d->formation->name,
                        ] : null,
                        'vague' => $d->vague ? [
                            'id' => $d->vague->id,
                            'name' => $d->vague->name,
                        ] : null,
                        'certification' => $d->certification ? [
                            'id' => $d->certification->id,
                            'titre' => $d->certification->titre,
                        ] : null,
                        'created_at' => $d->created_at->format('d/m/Y H:i'),
                    ];
                });

            return Inertia::render('Admin/Devoirs/Index', [
                'devoirs' => $devoirs,
            ]);
        } catch (\Exception $e) {
            Log::error('Erreur chargement devoirs', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            return redirect()->back()->with('error', '❌ Une erreur est survenue.');
        }
    }

    public function create()
    {
        $formations = Formation::where('is_active', true)
            ->orderBy('name')
            ->get()
            ->map(function ($f) {
                return [
                    'id' => $f->id,
                    'name' => $f->name,
                    'abbreviation' => $f->abbreviation,
                ];
            });

        return Inertia::render('Admin/Devoirs/Create', [
            'formations' => $formations,
        ]);
    }

    public function getVaguesByFormation($formationId)
    {
        $vagues = Vague::where('formation_id', $formationId)
            ->where('is_active', true)
            ->orderBy('date_debut')
            ->get()
            ->map(function ($v) {
                return [
                    'id' => $v->id,
                    'name' => $v->name,
                    'date_debut' => $v->date_debut->format('d/m/Y'),
                    'is_active' => (bool) $v->is_active,
                ];
            });

        return response()->json($vagues);
    }

    public function getCertificationsByFormation($formationId)
    {
        $certifications = Certification::where('formation_id', $formationId)
            ->where('is_active', true)
            ->orderBy('titre')
            ->get()
            ->map(function ($c) {
                return [
                    'id' => $c->id,
                    'titre' => $c->titre,
                    'is_active' => (bool) $c->is_active,
                ];
            });

        return response()->json($certifications);
    }

    public function getStudentsByCertification($certificationId)
    {
        $students = Student::where('certification_id', $certificationId)
            ->with('user')
            ->orderBy('last_name')
            ->get()
            ->map(function ($s) {
                return [
                    'id' => $s->id,
                    'name' => $s->full_name,
                    'matricule' => $s->matricule,
                ];
            });

        return response()->json($students);
    }

    public function getTranchesByFormation($formationId)
    {
        Log::info('🔍 [Devoir] getTranchesByFormation - Appel', [
            'formation_id' => $formationId,
            'user' => auth()->id()
        ]);

        try {
            $tranches = Tranche::where('formation_id', $formationId)
                ->orderBy('numero')
                ->get(['id', 'numero', 'montant']);

            return response()->json($tranches);
        } catch (\Exception $e) {
            Log::error('❌ [Devoir] getTranchesByFormation - Erreur', [
                'formation_id' => $formationId,
                'message' => $e->getMessage(),
            ]);
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'titre' => 'required|string|max:255',
                'description' => 'nullable|string',
                'formation_id' => 'required|exists:formations,id',
                'type' => 'required|in:vague,certification',
                'mode_envoi' => 'required|in:groupe,individuel',
                'vague_id' => 'required_if:mode_envoi,groupe|nullable|exists:vagues,id',
                'certification_id' => 'required_if:type,certification|nullable|exists:certifications,id',
                'student_id' => 'required_if:mode_envoi,individuel|nullable|exists:students,id',
                'tranche_requise_id' => 'nullable|exists:tranches,id',
                'date_limite' => 'nullable|date|after:now',
                'files' => 'nullable|array',
                'files.*' => 'file|max:20480',
                'is_active' => 'boolean',
                'order' => 'integer|min:0',
                'send_notification' => 'boolean',
            ]);

            $devoir = DB::transaction(function () use ($request, $validated) {
                $contenu = [];
                if ($request->hasFile('files')) {
                    foreach ($request->file('files') as $file) {
                        $path = $file->store('devoirs', 'public');
                        $contenu[] = [
                            'type' => $file->getClientMimeType(),
                            'url' => asset('storage/' . $path),
                            'name' => $file->getClientOriginalName(),
                            'size' => $file->getSize(),
                            'extension' => $file->getClientOriginalExtension(),
                        ];
                    }
                }

                $devoir = Devoir::create([
                    'titre' => $validated['titre'],
                    'description' => $validated['description'] ?? null,
                    'contenu' => $contenu,
                    'date_limite' => $validated['date_limite'] ?? null,
                    'formation_id' => $validated['formation_id'],
                    'vague_id' => $validated['mode_envoi'] === 'groupe' ? $validated['vague_id'] : null,
                    'certification_id' => $validated['certification_id'] ?? null,
                    'type' => $validated['type'],
                    'student_id' => $validated['mode_envoi'] === 'individuel' ? $validated['student_id'] : null,
                    'tranche_requise_id' => $validated['tranche_requise_id'] ?? null,
                    'is_active' => $validated['is_active'] ?? true,
                    'order' => $validated['order'] ?? 0,
                ]);

                if ($validated['send_notification'] ?? true) {
                    $this->notifyStudentsNewDevoir($devoir);
                }

                return $devoir;
            });

            Log::info('Devoir créé', [
                'devoir_id' => $devoir->id,
                'titre' => $devoir->titre,
                'mode_envoi' => $validated['mode_envoi'],
                'created_by' => auth()->id(),
            ]);

            return redirect()->route('admin.devoirs.index')
                ->with('success', "✅ Devoir '{$devoir->titre}' créé avec succès !" .
                    (($validated['send_notification'] ?? true) ? ' 🔔 Les étudiants ont été notifiés.' : ''));

        } catch (\Exception $e) {
            Log::error('Erreur création devoir', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'data' => $request->except(['files']),
            ]);

            return redirect()->back()
                ->withInput()
                ->with('error', '❌ Une erreur est survenue lors de la création.');
        }
    }

    /**
     * ✅ Détermine les destinataires réels du devoir avec filtrage dynamique par tranche
     */
    private function getDestinataires(Devoir $devoir)
    {
        Log::info('👥 [Devoir] getDestinataires', [
            'devoir_id' => $devoir->id,
            'student_id' => $devoir->student_id,
            'vague_id' => $devoir->vague_id,
            'tranche_requise_id' => $devoir->tranche_requise_id
        ]);

        // Cas 1 : Envoi individuel
        if ($devoir->student_id) {
            $students = Student::where('id', $devoir->student_id)->get();
            Log::info('👥 [Devoir] getDestinataires - Individuel', ['count' => $students->count()]);
            return $students;
        }

        // Cas 2 : Envoi groupé par vague
        if ($devoir->vague_id) {
            $students = Student::where('vague_id', $devoir->vague_id)->get();

            // ✅ Filtrer par tranche en temps réel
            if ($devoir->tranche_requise_id) {
                $tranche = Tranche::find($devoir->tranche_requise_id);
                if ($tranche) {
                    $students = $students->filter(function ($student) use ($tranche) {
                        return $student->derniereTranchePayeeNumero() >= $tranche->numero;
                    });
                    Log::info('👥 [Devoir] getDestinataires - Filtré par tranche', [
                        'tranche_numero' => $tranche->numero,
                        'count' => $students->count()
                    ]);
                }
            }

            Log::info('👥 [Devoir] getDestinataires - Groupe', ['count' => $students->count()]);
            return $students;
        }

        Log::warning('👥 [Devoir] getDestinataires - Aucun destinataire');
        return collect();
    }

    private function notifyStudentsNewDevoir(Devoir $devoir)
    {
        $students = $this->getDestinataires($devoir);

        foreach ($students as $student) {
            try {
                $notification = Notification::create([
                    'user_id' => $student->user_id,
                    'user_creator_id' => auth()->id(),
                    'type' => 'devoir',
                    'notifiable_type' => Devoir::class,
                    'notifiable_id' => $devoir->id,
                    'title' => "📄 {$devoir->titre}",
                    'message' => "Nouveau devoir disponible : {$devoir->titre}" . ($devoir->date_limite ? " (À rendre avant le " . $devoir->date_limite->format('d/m/Y H:i') . ")" : ''),
                    'link' => "/student/devoirs/{$devoir->id}",
                    'data' => [
                        'action' => 'nouveau',
                        'devoir_id' => $devoir->id,
                        'titre' => $devoir->titre,
                        'date_limite' => $devoir->date_limite?->format('d/m/Y H:i'),
                        'mode_envoi' => $devoir->student_id ? 'individuel' : 'groupe',
                    ],
                    'read_at' => null,
                ]);

                event(new NotificationCreated($notification));
            } catch (\Exception $e) {
                Log::warning('Erreur broadcast devoir étudiant', [
                    'student_id' => $student->id,
                    'devoir_id' => $devoir->id,
                    'message' => $e->getMessage(),
                ]);
            }
        }

        $devoir->update([
            'has_notification_sent' => true,
            'notification_sent_at' => now(),
        ]);

        Log::info('Notifications devoir envoyées', [
            'devoir_id' => $devoir->id,
            'students_count' => $students->count(),
            'mode' => $devoir->student_id ? 'individuel' : 'groupe',
        ]);
    }

    private function notifyAdminSoumission(Devoir $devoir, Student $student)
    {
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
            } catch (\Exception $e) {
                Log::warning('Erreur broadcast admin soumission', [
                    'admin_id' => $admin->id,
                    'message' => $e->getMessage(),
                ]);
            }
        }
    }

    private function notifyStudentCorrection(SoumissionDevoir $soumission)
    {
        try {
            $notification = Notification::create([
                'user_id' => $soumission->student->user_id,
                'user_creator_id' => auth()->id(),
                'type' => 'devoir',
                'notifiable_type' => Devoir::class,
                'notifiable_id' => $soumission->devoir_id,
                'title' => "📄 Devoir corrigé",
                'message' => "Votre devoir '{$soumission->devoir->titre}' a été corrigé. Note : {$soumission->note}/20",
                'link' => "/student/devoirs/{$soumission->devoir_id}",
                'data' => [
                    'action' => 'corrige',
                    'devoir_id' => $soumission->devoir_id,
                    'titre' => $soumission->devoir->titre,
                    'note' => $soumission->note,
                ],
                'read_at' => null,
            ]);

            event(new NotificationCreated($notification));
        } catch (\Exception $e) {
            Log::warning('Erreur broadcast correction étudiant', [
                'student_id' => $soumission->student->user_id,
                'message' => $e->getMessage(),
            ]);
        }
    }

    public function show(Devoir $devoir)
    {
        $devoir->load(['formation', 'vague', 'certification', 'trancheRequise', 'student']);

        // ✅ Calcul dynamique des destinataires
        $destinataires = $this->getDestinataires($devoir);

        $soumissions = $devoir->soumissions()->with('student')->get()->map(function ($s) {
            return [
                'id' => $s->id,
                'student_id' => $s->student_id,
                'student_name' => $s->student->full_name,
                'matricule' => $s->student->matricule,
                'fichier' => $s->fichier,
                'commentaire' => $s->commentaire,
                'note' => $s->note,
                'statut' => $s->statut,
                'statut_label' => $s->statut_label,
                'statut_color' => $s->statut_color,
                'est_en_retard' => $s->est_en_retard,
                'submitted_at' => $s->submitted_at?->format('d/m/Y H:i'),
                'corrected_at' => $s->corrected_at?->format('d/m/Y H:i'),
            ];
        });

        return Inertia::render('Admin/Devoirs/Show', [
            'devoir' => [
                'id' => $devoir->id,
                'titre' => $devoir->titre,
                'description' => $devoir->description,
                'contenu' => $devoir->contenu,
                'date_limite' => $devoir->date_limite?->format('d/m/Y H:i'),
                'est_depasse' => $devoir->est_depasse,
                'jours_restants' => $devoir->jours_restants,
                'type' => $devoir->type,
                'mode_envoi' => $devoir->student_id ? 'individuel' : 'groupe',
                'total_etudiants' => $destinataires->count(),
                'soumissions_count' => $devoir->soumissions_count,
                'soumis_count' => $devoir->soumis_count,
                'corrige_count' => $devoir->corrige_count,
                'taux_soumission' => $destinataires->count() > 0
                    ? round(($devoir->soumissions_count / $destinataires->count()) * 100, 1)
                    : 0,
                'has_notification_sent' => $devoir->has_notification_sent,
                'notification_sent_at' => $devoir->notification_sent_at?->format('d/m/Y H:i'),
                'formation' => $devoir->formation ? [
                    'id' => $devoir->formation->id,
                    'name' => $devoir->formation->name,
                ] : null,
                'vague' => $devoir->vague ? [
                    'id' => $devoir->vague->id,
                    'name' => $devoir->vague->name,
                ] : null,
                'certification' => $devoir->certification ? [
                    'id' => $devoir->certification->id,
                    'titre' => $devoir->certification->titre,
                ] : null,
                'student' => $devoir->student ? [
                    'id' => $devoir->student->id,
                    'name' => $devoir->student->full_name,
                    'matricule' => $devoir->student->matricule,
                ] : null,
                'tranche_requise' => $devoir->trancheRequise ? [
                    'id' => $devoir->trancheRequise->id,
                    'numero' => $devoir->trancheRequise->numero,
                    'montant' => $devoir->trancheRequise->montant,
                ] : null,
            ],
            'soumissions' => $soumissions,
            'nonSoumis' => $destinataires->reject(function ($student) use ($soumissions) {
                return $soumissions->contains('student_id', $student->id);
            })->map(function ($student) {
                return [
                    'id' => $student->id,
                    'name' => $student->full_name,
                    'matricule' => $student->matricule,
                ];
            })->values(),
        ]);
    }

    public function edit(Devoir $devoir)
    {
        $formations = Formation::where('is_active', true)
            ->orderBy('name')
            ->get()
            ->map(function ($f) {
                return [
                    'id' => $f->id,
                    'name' => $f->name,
                    'abbreviation' => $f->abbreviation,
                ];
            });

        return Inertia::render('Admin/Devoirs/Edit', [
            'devoir' => [
                'id' => $devoir->id,
                'titre' => $devoir->titre,
                'description' => $devoir->description,
                'contenu' => $devoir->contenu,
                'date_limite' => $devoir->date_limite?->format('Y-m-d\TH:i'),
                'formation_id' => $devoir->formation_id,
                'type' => $devoir->type,
                'mode_envoi' => $devoir->student_id ? 'individuel' : 'groupe',
                'vague_id' => $devoir->vague_id,
                'certification_id' => $devoir->certification_id,
                'student_id' => $devoir->student_id,
                'tranche_requise_id' => $devoir->tranche_requise_id,
                'is_active' => $devoir->is_active,
                'order' => $devoir->order,
            ],
            'formations' => $formations,
        ]);
    }

    public function update(Request $request, Devoir $devoir)
    {
        try {
            $validated = $request->validate([
                'titre' => 'required|string|max:255',
                'description' => 'nullable|string',
                'formation_id' => 'required|exists:formations,id',
                'type' => 'required|in:vague,certification',
                'mode_envoi' => 'required|in:groupe,individuel',
                'vague_id' => 'required_if:mode_envoi,groupe|nullable|exists:vagues,id',
                'certification_id' => 'required_if:type,certification|nullable|exists:certifications,id',
                'student_id' => 'required_if:mode_envoi,individuel|nullable|exists:students,id',
                'tranche_requise_id' => 'nullable|exists:tranches,id',
                'date_limite' => 'nullable|date',
                'files' => 'nullable|array',
                'files.*' => 'file|max:20480',
                'is_active' => 'boolean',
                'order' => 'integer|min:0',
                'send_notification' => 'boolean',
            ]);

            DB::transaction(function () use ($request, $devoir, $validated) {
                if ($request->hasFile('files')) {
                    $contenu = $devoir->contenu ?? [];
                    foreach ($request->file('files') as $file) {
                        $path = $file->store('devoirs', 'public');
                        $contenu[] = [
                            'type' => $file->getClientMimeType(),
                            'url' => asset('storage/' . $path),
                            'name' => $file->getClientOriginalName(),
                            'size' => $file->getSize(),
                            'extension' => $file->getClientOriginalExtension(),
                        ];
                    }
                    $devoir->contenu = $contenu;
                }

                $devoir->update([
                    'titre' => $validated['titre'],
                    'description' => $validated['description'] ?? null,
                    'date_limite' => $validated['date_limite'] ?? null,
                    'formation_id' => $validated['formation_id'],
                    'vague_id' => $validated['mode_envoi'] === 'groupe' ? $validated['vague_id'] : null,
                    'certification_id' => $validated['certification_id'] ?? null,
                    'student_id' => $validated['mode_envoi'] === 'individuel' ? $validated['student_id'] : null,
                    'tranche_requise_id' => $validated['tranche_requise_id'] ?? null,
                    'type' => $validated['type'],
                    'is_active' => $validated['is_active'] ?? true,
                    'order' => $validated['order'] ?? 0,
                ]);

                if (($validated['send_notification'] ?? false) && !$devoir->has_notification_sent) {
                    $this->notifyStudentsNewDevoir($devoir);
                }
            });

            return redirect()->route('admin.devoirs.index')
                ->with('success', "✅ Devoir '{$devoir->titre}' mis à jour avec succès !");

        } catch (\Exception $e) {
            Log::error('Erreur mise à jour devoir', [
                'devoir_id' => $devoir->id,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()
                ->withInput()
                ->with('error', '❌ Une erreur est survenue lors de la mise à jour.');
        }
    }

    public function destroy(Devoir $devoir)
    {
        try {
            $titre = $devoir->titre;

            DB::transaction(function () use ($devoir) {
                if ($devoir->contenu) {
                    foreach ($devoir->contenu as $file) {
                        $path = str_replace(asset('storage/'), '', $file['url']);
                        Storage::disk('public')->delete($path);
                    }
                }
                $devoir->soumissions()->delete();
                $devoir->delete();
            });

            return redirect()->back()
                ->with('success', "✅ Devoir '{$titre}' supprimé avec succès !");

        } catch (\Exception $e) {
            Log::error('Erreur suppression devoir', [
                'devoir_id' => $devoir->id,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()
                ->with('error', '❌ Une erreur est survenue lors de la suppression.');
        }
    }

    public function toggleActive(Devoir $devoir)
    {
        try {
            $devoir->update(['is_active' => !$devoir->is_active]);

            $status = $devoir->is_active ? 'activé' : 'désactivé';

            return redirect()->back()
                ->with('success', "✅ Devoir '{$devoir->titre}' {$status} avec succès !");

        } catch (\Exception $e) {
            Log::error('Erreur changement statut devoir', [
                'devoir_id' => $devoir->id,
                'message' => $e->getMessage(),
            ]);

            return redirect()->back()
                ->with('error', '❌ Une erreur est survenue.');
        }
    }

    public function resendNotifications(Devoir $devoir)
    {
        try {
            if ($devoir->has_notification_sent) {
                return redirect()->back()
                    ->with('warning', "⚠️ Les notifications pour '{$devoir->titre}' ont déjà été envoyées.");
            }

            $this->notifyStudentsNewDevoir($devoir);

            return redirect()->back()
                ->with('success', "✅ Notifications envoyées pour '{$devoir->titre}' !");

        } catch (\Exception $e) {
            Log::error('Erreur envoi notifications', [
                'devoir_id' => $devoir->id,
                'message' => $e->getMessage(),
            ]);

            return redirect()->back()
                ->with('error', '❌ Une erreur est survenue lors de l\'envoi des notifications.');
        }
    }

    public function corriger(Request $request, SoumissionDevoir $soumission)
    {
        try {
            $validated = $request->validate([
                'note' => 'required|numeric|min:0|max:20',
                'commentaire' => 'nullable|string',
            ]);

            DB::transaction(function () use ($request, $soumission, $validated) {
                $soumission->update([
                    'note' => $validated['note'],
                    'commentaire' => $validated['commentaire'] ?? null,
                    'statut' => 'corrige',
                    'corrected_at' => now(),
                ]);

                $this->notifyStudentCorrection($soumission);
            });

            Log::info('Devoir corrigé', [
                'soumission_id' => $soumission->id,
                'student_id' => $soumission->student_id,
                'note' => $validated['note'],
                'corrected_by' => auth()->id(),
            ]);

            return redirect()->back()
                ->with('success', "✅ Devoir corrigé avec succès ! Note : {$validated['note']}/20");

        } catch (\Exception $e) {
            Log::error('Erreur correction devoir', [
                'soumission_id' => $soumission->id,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()
                ->with('error', '❌ Une erreur est survenue lors de la correction.');
        }
    }
}
