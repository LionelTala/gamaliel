<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HeroSlide extends Model
{
    use HasFactory;

    protected $fillable = [
        'image',
        'badge',
        'titre',
        'description',
        'statistiques',
        'carte_titre',
        'carte_date',
        'carte_tags',
        'cta_primary_text',
        'cta_primary_link',
        'cta_secondary_text',
        'cta_secondary_link',
        'ordre',
        'is_active',
    ];

    protected $casts = [
        'carte_tags' => 'array',
        'statistiques' => 'array',
        'is_active' => 'boolean',
    ];

    public function getImageUrlAttribute(): string
    {
        if ($this->image) {
            return asset('storage/hero/' . $this->image);
        }
        return asset('assets/images/img1.jpeg');
    }
}
