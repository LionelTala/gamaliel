<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Certification extends Model
{
    use HasFactory;

    protected $fillable = [
        'formation_id',
        'titre',
        'slug',
        'description',
        'prerequis',
        'contenu',
        'duree',
        'frais',
        'image',
        'lien_externe',
        'lien_label',
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

        static::creating(function ($certification) {
            $certification->slug = Str::slug($certification->titre);
        });

        static::updating(function ($certification) {
            $certification->slug = Str::slug($certification->titre);
        });
    }

    // ===================== RELATIONS =====================

    public function formation()
    {
        return $this->belongsTo(Formation::class);
    }

    // ===================== ACCESSORS =====================

    public function getFormattedFraisAttribute(): string
    {
        if (!$this->frais) {
            return '0 FCFA';
        }
        return number_format($this->frais, 0, ',', ' ') . ' FCFA';
    }

    public function getImageUrlAttribute(): string
    {
        // Image spécifique à la certification
        if ($this->image) {
            return asset('storage/certifications/' . $this->image);
        }

        // Sinon, image de la formation associée
        if ($this->formation && $this->formation->image) {
            return $this->formation->image_url;
        }

        // Sinon, placeholder
        return asset('assets/images/placeholder.jpg');
    }

    // ===================== MUTATORS =====================

    public function setTitreAttribute($value)
    {
        $this->attributes['titre'] = $value;
        $this->attributes['slug'] = Str::slug($value);
    }

    // ===================== SCOPES =====================

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('order')->orderBy('titre');
    }
}
