<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PreInscription extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom_complet',
        'email',
        'telephone',
        'ville',
        'formation',
        'formation_id',
        'statut',
        'commentaire',
        'contacte_le',
    ];

    protected $casts = [
        'contacte_le' => 'datetime',
    ];

    public function getStatutLabelAttribute()
    {
        $labels = [
            'en_attente' => 'En attente',
            'contacte' => 'Contacté',
            'inscrit' => 'Inscrit',
            'refuse' => 'Refusé',
        ];
        return $labels[$this->statut] ?? $this->statut;
    }

    public function getStatutColorAttribute()
    {
        $colors = [
            'en_attente' => 'bg-yellow-100 text-yellow-800',
            'contacte' => 'bg-blue-100 text-blue-800',
            'inscrit' => 'bg-green-100 text-green-800',
            'refuse' => 'bg-red-100 text-red-800',
        ];
        return $colors[$this->statut] ?? 'bg-gray-100 text-gray-800';
    }
}
