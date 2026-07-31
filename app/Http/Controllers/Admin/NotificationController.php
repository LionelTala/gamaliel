<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function index(Request $request)
    {
        $notifications = Notification::forAdmin(auth()->id())
            ->latest()
            ->limit(20)
            ->get();

        return response()->json([
            'notifications' => $notifications,
            'unread_count' => Notification::forAdmin(auth()->id())->unread()->count(),
        ]);
    }

    public function markAsRead(Notification $notification)
    {
        // Sécurité : vérifie que la notif est bien globale ou destinée à cet admin
        abort_unless(
            $notification->user_id === null || $notification->user_id === auth()->id(),
            403
        );

        $notification->markAsRead();

        return back();
    }

    public function markAllAsRead()
    {
        Notification::forAdmin(auth()->id())
            ->unread()
            ->update(['read_at' => now()]);

        return back();
    }
}
