<?php
// app/Http/Controllers/Admin/PaiementController.php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PaiementTranche;
use App\Models\Tranche;
use App\Models\Student;
use App\Models\Formation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaiementController extends Controller
{
    // Liste des étudiants d'une formation avec l'état de leurs tranches
    public function index(Request $request)
    {
        $formations = Formation::orderBy('name')->get(['id', 'name']);

        $data = collect();
        $studentsPaginated = null;

        if ($request->filled('formation_id')) {
            $formationId = $request->formation_id;

            // Récupérer les tranches de la formation
            $tranches = Tranche::where('formation_id', $formationId)
                ->orderBy('numero')
                ->get();

            // ✅ Récupérer les étudiants via les vagues de la formation
            $studentsPaginated = Student::whereHas('vague', function ($q) use ($formationId) {
                    $q->where('formation_id', $formationId);
                })
                ->with('user')
                ->orderBy('last_name')
                ->paginate(20)
                ->withQueryString();

            // Transformer les données
            $data = $studentsPaginated->through(function ($student) use ($tranches) {
                return [
                    'id' => $student->id,
                    'nom_complet' => $student->full_name,
                    'matricule' => $student->matricule,
                    'tranches' => $tranches->map(function ($tranche) use ($student) {
                        $paiement = PaiementTranche::where('student_id', $student->id)
                            ->where('tranche_id', $tranche->id)
                            ->first();

                        return [
                            'tranche_id' => $tranche->id,
                            'numero' => $tranche->numero,
                            'montant' => $tranche->montant,
                            'est_payee' => (bool) $paiement?->paye_le,
                            'paye_le' => $paiement?->paye_le?->format('d/m/Y H:i'),
                        ];
                    }),
                ];
            });
        }

        return Inertia::render('Admin/Paiements/Index', [
            'formations' => $formations,
            'students' => $data, // ✅ Maintenant correctement structuré
            'selectedFormationId' => $request->formation_id,
        ]);
    }

    // Confirmer manuellement un paiement
    public function confirmer(Request $request, Student $student, Tranche $tranche)
    {
        $validated = $request->validate([
            'note' => 'nullable|string|max:500',
        ]);

        PaiementTranche::updateOrCreate(
            ['student_id' => $student->id, 'tranche_id' => $tranche->id],
            [
                'paye_le' => now(),
                'confirme_par' => auth()->id(),
                'note' => $validated['note'] ?? null,
            ]
        );

        return back()->with('success', "✅ Tranche {$tranche->numero} confirmée pour {$student->full_name}.");
    }

    // Annuler une confirmation (en cas d'erreur admin)
    public function annuler(Student $student, Tranche $tranche)
    {
        PaiementTranche::where('student_id', $student->id)
            ->where('tranche_id', $tranche->id)
            ->delete();

        return back()->with('success', "✅ Confirmation annulée pour {$student->full_name}.");
    }

    // ✅ Page de création (si utilisée)
    public function create(Request $request)
    {
        $formations = Formation::orderBy('name')->get(['id', 'name', 'abbreviation']);

        $students = collect();
        $tranches = collect();

        if ($request->filled('formation_id')) {
            $formationId = $request->formation_id;

            // Récupérer les étudiants via les vagues
            $students = Student::whereHas('vague', function ($q) use ($formationId) {
                    $q->where('formation_id', $formationId);
                })
                ->with('user')
                ->orderBy('last_name')
                ->get();

            $tranches = Tranche::where('formation_id', $formationId)
                ->orderBy('numero')
                ->get();
        }

        return Inertia::render('Admin/Paiements/Create', [
            'formations' => $formations,
            'students' => $students,
            'tranches' => $tranches,
            'selectedFormationId' => $request->formation_id,
        ]);
    }

    // ✅ Enregistrement d'une nouvelle demande de paiement
    public function store(Request $request)
    {
        $validated = $request->validate([
            'student_id' => 'required|exists:students,id',
            'tranche_id' => 'required|exists:tranches,id',
            'reference_paiement' => 'nullable|string|max:255',
            'commentaire' => 'nullable|string',
        ]);

        // Vérifier si un paiement existe déjà
        $existant = PaiementTranche::where('student_id', $validated['student_id'])
            ->where('tranche_id', $validated['tranche_id'])
            ->first();

        if ($existant && $existant->paye_le) {
            return back()->with('error', '❌ Cette tranche est déjà payée pour cet étudiant.');
        }

        $paiement = PaiementTranche::updateOrCreate(
            ['student_id' => $validated['student_id'], 'tranche_id' => $validated['tranche_id']],
            [
                'reference_paiement' => $validated['reference_paiement'] ?? null,
                'note' => $validated['commentaire'] ?? null,
                'paye_le' => null, // En attente
            ]
        );

        $student = Student::find($validated['student_id']);
        $tranche = Tranche::find($validated['tranche_id']);

        return redirect()
            ->route('admin.paiements.index', ['formation_id' => $tranche->formation_id])
            ->with('success', "✅ Demande de paiement créée pour {$student->full_name} (Tranche {$tranche->numero})");
    }

    // ✅ Page d'édition
    public function edit(PaiementTranche $paiement)
    {
        $paiement->load(['student.user', 'tranche.formation', 'confirmateur']);

        return Inertia::render('Admin/Paiements/Edit', [
            'paiement' => $paiement,
        ]);
    }

    // ✅ Mise à jour d'un paiement
    public function update(Request $request, PaiementTranche $paiement)
    {
        $validated = $request->validate([
            'reference_paiement' => 'nullable|string|max:255',
            'note' => 'nullable|string',
        ]);

        $paiement->update([
            'reference_paiement' => $validated['reference_paiement'] ?? null,
            'note' => $validated['note'] ?? null,
        ]);

        return redirect()
            ->route('admin.paiements.index', ['formation_id' => $paiement->tranche->formation_id])
            ->with('success', "✅ Paiement mis à jour avec succès");
    }
}
