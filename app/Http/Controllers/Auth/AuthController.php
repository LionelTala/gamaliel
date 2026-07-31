<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class AuthController extends Controller
{
    // Afficher la page de login
    public function showLoginForm()
    {
        if (auth()->check()) {
            if (auth()->user()->isAdmin()) {
                return redirect()->route('admin.dashboard');
            }
            if (auth()->user()->isStudent()) {
                return redirect()->route('student.dashboard');
            }
            return redirect('/');
        }
        return Inertia::render('Auth/Login');
    }

    // Traiter la connexion avec protection anti-robot
    public function login(Request $request)
    {
        // ✅ 1. Vérifier si l'IP est bloquée
        $ip = $request->ip();
        $blockKey = 'login_blocked_' . $ip;

        if (Cache::has($blockKey)) {
            $remainingSeconds = Cache::get($blockKey);
            $remainingMinutes = ceil($remainingSeconds / 60);

            Log::warning('Tentative de connexion bloquée (trop de tentatives)', [
                'ip' => $ip,
                'email' => $request->email,
                'remaining_seconds' => $remainingSeconds,
            ]);

            throw ValidationException::withMessages([
                'email' => [
                    "🔒 Trop de tentatives échouées. Veuillez réessayer dans {$remainingMinutes} minute(s)."
                ],
            ]);
        }

        // ✅ 2. Compter les tentatives de connexion
        $attemptKey = 'login_attempts_' . $ip;
        $attempts = Cache::get($attemptKey, 0);

        // ✅ 3. Valider les champs
        try {
            // ✅ Vérifier si c'est un email ou un téléphone
            $loginField = filter_var($request->login, FILTER_VALIDATE_EMAIL) ? 'email' : 'telephone';

            $request->validate([
                'login' => 'required|string',
                'password' => 'required|string|min:6',
            ]);

            // ✅ 4. Chercher l'utilisateur par email ou téléphone
            $user = User::where($loginField, $request->login)->first();

            if (!$user) {
                // ✅ Incrémenter les tentatives
                $this->incrementAttempts($ip, $attemptKey, $attempts);
                throw ValidationException::withMessages([
                    'login' => ['❌ Aucun compte trouvé avec ces identifiants.'],
                ]);
            }

            // Vérifier si le compte est actif
            if (!$user->is_active) {
                throw ValidationException::withMessages([
                    'login' => ['❌ Votre compte est désactivé. Contactez l\'administrateur.'],
                ]);
            }

            // ✅ 5. Tenter la connexion
            if (!Auth::attempt([$loginField => $request->login, 'password' => $request->password], $request->boolean('remember'))) {
                // ✅ Incrémenter les tentatives
                $this->incrementAttempts($ip, $attemptKey, $attempts);
                throw ValidationException::withMessages([
                    'login' => ['❌ Identifiants incorrects.'],
                ]);
            }

            // ✅ 6. Connexion réussie -> Réinitialiser les tentatives
            Cache::forget($attemptKey);
            Cache::forget($blockKey);

            // Mettre à jour la dernière connexion
            $user->update(['last_login_at' => now()]);

            Log::info('Connexion réussie', [
                'user_id' => $user->id,
                'login' => $request->login,
                'ip' => $ip,
                'role' => $user->role,
            ]);

            // Rediriger selon le rôle
            $request->session()->regenerate();

            return $this->redirectBasedOnRole($user);

        } catch (ValidationException $e) {
            // ✅ Si c'est une exception de validation, on la relance avec les messages
            throw $e;
        } catch (\Exception $e) {
            Log::error('Erreur lors de la connexion', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'login' => $request->login,
                'ip' => $ip,
            ]);

            throw ValidationException::withMessages([
                'login' => ['❌ Une erreur est survenue. Veuillez réessayer.'],
            ]);
        }
    }

    /**
     * ✅ Incrémenter les tentatives de connexion et vérifier le seuil
     */
    private function incrementAttempts($ip, $attemptKey, $attempts)
    {
        // Incrémenter les tentatives
        $newAttempts = $attempts + 1;
        Cache::put($attemptKey, $newAttempts, now()->addMinutes(2)); // 2 minutes

        // ✅ Si plus de 5 tentatives, bloquer l'IP
        if ($newAttempts >= 5) {
            Cache::put('login_blocked_' . $ip, 300, now()->addMinutes(5)); // 5 minutes de blocage

            Log::warning('IP bloquée pour cause de trop de tentatives échouées', [
                'ip' => $ip,
                'attempts' => $newAttempts,
                'block_duration' => '5 minutes',
            ]);
        }
    }

    // Déconnexion
    public function logout(Request $request)
    {
        $user = Auth::user();

        Log::info('Déconnexion', [
            'user_id' => $user?->id,
            'email' => $user?->email,
            'telephone' => $user?->telephone,
        ]);

        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }

    // Redirection selon le rôle
    protected function redirectBasedOnRole(User $user)
    {
        if ($user->isAdmin()) {
            return redirect()->route('admin.dashboard');
        }

        if ($user->isStudent()) {
            return redirect()->route('student.dashboard');
        }

        return redirect('/');
    }
}
