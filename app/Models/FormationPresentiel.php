<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class FormationPresentiel extends Model
{
    use HasFactory;

    protected $table = 'formations_presentiel';

    protected $fillable = [
        'title',
        'slug',
        'abbreviation',
        'description',
        'duration',
        'diplome',
        'price',
        'image',
        'icon',
        'tags',
        'debouches',
        'programme',
        'couleur',
        'is_active',
        'ordre',
    ];

    protected $casts = [
        'tags' => 'array',
        'debouches' => 'array',
        'programme' => 'array',
        'price' => 'decimal:0',
        'is_active' => 'boolean',
    ];

    // Auto-generate slug
    public static function boot()
    {
        parent::boot();

        static::creating(function ($formation) {
            $formation->slug = Str::slug($formation->title);
        });

        static::updating(function ($formation) {
            $formation->slug = Str::slug($formation->title);
        });
    }

    // Accesseurs
    public function getImageUrlAttribute()
    {
        if ($this->image) {
            return asset('storage/formations_presentiel/' . $this->image);
        }
        return asset('assets/images/placeholder.jpg');
    }

    public function getPriceFormattedAttribute()
    {
        return number_format($this->price, 0, ',', ' ') . ' FCFA';
    }

    // ✅ Accesseurs pour le frontend
    public function getTagsArrayAttribute()
    {
        return $this->tags ?? ['Cours du jour', 'Cours du soir'];
    }

    public function getDebouchesArrayAttribute()
    {
        return $this->debouches ?? [];
    }

    public function getProgrammeArrayAttribute()
    {
        return $this->programme ?? [];
    }
    // app/Models/FormationPresentiel.php et FormationEnLigne.php
    public function pole(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Pole::class);
    }
}
