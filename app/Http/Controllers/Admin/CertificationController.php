<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Certification;
use App\Models\Formation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class CertificationController extends Controller
{
    public function index()
    {
        try {
            $certifications = Certification::with('formation')
                ->orderBy('order')
                ->orderBy('titre')
                ->get()
                ->map(function ($certification) {
                    return [
                        'id' => $certification->id,
                        'titre' => $certification->titre,
                        'slug' => $certification->slug,
                        'duree' => $certification->duree,
                        'frais' => $certification->frais,
                        'frais_formatted' => $certification->formatted_frais,
                        'image_url' => $certification->image_url,
                        'lien_externe' => $certification->lien_externe,
                        'lien_label' => $certification->lien_label,
                        'is_active' => $certification->is_active,
                        'order' => $certification->order,
                        'formation' => [
                            'id' => $certification->formation?->id,
                            'name' => $certification->formation?->name,
                            'abbreviation' => $certification->formation?->abbreviation,
                        ],
                    ];
                });

            return Inertia::render('Admin/Certifications/Index', [
                'certifications' => $certifications,
            ]);
        } catch (\Exception $e) {
            Log::error('Erreur chargement certifications', [
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

        return Inertia::render('Admin/Certifications/Create', [
            'formations' => $formations,
        ]);
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'formation_id' => 'required|exists:formations,id',
                'titre' => 'required|string|max:255|unique:certifications,titre',
                'description' => 'required|string',
                'prerequis' => 'nullable|string',
                'contenu' => 'nullable|string',
                'duree' => 'required|string|max:255',
                'frais' => 'required|numeric|min:0',
                'image' => 'nullable|image|max:2048',
                'lien_externe' => 'nullable|url|max:255',
                'lien_label' => 'nullable|string|max:255',
                'is_active' => 'boolean',
                'order' => 'integer|min:0',
            ]);

            $certification = DB::transaction(function () use ($request, $validated) {
                $imagePath = null;
                if ($request->hasFile('image')) {
                    $imagePath = $request->file('image')->store('certifications', 'public');
                    $imagePath = basename($imagePath);
                }

                return Certification::create([
                    'formation_id' => $validated['formation_id'],
                    'titre' => $validated['titre'],
                    'description' => $validated['description'],
                    'prerequis' => $validated['prerequis'] ?? null,
                    'contenu' => $validated['contenu'] ?? null,
                    'duree' => $validated['duree'],
                    'frais' => $validated['frais'],
                    'image' => $imagePath,
                    'lien_externe' => $validated['lien_externe'] ?? null,
                    'lien_label' => $validated['lien_label'] ?? null,
                    'is_active' => $validated['is_active'] ?? true,
                    'order' => $validated['order'] ?? 0,
                ]);
            });

            Log::info('Certification créée', [
                'certification_id' => $certification->id,
                'titre' => $certification->titre,
                'created_by' => auth()->id(),
            ]);

            return redirect()->route('admin.certifications.index')
                ->with('success', "✅ Certification {$certification->titre} créée avec succès !");

        } catch (\Exception $e) {
            Log::error('Erreur création certification', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()
                ->withInput()
                ->with('error', '❌ Une erreur est survenue lors de la création.');
        }
    }

    public function edit(Certification $certification)
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

        return Inertia::render('Admin/Certifications/Edit', [
            'certification' => [
                'id' => $certification->id,
                'formation_id' => $certification->formation_id,
                'titre' => $certification->titre,
                'description' => $certification->description,
                'prerequis' => $certification->prerequis,
                'contenu' => $certification->contenu,
                'duree' => $certification->duree,
                'frais' => $certification->frais,
                'image' => $certification->image,
                'image_url' => $certification->image_url,
                'lien_externe' => $certification->lien_externe,
                'lien_label' => $certification->lien_label,
                'is_active' => $certification->is_active,
                'order' => $certification->order,
            ],
            'formations' => $formations,
        ]);
    }

    public function update(Request $request, Certification $certification)
    {
        try {
            $validated = $request->validate([
                'formation_id' => 'required|exists:formations,id',
                'titre' => 'required|string|max:255|unique:certifications,titre,' . $certification->id,
                'description' => 'required|string',
                'prerequis' => 'nullable|string',
                'contenu' => 'nullable|string',
                'duree' => 'required|string|max:255',
                'frais' => 'required|numeric|min:0',
                'image' => 'nullable|image|max:2048',
                'lien_externe' => 'nullable|url|max:255',
                'lien_label' => 'nullable|string|max:255',
                'is_active' => 'boolean',
                'order' => 'integer|min:0',
            ]);

            DB::transaction(function () use ($request, $certification, $validated) {
                if ($request->hasFile('image')) {
                    if ($certification->image) {
                        Storage::disk('public')->delete('certifications/' . $certification->image);
                    }
                    $imagePath = $request->file('image')->store('certifications', 'public');
                    $certification->image = basename($imagePath);
                }

                $certification->update([
                    'formation_id' => $validated['formation_id'],
                    'titre' => $validated['titre'],
                    'description' => $validated['description'],
                    'prerequis' => $validated['prerequis'] ?? null,
                    'contenu' => $validated['contenu'] ?? null,
                    'duree' => $validated['duree'],
                    'frais' => $validated['frais'],
                    'lien_externe' => $validated['lien_externe'] ?? null,
                    'lien_label' => $validated['lien_label'] ?? null,
                    'is_active' => $validated['is_active'] ?? true,
                    'order' => $validated['order'] ?? 0,
                ]);
            });

            Log::info('Certification mise à jour', [
                'certification_id' => $certification->id,
                'titre' => $certification->titre,
                'updated_by' => auth()->id(),
            ]);

            return redirect()->route('admin.certifications.index')
                ->with('success', "✅ Certification {$certification->titre} mise à jour avec succès !");

        } catch (\Exception $e) {
            Log::error('Erreur mise à jour certification', [
                'certification_id' => $certification->id,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()
                ->withInput()
                ->with('error', '❌ Une erreur est survenue lors de la mise à jour.');
        }
    }

    public function destroy(Certification $certification)
    {
        try {
            $titre = $certification->titre;

            DB::transaction(function () use ($certification) {
                if ($certification->image) {
                    Storage::disk('public')->delete('certifications/' . $certification->image);
                }
                $certification->delete();
            });

            Log::info('Certification supprimée', [
                'certification_id' => $certification->id,
                'titre' => $titre,
                'deleted_by' => auth()->id(),
            ]);

            return redirect()->back()
                ->with('success', "✅ Certification {$titre} supprimée avec succès !");

        } catch (\Exception $e) {
            Log::error('Erreur suppression certification', [
                'certification_id' => $certification->id,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()
                ->with('error', '❌ Une erreur est survenue lors de la suppression.');
        }
    }

    public function toggleActive(Certification $certification)
    {
        try {
            $certification->update(['is_active' => !$certification->is_active]);

            $status = $certification->is_active ? 'activée' : 'désactivée';

            Log::info('Certification ' . $status, [
                'certification_id' => $certification->id,
                'titre' => $certification->titre,
                'updated_by' => auth()->id(),
            ]);

            return redirect()->back()
                ->with('success', "✅ Certification {$certification->titre} {$status} avec succès !");

        } catch (\Exception $e) {
            Log::error('Erreur changement statut certification', [
                'certification_id' => $certification->id,
                'message' => $e->getMessage(),
            ]);

            return redirect()->back()
                ->with('error', '❌ Une erreur est survenue.');
        }
    }
}
