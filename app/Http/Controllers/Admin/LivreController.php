<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Livre;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class LivreController extends Controller
{
    public function index(Request $request)
    {
        try {
            $query = Livre::query();

            if ($request->filled('search')) {
                $search = $request->search;
                $query->where('titre', 'LIKE', "%{$search}%");
            }

            if ($request->filled('statut')) {
                $query->where('is_active', $request->statut === 'actif');
            }

            $livres = $query
                ->orderBy('created_at', 'desc')
                ->paginate(10)
                ->withQueryString()
                ->through(fn ($livre) => [
                    'id' => $livre->id,
                    'titre' => $livre->titre,
                    'description' => $livre->description,
                    'prix' => $livre->prix,
                    'lien_achat' => $livre->lien_achat,
                    'is_active' => $livre->is_active,
                    'created_at' => $livre->created_at->format('d/m/Y'),
                    'image_url' => $livre->image ? asset('storage/livres/' . $livre->image) : null,
                ]);

            $stats = [
                'total' => Livre::count(),
                'actifs' => Livre::where('is_active', true)->count(),
                'inactifs' => Livre::where('is_active', false)->count(),
            ];

            return Inertia::render('Admin/Bibliotheque/Index', [
                'livres' => $livres,
                'stats' => $stats,
                'filters' => [
                    'search' => $request->search,
                    'statut' => $request->statut,
                ],
            ]);
        } catch (\Exception $e) {
            Log::error('Erreur chargement bibliothèque', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()->with('error', '❌ Une erreur est survenue lors du chargement.');
        }
    }

    public function create()
    {
        return Inertia::render('Admin/Bibliotheque/Create');
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'titre' => 'required|string|max:255',
                'description' => 'required|string',
                'prix' => 'nullable|numeric|min:0',
                'lien_achat' => 'nullable|url',
                'image' => 'nullable|image|max:2048',
                'is_active' => 'boolean',
            ]);

            if ($request->hasFile('image')) {
                $path = $request->file('image')->store('livres', 'public');
                $validated['image'] = basename($path);
            }

            $livre = Livre::create($validated);

            Log::info('Livre créé', [
                'livre_id' => $livre->id,
                'titre' => $livre->titre,
                'created_by' => auth()->id(),
            ]);

            return redirect()->route('admin.bibliotheque.index')
                ->with('success', "✅ Livre « {$livre->titre} » ajouté avec succès.");
        } catch (\Illuminate\Validation\ValidationException $e) {
            throw $e;
        } catch (\Exception $e) {
            Log::error('Erreur création livre', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()
                ->withInput()
                ->with('error', '❌ Une erreur est survenue lors de la création.');
        }
    }

    public function edit(Livre $livre)
    {
        try {
            return Inertia::render('Admin/Bibliotheque/Edit', [
                'livre' => [
                    'id' => $livre->id,
                    'titre' => $livre->titre,
                    'description' => $livre->description,
                    'prix' => $livre->prix,
                    'lien_achat' => $livre->lien_achat,
                    'is_active' => $livre->is_active,
                    'image_url' => $livre->image ? asset('storage/livres/' . $livre->image) : null,
                ],
            ]);
        } catch (\Exception $e) {
            Log::error('Erreur chargement formulaire édition livre', [
                'livre_id' => $livre->id,
                'message' => $e->getMessage(),
            ]);

            return redirect()->route('admin.bibliotheque.index')
                ->with('error', '❌ Une erreur est survenue.');
        }
    }

    public function update(Request $request, Livre $livre)
    {
        try {
            $validated = $request->validate([
                'titre' => 'required|string|max:255',
                'description' => 'required|string',
                'prix' => 'nullable|numeric|min:0',
                'lien_achat' => 'nullable|url',
                'image' => 'nullable|image|max:2048',
                'is_active' => 'boolean',
            ]);

            if ($request->hasFile('image')) {
                if ($livre->image) {
                    Storage::disk('public')->delete('livres/' . $livre->image);
                }
                $path = $request->file('image')->store('livres', 'public');
                $validated['image'] = basename($path);
            }

            $livre->update($validated);

            Log::info('Livre mis à jour', [
                'livre_id' => $livre->id,
                'titre' => $livre->titre,
                'updated_by' => auth()->id(),
            ]);

            return redirect()->route('admin.bibliotheque.index')
                ->with('success', "✅ Livre « {$livre->titre} » mis à jour avec succès.");
        } catch (\Illuminate\Validation\ValidationException $e) {
            throw $e;
        } catch (\Exception $e) {
            Log::error('Erreur mise à jour livre', [
                'livre_id' => $livre->id,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()
                ->withInput()
                ->with('error', '❌ Une erreur est survenue lors de la mise à jour.');
        }
    }

    public function destroy(Livre $livre)
    {
        try {
            $titre = $livre->titre;

            if ($livre->image) {
                Storage::disk('public')->delete('livres/' . $livre->image);
            }

            $livre->delete();

            Log::info('Livre supprimé', ['titre' => $titre, 'deleted_by' => auth()->id()]);

            return redirect()->route('admin.bibliotheque.index')
                ->with('success', "✅ Livre « {$titre} » supprimé avec succès.");
        } catch (\Exception $e) {
            Log::error('Erreur suppression livre', [
                'livre_id' => $livre->id ?? null,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()->with('error', '❌ Une erreur est survenue lors de la suppression.');
        }
    }

    public function toggle(Livre $livre)
    {
        try {
            $livre->update(['is_active' => !$livre->is_active]);

            Log::info('Statut livre modifié', ['livre_id' => $livre->id, 'new_status' => $livre->is_active]);

            return back()->with('success', '✅ Statut du livre mis à jour');
        } catch (\Exception $e) {
            Log::error('Erreur changement statut livre', [
                'livre_id' => $livre->id,
                'message' => $e->getMessage(),
            ]);

            return back()->with('error', '❌ Une erreur est survenue.');
        }
    }
}
