<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
// ✅ CORRECTION : App au lieu de app
use App\Models\PaiementTranche;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'first_name',
        'last_name',
        'phone',
        'matricule',
        'school_level',
        'birth_date',
        'address',
        'city',
        'student_type',
        'vague_id',
        'certification_id',
    ];

    protected $casts = [
        'birth_date' => 'date',
    ];

    // ===================== RELATIONS =====================

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function vague()
    {
        return $this->belongsTo(Vague::class);
    }

    public function certification()
    {
        return $this->belongsTo(Certification::class);
    }

    // ===================== ACCESSORS =====================

    public function getFullNameAttribute(): string
    {
        return $this->first_name . ' ' . $this->last_name;
    }

    public function getStudentTypeAttribute()
    {
        if ($this->vague_id) return 'online';
        if ($this->certification_id) return 'certification';
        return 'none';
    }

    public function getStudentTypeLabelAttribute()
    {
        if ($this->vague_id) return 'En ligne';
        if ($this->certification_id) return 'Certification';
        return 'Non affecté';
    }

    // ===================== VÉRIFICATIONS =====================

    public function isOnline(): bool
    {
        return !is_null($this->vague_id);
    }

    public function isCertification(): bool
    {
        return !is_null($this->certification_id);
    }

    public function isActive(): bool
    {
        return $this->user?->is_active ?? false;
    }

    public function paiementsTranches()
    {
        return $this->hasMany(PaiementTranche::class);
    }

    /**
     * Numéro de la dernière tranche payée et confirmée.
     * Retourne 0 immédiatement si l'étudiant n'est pas en formation (vague_id null).
     */
    public function derniereTranchePayeeNumero(): int
    {
        if (!$this->vague_id) {
            return 0;
        }

        $formationId = $this->vague->formation_id;

        return PaiementTranche::where('paiement_tranches.student_id', $this->id)
            ->whereNotNull('paye_le')
            ->join('tranches', 'tranches.id', '=', 'paiement_tranches.tranche_id')
            ->where('tranches.formation_id', $formationId)
            ->max('tranches.numero') ?? 0;
    }
    public function lessonVues()
    {
        return $this->hasMany(LessonVue::class);
    }

    /**
     * Est-ce que cet étudiant peut accéder à un contenu nécessitant $trancheRequiseNumero ?
     * RÈGLE D'OR : certification = toujours true, sans aucune requête de tranche.
     */
    public function peutAccederContenu(?int $trancheRequiseId): bool
{
    if ($this->certification_id) {
        return true;
    }

    if (!$trancheRequiseId) {
        return true;
    }

    // Récupérer le numéro de la tranche requise à partir de son ID
    $trancheRequise = \App\Models\Tranche::find($trancheRequiseId);

    if (!$trancheRequise) {
        return true; // Si la tranche n'existe plus/pas
    }

    return $this->derniereTranchePayeeNumero() >= $trancheRequise->numero;
}
}
