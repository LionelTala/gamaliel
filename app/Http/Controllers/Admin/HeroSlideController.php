<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HeroSlide;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class HeroSlideController extends Controller
{
    public function index()
    {
        try {
            $slides = HeroSlide::orderBy('ordre')
                ->orderBy('id')
                ->get()
                ->map(function ($slide) {
                    return [
                        'id' => $slide->id,
                        'titre' => $slide->titre,
                        'badge' => $slide->badge,
                        'image' => $slide->image,
                        'image_url' => $slide->image_url,
                        'is_active' => $slide->is_active,
                        'ordre' => $slide->ordre,
                        'created_at' => $slide->created_at?->format('d/m/Y'),
                    ];
                });

            return Inertia::render('Admin/HeroSlides/Index', [
                'slides' => $slides,
            ]);
        } catch (\Exception $e) {
            Log::error('Erreur chargement slides', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()->with('error', '❌ Une erreur est survenue.');
        }
    }

    public function create()
    {
        return Inertia::render('Admin/HeroSlides/Create');
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'titre' => 'required|string|max:255',
                'description' => 'nullable|string',
                'badge' => 'nullable|string|max:255',
                'image' => 'nullable|image|max:2048',
                'carte_titre' => 'nullable|string|max:255',
                'carte_date' => 'nullable|string|max:255',
                'carte_tags' => 'nullable|array',
                'carte_tags.*' => 'string|max:50',
                'statistiques' => 'nullable|array',
                'statistiques.*.label' => 'string|max:50',
                'statistiques.*.sub' => 'string|max:50',
                'cta_primary_text' => 'nullable|string|max:255',
                'cta_primary_link' => 'nullable|string|max:255',
                'cta_secondary_text' => 'nullable|string|max:255',
                'cta_secondary_link' => 'nullable|string|max:255',
                'is_active' => 'boolean',
                'ordre' => 'integer|min:0',
            ]);

            $slide = DB::transaction(function () use ($request, $validated) {
                $imagePath = null;
                if ($request->hasFile('image')) {
                    $imagePath = $request->file('image')->store('hero', 'public');
                    $imagePath = basename($imagePath);
                }

                // Statistiques par défaut si non fournies
                $statistiques = $validated['statistiques'] ?? [
                    ['label' => '22+', 'sub' => "Ans d'expérience"],
                    ['label' => '6', 'sub' => 'Filières'],
                    ['label' => '3', 'sub' => 'Campus'],
                ];

                return HeroSlide::create([
                    'titre' => $validated['titre'],
                    'description' => $validated['description'] ?? null,
                    'badge' => $validated['badge'] ?? null,
                    'image' => $imagePath,
                    'carte_titre' => $validated['carte_titre'] ?? null,
                    'carte_date' => $validated['carte_date'] ?? null,
                    'carte_tags' => $validated['carte_tags'] ?? [],
                    'statistiques' => $statistiques,
                    'cta_primary_text' => $validated['cta_primary_text'] ?? null,
                    'cta_primary_link' => $validated['cta_primary_link'] ?? null,
                    'cta_secondary_text' => $validated['cta_secondary_text'] ?? null,
                    'cta_secondary_link' => $validated['cta_secondary_link'] ?? null,
                    'is_active' => $validated['is_active'] ?? true,
                    'ordre' => $validated['ordre'] ?? 0,
                ]);
            });

            Log::info('Hero slide créé', [
                'slide_id' => $slide->id,
                'titre' => $slide->titre,
                'created_by' => auth()->id(),
            ]);

            return redirect()->route('admin.hero-slides.index')
                ->with('success', "✅ Slide '{$slide->titre}' créé avec succès !");

        } catch (\Exception $e) {
            Log::error('Erreur création slide', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()
                ->withInput()
                ->with('error', '❌ Une erreur est survenue lors de la création.');
        }
    }

    public function edit(HeroSlide $heroSlide)
    {
        return Inertia::render('Admin/HeroSlides/Edit', [
            'slide' => [
                'id' => $heroSlide->id,
                'titre' => $heroSlide->titre,
                'description' => $heroSlide->description,
                'badge' => $heroSlide->badge,
                'image' => $heroSlide->image,
                'image_url' => $heroSlide->image_url,
                'carte_titre' => $heroSlide->carte_titre,
                'carte_date' => $heroSlide->carte_date,
                'carte_tags' => $heroSlide->carte_tags ?? [],
                'statistiques' => $heroSlide->statistiques ?? [],
                'cta_primary_text' => $heroSlide->cta_primary_text,
                'cta_primary_link' => $heroSlide->cta_primary_link,
                'cta_secondary_text' => $heroSlide->cta_secondary_text,
                'cta_secondary_link' => $heroSlide->cta_secondary_link,
                'is_active' => $heroSlide->is_active,
                'ordre' => $heroSlide->ordre,
            ],
        ]);
    }

    public function update(Request $request, HeroSlide $heroSlide)
    {
        try {
            $validated = $request->validate([
                'titre' => 'required|string|max:255',
                'description' => 'nullable|string',
                'badge' => 'nullable|string|max:255',
                'image' => 'nullable|image|max:2048',
                'carte_titre' => 'nullable|string|max:255',
                'carte_date' => 'nullable|string|max:255',
                'carte_tags' => 'nullable|array',
                'carte_tags.*' => 'string|max:50',
                'statistiques' => 'nullable|array',
                'statistiques.*.label' => 'string|max:50',
                'statistiques.*.sub' => 'string|max:50',
                'cta_primary_text' => 'nullable|string|max:255',
                'cta_primary_link' => 'nullable|string|max:255',
                'cta_secondary_text' => 'nullable|string|max:255',
                'cta_secondary_link' => 'nullable|string|max:255',
                'is_active' => 'boolean',
                'ordre' => 'integer|min:0',
            ]);

            DB::transaction(function () use ($request, $heroSlide, $validated) {
                if ($request->hasFile('image')) {
                    if ($heroSlide->image) {
                        Storage::disk('public')->delete('hero/' . $heroSlide->image);
                    }
                    $imagePath = $request->file('image')->store('hero', 'public');
                    $heroSlide->image = basename($imagePath);
                }

                $statistiques = $validated['statistiques'] ?? [
                    ['label' => '22+', 'sub' => "Ans d'expérience"],
                    ['label' => '6', 'sub' => 'Filières'],
                    ['label' => '3', 'sub' => 'Campus'],
                ];

                $heroSlide->update([
                    'titre' => $validated['titre'],
                    'description' => $validated['description'] ?? null,
                    'badge' => $validated['badge'] ?? null,
                    'carte_titre' => $validated['carte_titre'] ?? null,
                    'carte_date' => $validated['carte_date'] ?? null,
                    'carte_tags' => $validated['carte_tags'] ?? [],
                    'statistiques' => $statistiques,
                    'cta_primary_text' => $validated['cta_primary_text'] ?? null,
                    'cta_primary_link' => $validated['cta_primary_link'] ?? null,
                    'cta_secondary_text' => $validated['cta_secondary_text'] ?? null,
                    'cta_secondary_link' => $validated['cta_secondary_link'] ?? null,
                    'is_active' => $validated['is_active'] ?? true,
                    'ordre' => $validated['ordre'] ?? 0,
                ]);
            });

            Log::info('Hero slide mis à jour', [
                'slide_id' => $heroSlide->id,
                'titre' => $heroSlide->titre,
                'updated_by' => auth()->id(),
            ]);

            return redirect()->route('admin.hero-slides.index')
                ->with('success', "✅ Slide '{$heroSlide->titre}' mis à jour avec succès !");

        } catch (\Exception $e) {
            Log::error('Erreur mise à jour slide', [
                'slide_id' => $heroSlide->id,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()
                ->withInput()
                ->with('error', '❌ Une erreur est survenue lors de la mise à jour.');
        }
    }

    public function destroy(HeroSlide $heroSlide)
    {
        try {
            $titre = $heroSlide->titre;

            DB::transaction(function () use ($heroSlide) {
                if ($heroSlide->image) {
                    Storage::disk('public')->delete('hero/' . $heroSlide->image);
                }
                $heroSlide->delete();
            });

            Log::info('Hero slide supprimé', [
                'slide_id' => $heroSlide->id,
                'titre' => $titre,
                'deleted_by' => auth()->id(),
            ]);

            return redirect()->back()
                ->with('success', "✅ Slide '{$titre}' supprimé avec succès !");

        } catch (\Exception $e) {
            Log::error('Erreur suppression slide', [
                'slide_id' => $heroSlide->id,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()
                ->with('error', '❌ Une erreur est survenue lors de la suppression.');
        }
    }

    public function toggleActive(HeroSlide $heroSlide)
    {
        try {
            $heroSlide->update(['is_active' => !$heroSlide->is_active]);

            $status = $heroSlide->is_active ? 'activé' : 'désactivé';

            Log::info('Hero slide ' . $status, [
                'slide_id' => $heroSlide->id,
                'titre' => $heroSlide->titre,
                'updated_by' => auth()->id(),
            ]);

            return redirect()->back()
                ->with('success', "✅ Slide '{$heroSlide->titre}' {$status} avec succès !");

        } catch (\Exception $e) {
            Log::error('Erreur changement statut slide', [
                'slide_id' => $heroSlide->id,
                'message' => $e->getMessage(),
            ]);

            return redirect()->back()
                ->with('error', '❌ Une erreur est survenue.');
        }
    }
}
