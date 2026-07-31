<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EnsureUserIsStudent
{
    public function handle(Request $request, Closure $next)
    {
        if (!Auth::check()) {
            return redirect()->route('login');
        }

        if (!Auth::user()->isStudent()) {
            abort(403, '❌ Accès non autorisé. Vous devez être étudiant.');
        }

        return $next($request);
    }
}
