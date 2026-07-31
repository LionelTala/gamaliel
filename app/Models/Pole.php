<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Pole extends Model
{
    protected $fillable = [
        'nom', 'slug', 'description', 'description_courte',
        'image', 'couleur', 'icone', 'ordre', 'actif',
    ];

    protected $casts = [
        'actif' => 'boolean',
    ];

    public function formationsPresentiel(): HasMany
    {
        return $this->hasMany(FormationPresentiel::class);
    }

    public function formationsEnLigne(): HasMany
    {
        return $this->hasMany(Formation::class);
    }

    // Pratique pour le front : nombre total de formations (présentiel + en ligne)
    public function getNombreFormationsAttribute(): int
    {
        return $this->formationsPresentiel()->count() + $this->formationsEnLigne()->count();
    }
}
