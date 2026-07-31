<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Certification;
use Inertia\Inertia;

class CertificationController extends Controller
{
    public function index()
    {
        $certifications = Certification::with('formation')
            ->where('is_active', true)
            ->orderBy('order')
            ->orderBy('titre')
            ->get()
            ->map(function ($certification) {
                return [
                    'id' => $certification->id,
                    'titre' => $certification->titre,
                    'slug' => $certification->slug,
                    'description' => $certification->description,
                    'prerequis' => $certification->prerequis,
                    'contenu' => $certification->contenu,
                    'duree' => $certification->duree,
                    'frais' => $certification->frais,
                    'frais_formatted' => $certification->formatted_frais,
                    'image_url' => $certification->image_url,
                    'lien_externe' => $certification->lien_externe,
                    'lien_label' => $certification->lien_label,
                    'formation' => [
                        'id' => $certification->formation?->id,
                        'name' => $certification->formation?->name,
                        'abbreviation' => $certification->formation?->abbreviation,
                    ],
                ];
            });

        return Inertia::render('public/Certification', [
            'certifications' => $certifications,
        ]);
    }
}
