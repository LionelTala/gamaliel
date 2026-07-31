<?php

namespace App\Http\Controllers\Public;

use App\Events\NewCandidatureEvent;
use App\Events\NotificationCreated;
use App\Http\Controllers\Controller;
use App\Models\Candidature;
use App\Models\Formation;
use App\Models\Certification;
use App\Models\Notification;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class CandidatureController extends Controller
{
    // ✅ Page de pré-inscription
    public function create(Request $request)
    {
        $formationId = $request->query('formation');
        $certificationId = $request->query('certification');
        $type = $request->query('type', 'formation');

        $formation = null;
        $certification = null;

        // Si formation
        if ($formationId) {
            $formation = Formation::find($formationId);
        }

        // Si certification
        if ($certificationId) {
            $certification = Certification::with('formation')->find($certificationId);
        }

        // Vérifier qu'il y a au moins une formation ou certification
        if (!$formation && !$certification) {
            return redirect()->route('formations.public')
                ->with('error', '❌ Formation ou certification non trouvée.');
        }

        return Inertia::render('public/Preinscription', [
            'type' => $type,
            'formation' => $formation ? [
                'id' => $formation->id,
                'name' => $formation->name,
                'abbreviation' => $formation->abbreviation,
            ] : null,
            'certification' => $certification ? [
                'id' => $certification->id,
                'titre' => $certification->titre,
                'formation' => $certification->formation?->name,
            ] : null,
        ]);
    }

    // Soumettre la candidature
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'type' => 'required|in:formation,certification',
                'formation_id' => 'nullable|exists:formations,id',
                'certification_id' => 'nullable|exists:certifications,id',
                'nom' => 'required|string|max:255',
                'prenom' => 'required|string|max:255',
                'email' => 'nullable|email|max:255', // ✅ Email désormais optionnel
                'telephone' => 'required|string|max:20',
                'niveau_scolaire' => 'nullable|string|max:255',
                'message' => 'nullable|string',
            ]);

            // Valider le numéro WhatsApp
            $phone = preg_replace('/[^0-9]/', '', $validated['telephone']);
            if (!preg_match('/^(237|6)/', $phone)) {
                return redirect()->back()
                    ->withInput()
                    ->with('error', '❌ Le numéro doit être un numéro WhatsApp valide (+237 ou 6...).');
            }

            $candidature = DB::transaction(function () use ($validated) {
                return Candidature::create([
                    'type' => $validated['type'],
                    'formation_id' => $validated['formation_id'] ?? null,
                    'certification_id' => $validated['certification_id'] ?? null,
                    'nom' => $validated['nom'],
                    'prenom' => $validated['prenom'],
                    'email' => $validated['email'] ?? null,
                    'telephone' => $validated['telephone'],
                    'niveau_scolaire' => $validated['niveau_scolaire'] ?? null,
                    'message' => $validated['message'] ?? null,
                    'statut' => 'en_attente',
                ]);
            });

            $admins = User::all()->filter(fn ($u) => $u->isAdmin());

            foreach ($admins as $admin) {
                $notification = Notification::create([
                    'user_id' => $admin->id,
                    'user_creator_id' => null, // généré par le système, candidature publique sans utilisateur connecté
                    'type' => 'candidature',
                    'notifiable_id' => $candidature->id,
                    'notifiable_type' => Candidature::class,
                    'title' => 'Nouvelle candidature',
                    'message' => "{$candidature->prenom} {$candidature->nom} a soumis une candidature.",
                    'link' => "/admin/candidatures/{$candidature->id}",
                ]);

                broadcast(new NotificationCreated($notification));
            }

            Log::info('Nouvelle candidature', [
                'candidature_id' => $candidature->id,
                'nom' => $candidature->nom_complet,
                'type' => $candidature->type,
            ]);

            return redirect()->route('candidature.success')
                ->with('success', '✅ Votre candidature a été envoyée avec succès ! Nous vous contacterons sous 48h.');

        } catch (\Exception $e) {
            Log::error('Erreur soumission candidature', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()
                ->withInput()
                ->with('error', '❌ Une erreur est survenue lors de l\'envoi. Veuillez réessayer.');
        }
    }

    public function success()
    {
        return Inertia::render('public/CandidatureSuccess');
    }
}
