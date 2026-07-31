<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Cours;
use App\Models\CoursVue;
use App\Models\CoursNotification;
use App\Models\Lesson;
use App\Models\LessonVue;
use App\Models\Student;
use App\Models\Tranche;
use App\Models\PaiementTranche;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class CoursController extends Controller
{
    // ✅ Liste des cours pour l'étudiant connecté
    public function index()
    {
        try {
            $user = auth()->user();
            $student = $user->student;

            if (!$student) {
                return redirect()->back()->with('error', '❌ Aucun profil étudiant trouvé.');
            }

            Log::info('📚 [Student] Liste des cours', [
                'student_id' => $student->id,
                'student_name' => $student->full_name,
                'vague_id' => $student->vague_id,
                'certification_id' => $student->certification_id,
            ]);

            $allCours = Cours::where('is_active', true)
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
                ->orderBy('order', 'asc') // ✅ Tri principal par ordre d'affichage
                ->orderBy('created_at', 'desc') // Tri secondaire par date si l'ordre est identique
                ->get();

            Log::info('📚 [Student] Cours trouvés', [
                'total' => $allCours->count()
            ]);

            $coursList = $allCours->map(function ($c) use ($student) {
                $vue = CoursVue::where('cours_id', $c->id)
                    ->where('student_id', $student->id)
                    ->first();

                $peutAcceder = $student->peutAccederContenu($c->tranche_requise_id);

                $trancheInfo = null;
                if ($c->tranche_requise_id) {
                    $tranche = Tranche::find($c->tranche_requise_id);
                    if ($tranche) {
                        $trancheInfo = [
                            'id' => $tranche->id,
                            'numero' => $tranche->numero,
                            'montant' => $tranche->montant,
                            'lien'=> $tranche->lien_paiement,
                        ];
                    }
                }

                // Compter les leçons
                $lessonsCount = $c->lessons()->where('is_active', true)->count();

                return [
                    'id' => $c->id,
                    'titre' => $c->titre,
                    'description' => $c->description,
                    'has_video' => !empty($c->video_url),
                    'has_files' => !empty($c->contenu),
                    'viewed' => $vue !== null,
                    'viewed_at' => $vue ? $vue->viewed_at->format('d/m/Y H:i') : null,
                    'order' => $c->order, // ✅ Transmis au front si nécessaire
                    'created_at' => $c->created_at->format('d/m/Y'),
                    'formation' => [
                        'id' => $c->formation_id,
                        'name' => $c->formation?->name,
                    ],
                    'est_accessible' => $peutAcceder,
                    'tranche_requise' => $trancheInfo,
                    'est_verrouille' => !$peutAcceder && $trancheInfo !== null,
                    'lessons_count' => $lessonsCount,
                ];
            });

            $stats = [
                'total' => $coursList->count(),
                'viewed' => $coursList->filter(fn($c) => $c['viewed'])->count(),
                'not_viewed' => $coursList->filter(fn($c) => !$c['viewed'])->count(),
                'accessibles' => $coursList->filter(fn($c) => $c['est_accessible'])->count(),
                'verrouilles' => $coursList->filter(fn($c) => $c['est_verrouille'])->count(),
            ];

            Log::info('📚 [Student] Statistiques cours', $stats);

            return Inertia::render('Student/Cours/Index', [
                'cours' => $coursList,
                'stats' => $stats,
            ]);

        } catch (\Exception $e) {
            Log::error('❌ [Student] Erreur chargement cours', [
                'user_id' => auth()->id(),
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()->with('error', '❌ Une erreur est survenue.');
        }
    }

    // ✅ Détail d'un cours avec ses leçons
    public function show(Cours $cours)
{
    try {
        $user = auth()->user();
        $student = $user->student;

        if (!$student) {
            return redirect()->back()->with('error', '❌ Aucun profil étudiant trouvé.');
        }

        Log::info('👁️ [Student] Affichage cours', [
            'student_id' => $student->id,
            'cours_id' => $cours->id,
            'cours_titre' => $cours->titre,
        ]);

        $hasAccess = false;
        if ($cours->type === 'vague' && $student->vague_id === $cours->vague_id) {
            $hasAccess = true;
        }
        if ($cours->type === 'certification' && $student->certification_id === $cours->certification_id) {
            $hasAccess = true;
        }

        if (!$hasAccess) {
            Log::warning('⚠️ [Student] Accès refusé au cours', [
                'student_id' => $student->id,
                'cours_id' => $cours->id,
                'type' => $cours->type,
                'vague_id' => $cours->vague_id,
                'student_vague_id' => $student->vague_id,
            ]);
            abort(403, '❌ Vous n\'avez pas accès à ce cours.');
        }

        $peutAcceder = $student->peutAccederContenu($cours->tranche_requise_id);

        $trancheInfo = null;
        if ($cours->tranche_requise_id) {
            $tranche = Tranche::find($cours->tranche_requise_id);
            if ($tranche) {
                $trancheInfo = [
                    'id' => $tranche->id,
                    'numero' => $tranche->numero,
                    'montant' => $tranche->montant,
                    'lien' => $tranche->lien_paiement,
                ];
            }
        }

        $vue = CoursVue::where('cours_id', $cours->id)
            ->where('student_id', $student->id)
            ->first();

        // ✅ Ne diffuse l'URL de streaming QUE si l'étudiant a réellement accès
        // (sinon on exposerait quand même une route valide pour un contenu verrouillé)
        $coursVideoStreamUrl = null;
        if ($cours->video_url && $peutAcceder) {
            $coursVideoStreamUrl = route('video.stream.cours', ['cours' => $cours->id]);
        }

        // ✅ Charger les leçons actives du cours avec leur statut de visionnage
        $lessons = $cours->lessons()
            ->where('is_active', true)
            ->orderBy('order')
            ->get()
            ->map(function ($lesson) use ($student, $peutAcceder) {
                $vue = LessonVue::where('lesson_id', $lesson->id)
                    ->where('student_id', $student->id)
                    ->first();

                // ✅ Idem : URL de streaming uniquement si accès autorisé
                $lessonVideoStreamUrl = null;
                if ($lesson->video_url && $peutAcceder) {
                    $lessonVideoStreamUrl = route('video.stream.lesson', ['lesson' => $lesson->id]);
                }

                return [
                    'id' => $lesson->id,
                    'titre' => $lesson->titre,
                    'description' => $lesson->description,
                    'contenu' => $lesson->contenu,
                    'video_url' => $lessonVideoStreamUrl, // ⬅️ remplace l'ancien chemin storage/ direct
                    'video_title' => $lesson->video_title,
                    'has_video' => !empty($lesson->video_url),
                    'has_files' => !empty($lesson->files) && count($lesson->files) > 0,
                    'files' => $lesson->files,
                    'order' => $lesson->order,
                    'vu' => $vue !== null,
                    'viewed_at' => $vue ? $vue->viewed_at->format('d/m/Y H:i') : null,
                    'created_at' => $lesson->created_at->format('d/m/Y'),
                ];
            });

        Log::info('✅ [Student] Cours affiché', [
            'cours_id' => $cours->id,
            'est_accessible' => $peutAcceder,
            'deja_vu' => $vue !== null,
            'lessons_count' => $lessons->count(),
        ]);

        return Inertia::render('Student/Cours/Show', [
            'cours' => [
                'id' => $cours->id,
                'titre' => $cours->titre,
                'description' => $cours->description,
                'contenu' => $cours->contenu,
                'video_url' => $coursVideoStreamUrl, // ⬅️ remplace l'ancien chemin storage/ direct
                'video_title' => $cours->video_title,
                'video_thumbnail' => $cours->video_thumbnail ? asset('storage/' . ltrim($cours->video_thumbnail, '/')) : null,
                'viewed' => $vue !== null,
                'viewed_at' => $vue ? $vue->viewed_at->format('d/m/Y H:i') : null,
                'created_at' => $cours->created_at->format('d/m/Y'),
                'formation' => [
                    'id' => $cours->formation_id,
                    'name' => $cours->formation?->name,
                ],
                'est_accessible' => $peutAcceder,
                'tranche_requise' => $trancheInfo,
                'est_verrouille' => !$peutAcceder && $trancheInfo !== null,
                'lessons' => $lessons,
            ],
        ]);

    } catch (\Exception $e) {
        Log::error('❌ [Student] Erreur affichage cours', [
            'cours_id' => $cours->id,
            'user_id' => auth()->id(),
            'message' => $e->getMessage(),
            'trace' => $e->getTraceAsString(),
        ]);

        return redirect()->route('student.cours')
            ->with('error', '❌ Une erreur est survenue.');
    }
}
   public function showLesson(Lesson $lesson)
{
    try {
        $user = auth()->user();
        $student = $user->student;

        if (!$student) {
            return redirect()->back()->with('error', '❌ Aucun profil étudiant trouvé.');
        }

        $cours = $lesson->cours;

        $hasAccess = false;
        if ($cours->type === 'vague' && $student->vague_id === $cours->vague_id) {
            $hasAccess = true;
        }
        if ($cours->type === 'certification' && $student->certification_id === $cours->certification_id) {
            $hasAccess = true;
        }

        if (!$hasAccess) {
            abort(403, '❌ Vous n\'avez pas accès à ce contenu.');
        }

        $peutAcceder = $student->peutAccederContenu($cours->tranche_requise_id);
        if (!$peutAcceder) {
            abort(403, '❌ Vous devez payer la tranche requise pour accéder à cette leçon.');
        }

        if (!$lesson->is_active) {
            abort(404, '❌ Cette leçon n\'est pas disponible.');
        }

        $vue = LessonVue::where('lesson_id', $lesson->id)
            ->where('student_id', $student->id)
            ->first();

        Log::info('👁️ [Student] Affichage leçon', [
            'student_id' => $student->id,
            'lesson_id' => $lesson->id,
            'lesson_titre' => $lesson->titre,
            'deja_vu' => $vue !== null,
        ]);

        // ✅ URL de streaming au lieu du chemin storage/ direct
        // (peutAcceder est déjà garanti true ici puisqu'on est passé le abort ci-dessus)
        $lessonVideoStreamUrl = null;
        if ($lesson->video_url) {
            $lessonVideoStreamUrl = route('video.stream.lesson', ['lesson' => $lesson->id]);
        }

        return Inertia::render('Student/Cours/ShowLesson', [
            'lesson' => [
                'id' => $lesson->id,
                'titre' => $lesson->titre,
                'description' => $lesson->description,
                'contenu' => $lesson->contenu,
                'video_url' => $lessonVideoStreamUrl, // ⬅️ remplace l'ancien chemin storage/ direct
                'video_title' => $lesson->video_title,
                'has_video' => !empty($lesson->video_url),
                'has_files' => !empty($lesson->files) && count($lesson->files) > 0,
                'files' => $lesson->files,
                'order' => $lesson->order,
                'vu' => $vue !== null,
                'viewed_at' => $vue ? $vue->viewed_at->format('d/m/Y H:i') : null,
                'created_at' => $lesson->created_at->format('d/m/Y'),
                'cours' => [
                    'id' => $cours->id,
                    'titre' => $cours->titre,
                    'formation' => [
                        'name' => $cours->formation?->name,
                    ],
                ],
            ],
        ]);

    } catch (\Exception $e) {
        Log::error('❌ [Student] Erreur affichage leçon', [
            'lesson_id' => $lesson->id,
            'user_id' => auth()->id(),
            'message' => $e->getMessage(),
            'trace' => $e->getTraceAsString(),
        ]);

        return redirect()->route('student.cours')
            ->with('error', '❌ Une erreur est survenue.');
    }
}
    // ✅ Marquer une leçon comme vue
    public function markLessonAsViewed(Lesson $lesson)
    {
        try {
            $student = auth()->user()->student;

            if (!$student) {
                return response()->json(['error' => 'Étudiant non trouvé'], 404);
            }

            $cours = $lesson->cours;

            // ✅ Vérifier l'accès
            $hasAccess = false;
            if ($cours->type === 'vague' && $student->vague_id === $cours->vague_id) {
                $hasAccess = true;
            }
            if ($cours->type === 'certification' && $student->certification_id === $cours->certification_id) {
                $hasAccess = true;
            }

            if ($hasAccess) {
                $hasAccess = $student->peutAccederContenu($cours->tranche_requise_id);
            }

            if (!$hasAccess) {
                return response()->json(['error' => 'Accès non autorisé'], 403);
            }

            // ✅ Marquer comme vu
            $vue = LessonVue::firstOrCreate([
                'lesson_id' => $lesson->id,
                'student_id' => $student->id,
            ], [
                'viewed_at' => now(),
            ]);

            Log::info('✅ [Student] Leçon marquée comme vue', [
                'lesson_id' => $lesson->id,
                'student_id' => $student->id,
            ]);

            return response()->json(['success' => true]);

        } catch (\Exception $e) {
            Log::error('❌ [Student] Erreur marquage leçon vue', [
                'lesson_id' => $lesson->id,
                'message' => $e->getMessage(),
            ]);

            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

    // ✅ Marquer un cours comme vu
    public function markAsViewed(Cours $cours)
    {
        try {
            $student = auth()->user()->student;

            if (!$student) {
                return response()->json(['error' => 'Étudiant non trouvé'], 404);
            }

            Log::info('👁️ [Student] Marquer cours comme vu', [
                'student_id' => $student->id,
                'cours_id' => $cours->id,
            ]);

            // ✅ Vérifier l'accès
            $hasAccess = false;
            if ($cours->type === 'vague' && $student->vague_id === $cours->vague_id) {
                $hasAccess = true;
            }
            if ($cours->type === 'certification' && $student->certification_id === $cours->certification_id) {
                $hasAccess = true;
            }

            // ✅ Vérifier l'accès par tranche
            if ($hasAccess) {
                $hasAccess = $student->peutAccederContenu($cours->tranche_requise_id);
            }

            if (!$hasAccess) {
                Log::warning('⚠️ [Student] Tentative de marquage sans accès', [
                    'student_id' => $student->id,
                    'cours_id' => $cours->id,
                ]);
                return response()->json(['error' => 'Accès non autorisé'], 403);
            }

            // ✅ Marquer comme vu
            $vue = CoursVue::firstOrCreate([
                'cours_id' => $cours->id,
                'student_id' => $student->id,
            ], [
                'viewed_at' => now(),
            ]);

            // ✅ Incrémenter le compteur
            $cours->increment('viewed_count');

            Log::info('✅ [Student] Cours marqué comme vu', [
                'cours_id' => $cours->id,
                'student_id' => $student->id,
                'student_name' => $student->full_name,
            ]);

            return response()->json(['success' => true]);

        } catch (\Exception $e) {
            Log::error('❌ [Student] Erreur marquage cours vu', [
                'cours_id' => $cours->id,
                'student_id' => auth()->user()->student?->id,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

    // ✅ Récupérer les notifications de cours pour l'étudiant
    public function getNotifications()
    {
        try {
            $student = auth()->user()->student;

            if (!$student) {
                return response()->json([]);
            }

            Log::info('🔔 [Student] Récupération notifications', [
                'student_id' => $student->id,
            ]);

            $notifications = CoursNotification::with('cours')
                ->where('student_id', $student->id)
                ->orderBy('created_at', 'desc')
                ->limit(50)
                ->get()
                ->map(function ($n) {
                    return [
                        'id' => $n->id,
                        'cours_id' => $n->cours_id,
                        'titre' => $n->cours->titre,
                        'description' => $n->cours->description,
                        'video_url' => $n->cours->video_url,
                        'video_title' => $n->cours->video_title,
                        'has_video' => !empty($n->cours->video_url),
                        'has_files' => !empty($n->cours->contenu),
                        'is_read' => $n->is_read,
                        'created_at' => $n->created_at->diffForHumans(),
                    ];
                });

            $unreadCount = $notifications->filter(fn($n) => !$n['is_read'])->count();

            Log::info('✅ [Student] Notifications récupérées', [
                'total' => $notifications->count(),
                'unread' => $unreadCount,
            ]);

            return response()->json([
                'notifications' => $notifications,
                'unread_count' => $unreadCount,
            ]);

        } catch (\Exception $e) {
            Log::error('❌ [Student] Erreur récupération notifications', [
                'student_id' => auth()->user()->student?->id,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json(['notifications' => [], 'unread_count' => 0]);
        }
    }

    // ✅ Marquer une notification comme lue
    public function markNotificationAsRead($id)
    {
        try {
            $notification = CoursNotification::findOrFail($id);
            $student = auth()->user()->student;

            // Vérifier que la notification appartient à l'étudiant
            if ($notification->student_id !== $student->id) {
                Log::warning('⚠️ [Student] Tentative de marquage notification non autorisé', [
                    'notification_id' => $id,
                    'student_id' => $student->id,
                ]);
                return response()->json(['error' => 'Accès non autorisé'], 403);
            }

            $notification->update([
                'is_read' => true,
                'read_at' => now(),
            ]);

            Log::info('✅ [Student] Notification marquée comme lue', [
                'notification_id' => $id,
                'student_id' => $student->id,
            ]);

            return response()->json(['success' => true]);

        } catch (\Exception $e) {
            Log::error('❌ [Student] Erreur marquage notification', [
                'notification_id' => $id,
                'student_id' => auth()->user()->student?->id,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json(['success' => false], 500);
        }
    }

    // ✅ Marquer toutes les notifications comme lues
    public function markAllAsRead()
    {
        try {
            $student = auth()->user()->student;

            if (!$student) {
                return response()->json(['error' => 'Étudiant non trouvé'], 404);
            }

            $count = CoursNotification::where('student_id', $student->id)
                ->where('is_read', false)
                ->update([
                    'is_read' => true,
                    'read_at' => now(),
                ]);

            Log::info('✅ [Student] Toutes les notifications marquées comme lues', [
                'student_id' => $student->id,
                'count' => $count,
            ]);

            return response()->json(['success' => true, 'count' => $count]);

        } catch (\Exception $e) {
            Log::error('❌ [Student] Erreur marquage tout comme lu', [
                'student_id' => auth()->user()->student?->id,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json(['success' => false], 500);
        }
    }
}
