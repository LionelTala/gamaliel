<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Candidature extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'formation_id',
        'certification_id',
        'nom',
        'prenom',
        'email',
        'telephone',
        'niveau_scolaire',
        'message',
        'statut',
        'user_id',
        'student_id',
        'vague_id',
        'notes',
        'traite_le',
        'traite_par',
    ];

    protected $casts = [
        'traite_le' => 'datetime',
    ];

    // Relations
    public function formation()
    {
        return $this->belongsTo(Formation::class);
    }

    public function certification()
    {
        return $this->belongsTo(Certification::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function vague()
    {
        return $this->belongsTo(Vague::class);
    }

    public function traitePar()
    {
        return $this->belongsTo(User::class, 'traite_par');
    }

    // Accesseurs
    public function getNomCompletAttribute(): string
    {
        return $this->prenom . ' ' . $this->nom;
    }

    public function getTypeLabelAttribute(): string
    {
        return $this->type === 'formation' ? 'Formation' : 'Certification';
    }

    public function getStatutLabelAttribute(): string
    {
        $labels = [
            'en_attente' => 'En attente',
            'en_cours' => 'En cours',
            'admis' => 'Admis',
            'refuse' => 'Refusé',
        ];
        return $labels[$this->statut] ?? $this->statut;
    }

    public function getStatutColorAttribute(): string
    {
        $colors = [
            'en_attente' => 'yellow',
            'en_cours' => 'blue',
            'admis' => 'green',
            'refuse' => 'red',
        ];
        return $colors[$this->statut] ?? 'gray';
    }
}
