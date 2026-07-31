<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Discussion;
use App\Models\ChatMessage;
use App\Models\Notification;
use App\Models\User;
use App\Events\NewChatMessageEvent;
use App\Events\NotificationCreated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ChatController extends Controller
{
    // ✅ Créer une discussion pour un étudiant
    public static function creerDiscussion(Student $student)
    {
        try {
            if ($student->vague_id) {
                $discussion = Discussion::firstOrCreate(
                    ['vague_id' => $student->vague_id],
                    [
                        'student_id' => $student->id,
                        'name' => $student->vague?->name ?? 'Vague',
                        'is_active' => true,
                    ]
                );
                return $discussion;
            }

            if ($student->certification_id) {
                $discussion = Discussion::firstOrCreate(
                    ['certification_id' => $student->certification_id],
                    [
                        'student_id' => $student->id,
                        'name' => $student->certification?->titre ?? 'Certification',
                        'is_active' => true,
                    ]
                );
                return $discussion;
            }

            return null;
        } catch (\Exception $e) {
            Log::error('Erreur création discussion', [
                'student_id' => $student->id,
                'message' => $e->getMessage(),
            ]);
            return null;
        }
    }

    // ✅ Liste des discussions
    public function index()
    {
        try {
            $user = auth()->user();

            // ✅ Admin voit toutes les discussions
            if ($user->isAdmin()) {
                $discussions = Discussion::with(['vague', 'certification'])
                    ->where('is_active', true)
                    ->orderBy('created_at', 'desc')
                    ->get()
                    ->map(function ($discussion) {
                        $lastMessage = $discussion->last_message;
                        return [
                            'id' => $discussion->id,
                            'name' => $discussion->name,
                            'type' => $discussion->type,
                            'participants_count' => $discussion->participants->count(),
                            'unread' => $discussion->unread_count,
                            'last_message' => $lastMessage?->message,
                            'last_message_time' => $lastMessage?->time_ago,
                            'last_message_user' => $lastMessage?->student_name,
                            'created_at' => $discussion->created_at->format('d/m/Y'),
                        ];
                    });

                return Inertia::render('Admin/Chat/Index', [
                    'discussions' => $discussions,
                    'isAdmin' => true,
                ]);
            }

            // ✅ Étudiant voit ses discussions
            $student = $user->student;
            if (!$student) {
                return redirect()->back()->with('error', '❌ Aucun profil étudiant trouvé.');
            }

            $discussions = Discussion::where(function ($query) use ($student) {
                if ($student->vague_id) {
                    $query->orWhere('vague_id', $student->vague_id);
                }
                if ($student->certification_id) {
                    $query->orWhere('certification_id', $student->certification_id);
                }
            })
            ->where('is_active', true)
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($discussion) {
                $lastMessage = $discussion->last_message;
                return [
                    'id' => $discussion->id,
                    'name' => $discussion->name,
                    'type' => $discussion->type,
                    'unread' => $discussion->unread_count,
                    'last_message' => $lastMessage?->message,
                    'last_message_time' => $lastMessage?->time_ago,
                    'last_message_user' => $lastMessage?->student_name,
                    'created_at' => $discussion->created_at->format('d/m/Y'),
                ];
            });

            return Inertia::render('Student/Chat/Index', [
                'discussions' => $discussions,
                'isAdmin' => false,
            ]);

        } catch (\Exception $e) {
            Log::error('Erreur chargement discussions', [
                'user_id' => auth()->id(),
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()->with('error', '❌ Une erreur est survenue.');
        }
    }

    // ✅ Afficher une discussion
    public function show(Discussion $discussion)
    {
        try {
            $user = auth()->user();
            $student = $user->student;

            // ✅ Vérifier l'accès
            $hasAccess = false;

            // Admin : accès à tout
            if ($user->isAdmin()) {
                $hasAccess = true;
            }

            // Étudiant : accès à ses discussions
            if ($student) {
                if ($discussion->vague_id && $student->vague_id === $discussion->vague_id) {
                    $hasAccess = true;
                }
                if ($discussion->certification_id && $student->certification_id === $discussion->certification_id) {
                    $hasAccess = true;
                }
            }

            if (!$hasAccess) {
                abort(403, '❌ Vous n\'avez pas accès à cette discussion.');
            }

            // ✅ Marquer les messages comme lus (pour étudiants)
            if ($student) {
                $discussion->messages()
                    ->where('student_id', '!=', $student->id)
                    ->where('is_read', false)
                    ->update([
                        'is_read' => true,
                        'read_at' => now(),
                    ]);
            }

            // ✅ Récupérer les messages
            $messages = $discussion->messages()
                ->with('student')
                ->orderBy('created_at', 'asc')
                ->get()
                ->map(function ($message) {
                    return [
                        'id' => $message->id,
                        'student_id' => $message->student_id,
                        'student_name' => $message->student_name,
                        'message' => $message->message,
                        'is_mine' => $message->is_mine,
                        'created_at' => $message->formatted_date,
                        'time_ago' => $message->time_ago,
                        'parent_id' => $message->parent_id,
                        'replies' => $message->replies->map(function ($reply) {
                            return [
                                'id' => $reply->id,
                                'student_id' => $reply->student_id,
                                'student_name' => $reply->student_name,
                                'message' => $reply->message,
                                'is_mine' => $reply->is_mine,
                                'created_at' => $reply->formatted_date,
                                'time_ago' => $reply->time_ago,
                            ];
                        }),
                    ];
                });

            // ✅ Channel pour Pusher
            $channel = $discussion->vague_id
                ? "vague.{$discussion->vague_id}"
                : "certification.{$discussion->certification_id}";

            // ✅ Participants (pour l'admin)
            $participants = [];
            if ($user->isAdmin()) {
                $participants = $discussion->participants->map(function ($participant) {
                    return [
                        'id' => $participant->id,
                        'name' => $participant->full_name,
                        'matricule' => $participant->matricule,
                    ];
                });
            }

            return Inertia::render('Student/Chat/Show', [
                'discussion' => [
                    'id' => $discussion->id,
                    'name' => $discussion->name,
                    'type' => $discussion->type,
                    'vague_id' => $discussion->vague_id,
                    'certification_id' => $discussion->certification_id,
                ],
                'messages' => $messages,
                'channel' => $channel,
                'isAdmin' => $user->isAdmin(),
                'participants' => $participants,
            ]);

        } catch (\Exception $e) {
            Log::error('Erreur chargement discussion', [
                'discussion_id' => $discussion->id,
                'user_id' => auth()->id(),
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->route('student.chat')
                ->with('error', '❌ Une erreur est survenue.');
        }
    }

    // ✅ Envoyer un message
    public function send(Request $request, Discussion $discussion)
    {
        try {
            $user = auth()->user();
            $student = $user->student;

            // ✅ Vérifier l'accès
            $hasAccess = false;

            if ($user->isAdmin()) {
                $hasAccess = true;
            }

            if ($student) {
                if ($discussion->vague_id && $student->vague_id === $discussion->vague_id) {
                    $hasAccess = true;
                }
                if ($discussion->certification_id && $student->certification_id === $discussion->certification_id) {
                    $hasAccess = true;
                }
            }

            if (!$hasAccess) {
                return response()->json(['error' => 'Accès non autorisé'], 403);
            }

            $validated = $request->validate([
                'message' => 'required|string|max:5000',
                'parent_id' => 'nullable|exists:messages_chat,id',
            ]);

            $message = DB::transaction(function () use ($request, $discussion, $validated, $student) {
                $message = ChatMessage::create([
                    'discussion_id' => $discussion->id,
                    'student_id' => $student?->id,
                    'message' => $validated['message'],
                    'parent_id' => $validated['parent_id'] ?? null,
                ]);

                // ✅ Broadcast
                $channel = $discussion->vague_id
                    ? "vague.{$discussion->vague_id}"
                    : "certification.{$discussion->certification_id}";

                broadcast(new NewChatMessageEvent($message, $channel));

                // ✅ Notifications
                $this->notifyParticipants($message, $discussion);

                return $message;
            });

            Log::info('Message chat envoyé', [
                'discussion_id' => $discussion->id,
                'student_id' => $student?->id,
                'message_id' => $message->id,
                'is_admin' => $user->isAdmin(),
            ]);

            return response()->json([
                'success' => true,
                'message' => [
                    'id' => $message->id,
                    'student_id' => $message->student_id,
                    'student_name' => $message->student_name,
                    'message' => $message->message,
                    'is_mine' => true,
                    'created_at' => $message->formatted_date,
                    'time_ago' => $message->time_ago,
                    'parent_id' => $message->parent_id,
                ],
            ]);

        } catch (\Exception $e) {
            Log::error('Erreur envoi message', [
                'discussion_id' => $discussion->id,
                'user_id' => auth()->id(),
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json(['error' => '❌ Une erreur est survenue.'], 500);
        }
    }

    // ✅ Notifications aux participants
    private function notifyParticipants(ChatMessage $message, Discussion $discussion)
    {
        try {
            $sender = auth()->user();
            $senderName = $sender->isAdmin()
                ? '📢 Admin'
                : $message->student_name;

            // ✅ Participants de la discussion
            $participants = $discussion->participants;

            foreach ($participants as $participant) {
                // Ne pas notifier l'expéditeur
                if ($participant->id === $message->student_id) {
                    continue;
                }

                $notification = Notification::create([
                    'user_id' => $participant->user_id,
                    'user_creator_id' => auth()->id(),
                    'type' => 'chat',
                    'notifiable_type' => ChatMessage::class,
                    'notifiable_id' => $message->id,
                    'title' => "💬 Nouveau message",
                    'message' => "{$senderName} a envoyé un message dans {$discussion->name}",
                    'link' => "/student/chat/{$discussion->id}",
                    'data' => [
                        'discussion_id' => $discussion->id,
                        'message' => $message->message,
                        'student_name' => $senderName,
                        'is_admin' => $sender->isAdmin(),
                    ],
                    'read_at' => null,
                ]);

                try {
                    event(new NotificationCreated($notification));
                } catch (\Exception $e) {
                    Log::warning('Erreur broadcast notification chat', [
                        'user_id' => $participant->user_id,
                        'message' => $e->getMessage(),
                    ]);
                }
            }

            // ✅ Notifier les autres admins
            $admins = User::whereIn('role', ['super_admin', 'admin_centre', 'admin'])
                ->where('id', '!=', auth()->id())
                ->get();

            foreach ($admins as $admin) {
                $notification = Notification::create([
                    'user_id' => $admin->id,
                    'user_creator_id' => auth()->id(),
                    'type' => 'chat',
                    'notifiable_type' => ChatMessage::class,
                    'notifiable_id' => $message->id,
                    'title' => "💬 Nouveau message",
                    'message' => "{$senderName} a envoyé un message dans {$discussion->name}",
                    'link' => "/admin/chat/{$discussion->id}",
                    'data' => [
                        'discussion_id' => $discussion->id,
                        'message' => $message->message,
                        'student_name' => $senderName,
                        'is_admin' => $sender->isAdmin(),
                    ],
                    'read_at' => null,
                ]);

                try {
                    event(new NotificationCreated($notification));
                } catch (\Exception $e) {
                    Log::warning('Erreur broadcast notification chat admin', [
                        'user_id' => $admin->id,
                        'message' => $e->getMessage(),
                    ]);
                }
            }

        } catch (\Exception $e) {
            Log::error('Erreur notifications chat', [
                'discussion_id' => $discussion->id,
                'message' => $e->getMessage(),
            ]);
        }
    }
}
