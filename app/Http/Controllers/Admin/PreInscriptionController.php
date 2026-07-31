<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PreInscription;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PreInscriptionController extends Controller
{
    public function index(Request $request)
    {
        $query = PreInscription::query();

        // 1. Recherche globale
        if ($request->filled('search')) {
            $search = trim($request->search);
            $query->where(function ($q) use ($search) {
                $q->where('nom_complet', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('telephone', 'like', "%{$search}%")
                  ->orWhere('formation', 'like', "%{$search}%");
            });
        }

        // 2. Filtre par statut
        if ($request->filled('statut')) {
            $query->where('statut', $request->statut);
        }

        // 3. Tri
        $sortField = $request->input('sort', 'created_at');
        $sortDirection = $request->input('direction', 'desc');

        $allowedSorts = ['nom_complet', 'email', 'telephone', 'formation', 'statut', 'created_at'];
        if (in_array($sortField, $allowedSorts)) {
            $query->orderBy($sortField, $sortDirection);
        } else {
            $query->orderBy('created_at', 'desc');
        }

        // 4. Mapping de la pagination avec attributs formatés
        $preInscriptions = $query->paginate(20)
            ->withQueryString()
            ->through(function ($item) {
                return [
                    'id' => $item->id,
                    'nom_complet' => $item->nom_complet,
                    'email' => $item->email,
                    'telephone' => $item->telephone,
                    'ville' => $item->ville,
                    'formation' => $item->formation,
                    'formation_id' => $item->formation_id,
                    'statut' => $item->statut,
                    'statut_label' => $item->statut_label, // Accessor du modèle
                    'statut_color' => $item->statut_color, // Accessor du modèle
                    'commentaire' => $item->commentaire,
                    'created_at' => $item->created_at ? $item->created_at->format('d/m/Y H:i') : '',
                ];
            });

        // 5. Statistiques globales (ne doivent pas être affectées par le filtre)
        $stats = [
            'total' => PreInscription::count(),
            'en_attente' => PreInscription::where('statut', 'en_attente')->count(),
            'contacte' => PreInscription::where('statut', 'contacte')->count(),
            'inscrit' => PreInscription::where('statut', 'inscrit')->count(),
            'refuse' => PreInscription::where('statut', 'refuse')->count(),
        ];

        return Inertia::render('Admin/PreInscriptions/Index', [
            'preInscriptions' => $preInscriptions,
            'stats' => $stats,
            'filters' => [
                'search' => $request->input('search', ''),
                'statut' => $request->input('statut', ''),
            ],
            'sort' => [
                'field' => $sortField,
                'direction' => $sortDirection,
            ],
        ]);
    }

    public function update(Request $request, PreInscription $preInscription)
    {
        $validated = $request->validate([
            'statut' => 'required|in:en_attente,contacte,inscrit,refuse',
            'commentaire' => 'nullable|string',
        ]);

        $preInscription->update([
            'statut' => $validated['statut'],
            'commentaire' => $validated['commentaire'] ?? $preInscription->commentaire,
            'contacte_le' => $validated['statut'] === 'contacte' ? now() : $preInscription->contacte_le,
        ]);

        return back()->with('success', '✅ Statut mis à jour avec succès');
    }

    public function destroy(PreInscription $preInscription)
    {
        $preInscription->delete();
        return back()->with('success', '✅ Pré-inscription supprimée');
    }
}
