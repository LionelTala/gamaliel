<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SoumissionDevoir extends Model
{
    use HasFactory;

    protected $fillable = [
        'devoir_id',
        'student_id',
        'fichier',
        'commentaire',
        'note',
        'statut',
        'submitted_at',
        'corrected_at',
    ];

    protected $casts = [
        'fichier' => 'array',
        'note' => 'decimal:2',
        'submitted_at' => 'datetime',
        'corrected_at' => 'datetime',
    ];

    // Relations
    public function devoir()
    {
        return $this->belongsTo(Devoir::class);
    }

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    // Accesseurs
    public function getStatutLabelAttribute()
    {
        $labels = [
            'en_attente' => 'En attente',
            'soumis' => 'Soumis',
            'corrige' => 'Corrigé',
        ];
        return $labels[$this->statut] ?? $this->statut;
    }

    public function getStatutColorAttribute()
    {
        $colors = [
            'en_attente' => 'yellow',
            'soumis' => 'blue',
            'corrige' => 'green',
        ];
        return $colors[$this->statut] ?? 'gray';
    }

    public function getEstEnRetardAttribute()
    {
        if (!$this->devoir->date_limite) return false;
        if ($this->statut !== 'soumis') return false;
        return $this->submitted_at->gt($this->devoir->date_limite);
    }
}
