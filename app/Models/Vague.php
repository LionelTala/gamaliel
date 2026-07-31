<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vague extends Model
{
    use HasFactory;

    protected $fillable = [
        'formation_id',
        'name',
        'date_debut',
        'date_fin',
        'capacite',
        'inscrits',
        'is_active',
        'order',
    ];

    protected $casts = [
        'date_debut' => 'date',
        'date_fin' => 'date',
        'is_active' => 'boolean',
    ];

    // ===================== RELATIONS =====================

    public function formation()
    {
        return $this->belongsTo(Formation::class);
    }

    // ===================== ACCESSORS =====================

    public function getFormattedDatesAttribute(): string
    {
        if (!$this->date_debut || !$this->date_fin) {
            return 'Dates non définies';
        }

        $debut = $this->date_debut->format('d/m/Y');
        $fin = $this->date_fin->format('d/m/Y');

        return "du {$debut} au {$fin}";
    }

    public function getPlacesRestantesAttribute(): int
    {
        if (!$this->capacite) {
            return 0;
        }
        return max(0, $this->capacite - ($this->inscrits ?? 0));
    }

    public function getTauxRemplissageAttribute(): float
    {
        if (!$this->capacite || $this->capacite === 0) {
            return 0;
        }
        return round(($this->inscrits / $this->capacite) * 100, 1);
    }

    public function getStatutAttribute(): string
    {
        if (!$this->is_active) {
            return 'Inactive';
        }

        $now = now();
        $debut = $this->date_debut;
        $fin = $this->date_fin;

        if ($now < $debut) {
            return 'À venir';
        } elseif ($now > $fin) {
            return 'Terminée';
        } else {
            return 'En cours';
        }
    }
    public function students()
    {
        return $this->hasMany(Student::class);
    }
}
