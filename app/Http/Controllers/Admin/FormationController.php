<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Formation;
use App\Models\FormationPresentiel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class FormationController extends Controller
{
    public function index(Request $request)
    {
        try {
            $type = $request->input('type', 'enligne');
            $formations = collect();

            if ($type === 'enligne') {
                $formations = Formation::orderBy('order')
                    ->orderBy('name')
                    ->get()
                    ->map(function ($formation) {
                        return [
                            'id' => $formation->id,
                            'name' => $formation->name,
                            'abbreviation' => $formation->abbreviation,
                            'slug' => $formation->slug,
                            'description' => $formation->description,
                            'debouches' => $formation->debouches,
                            'duration' => $formation->duration,
                            'diplome' => $formation->diplome,
                            'frais' => $formation->frais,
                            'frais_formatted' => $formation->formatted_frais ?? '0 FCFA',
                            'image' => $formation->image,
                            'image_url' => $formation->image_url ?? '/assets/images/placeholder.jpg',
                            'lien_externe' => $formation->lien_externe,
                            'lien_label' => $formation->lien_label,
                            'is_active' => $formation->is_active,
                            'order' => $formation->order,
                            'type' => 'enligne',
                        ];
                    });
            } else {
                $formations = FormationPresentiel::orderBy('ordre')
                    ->orderBy('title')
                    ->get()
                    ->map(function ($formation) {
                        return [
                            'id' => $formation->id,
                            'name' => $formation->title,
                            'abbreviation' => $formation->abbreviation,
                            'slug' => $formation->slug,
                            'description' => $formation->description,
                            'debouches' => $formation->debouches,
                            'duration' => $formation->duration,
                            'diplome' => $formation->diplome,
                            'frais' => $formation->price,
                            'frais_formatted' => $formation->price_formatted,
                            'image' => $formation->image,
                            'image_url' => $formation->image_url,
                            'lien_externe' => null,
                            'lien_label' => null,
                            'is_active' => $formation->is_active,
                            'order' => $formation->ordre,
                            'type' => 'presentiel',
                            'icon' => $formation->icon,
                            'tags' => $formation->tags,
                            'programme' => $formation->programme,
                            'couleur' => $formation->couleur,
                        ];
                    });
            }

            Log::info('Formations chargées', ['type' => $type, 'count' => $formations->count()]);

            return Inertia::render('Admin/Formations/Index', [
                'formations' => $formations,
                'currentType' => $type,
            ]);
        } catch (\Exception $e) {
            Log::error('Erreur chargement formations', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()->with('error', '❌ Une erreur est survenue.');
        }
    }

    public function create(Request $request)
    {
        $type = $request->input('type', 'enligne');

        if ($type === 'presentiel') {
            return redirect()->route('admin.formations.create-presentiel');
        }

        return Inertia::render('Admin/Formations/Create', [
            'type' => 'enligne',
        ]);
    }

    public function createPresentiel()
    {
        return Inertia::render('Admin/Formations/CreatePresentiel');
    }

    public function store(Request $request)
    {
        $type = $request->input('type', 'enligne');

        try {
            if ($type === 'enligne') {
                return $this->storeEnLigne($request);
            } else {
                return $this->storePresentiel($request);
            }
        } catch (\Exception $e) {
            Log::error('Erreur création formation', [
                'type' => $type,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()
                ->withInput()
                ->with('error', '❌ Une erreur est survenue lors de la création.');
        }
    }

    private function storeEnLigne(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:formations,name',
            'abbreviation' => 'required|string|max:10|unique:formations,abbreviation',
            'description' => 'required|string',
            'debouches' => 'required|string',
            'duration' => 'required|string|max:255',
            'diplome' => 'required|string|max:255',
            'frais' => 'required|numeric|min:0',
            'image' => 'nullable|image|max:2048',
            'lien_externe' => 'nullable|url|max:255',
            'lien_label' => 'nullable|string|max:255',
            'is_active' => 'boolean',
            'order' => 'integer|min:0',
        ]);

        $formation = DB::transaction(function () use ($request, $validated) {
            $imagePath = null;
            if ($request->hasFile('image')) {
                $imagePath = $request->file('image')->store('formations', 'public');
                $imagePath = basename($imagePath);
            }

            return Formation::create([
                'name' => $validated['name'],
                'abbreviation' => $validated['abbreviation'],
                'description' => $validated['description'],
                'debouches' => $validated['debouches'],
                'duration' => $validated['duration'],
                'diplome' => $validated['diplome'],
                'frais' => $validated['frais'],
                'image' => $imagePath,
                'lien_externe' => $validated['lien_externe'] ?? null,
                'lien_label' => $validated['lien_label'] ?? null,
                'is_active' => $validated['is_active'] ?? true,
                'order' => $validated['order'] ?? 0,
            ]);
        });

        Log::info('Formation en ligne créée', [
            'formation_id' => $formation->id,
            'name' => $formation->name,
            'created_by' => auth()->id(),
        ]);

        return redirect()->route('admin.formations.index', ['type' => 'enligne'])
            ->with('success', "✅ Formation en ligne '{$formation->name}' créée avec succès !");
    }

   private function storePresentiel(Request $request)
{
    // ✅ Décoder les champs JSON avant la validation
    $data = $request->all();

    if ($request->has('tags') && is_string($request->tags)) {
        $data['tags'] = json_decode($request->tags, true) ?? [];
    }
    if ($request->has('debouches') && is_string($request->debouches)) {
        $data['debouches'] = json_decode($request->debouches, true) ?? [];
    }
    if ($request->has('programme') && is_string($request->programme)) {
        $data['programme'] = json_decode($request->programme, true) ?? [];
    }

    $validated = validator($data, [
        'title' => 'required|string|max:255|unique:formations_presentiel,title',
        'abbreviation' => 'required|string|max:10|unique:formations_presentiel,abbreviation',
        'description' => 'required|string',
        'duration' => 'required|string|max:255',
        'diplome' => 'required|string|max:255',
        'price' => 'required|numeric|min:0',
        'image' => 'nullable|image|max:2048',
        'icon' => 'nullable|string|max:50',
        'tags' => 'nullable|array',
        'tags.*' => 'string',
        'debouches' => 'nullable|array',
        'debouches.*' => 'string',
        'programme' => 'nullable|array',
        'programme.*' => 'string',
        'couleur' => 'nullable|in:blue,red',
        'is_active' => 'boolean',
        'ordre' => 'integer|min:0',
    ])->validate();

    $formation = DB::transaction(function () use ($request, $validated) {
        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('formations_presentiel', 'public');
            $imagePath = basename($imagePath);
        }

        return FormationPresentiel::create([
            'title' => $validated['title'],
            'abbreviation' => $validated['abbreviation'],
            'description' => $validated['description'],
            'duration' => $validated['duration'],
            'diplome' => $validated['diplome'],
            'price' => $validated['price'],
            'image' => $imagePath,
            'icon' => $validated['icon'] ?? null,
            'tags' => $validated['tags'] ?? ['Cours du jour', 'Cours du soir'],
            'debouches' => $validated['debouches'] ?? [],
            'programme' => $validated['programme'] ?? [],
            'couleur' => $validated['couleur'] ?? 'blue',
            'is_active' => $validated['is_active'] ?? true,
            'ordre' => $validated['ordre'] ?? 0,
        ]);
    });

    Log::info('Formation présentiel créée', [
        'formation_id' => $formation->id,
        'title' => $formation->title,
        'created_by' => auth()->id(),
    ]);

    return redirect()->route('admin.formations.index', ['type' => 'presentiel'])
        ->with('success', "✅ Formation présentiel '{$formation->title}' créée avec succès !");
}

    public function edit(Request $request, $id)
    {
        $type = $request->input('type', 'enligne');

        try {
            if ($type === 'enligne') {
                $formation = Formation::findOrFail($id);
                return Inertia::render('Admin/Formations/Edit', [
                    'formation' => [
                        'id' => $formation->id,
                        'name' => $formation->name,
                        'abbreviation' => $formation->abbreviation,
                        'description' => $formation->description,
                        'debouches' => $formation->debouches,
                        'duration' => $formation->duration,
                        'diplome' => $formation->diplome,
                        'frais' => $formation->frais,
                        'image' => $formation->image,
                        'image_url' => $formation->image_url,
                        'lien_externe' => $formation->lien_externe,
                        'lien_label' => $formation->lien_label,
                        'is_active' => $formation->is_active,
                        'order' => $formation->order,
                        'type' => 'enligne',
                    ],
                    'type' => 'enligne',
                ]);
            } else {
                return $this->editPresentiel($id);
            }
        } catch (\Exception $e) {
            Log::error('Erreur édition formation', [
                'id' => $id,
                'type' => $type,
                'message' => $e->getMessage(),
            ]);
            return redirect()->back()->with('error', '❌ Une erreur est survenue.');
        }
    }

    public function editPresentiel($id)
    {
        $formation = FormationPresentiel::findOrFail($id);

        return Inertia::render('Admin/Formations/EditPresentiel', [
            'formation' => [
                'id' => $formation->id,
                'title' => $formation->title,
                'abbreviation' => $formation->abbreviation,
                'description' => $formation->description,
                'duration' => $formation->duration,
                'diplome' => $formation->diplome,
                'price' => $formation->price,
                'price_formatted' => $formation->price_formatted,
                'image' => $formation->image,
                'image_url' => $formation->image_url,
                'icon' => $formation->icon,
                'tags' => $formation->tags,
                'debouches' => $formation->debouches,
                'programme' => $formation->programme,
                'couleur' => $formation->couleur,
                'is_active' => $formation->is_active,
                'ordre' => $formation->ordre,
            ],
            'type' => 'presentiel',
        ]);
    }

    public function update(Request $request, $id)
    {
        $type = $request->input('type', 'enligne');

        try {
            if ($type === 'enligne') {
                return $this->updateEnLigne($request, $id);
            } else {
                return $this->updatePresentiel($request, $id);
            }
        } catch (\Exception $e) {
            Log::error('Erreur mise à jour formation', [
                'id' => $id,
                'type' => $type,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()
                ->withInput()
                ->with('error', '❌ Une erreur est survenue lors de la mise à jour.');
        }
    }

    private function updateEnLigne(Request $request, $id)
    {
        $formation = Formation::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:formations,name,' . $id,
            'abbreviation' => 'required|string|max:10|unique:formations,abbreviation,' . $id,
            'description' => 'required|string',
            'debouches' => 'required|string',
            'duration' => 'required|string|max:255',
            'diplome' => 'required|string|max:255',
            'frais' => 'required|numeric|min:0',
            'image' => 'nullable|image|max:2048',
            'lien_externe' => 'nullable|url|max:255',
            'lien_label' => 'nullable|string|max:255',
            'is_active' => 'boolean',
            'order' => 'integer|min:0',
        ]);

        DB::transaction(function () use ($request, $formation, $validated) {
            if ($request->hasFile('image')) {
                if ($formation->image) {
                    Storage::disk('public')->delete('formations/' . $formation->image);
                }
                $imagePath = $request->file('image')->store('formations', 'public');
                $formation->image = basename($imagePath);
            }

            $formation->update([
                'name' => $validated['name'],
                'abbreviation' => $validated['abbreviation'],
                'description' => $validated['description'],
                'debouches' => $validated['debouches'],
                'duration' => $validated['duration'],
                'diplome' => $validated['diplome'],
                'frais' => $validated['frais'],
                'lien_externe' => $validated['lien_externe'] ?? null,
                'lien_label' => $validated['lien_label'] ?? null,
                'is_active' => $validated['is_active'] ?? true,
                'order' => $validated['order'] ?? 0,
            ]);
        });

        Log::info('Formation en ligne mise à jour', [
            'formation_id' => $formation->id,
            'name' => $formation->name,
            'updated_by' => auth()->id(),
        ]);

        return redirect()->route('admin.formations.index', ['type' => 'enligne'])
            ->with('success', "✅ Formation en ligne '{$formation->name}' mise à jour avec succès !");
    }

    private function updatePresentiel(Request $request, $id)
{
    $formation = FormationPresentiel::findOrFail($id);

    // ✅ Décoder les champs JSON avant la validation
    $data = $request->all();

    if ($request->has('tags') && is_string($request->tags)) {
        $data['tags'] = json_decode($request->tags, true) ?? [];
    }
    if ($request->has('debouches') && is_string($request->debouches)) {
        $data['debouches'] = json_decode($request->debouches, true) ?? [];
    }
    if ($request->has('programme') && is_string($request->programme)) {
        $data['programme'] = json_decode($request->programme, true) ?? [];
    }

    $validated = validator($data, [
        'title' => 'required|string|max:255|unique:formations_presentiel,title,' . $id,
        'abbreviation' => 'required|string|max:10|unique:formations_presentiel,abbreviation,' . $id,
        'description' => 'required|string',
        'duration' => 'required|string|max:255',
        'diplome' => 'required|string|max:255',
        'price' => 'required|numeric|min:0',
        'image' => 'nullable|image|max:2048',
        'icon' => 'nullable|string|max:50',
        'tags' => 'nullable|array',
        'tags.*' => 'string',
        'debouches' => 'nullable|array',
        'debouches.*' => 'string',
        'programme' => 'nullable|array',
        'programme.*' => 'string',
        'couleur' => 'nullable|in:blue,red',
        'is_active' => 'boolean',
        'ordre' => 'integer|min:0',
    ])->validate();

    DB::transaction(function () use ($request, $formation, $validated) {
        if ($request->hasFile('image')) {
            if ($formation->image) {
                Storage::disk('public')->delete('formations_presentiel/' . $formation->image);
            }
            $imagePath = $request->file('image')->store('formations_presentiel', 'public');
            $formation->image = basename($imagePath);
        }

        $formation->update([
            'title' => $validated['title'],
            'abbreviation' => $validated['abbreviation'],
            'description' => $validated['description'],
            'duration' => $validated['duration'],
            'diplome' => $validated['diplome'],
            'price' => $validated['price'],
            'icon' => $validated['icon'] ?? null,
            'tags' => $validated['tags'] ?? ['Cours du jour', 'Cours du soir'],
            'debouches' => $validated['debouches'] ?? [],
            'programme' => $validated['programme'] ?? [],
            'couleur' => $validated['couleur'] ?? 'blue',
            'is_active' => $validated['is_active'] ?? true,
            'ordre' => $validated['ordre'] ?? 0,
        ]);
    });

    Log::info('Formation présentiel mise à jour', [
        'formation_id' => $formation->id,
        'title' => $formation->title,
        'updated_by' => auth()->id(),
    ]);

    return redirect()->route('admin.formations.index', ['type' => 'presentiel'])
        ->with('success', "✅ Formation présentiel '{$formation->title}' mise à jour avec succès !");
}

    public function destroy(Request $request, $id)
    {
        $type = $request->input('type', 'enligne');

        try {
            if ($type === 'enligne') {
                $formation = Formation::findOrFail($id);
                $name = $formation->name;

                DB::transaction(function () use ($formation) {
                    if ($formation->image) {
                        Storage::disk('public')->delete('formations/' . $formation->image);
                    }
                    $formation->delete();
                });

                Log::info('Formation en ligne supprimée', [
                    'formation_id' => $formation->id,
                    'name' => $name,
                    'deleted_by' => auth()->id(),
                ]);

                return redirect()->back()
                    ->with('success', "✅ Formation en ligne '{$name}' supprimée avec succès !");
            } else {
                $formation = FormationPresentiel::findOrFail($id);
                $name = $formation->title;

                DB::transaction(function () use ($formation) {
                    if ($formation->image) {
                        Storage::disk('public')->delete('formations_presentiel/' . $formation->image);
                    }
                    $formation->delete();
                });

                Log::info('Formation présentiel supprimée', [
                    'formation_id' => $formation->id,
                    'title' => $name,
                    'deleted_by' => auth()->id(),
                ]);

                return redirect()->back()
                    ->with('success', "✅ Formation présentiel '{$name}' supprimée avec succès !");
            }
        } catch (\Exception $e) {
            Log::error('Erreur suppression formation', [
                'id' => $id,
                'type' => $type,
                'message' => $e->getMessage(),
            ]);

            return redirect()->back()
                ->with('error', '❌ Une erreur est survenue lors de la suppression.');
        }
    }

    public function toggleActive(Request $request, $id)
    {
        $type = $request->input('type', 'enligne');

        try {
            if ($type === 'enligne') {
                $formation = Formation::findOrFail($id);
                $formation->update(['is_active' => !$formation->is_active]);
                $status = $formation->is_active ? 'activée' : 'désactivée';
                $name = $formation->name;

                Log::info('Formation en ligne ' . $status, [
                    'formation_id' => $formation->id,
                    'name' => $name,
                    'updated_by' => auth()->id(),
                ]);

                return redirect()->back()
                    ->with('success', "✅ Formation en ligne '{$name}' {$status} avec succès !");
            } else {
                $formation = FormationPresentiel::findOrFail($id);
                $formation->update(['is_active' => !$formation->is_active]);
                $status = $formation->is_active ? 'activée' : 'désactivée';
                $name = $formation->title;

                Log::info('Formation présentiel ' . $status, [
                    'formation_id' => $formation->id,
                    'title' => $name,
                    'updated_by' => auth()->id(),
                ]);

                return redirect()->back()
                    ->with('success', "✅ Formation présentiel '{$name}' {$status} avec succès !");
            }
        } catch (\Exception $e) {
            Log::error('Erreur changement statut formation', [
                'id' => $id,
                'type' => $type,
                'message' => $e->getMessage(),
            ]);

            return redirect()->back()
                ->with('error', '❌ Une erreur est survenue.');
        }
    }
}
