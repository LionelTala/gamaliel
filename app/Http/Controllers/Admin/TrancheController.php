<?php
// app/Http/Controllers/Admin/TrancheController.php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Tranche;
use App\Models\Formation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TrancheController extends Controller
{
    /**
     * Page principale - Liste des tranches avec sélection de formation
     */
    public function index(Request $request)
    {
        $formations = Formation::orderBy('name')->get(['id', 'name', 'abbreviation']);

        $tranches = collect();
        $formation = null;

        if ($request->filled('formation_id')) {
            $formation = Formation::withCount(['tranches'])->find($request->formation_id, ['id', 'name', 'lien_paiement_total']);

            $tranches = Tranche::where('formation_id', $request->formation_id)
                ->withCount([
                    'paiements as paiements_count' => function ($query) {
                        $query->whereNotNull('paye_le');
                    },
                    'cours as cours_count',
                    'devoirs as devoirs_count',
                    'evaluations as evaluations_count',
                ])
                ->orderBy('numero')
                ->get();
        }

        return Inertia::render('Admin/Tranches/Index', [
            'formations' => $formations,
            'tranches' => $tranches,
            'selectedFormationId' => $request->formation_id,
            'formation' => $formation,
        ]);
    }

    /**
     * Page de création d'une tranche
     */
    public function create(Request $request)
    {
        $formations = Formation::orderBy('name')->get(['id', 'name', 'abbreviation']);

        return Inertia::render('Admin/Tranches/Create', [
            'formations' => $formations,
            'formationId' => $request->formation_id, // Pré-sélection si passé en paramètre
        ]);
    }

    /**
     * Enregistrer une nouvelle tranche
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'formation_id' => 'required|exists:formations,id',
            'montant' => 'required|numeric|min:0',
            'lien_paiement' => 'nullable|url',
        ]);

        // Numéro auto-incrémenté par formation
        $lastNumero = Tranche::where('formation_id', $validated['formation_id'])->max('numero') ?? 0;
        $validated['numero'] = $lastNumero + 1;

        $tranche = Tranche::create($validated);

        return redirect()
            ->route('admin.tranches.index', ['formation_id' => $validated['formation_id']])
            ->with('success', "✅ Tranche {$tranche->numero} créée avec succès.");
    }

    /**
     * Page d'édition d'une tranche
     */
    public function edit(Tranche $tranche)
    {
        $formations = Formation::orderBy('name')->get(['id', 'name', 'abbreviation']);

        // Charger les compteurs pour afficher les alertes
        $tranche->loadCount([
            'paiements as paiements_count' => function ($query) {
                $query->whereNotNull('paye_le');
            },
            'cours as cours_count',
            'devoirs as devoirs_count',
            'evaluations as evaluations_count',
        ]);

        return Inertia::render('Admin/Tranches/Edit', [
            'tranche' => $tranche,
            'formations' => $formations,
        ]);
    }

    /**
     * Mettre à jour une tranche
     */
    public function update(Request $request, Tranche $tranche)
    {
        $validated = $request->validate([
            'montant' => 'required|numeric|min:0',
            'lien_paiement' => 'nullable|url',
        ]);

        $tranche->update($validated);

        return redirect()
            ->route('admin.tranches.index', ['formation_id' => $tranche->formation_id])
            ->with('success', "✅ Tranche {$tranche->numero} mise à jour avec succès.");
    }

    /**
     * Supprimer une tranche
     */
    public function destroy(Tranche $tranche)
    {
        // Vérifier si des paiements existent
        if ($tranche->paiements()->whereNotNull('paye_le')->exists()) {
            return redirect()
                ->route('admin.tranches.index', ['formation_id' => $tranche->formation_id])
                ->with('error', '❌ Impossible de supprimer : des paiements existent sur cette tranche.');
        }

        // Vérifier si des contenus sont liés
        if ($tranche->cours()->exists() ||
            $tranche->devoirs()->exists() ||
            $tranche->evaluations()->exists()) {
            return redirect()
                ->route('admin.tranches.index', ['formation_id' => $tranche->formation_id])
                ->with('error', '❌ Impossible de supprimer : des contenus (cours/devoirs/évaluations) sont liés à cette tranche.');
        }

        $formationId = $tranche->formation_id;
        $numero = $tranche->numero;
        $tranche->delete();

        return redirect()
            ->route('admin.tranches.index', ['formation_id' => $formationId])
            ->with('success', "✅ Tranche {$numero} supprimée avec succès.");
    }

    /**
     * Mettre à jour le lien de paiement total d'une formation
     */
    public function updateLienTotal(Request $request, Formation $formation)
    {
        $validated = $request->validate([
            'lien_paiement_total' => 'nullable|url',
        ]);

        $formation->update($validated);

        return redirect()
            ->route('admin.tranches.index', ['formation_id' => $formation->id])
            ->with('success', '✅ Lien de paiement total mis à jour avec succès.');
    }

    /**
     * Récupérer les tranches par formation (API AJAX)
     */
    public function getByFormation($formationId)
    {
        $tranches = Tranche::where('formation_id', $formationId)
            ->orderBy('numero')
            ->get(['id', 'numero', 'montant']);

        return response()->json($tranches);
    }

    
}
