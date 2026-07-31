<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Evaluation extends Model
{
    use HasFactory;

    protected $fillable = [
        'titre',
        'description',
        'contenu',
        'date',
        'coefficient',
        'formation_id',
        'vague_id',
        'certification_id',
        'student_id',        // ✅ AJOUTER
        'tranche_requise_id',
        'type',
        'is_active',
        'order',
        'has_notification_sent',
        'notification_sent_at',
    ];

    protected $casts = [
        'contenu' => 'array',
        'date' => 'datetime',
        'coefficient' => 'decimal:1',
        'is_active' => 'boolean',
        'has_notification_sent' => 'boolean',
        'notification_sent_at' => 'datetime',
    ];

    // Relations
    public function formation()
    {
        return $this->belongsTo(Formation::class);
    }

    public function vague()
    {
        return $this->belongsTo(Vague::class);
    }

    public function certification()
    {
        return $this->belongsTo(Certification::class);
    }

    public function soumissions()
    {
        return $this->hasMany(SoumissionEvaluation::class);
    }

    // Accesseurs
    public function getStudentsAttribute()
    {
        if ($this->type === 'vague' && $this->vague_id) {
            return Student::where('vague_id', $this->vague_id)->get();
        }

        if ($this->type === 'certification' && $this->certification_id) {
            return Student::where('certification_id', $this->certification_id)->get();
        }

        return collect();
    }

    public function getSoumissionsCountAttribute()
    {
        return $this->soumissions()->count();
    }

    public function getSoumisCountAttribute()
    {
        return $this->soumissions()->where('statut', 'soumis')->count();
    }

    public function getCorrigeCountAttribute()
    {
        return $this->soumissions()->where('statut', 'corrige')->count();
    }

    public function getTauxSoumissionAttribute()
    {
        $total = $this->students->count();
        if ($total === 0) return 0;
        return round(($this->soumissions_count / $total) * 100, 1);
    }

    public function getEstDepasseAttribute()
    {
        if (!$this->date) return false;
        return now()->gt($this->date);
    }

    public function getJoursRestantsAttribute()
    {
        if (!$this->date) return null;
        if (now()->gt($this->date)) return 0;
        return now()->diffInDays($this->date);
    }

    public function student()
{
    return $this->belongsTo(Student::class);
}

public function trancheRequise()
{
    return $this->belongsTo(Tranche::class, 'tranche_requise_id');
}
}
