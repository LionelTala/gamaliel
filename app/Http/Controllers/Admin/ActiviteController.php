<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Activite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ActiviteController extends Controller
{
    public function index(Request $request)
    {
        try {
            $perPage = $request->input('per_page', 20);

            $activites = Activite::orderBy('date', 'desc')
                ->paginate($perPage)
                ->through(function ($activite) {
                    return [
                        'id' => $activite->id,
                        'title' => $activite->title,
                        'slug' => $activite->slug,
                        'excerpt' => $activite->excerpt,
                        'description' => $activite->description,
                        'image' => $activite->image,
                        'image_url' => $activite->image_url,
                        'tag' => $activite->tag,
                        'date' => $activite->date->format('Y-m-d'),
                        'formatted_date' => $activite->formatted_date,
                        'lieu' => $activite->lieu,
                        'heure' => $activite->heure,
                        'lien' => $activite->lien, // ✅ Ajouté
                        'has_lien' => $activite->has_lien, // ✅ Ajouté
                        'is_active' => $activite->is_active,
                        'status' => $activite->status,
                        'status_color' => $activite->status_color,
                        'ordre' => $activite->ordre,
                        'created_at' => $activite->created_at->format('d/m/Y H:i'),
                    ];
                });

            return Inertia::render('Admin/Activites/Index', [
                'activites' => $activites->items(),
                'pagination' => [
                    'current_page' => $activites->currentPage(),
                    'last_page' => $activites->lastPage(),
                    'per_page' => $activites->perPage(),
                    'total' => $activites->total(),
                    'links' => $activites->linkCollection(),
                ],
            ]);

        } catch (\Exception $e) {
            Log::error('Erreur chargement activités', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()->with('error', '❌ Une erreur est survenue.');
        }
    }

    public function create()
    {
        return Inertia::render('Admin/Activites/Create');
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'excerpt' => 'nullable|string',
                'description' => 'nullable|string',
                'image' => 'nullable|image|max:2048',
                'tag' => 'nullable|string|max:255',
                'date' => 'required|date',
                'lieu' => 'nullable|string|max:255',
                'heure' => 'nullable|string|max:255',
                'lien' => 'nullable|url|max:500', // ✅ Ajouté
                'is_active' => 'boolean',
                'ordre' => 'integer|min:0',
            ]);

            $imagePath = null;
            if ($request->hasFile('image')) {
                $imagePath = $request->file('image')->store('activites', 'public');
                $imagePath = basename($imagePath);
            }

            $activite = Activite::create([
                'title' => $validated['title'],
                'excerpt' => $validated['excerpt'] ?? null,
                'description' => $validated['description'] ?? null,
                'image' => $imagePath,
                'tag' => $validated['tag'] ?? null,
                'date' => $validated['date'],
                'lieu' => $validated['lieu'] ?? null,
                'heure' => $validated['heure'] ?? null,
                'lien' => $validated['lien'] ?? null, // ✅ Ajouté
                'is_active' => $validated['is_active'] ?? true,
                'ordre' => $validated['ordre'] ?? 0,
            ]);

            Log::info('Activité créée', [
                'activite_id' => $activite->id,
                'title' => $activite->title,
                'created_by' => auth()->id(),
            ]);

            return redirect()->route('admin.activites.index')
                ->with('success', "✅ Activité '{$activite->title}' créée avec succès !");

        } catch (\Exception $e) {
            Log::error('Erreur création activité', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()
                ->withInput()
                ->with('error', '❌ Une erreur est survenue lors de la création.');
        }
    }

    public function edit(Activite $activite)
    {
        return Inertia::render('Admin/Activites/Edit', [
            'activite' => [
                'id' => $activite->id,
                'title' => $activite->title,
                'excerpt' => $activite->excerpt,
                'description' => $activite->description,
                'image' => $activite->image,
                'image_url' => $activite->image_url,
                'tag' => $activite->tag,
                'date' => $activite->date->format('Y-m-d'),
                'lieu' => $activite->lieu,
                'heure' => $activite->heure,
                'lien' => $activite->lien, // ✅ Ajouté
                'has_lien' => $activite->has_lien, // ✅ Ajouté
                'is_active' => $activite->is_active,
                'ordre' => $activite->ordre,
            ],
        ]);
    }

    public function update(Request $request, Activite $activite)
    {
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'excerpt' => 'nullable|string',
                'description' => 'nullable|string',
                'image' => 'nullable|image|max:2048',
                'tag' => 'nullable|string|max:255',
                'date' => 'required|date',
                'lieu' => 'nullable|string|max:255',
                'heure' => 'nullable|string|max:255',
                'lien' => 'nullable|url|max:500', // ✅ Ajouté
                'is_active' => 'boolean',
                'ordre' => 'integer|min:0',
            ]);

            if ($request->hasFile('image')) {
                if ($activite->image) {
                    Storage::disk('public')->delete('activites/' . $activite->image);
                }
                $imagePath = $request->file('image')->store('activites', 'public');
                $activite->image = basename($imagePath);
            }

            $activite->update([
                'title' => $validated['title'],
                'excerpt' => $validated['excerpt'] ?? null,
                'description' => $validated['description'] ?? null,
                'tag' => $validated['tag'] ?? null,
                'date' => $validated['date'],
                'lieu' => $validated['lieu'] ?? null,
                'heure' => $validated['heure'] ?? null,
                'lien' => $validated['lien'] ?? null, // ✅ Ajouté
                'is_active' => $validated['is_active'] ?? true,
                'ordre' => $validated['ordre'] ?? 0,
            ]);

            Log::info('Activité mise à jour', [
                'activite_id' => $activite->id,
                'title' => $activite->title,
                'updated_by' => auth()->id(),
            ]);

            return redirect()->route('admin.activites.index')
                ->with('success', "✅ Activité '{$activite->title}' mise à jour avec succès !");

        } catch (\Exception $e) {
            Log::error('Erreur mise à jour activité', [
                'activite_id' => $activite->id,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()
                ->withInput()
                ->with('error', '❌ Une erreur est survenue lors de la mise à jour.');
        }
    }

    public function destroy(Activite $activite)
    {
        try {
            $title = $activite->title;

            if ($activite->image) {
                Storage::disk('public')->delete('activites/' . $activite->image);
            }

            $activite->delete();

            Log::info('Activité supprimée', [
                'activite_id' => $activite->id,
                'title' => $title,
                'deleted_by' => auth()->id(),
            ]);

            return redirect()->back()
                ->with('success', "✅ Activité '{$title}' supprimée avec succès !");

        } catch (\Exception $e) {
            Log::error('Erreur suppression activité', [
                'activite_id' => $activite->id,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()
                ->with('error', '❌ Une erreur est survenue lors de la suppression.');
        }
    }

    public function toggleActive(Activite $activite)
    {
        try {
            $activite->update(['is_active' => !$activite->is_active]);

            $status = $activite->is_active ? 'activée' : 'désactivée';

            return redirect()->back()
                ->with('success', "✅ Activité '{$activite->title}' {$status} avec succès !");

        } catch (\Exception $e) {
            Log::error('Erreur changement statut', [
                'activite_id' => $activite->id,
                'message' => $e->getMessage(),
            ]);

            return redirect()->back()
                ->with('error', '❌ Une erreur est survenue.');
        }
    }
}
