<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Vague;
use App\Models\Formation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class VagueController extends Controller
{
    public function index()
    {
        try {
            $vagues = Vague::with('formation')
                ->orderBy('order')
                ->orderBy('date_debut', 'desc')
                ->get()
                ->map(function ($vague) {
                    return [
                        'id' => $vague->id,
                        'name' => $vague->name,
                        'date_debut' => $vague->date_debut?->format('Y-m-d'),
                        'date_fin' => $vague->date_fin?->format('Y-m-d'),
                        'formatted_dates' => $vague->formatted_dates,
                        'capacite' => $vague->capacite,
                        'inscrits' => $vague->inscrits ?? 0,
                        'places_restantes' => $vague->places_restantes,
                        'taux_remplissage' => $vague->taux_remplissage,
                        'statut' => $vague->statut,
                        'is_active' => $vague->is_active,
                        'order' => $vague->order,
                        'formation' => [
                            'id' => $vague->formation?->id,
                            'name' => $vague->formation?->name,
                            'abbreviation' => $vague->formation?->abbreviation,
                        ],
                    ];
                });

            return Inertia::render('Admin/Vagues/Index', [
                'vagues' => $vagues,
            ]);
        } catch (\Exception $e) {
            Log::error('Erreur chargement vagues', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()->with('error', '❌ Une erreur est survenue.');
        }
    }

    public function create()
    {
        $formations = Formation::where('is_active', true)
            ->orderBy('name')
            ->get()
            ->map(function ($formation) {
                return [
                    'id' => $formation->id,
                    'name' => $formation->name,
                    'abbreviation' => $formation->abbreviation,
                ];
            });

        return Inertia::render('Admin/Vagues/Create', [
            'formations' => $formations,
        ]);
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'formation_id' => 'required|exists:formations,id',
                'name' => 'required|string|max:255|unique:vagues,name',
                'date_debut' => 'required|date|before:date_fin',
                'date_fin' => 'required|date|after:date_debut',
                'capacite' => 'nullable|integer|min:1',
                'is_active' => 'boolean',
                'order' => 'integer|min:0',
            ]);

            $vague = DB::transaction(function () use ($validated) {
                return Vague::create([
                    'formation_id' => $validated['formation_id'],
                    'name' => $validated['name'],
                    'date_debut' => $validated['date_debut'],
                    'date_fin' => $validated['date_fin'],
                    'capacite' => $validated['capacite'] ?? null,
                    'inscrits' => 0,
                    'is_active' => $validated['is_active'] ?? true,
                    'order' => $validated['order'] ?? 0,
                ]);
            });

            Log::info('Vague créée', [
                'vague_id' => $vague->id,
                'name' => $vague->name,
                'created_by' => auth()->id(),
            ]);

            return redirect()->route('admin.vagues.index')
                ->with('success', "✅ Vague {$vague->name} créée avec succès !");

        } catch (\Exception $e) {
            Log::error('Erreur création vague', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()
                ->withInput()
                ->with('error', '❌ Une erreur est survenue lors de la création.');
        }
    }

    public function edit(Vague $vague)
    {
        $formations = Formation::where('is_active', true)
            ->orderBy('name')
            ->get()
            ->map(function ($formation) {
                return [
                    'id' => $formation->id,
                    'name' => $formation->name,
                    'abbreviation' => $formation->abbreviation,
                ];
            });

        return Inertia::render('Admin/Vagues/Edit', [
            'vague' => [
                'id' => $vague->id,
                'formation_id' => $vague->formation_id,
                'name' => $vague->name,
                'date_debut' => $vague->date_debut?->format('Y-m-d'),
                'date_fin' => $vague->date_fin?->format('Y-m-d'),
                'capacite' => $vague->capacite,
                'is_active' => $vague->is_active,
                'order' => $vague->order,
            ],
            'formations' => $formations,
        ]);
    }

    public function update(Request $request, Vague $vague)
    {
        try {
            $validated = $request->validate([
                'formation_id' => 'required|exists:formations,id',
                'name' => 'required|string|max:255|unique:vagues,name,' . $vague->id,
                'date_debut' => 'required|date|before:date_fin',
                'date_fin' => 'required|date|after:date_debut',
                'capacite' => 'nullable|integer|min:1',
                'is_active' => 'boolean',
                'order' => 'integer|min:0',
            ]);

            DB::transaction(function () use ($vague, $validated) {
                $vague->update([
                    'formation_id' => $validated['formation_id'],
                    'name' => $validated['name'],
                    'date_debut' => $validated['date_debut'],
                    'date_fin' => $validated['date_fin'],
                    'capacite' => $validated['capacite'] ?? null,
                    'is_active' => $validated['is_active'] ?? true,
                    'order' => $validated['order'] ?? 0,
                ]);
            });

            Log::info('Vague mise à jour', [
                'vague_id' => $vague->id,
                'name' => $vague->name,
                'updated_by' => auth()->id(),
            ]);

            return redirect()->route('admin.vagues.index')
                ->with('success', "✅ Vague {$vague->name} mise à jour avec succès !");

        } catch (\Exception $e) {
            Log::error('Erreur mise à jour vague', [
                'vague_id' => $vague->id,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()
                ->withInput()
                ->with('error', '❌ Une erreur est survenue lors de la mise à jour.');
        }
    }

    public function destroy(Vague $vague)
    {
        try {
            $name = $vague->name;

            // Vérifier si des étudiants sont inscrits
            if ($vague->inscrits > 0) {
                return redirect()->back()
                    ->with('error', "❌ Impossible de supprimer {$name} : {$vague->inscrits} étudiant(s) y sont inscrits.");
            }

            DB::transaction(function () use ($vague) {
                $vague->delete();
            });

            Log::info('Vague supprimée', [
                'vague_id' => $vague->id,
                'name' => $name,
                'deleted_by' => auth()->id(),
            ]);

            return redirect()->back()
                ->with('success', "✅ Vague {$name} supprimée avec succès !");

        } catch (\Exception $e) {
            Log::error('Erreur suppression vague', [
                'vague_id' => $vague->id,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()
                ->with('error', '❌ Une erreur est survenue lors de la suppression.');
        }
    }

    public function toggleActive(Vague $vague)
{
    try {
        DB::transaction(function () use ($vague) {
            // 1. Inverser le statut de la vague
            $newStatus = !$vague->is_active;
            $vague->update(['is_active' => $newStatus]);

            // 2. Désactiver ou Activer les comptes utilisateurs liés à cette vague
            // Récupère les user_id de tous les étudiants de la vague
            $userIds = $vague->students()
                ->whereNotNull('user_id')
                ->pluck('user_id');

            if ($userIds->isNotEmpty()) {
                \App\Models\User::whereIn('id', $userIds)->update([
                    'is_active' => $newStatus,
                ]);
            }
        });

        $status = $vague->is_active ? 'activée (étudiants activés)' : 'désactivée (étudiants désactivés)';

        Log::info('Vague ' . $status, [
            'vague_id' => $vague->id,
            'name' => $vague->name,
            'updated_by' => auth()->id(),
        ]);

        return redirect()->back()
            ->with('success', "✅ Vague {$vague->name} {$status} avec succès !");

    } catch (\Exception $e) {
        Log::error('Erreur changement statut vague', [
            'vague_id' => $vague->id,
            'message' => $e->getMessage(),
            'trace' => $e->getTraceAsString(),
        ]);

        return redirect()->back()
            ->with('error', '❌ Une erreur est survenue lors du changement de statut.');
    }
}
}
