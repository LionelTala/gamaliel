<?php

namespace App\Http\Middleware;

use App\Models\PageVisit;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TrackVisit
{
     protected array $trackedPaths = [
        '/' => 'accueil',
        'formations' => 'formations',
        'certification' => 'certification',
        'galerie' => 'galerie',
        'bibliotheque' => 'bibliotheque',
        'login' => 'login'
    ];

    public function handle($request, Closure $next)
    {
        if ($request->method() === 'GET') {
            $path = $request->path(); // '/' pour home, 'formations' pour /formations, etc.

            if (array_key_exists($path, $this->trackedPaths)) {
                $sessionId = session()->getId();

                $exists = PageVisit::where('session_id', $sessionId)
                    ->where('path', $path)
                    ->whereDate('created_at', today())
                    ->exists();

                if (!$exists) {
                    PageVisit::create([
                        'path' => $path,
                        'ip' => $request->ip(),
                        'session_id' => $sessionId,
                    ]);
                }
            }
        }

        return $next($request);
    }
}
