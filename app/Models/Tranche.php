<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tranche extends Model
{
    protected $fillable = ['formation_id', 'numero', 'montant', 'lien_paiement'];
    protected $casts = ['montant' => 'decimal:2'];

    public function formation()
    {
        return $this->belongsTo(Formation::class);
    }

    public function paiements()
    {
        return $this->hasMany(PaiementTranche::class);
    }

    // ✅ Relations avec les contenus (pour la vérification de suppression)
    public function cours()
    {
        return $this->hasMany(Cours::class, 'tranche_requise_id');
    }

    public function devoirs()
    {
        return $this->hasMany(Devoir::class, 'tranche_requise_id');
    }

    public function evaluations()
    {
        return $this->hasMany(Evaluation::class, 'tranche_requise_id');
    }
}
