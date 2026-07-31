<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Galerie;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class GalerieController extends Controller
{
    public function index()
    {
        Log::info('Nouvelle candidature');
        $medias = Galerie::where('is_active', true)
            ->orderBy('ordre')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($media) {
                return [
                    'id' => $media->id,
                    'titre' => $media->titre,
                    'description' => $media->description,
                    'url' => $media->url,
                    'type' => $media->type,
                    'type_label' => $media->type_label,
                    'is_image' => $media->is_image,
                    'is_video' => $media->is_video,
                    'taille_formatted' => $media->taille_formatted,
                ];
            });
            Log::info('Nouvelle candidature' 
            );

        return Inertia::render('public/Galerie', [
            'medias' => $medias,
        ]);
    }
}