<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Activite;
use Inertia\Inertia;

class ActiviteController extends Controller
{
    public function index()
    {
        $activites = Activite::where('is_active', true)
            ->orderBy('date', 'desc')
            ->get()
            ->map(function ($activite) {
                return [
                    'id' => $activite->id,
                    'title' => $activite->title,
                    'slug' => $activite->slug,
                    'excerpt' => $activite->excerpt,
                    'description' => $activite->description,
                    'image_url' => $activite->image_url,
                    'tag' => $activite->tag,
                    'formatted_date' => $activite->formatted_date,
                    'lieu' => $activite->lieu,
                    'heure' => $activite->heure,
                    'lien' => $activite->lien,
                ];
            });

        return Inertia::render('Public/Activites', [
            'activites' => $activites,
        ]);
    }
}
