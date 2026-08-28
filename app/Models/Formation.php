<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Formation extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'abbreviation',
        'slug',
        'description',
        'debouches',
        'duration',
        'diplome',
        'frais',
        'image',
        'lien_externe',
        'lien_label',
        'lien_paiement_total',
        'is_active',
        'order',
    ];

    protected $casts = [
        'frais' => 'decimal:2',
        'is_active' => 'boolean',
    ];

    // Auto-generate slug
    public static function boot()
    {
        parent::boot();

        static::creating(function ($formation) {
            $formation->slug = Str::slug($formation->name);
        });

        static::updating(function ($formation) {
            $formation->slug = Str::slug($formation->name);
        });
    }

    // ===================== RELATIONS =====================

    public function certifications()
    {
        return $this->hasMany(Certification::class);
    }

    public function vagues()
    {
        return $this->hasMany(Vague::class);
    }

    // ✅ RELATION AVEC LES TRANCHES (À AJOUTER)
    public function tranches()
    {
        return $this->hasMany(Tranche::class);
    }

    // ===================== ACCESSORS =====================

    public function getFormattedFraisAttribute(): string
    {
        return number_format($this->frais, 0, ',', ' ') . ' FCFA';
    }

    public function getImageUrlAttribute(): string
    {
        return $this->image
            ? asset('storage/formations/' . $this->image)
            : asset('assets/images/placeholder.jpg');
    }
    // app/Models/FormationPresentiel.php et FormationEnLigne.php
    public function pole(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Pole::class);
    }
 
}
