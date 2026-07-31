<?php

namespace App\Http\Middleware;

use App\Models\Notification;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        $user = $request->user();
        $unreadCountsByType = [];
        $unreadTotal = 0;

        if ($user) {
            $counts = Notification::where('user_id', $user->id)
                ->whereNull('read_at')
                ->selectRaw('type, count(*) as total')
                ->groupBy('type')
                ->pluck('total', 'type');

            $unreadCountsByType = $counts->toArray();
            $unreadTotal = $counts->sum();
        }

        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $user,
            ],
            'unreadNotificationsCount' => $unreadTotal,
            'unreadCountsByType' => $unreadCountsByType,
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
        ]);
    }
}
