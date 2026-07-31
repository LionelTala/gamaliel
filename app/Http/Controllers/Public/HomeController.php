<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Activite;
use App\Models\Pole;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {


        $activites = Activite::where('is_active', true)
            ->orderBy('date')
            ->get()
            ->map(function ($activite) {
                return [
                    'id' => $activite->id,
                    'title' => $activite->title,
                    'excerpt' => $activite->excerpt,
                    'image_url' => $activite->image_url,
                    'tag' => $activite->tag,
                    'formatted_date' => $activite->formatted_date,
                    'lien' => $activite->lien,
                ];
            });
        $poles = Pole::where('actif', true)
        ->orderBy('ordre')
        ->withCount(['formationsPresentiel', 'formationsEnLigne'])
        ->get()
        ->map(fn ($pole) => [
            'id' => $pole->id,
            'slug' => $pole->slug,
            'nom' => $pole->nom,
            'description' => $pole->description,
            'description_courte' => $pole->description_courte,
            'image' => $pole->image,
            'couleur' => $pole->couleur,
            'icone' => $pole->icone,
            'nombre_formations' => $pole->formations_presentiel_count + $pole->formations_en_ligne_count,
        ]);

        return Inertia::render('public/Home', [
             'activites' => $activites,
             'poles' => $poles,
        ]);
    }
}
