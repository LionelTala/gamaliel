<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Livre;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BibliothequeController extends Controller
{
    public function index(Request $request)
    {
        $query = Livre::where('is_active', true);

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where('titre', 'LIKE', "%{$search}%");
        }

        $livres = $query
            ->orderBy('created_at', 'desc')
            ->paginate(12)
            ->withQueryString()
            ->through(fn ($livre) => [
                'id' => $livre->id,
                'titre' => $livre->titre,
                'description' => $livre->description,
                'prix' => $livre->prix,
                'lien_achat' => $livre->lien_achat,
                'image_url' => $livre->image ? asset('storage/livres/' . $livre->image) : null,
            ]);

        return Inertia::render('public/Bibliotheque/Index', [
            'livres' => $livres,
            'filters' => ['search' => $request->search],
        ]);
    }
}
