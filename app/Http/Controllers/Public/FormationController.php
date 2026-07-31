<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Formation; // Formations en ligne
use App\Models\FormationPresentiel; // Formations présentiel
use Inertia\Inertia;

class FormationController extends Controller
{
    public function index()
    {
        // ✅ Formations en ligne (table formations)
        $formationsEnLigne = Formation::where('is_active', true)
            ->orderBy('order')
            ->get()
            ->map(function ($formation) {
                return [
                    'id' => $formation->id,
                    'name' => $formation->name,
                    'abbreviation' => $formation->abbreviation,
                    'description' => $formation->description,
                    'debouches' => $formation->debouches,
                    'duration' => $formation->duration,
                    'diplome' => $formation->diplome,
                    'frais' => $formation->frais,
                    'frais_formatted' => $formation->formatted_frais,
                    'image_url' => $formation->image_url,
                    'lien_externe' => $formation->lien_externe,
                    'lien_label' => $formation->lien_label,
                ];
            });

        // ✅ Formations présentiel (table formations_presentiel)
        $formationsPresentiel = FormationPresentiel::where('is_active', true)
            ->orderBy('ordre')
            ->get()
            ->map(function ($formation) {
                return [
                    'id' => $formation->id,
                    'title' => $formation->title,
                    'abbreviation' => $formation->abbreviation,
                    'description' => $formation->description,
                    'duration' => $formation->duration,
                    'diplome' => $formation->diplome,
                    'price' => $formation->price_formatted,
                    'price_raw' => $formation->price,
                    'image' => $formation->image_url,
                    'icon' => $formation->icon,
                    'couleur' => $formation->couleur,
                    'tags' => $formation->tags_array,
                    'debouches' => $formation->debouches_array,
                    'programme' => $formation->programme_array,
                ];
            });

        return Inertia::render('public/Formations', [
            'formationsEnLigne' => $formationsEnLigne,
            'formationsPresentiel' => $formationsPresentiel,
        ]);
    }
}
