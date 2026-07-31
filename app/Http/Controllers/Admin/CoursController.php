<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Cours;
use App\Models\Formation;
use App\Models\Vague;
use App\Models\Certification;
use App\Models\Student;
use App\Models\Tranche;
use App\Events\NotificationCreated;
use App\Models\Notification;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CoursController extends Controller
{
    public function index(Request $request)
    {
        Log::info('📚 [Cours] Index - Début', ['user' => auth()->id()]);

        try {
            $query = Cours::with(['formation', 'vague', 'certification', 'trancheRequise', 'student']);

            if ($request->filled('formation_id')) {
                $query->where('formation_id', $request->formation_id);
            }

            if ($request->filled('search')) {
                $search = $request->search;
                $query->where(function ($q) use ($search) {
                    $q->where('titre', 'like', "%{$search}%")
                      ->orWhere('description', 'like', "%{$search}%");
                });
            }

            // ✅ 1. Ajout de 'order' dans les tris autorisés et tri par défaut par 'order' (ascendant par défaut pour l'ordre)
            $sortField = $request->input('sort', 'order');
            $sortDirection = $request->input('direction', 'asc');
            $allowedSorts = ['titre', 'type', 'viewed_count', 'created_at', 'is_active', 'order'];

            if (in_array($sortField, $allowedSorts)) {
                $query->orderBy($sortField, $sortDirection);
            } else {
                $query->orderBy('order', 'asc');
            }

            $cours = $query->paginate(15)->withQueryString()->through(function ($c) {
                $lessonsCount = $c->lessons()->count();
                $destinataires = $this->getDestinataires($c);

                return [
                    'id' => $c->id,
                    'titre' => $c->titre,
                    'description' => $c->description,
                    'type' => $c->type,
                    'viewed_count' => $c->viewed_count,
                    'is_active' => $c->is_active,
                    'has_video' => $c->is_video,
                    'has_files' => !empty($c->contenu),
                    'total_students' => $destinataires->count(),
                    'lessons_count' => $lessonsCount,
                    'mode_envoi' => $c->student_id ? 'individuel' : 'groupe',
                    'order' => $c->order, // ✅ 2. Transmis au front si besoin
                    'tranche_requise' => $c->trancheRequise ? [
                        'id' => $c->trancheRequise->id,
                        'numero' => $c->trancheRequise->numero,
                        'montant' => $c->trancheRequise->montant,
                    ] : null,
                    'formation' => $c->formation ? [
                        'id' => $c->formation->id,
                        'name' => $c->formation->name,
                    ] : null,
                    'vague' => $c->vague ? [
                        'id' => $c->vague->id,
                        'name' => $c->vague->name,
                    ] : null,
                    'certification' => $c->certification ? [
                        'id' => $c->certification->id,
                        'titre' => $c->certification->titre,
                    ] : null,
                    'created_at' => $c->created_at->format('d/m/Y H:i'),
                    'notification_sent' => $c->has_notification_sent,
                ];
            });

            $formations = Formation::where('is_active', true)
                ->orderBy('name')
                ->get(['id', 'name', 'abbreviation']);

            $stats = [
                'total' => Cours::count(),
                'actifs' => Cours::where('is_active', true)->count(),
                'inactifs' => Cours::where('is_active', false)->count(),
                'vague' => Cours::where('type', 'vague')->count(),
                'certification' => Cours::where('type', 'certification')->count(),
            ];

            Log::info('📚 [Cours] Index - Succès', ['total' => $cours->total()]);

            return Inertia::render('Admin/Cours/Index', [
                'cours' => $cours,
                'formations' => $formations,
                'stats' => $stats,
                'filters' => $request->only(['search', 'formation_id']),
                'sort' => [
                    'field' => $sortField,
                    'direction' => $sortDirection,
                ],
            ]);
        } catch (\Exception $e) {
            Log::error('❌ [Cours] Index - Erreur', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            return redirect()->back()->with('error', '❌ Une erreur est survenue.');
        }
    }

    public function create()
    {
        Log::info('📝 [Cours] Create - Début', ['user' => auth()->id()]);

        try {
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

            Log::info('📝 [Cours] Create - Succès', ['formations_count' => $formations->count()]);

            return Inertia::render('Admin/Cours/Create', [
                'formations' => $formations,
            ]);
        } catch (\Exception $e) {
            Log::error('❌ [Cours] Create - Erreur', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            return redirect()->back()->with('error', '❌ Une erreur est survenue.');
        }
    }

    public function getVaguesByFormation($formationId)
    {
        Log::info('🔍 [Cours] getVaguesByFormation - Appel', [
            'formation_id' => $formationId,
            'user' => auth()->id()
        ]);

        try {
            $vagues = Vague::where('formation_id', $formationId)
                ->where('is_active', true)
                ->orderBy('date_debut')
                ->get(['id', 'name', 'date_debut', 'is_active'])
                ->map(function ($v) {
                    return [
                        'id' => $v->id,
                        'name' => $v->name,
                        'date_debut' => $v->date_debut->format('d/m/Y'),
                        'is_active' => (bool) $v->is_active,
                    ];
                });

            Log::info('✅ [Cours] getVaguesByFormation - Succès', [
                'formation_id' => $formationId,
                'count' => $vagues->count()
            ]);

            return response()->json($vagues);
        } catch (\Exception $e) {
            Log::error('❌ [Cours] getVaguesByFormation - Erreur', [
                'formation_id' => $formationId,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function getCertificationsByFormation($formationId)
    {
        Log::info('🔍 [Cours] getCertificationsByFormation - Appel', [
            'formation_id' => $formationId,
            'user' => auth()->id()
        ]);

        try {
            $certifications = Certification::where('formation_id', $formationId)
                ->where('is_active', true)
                ->orderBy('titre')
                ->get(['id', 'titre', 'is_active'])
                ->map(function ($c) {
                    return [
                        'id' => $c->id,
                        'titre' => $c->titre,
                        'is_active' => (bool) $c->is_active,
                    ];
                });

            Log::info('✅ [Cours] getCertificationsByFormation - Succès', [
                'formation_id' => $formationId,
                'count' => $certifications->count()
            ]);

            return response()->json($certifications);
        } catch (\Exception $e) {
            Log::error('❌ [Cours] getCertificationsByFormation - Erreur', [
                'formation_id' => $formationId,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function getStudentsByCertification($certificationId)
    {
        Log::info('🔍 [Cours] getStudentsByCertification - Appel', [
            'certification_id' => $certificationId,
            'user' => auth()->id()
        ]);

        try {
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

            Log::info('✅ [Cours] getStudentsByCertification - Succès', [
                'certification_id' => $certificationId,
                'count' => $students->count()
            ]);

            return response()->json($students);
        } catch (\Exception $e) {
            Log::error('❌ [Cours] getStudentsByCertification - Erreur', [
                'certification_id' => $certificationId,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function getTranchesByFormation($formationId)
    {
        Log::info('🔍 [Cours] getTranchesByFormation - Appel', [
            'formation_id' => $formationId,
            'user' => auth()->id()
        ]);

        try {
            $tranches = Tranche::where('formation_id', $formationId)
                ->orderBy('numero')
                ->get(['id', 'numero', 'montant']);

            return response()->json($tranches);
        } catch (\Exception $e) {
            Log::error('❌ [Cours] getTranchesByFormation - Erreur', [
                'formation_id' => $formationId,
                'message' => $e->getMessage(),
            ]);
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        Log::info('💾 [Cours] Store - Début', [
            'user' => auth()->id(),
            'data' => $request->except(['files', 'video'])
        ]);

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
                'video' => 'nullable|file|mimetypes:video/mp4,video/webm,video/quicktime|max:512000',
                'video_title' => 'nullable|string|max:255',
                'files' => 'nullable|array',
                'files.*' => 'file|max:20480',
                'is_active' => 'boolean',
                'order' => 'integer|min:0',
                'send_notification' => 'boolean',
            ]);

            Log::info('💾 [Cours] Store - Validation OK');

            $cours = DB::transaction(function () use ($request, $validated) {
                Log::info('💾 [Cours] Store - Transaction début');

                $contenu = [];
                if ($request->hasFile('files')) {
                    Log::info('💾 [Cours] Store - Fichiers reçus', ['count' => count($request->file('files'))]);
                    foreach ($request->file('files') as $file) {
                        $path = $file->store('cours', 'public');
                        $contenu[] = [
                            'type' => $file->getClientMimeType(),
                            'url' => asset('storage/' . $path),
                            'name' => $file->getClientOriginalName(),
                            'size' => $file->getSize(),
                            'extension' => $file->getClientOriginalExtension(),
                        ];
                    }
                }

                $videoUrl = null;
                    if ($request->hasFile('video')) {
                        $file = $request->file('video');

                        // Génère un nom unique sans lire tout le contenu du fichier
                        $fileName = uniqid() . '_' . time() . '.' . $file->getClientOriginalExtension();

                        // Utilise storeAs au lieu de store
                        $videoUrl = $file->storeAs('cours', $fileName, 'private');

                        Log::info('💾 [Cours] Store - Vidéo uploadée sur private', ['path' => $videoUrl]);
                    }

                $cours = Cours::create([
                    'titre' => $validated['titre'],
                    'description' => $validated['description'] ?? null,
                    'contenu' => $contenu,
                    'video_url' => $videoUrl,
                    'video_title' => $validated['video_title'] ?? null,
                    'formation_id' => $validated['formation_id'],
                    'vague_id' => $validated['mode_envoi'] === 'groupe' ? $validated['vague_id'] : null,
                    'student_id' => $validated['mode_envoi'] === 'individuel' ? $validated['student_id'] : null,
                    'tranche_requise_id' => $validated['tranche_requise_id'] ?? null,
                    'certification_id' => $validated['certification_id'] ?? null,
                    'type' => $validated['type'],
                    'is_active' => $validated['is_active'] ?? true,
                    'order' => $validated['order'] ?? 0,
                ]);

                Log::info('💾 [Cours] Store - Cours créé', ['cours_id' => $cours->id]);

                if ($validated['send_notification'] ?? true) {
                    Log::info('💾 [Cours] Store - Envoi des notifications');
                    $this->sendNotifications($cours);
                }

                Log::info('💾 [Cours] Store - Transaction fin');
                return $cours;
            });

            Log::info('✅ [Cours] Store - Succès', [
                'cours_id' => $cours->id,
                'titre' => $cours->titre,
                'mode_envoi' => $validated['mode_envoi'],
                'created_by' => auth()->id(),
            ]);

            return redirect()->route('admin.cours.index')
                ->with('success', "✅ Cours '{$cours->titre}' créé avec succès !" .
                    (($validated['send_notification'] ?? true) ? ' 🔔 Les étudiants ont été notifiés.' : ''));

        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('❌ [Cours] Store - Validation échouée', ['errors' => $e->errors()]);
            return redirect()->back()->withInput()->withErrors($e->errors());
        } catch (\Exception $e) {
            Log::error('❌ [Cours] Store - Erreur', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()
                ->withInput()
                ->with('error', '❌ Une erreur est survenue lors de la création.');
        }
    }

    private function getDestinataires(Cours $cours)
    {
        Log::info('👥 [Cours] getDestinataires', [
            'cours_id' => $cours->id,
            'student_id' => $cours->student_id,
            'vague_id' => $cours->vague_id,
            'tranche_requise_id' => $cours->tranche_requise_id
        ]);

        if ($cours->student_id) {
            $students = Student::where('id', $cours->student_id)->get();
            Log::info('👥 [Cours] getDestinataires - Individuel', ['count' => $students->count()]);
            return $students;
        }

        if ($cours->vague_id) {
            $students = Student::where('vague_id', $cours->vague_id)->get();

            if ($cours->tranche_requise_id) {
                $tranche = Tranche::find($cours->tranche_requise_id);
                if ($tranche) {
                    $students = $students->filter(function ($student) use ($tranche) {
                        return $student->derniereTranchePayeeNumero() >= $tranche->numero;
                    });
                    Log::info('👥 [Cours] getDestinataires - Filtré par tranche', [
                        'tranche_numero' => $tranche->numero,
                        'count' => $students->count()
                    ]);
                }
            }

            Log::info('👥 [Cours] getDestinataires - Groupe', ['count' => $students->count()]);
            return $students;
        }

        Log::warning('👥 [Cours] getDestinataires - Aucun destinataire');
        return collect();
    }

    private function sendNotifications(Cours $cours)
    {
        Log::info('🔔 [Cours] sendNotifications - Début', ['cours_id' => $cours->id]);

        $students = $this->getDestinataires($cours);
        Log::info('🔔 [Cours] sendNotifications - Étudiants trouvés', ['count' => $students->count()]);

        foreach ($students as $student) {
            try {
                $notification = Notification::create([
                    'user_id' => $student->user_id,
                    'user_creator_id' => auth()->id(),
                    'type' => 'cours',
                    'notifiable_id' => $cours->id,
                    'notifiable_type' => Cours::class,
                    'title' => "📚 {$cours->titre}",
                    'message' => "Nouveau cours '{$cours->titre}' disponible !",
                    'link' => "/student/cours/{$cours->id}",
                    'data' => [
                        'video_url' => $cours->video_url,
                        'video_title' => $cours->video_title,
                        'has_video' => !empty($cours->video_url),
                        'has_files' => !empty($cours->contenu),
                        'cours_type' => $cours->student_id ? 'individuel' : 'groupe',
                    ],
                ]);

                broadcast(new NotificationCreated($notification));
                Log::info('🔔 [Cours] sendNotifications - Notification envoyée à l\'étudiant', ['student_id' => $student->id, 'notification_id' => $notification->id]);

            } catch (\Exception $e) {
                Log::warning('⚠️ [Cours] sendNotifications - Erreur notification étudiant', [
                    'student_id' => $student->id,
                    'cours_id' => $cours->id,
                    'message' => $e->getMessage(),
                ]);
            }
        }

        try {
            $admins = User::all()->filter(fn ($u) => $u->isAdmin());
            Log::info('🔔 [Cours] sendNotifications - Admins trouvés', ['count' => $admins->count()]);

            foreach ($admins as $admin) {
                $notification = Notification::create([
                    'user_id' => $admin->id,
                    'user_creator_id' => auth()->id(),
                    'type' => 'cours',
                    'notifiable_id' => $cours->id,
                    'notifiable_type' => Cours::class,
                    'title' => "📚 Cours créé : {$cours->titre}",
                    'message' => "Le cours '{$cours->titre}' a été créé et notifié à {$students->count()} étudiant(s).",
                    'link' => "/admin/cours/{$cours->id}",
                ]);
                broadcast(new NotificationCreated($notification));
                Log::info('🔔 [Cours] sendNotifications - Notification envoyée à l\'admin', ['admin_id' => $admin->id]);
            }
        } catch (\Exception $e) {
            Log::warning('⚠️ [Cours] sendNotifications - Erreur notification admin', [
                'cours_id' => $cours->id,
                'message' => $e->getMessage(),
            ]);
        }

        $cours->update([
            'has_notification_sent' => true,
            'notification_sent_at' => now(),
        ]);

        Log::info('✅ [Cours] sendNotifications - Terminé', [
            'cours_id' => $cours->id,
            'titre' => $cours->titre,
            'students_count' => $students->count(),
            'mode' => $cours->student_id ? 'individuel' : 'groupe',
        ]);
    }

    public function show(Cours $cours)
    {
        Log::info('👁️ [Cours] Show - Début', ['cours_id' => $cours->id, 'user' => auth()->id()]);

        try {
            $cours->load(['formation', 'vague', 'certification', 'student', 'trancheRequise', 'lessons']);

            $destinataires = $this->getDestinataires($cours);

            $viewedStudents = $cours->vues()->with('student')->get()->map(function ($vue) {
                return [
                    'id' => $vue->student->id,
                    'name' => $vue->student->full_name,
                    'matricule' => $vue->student->matricule,
                    'viewed_at' => $vue->viewed_at->format('d/m/Y H:i'),
                ];
            });

            Log::info('✅ [Cours] Show - Succès', [
                'cours_id' => $cours->id,
                'viewed_count' => $viewedStudents->count(),
                'total_students' => $destinataires->count(),
                'lessons_count' => $cours->lessons->count(),
            ]);

            return Inertia::render('Admin/Cours/Show', [
                'cours' => [
                    'id' => $cours->id,
                    'titre' => $cours->titre,
                    'description' => $cours->description,
                    'contenu' => $cours->contenu,
                    'video_url' => $cours->video_url,
                    'video_stream_url' => $cours->video_url
                        ? route('admin.video.stream.cours', ['cours' => $cours->id])
                        : null,
                    'video_title' => $cours->video_title,
                    'video_embed_url' => $cours->embed_video_url,
                    'video_thumbnail' => $cours->video_thumbnail,
                    'type' => $cours->type,
                    'mode_envoi' => $cours->student_id ? 'individuel' : 'groupe',
                    'viewed_count' => $cours->viewed_count,
                    'total_students' => $destinataires->count(),
                    'has_notification_sent' => $cours->has_notification_sent,
                    'notification_sent_at' => $cours->notification_sent_at?->format('d/m/Y H:i'),
                    'formation' => $cours->formation ? [
                        'id' => $cours->formation->id,
                        'name' => $cours->formation->name,
                    ] : null,
                    'vague' => $cours->vague ? [
                        'id' => $cours->vague->id,
                        'name' => $cours->vague->name,
                    ] : null,
                    'certification' => $cours->certification ? [
                        'id' => $cours->certification->id,
                        'titre' => $cours->certification->titre,
                    ] : null,
                    'student' => $cours->student ? [
                        'id' => $cours->student->id,
                        'name' => $cours->student->full_name,
                        'matricule' => $cours->student->matricule,
                    ] : null,
                    'tranche_requise' => $cours->trancheRequise ? [
                        'id' => $cours->trancheRequise->id,
                        'numero' => $cours->trancheRequise->numero,
                        'montant' => $cours->trancheRequise->montant,
                    ] : null,
                    'lessons' => $cours->lessons->map(function ($lesson) {
                        return [
                            'id' => $lesson->id,
                            'titre' => $lesson->titre,
                            'description' => $lesson->description,
                            'contenu' => $lesson->contenu,
                            'video_url' => $lesson->video_url,
                            'video_title' => $lesson->video_title,
                            'has_video' => $lesson->has_video,
                            'has_files' => $lesson->has_files,
                            'files' => $lesson->files,
                            'order' => $lesson->order,
                            'is_active' => $lesson->is_active,
                            'created_at' => $lesson->created_at->format('d/m/Y H:i'),
                        ];
                    }),
                ],
                'viewedStudents' => $viewedStudents,
                'notViewedStudents' => $destinataires->reject(function ($student) use ($viewedStudents) {
                    return $viewedStudents->contains('id', $student->id);
                })->map(function ($student) {
                    return [
                        'id' => $student->id,
                        'name' => $student->full_name,
                        'matricule' => $student->matricule,
                    ];
                })->values(),
            ]);
        } catch (\Exception $e) {
            Log::error('❌ [Cours] Show - Erreur', [
                'cours_id' => $cours->id,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            return redirect()->back()->with('error', '❌ Une erreur est survenue.');
        }
    }

    public function edit(Cours $cours)
    {
        Log::info('✏️ [Cours] Edit - Début', ['cours_id' => $cours->id, 'user' => auth()->id()]);

        try {
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

            Log::info('✅ [Cours] Edit - Succès', ['cours_id' => $cours->id]);

            return Inertia::render('Admin/Cours/Edit', [
                'cours' => [
                    'id' => $cours->id,
                    'titre' => $cours->titre,
                    'description' => $cours->description,
                    'contenu' => $cours->contenu,
                    'video_url' => $cours->video_url,
                    'video_stream_url' => $cours->video_url
                        ? route('admin.video.stream.cours', ['cours' => $cours->id])
                        : null,
                    'video_title' => $cours->video_title,
                    'formation_id' => $cours->formation_id,
                    'type' => $cours->type,
                    'mode_envoi' => $cours->student_id ? 'individuel' : 'groupe',
                    'vague_id' => $cours->vague_id,
                    'certification_id' => $cours->certification_id,
                    'student_id' => $cours->student_id,
                    'tranche_requise_id' => $cours->tranche_requise_id,
                    'is_active' => $cours->is_active,
                    'order' => $cours->order,
                ],
                'formations' => $formations,
            ]);
        } catch (\Exception $e) {
            Log::error('❌ [Cours] Edit - Erreur', [
                'cours_id' => $cours->id,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            return redirect()->back()->with('error', '❌ Une erreur est survenue.');
        }
    }

    public function update(Request $request, Cours $cours)
    {
        Log::info('🔄 [Cours] Update - Début', [
            'cours_id' => $cours->id,
            'user' => auth()->id(),
            'data' => $request->except(['files', 'video'])
        ]);

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
                'video' => 'nullable|file|mimetypes:video/mp4,video/webm,video/quicktime|max:512000',
                'video_title' => 'nullable|string|max:255',
                'files' => 'nullable|array',
                'files.*' => 'file|max:20480',
                'is_active' => 'boolean',
                'order' => 'integer|min:0',
                'send_notification' => 'boolean',
            ]);

            Log::info('🔄 [Cours] Update - Validation OK');

            DB::transaction(function () use ($request, $cours, $validated) {
                Log::info('🔄 [Cours] Update - Transaction début');

                if ($request->hasFile('files')) {
                    Log::info('🔄 [Cours] Update - Fichiers reçus', ['count' => count($request->file('files'))]);
                    $contenu = $cours->contenu ?? [];
                    foreach ($request->file('files') as $file) {
                        $path = $file->store('cours', 'public');
                        $contenu[] = [
                            'type' => $file->getClientMimeType(),
                            'url' => asset('storage/' . $path),
                            'name' => $file->getClientOriginalName(),
                            'size' => $file->getSize(),
                            'extension' => $file->getClientOriginalExtension(),
                        ];
                    }
                    $cours->contenu = $contenu;
                }

                $videoUrl = $cours->video_url;
                if ($request->hasFile('video')) {
                    if ($cours->video_url && Storage::disk('private')->exists($cours->video_url)) {
                        Storage::disk('private')->delete($cours->video_url);
                        Log::info('🔄 [Cours] Update - Ancienne vidéo supprimée de private', ['path' => $cours->video_url]);
                    }
                    $videoUrl = $request->file('video')->store('cours', 'private');
                    Log::info('🔄 [Cours] Update - Nouvelle vidéo uploadée sur private', ['path' => $videoUrl]);
                }

                $cours->update([
                    'titre' => $validated['titre'],
                    'description' => $validated['description'] ?? null,
                    'video_url' => $videoUrl,
                    'video_title' => $validated['video_title'] ?? null,
                    'formation_id' => $validated['formation_id'],
                    'vague_id' => $validated['mode_envoi'] === 'groupe' ? $validated['vague_id'] : null,
                    'student_id' => $validated['mode_envoi'] === 'individuel' ? $validated['student_id'] : null,
                    'tranche_requise_id' => $validated['tranche_requise_id'] ?? null,
                    'certification_id' => $validated['certification_id'] ?? null,
                    'type' => $validated['type'],
                    'is_active' => $validated['is_active'] ?? true,
                    'order' => $validated['order'] ?? 0,
                ]);

                Log::info('🔄 [Cours] Update - Cours mis à jour');

                if (($validated['send_notification'] ?? false) && !$cours->has_notification_sent) {
                    Log::info('🔄 [Cours] Update - Envoi des notifications');
                    $this->sendNotifications($cours);
                }

                Log::info('🔄 [Cours] Update - Transaction fin');
            });

            Log::info('✅ [Cours] Update - Succès', [
                'cours_id' => $cours->id,
                'titre' => $cours->titre,
                'updated_by' => auth()->id(),
            ]);

            return redirect()->route('admin.cours.index')
                ->with('success', "✅ Cours '{$cours->titre}' mis à jour avec succès !");

        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('❌ [Cours] Update - Validation échouée', [
                'cours_id' => $cours->id,
                'errors' => $e->errors()
            ]);
            return redirect()->back()
                ->withInput()
                ->withErrors($e->errors());
        } catch (\Exception $e) {
            Log::error('❌ [Cours] Update - Erreur', [
                'cours_id' => $cours->id,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()
                ->withInput()
                ->with('error', '❌ Une erreur est survenue lors de la mise à jour.');
        }
    }

    public function destroy(Cours $cours)
    {
        Log::info('🗑️ [Cours] Destroy - Début', [
            'cours_id' => $cours->id,
            'titre' => $cours->titre,
            'user' => auth()->id()
        ]);

        try {
            $titre = $cours->titre;

            DB::transaction(function () use ($cours) {
                Log::info('🗑️ [Cours] Destroy - Transaction début');

                if ($cours->contenu) {
                    foreach ($cours->contenu as $file) {
                        $path = str_replace(asset('storage/'), '', $file['url']);
                        Storage::disk('public')->delete($path);
                    }
                    Log::info('🗑️ [Cours] Destroy - Fichiers joints du cours supprimés');
                }

                if ($cours->video_url && Storage::disk('private')->exists($cours->video_url)) {
                    Storage::disk('private')->delete($cours->video_url);
                    Log::info('🗑️ [Cours] Destroy - Vidéo du cours supprimée de private', ['path' => $cours->video_url]);
                }

                $cours->load('lessons');
                foreach ($cours->lessons as $lesson) {
                    if ($lesson->video_url && Storage::disk('private')->exists($lesson->video_url)) {
                        Storage::disk('private')->delete($lesson->video_url);
                    }

                    if (!empty($lesson->files)) {
                        foreach ($lesson->files as $file) {
                            $filePath = str_replace(asset('storage/'), '', $file['url'] ?? '');
                            if ($filePath && Storage::disk('public')->exists($filePath)) {
                                Storage::disk('public')->delete($filePath);
                            }
                        }
                    }
                }
                Log::info('🗑️ [Cours] Destroy - Fichiers des leçons supprimés du stockage');

                $cours->vues()->delete();
                Notification::where('notifiable_type', Cours::class)
                    ->where('notifiable_id', $cours->id)
                    ->delete();

                $cours->lessons()->delete();
                $cours->delete();

                Log::info('🗑️ [Cours] Destroy - Transaction fin');
            });

            Log::info('✅ [Cours] Destroy - Succès', [
                'cours_id' => $cours->id,
                'titre' => $titre,
                'deleted_by' => auth()->id(),
            ]);

            return redirect()->back()
                ->with('success', "✅ Cours '{$titre}' et ses éléments associés supprimés avec succès !");

        } catch (\Exception $e) {
            Log::error('❌ [Cours] Destroy - Erreur', [
                'cours_id' => $cours->id,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()
                ->with('error', '❌ Une erreur est survenue lors de la suppression.');
        }
    }

    public function toggleActive(Cours $cours)
    {
        Log::info('🔄 [Cours] toggleActive - Début', [
            'cours_id' => $cours->id,
            'titre' => $cours->titre,
            'current_status' => $cours->is_active,
            'user' => auth()->id()
        ]);

        try {
            $cours->update(['is_active' => !$cours->is_active]);

            $status = $cours->is_active ? 'activé' : 'désactivé';

            Log::info('✅ [Cours] toggleActive - Succès', [
                'cours_id' => $cours->id,
                'titre' => $cours->titre,
                'new_status' => $cours->is_active,
                'updated_by' => auth()->id(),
            ]);

            return redirect()->back()
                ->with('success', "✅ Cours '{$cours->titre}' {$status} avec succès !");

        } catch (\Exception $e) {
            Log::error('❌ [Cours] toggleActive - Erreur', [
                'cours_id' => $cours->id,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()
                ->with('error', '❌ Une erreur est survenue.');
        }
    }

    public function resendNotifications(Cours $cours)
    {
        Log::info('🔔 [Cours] resendNotifications - Début', [
            'cours_id' => $cours->id,
            'titre' => $cours->titre,
            'user' => auth()->id()
        ]);

        try {
            if ($cours->has_notification_sent) {
                Log::warning('⚠️ [Cours] resendNotifications - Notifications déjà envoyées', [
                    'cours_id' => $cours->id,
                    'sent_at' => $cours->notification_sent_at
                ]);
                return redirect()->back()
                    ->with('warning', "⚠️ Les notifications pour '{$cours->titre}' ont déjà été envoyées.");
            }

            $this->sendNotifications($cours);

            Log::info('✅ [Cours] resendNotifications - Succès', [
                'cours_id' => $cours->id,
                'titre' => $cours->titre,
                'sent_by' => auth()->id(),
            ]);

            return redirect()->back()
                ->with('success', "✅ Notifications envoyées pour '{$cours->titre}' !");

        } catch (\Exception $e) {
            Log::error('❌ [Cours] resendNotifications - Erreur', [
                'cours_id' => $cours->id,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()
                ->with('error', '❌ Une erreur est survenue lors de l\'envoi des notifications.');
        }
    }
}
