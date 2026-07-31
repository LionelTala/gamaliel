<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Activite extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'excerpt',
        'description',
        'image',
        'tag',
        'date',
        'lieu',
        'heure',
        'is_active',
        'ordre',
        'lien',
    ];

    protected $casts = [
        'date' => 'date',
        'is_active' => 'boolean',
    ];

    // Auto-generate slug
    public static function boot()
    {
        parent::boot();

        static::creating(function ($activite) {
            $activite->slug = Str::slug($activite->title);
        });

        static::updating(function ($activite) {
            $activite->slug = Str::slug($activite->title);
        });
    }
    public function getLienUrlAttribute()
{
    return $this->lien ?? null;
}

// ✅ Vérifier si un lien existe
public function getHasLienAttribute()
{
    return !empty($this->lien);
}

    // Accesseurs
    public function getImageUrlAttribute(): string
    {
        if ($this->image) {
            return asset('storage/activites/' . $this->image);
        }
        return asset('assets/images/placeholder.jpg');
    }

    public function getFormattedDateAttribute(): string
    {
        return $this->date->format('d/m/Y');
    }

    public function getStatusAttribute(): string
    {
        if (!$this->is_active) return 'Inactive';
        if ($this->date < now()) return 'Passée';
        return 'À venir';
    }

    public function getStatusColorAttribute(): string
    {
        if (!$this->is_active) return 'gray';
        if ($this->date < now()) return 'red';
        return 'green';
    }
}
