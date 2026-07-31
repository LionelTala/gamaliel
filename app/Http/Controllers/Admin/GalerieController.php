<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Galerie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class GalerieController extends Controller
{
    public function index(Request $request)
    {
        try {
            $perPage = $request->input('per_page', 20);

            $medias = Galerie::orderBy('ordre')
                ->orderBy('created_at', 'desc')
                ->paginate($perPage)
                ->through(function ($media) {
                    return [
                        'id' => $media->id,
                        'titre' => $media->titre,
                        'description' => $media->description,
                        'fichier' => $media->fichier,
                        'url' => $media->url,
                        'type' => $media->type,
                        'type_label' => $media->type_label,
                        'type_icon' => $media->type_icon,
                        'mime_type' => $media->mime_type,
                        'taille' => $media->taille,
                        'taille_formatted' => $media->taille_formatted,
                        'is_image' => $media->is_image,
                        'is_video' => $media->is_video,
                        'is_pdf' => $media->is_pdf,
                        'is_active' => $media->is_active,
                        'ordre' => $media->ordre,
                        'created_at' => $media->created_at->format('d/m/Y H:i'),
                    ];
                });

            return Inertia::render('Admin/Galerie/Index', [
                'medias' => $medias->items(),
                'pagination' => [
                    'current_page' => $medias->currentPage(),
                    'last_page' => $medias->lastPage(),
                    'per_page' => $medias->perPage(),
                    'total' => $medias->total(),
                    'links' => $medias->linkCollection(),
                ],
            ]);

        } catch (\Exception $e) {
            Log::error('Erreur chargement galerie', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()->with('error', '❌ Une erreur est survenue.');
        }
    }

    public function create()
    {
        return Inertia::render('Admin/Galerie/Create');
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'titre' => 'required|string|max:255',
                'description' => 'nullable|string',
                'fichier' => 'required|file|max:20480',
                'is_active' => 'boolean',
                'ordre' => 'integer|min:0',
            ]);

            $file = $request->file('fichier');
            $mimeType = $file->getMimeType();
            $size = $file->getSize();

            // Déterminer le type
            $type = 'document';
            if (str_starts_with($mimeType, 'image/')) $type = 'image';
            elseif (str_starts_with($mimeType, 'video/')) $type = 'video';
            elseif ($mimeType === 'application/pdf') $type = 'pdf';

            // Stocker le fichier
            $path = $file->store('galerie', 'public');
            $filename = basename($path);

            $media = Galerie::create([
                'titre' => $validated['titre'],
                'description' => $validated['description'] ?? null,
                'fichier' => $filename,
                'type' => $type,
                'mime_type' => $mimeType,
                'taille' => $size,
                'is_active' => $validated['is_active'] ?? true,
                'ordre' => $validated['ordre'] ?? 0,
            ]);

            Log::info('Média ajouté à la galerie', [
                'media_id' => $media->id,
                'titre' => $media->titre,
                'type' => $media->type,
                'created_by' => auth()->id(),
            ]);

            return redirect()->route('admin.galerie.index')
                ->with('success', "✅ Média '{$media->titre}' ajouté avec succès !");

        } catch (\Exception $e) {
            Log::error('Erreur ajout média', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()
                ->withInput()
                ->with('error', '❌ Une erreur est survenue lors de l\'ajout.');
        }
    }

    public function edit(Galerie $galerie)
    {
        return Inertia::render('Admin/Galerie/Edit', [
            'media' => [
                'id' => $galerie->id,
                'titre' => $galerie->titre,
                'description' => $galerie->description,
                'fichier' => $galerie->fichier,
                'url' => $galerie->url,
                'type' => $galerie->type,
                'type_label' => $galerie->type_label,
                'is_image' => $galerie->is_image,
                'is_video' => $galerie->is_video,
                'is_active' => $galerie->is_active,
                'ordre' => $galerie->ordre,
            ],
        ]);
    }

    public function update(Request $request, Galerie $galerie)
    {
        try {
            $validated = $request->validate([
                'titre' => 'required|string|max:255',
                'description' => 'nullable|string',
                'fichier' => 'nullable|file|max:20480',
                'is_active' => 'boolean',
                'ordre' => 'integer|min:0',
            ]);

            // ✅ Préparer les données à mettre à jour
            $updateData = [
                'titre' => $validated['titre'],
                'description' => $validated['description'] ?? null,
                'is_active' => $validated['is_active'] ?? true,
                'ordre' => $validated['ordre'] ?? 0,
            ];

            // ✅ Gérer le nouveau fichier si uploadé
            if ($request->hasFile('fichier')) {
                // Supprimer l'ancien fichier
                if ($galerie->fichier) {
                    Storage::disk('public')->delete('galerie/' . $galerie->fichier);
                }

                $file = $request->file('fichier');
                $path = $file->store('galerie', 'public');
                $filename = basename($path);

                $updateData['fichier'] = $filename;
                $updateData['mime_type'] = $file->getMimeType();
                $updateData['taille'] = $file->getSize();

                // Déterminer le type
                $mimeType = $file->getMimeType();
                $type = 'document';
                if (str_starts_with($mimeType, 'image/')) $type = 'image';
                elseif (str_starts_with($mimeType, 'video/')) $type = 'video';
                elseif ($mimeType === 'application/pdf') $type = 'pdf';
                $updateData['type'] = $type;
            }

            // ✅ Mettre à jour avec toutes les données
            $galerie->update($updateData);

            Log::info('Média mis à jour', [
                'media_id' => $galerie->id,
                'titre' => $galerie->titre,
                'updated_by' => auth()->id(),
            ]);

            return redirect()->route('admin.galerie.index')
                ->with('success', "✅ Média '{$galerie->titre}' mis à jour avec succès !");

        } catch (\Exception $e) {
            Log::error('Erreur mise à jour média', [
                'media_id' => $galerie->id,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()
                ->withInput()
                ->with('error', '❌ Une erreur est survenue lors de la mise à jour.');
        }
    }

    public function destroy(Galerie $galerie)
    {
        try {
            $titre = $galerie->titre;

            // Supprimer le fichier du storage
            if ($galerie->fichier) {
                Storage::disk('public')->delete('galerie/' . $galerie->fichier);
            }

            $galerie->delete();

            Log::info('Média supprimé', [
                'media_id' => $galerie->id,
                'titre' => $titre,
                'deleted_by' => auth()->id(),
            ]);

            return redirect()->back()
                ->with('success', "✅ Média '{$titre}' supprimé avec succès !");

        } catch (\Exception $e) {
            Log::error('Erreur suppression média', [
                'media_id' => $galerie->id,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()
                ->with('error', '❌ Une erreur est survenue lors de la suppression.');
        }
    }

    public function toggleActive(Galerie $galerie)
    {
        try {
            $galerie->update(['is_active' => !$galerie->is_active]);

            $status = $galerie->is_active ? 'activé' : 'désactivé';

            return redirect()->back()
                ->with('success', "✅ Média '{$galerie->titre}' {$status} avec succès !");

        } catch (\Exception $e) {
            Log::error('Erreur changement statut', [
                'media_id' => $galerie->id,
                'message' => $e->getMessage(),
            ]);

            return redirect()->back()
                ->with('error', '❌ Une erreur est survenue.');
        }
    }
}
