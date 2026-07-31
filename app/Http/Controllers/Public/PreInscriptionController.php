<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\PreInscription;
use App\Models\User;
use App\Models\Notification;
use App\Events\NotificationCreated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class PreInscriptionController extends Controller
{
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'nom_complet' => 'required|string|max:255',
                'email' => 'nullable|email|max:255',
                'telephone' => 'required|string|max:50',
                'ville' => 'nullable|string|max:255',
                'formation' => 'required|string|max:255',
                'formation_id' => 'nullable|string',
            ]);

            $preInscription = DB::transaction(function () use ($validated) {
                return PreInscription::create([
                    'nom_complet' => $validated['nom_complet'],
                    'email' => $validated['email'] ?? null,
                    'telephone' => $validated['telephone'],
                    'ville' => $validated['ville'] ?? null,
                    'formation' => $validated['formation'],
                    'formation_id' => $validated['formation_id'] ?? null,
                    'statut' => 'en_attente',
                ]);
            });

            // Récupérer tous les administrateurs
            $admins = User::all()->filter(fn ($u) => $u->isAdmin());

            foreach ($admins as $admin) {
                $notification = Notification::create([
                    'user_id' => $admin->id,
                    'user_creator_id' => null, // Généré par le système, pré-inscription publique
                    'type' => 'pre_inscription',
                    'notifiable_id' => $preInscription->id,
                    'notifiable_type' => PreInscription::class,
                    'title' => 'Nouvelle pré-inscription',
                    'message' => "{$preInscription->nom_complet} s'est pré-inscrit à la formation : {$preInscription->formation}.",
                    'link' => "/admin/pre-inscriptions/{$preInscription->id}",
                ]);

                broadcast(new NotificationCreated($notification));
            }

            Log::info('Nouvelle pré-inscription', [
                'pre_inscription_id' => $preInscription->id,
                'nom_complet' => $preInscription->nom_complet,
                'formation' => $preInscription->formation,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Votre pré-inscription a été enregistrée avec succès !',
                'data' => $preInscription,
            ]);

        } catch (\Exception $e) {
            Log::error('Erreur soumission pré-inscription', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Une erreur est survenue lors de l\'enregistrement. Veuillez réessayer.',
            ], 500);
        }
    }
}
