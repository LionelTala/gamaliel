<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cours extends Model
{
    use HasFactory;

    protected $fillable = [
        'titre',
        'description',
        'contenu',
        'video_url',
        'video_title',
        'formation_id',
        'vague_id',

        'student_id',
        'tranche_requise_id',
        'certification_id',
        'type',
        'is_active',
        'order',
        'viewed_count',
        'has_notification_sent',
        'notification_sent_at',
    ];

    protected $casts = [
        'contenu' => 'array',
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
    public function trancheRequise()
    {
        return $this->belongsTo(Tranche::class, 'tranche_requise_id');
    }

    public function vues()
    {
        return $this->hasMany(CoursVue::class);
    }
    public function student()
    {
        return $this->belongsTo(Student::class, 'student_id');
    }

    public function notifications()
    {
        return $this->hasMany(CoursNotification::class);
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

public function getViewedStudentsAttribute()
{
    return $this->vues()->with('student')->get()->pluck('student');
}

public function getNotViewedStudentsAttribute()
{
    $viewedIds = $this->vues()->pluck('student_id');
    return $this->students->reject(function ($student) use ($viewedIds) {
        return $viewedIds->contains($student->id);
    });
}





    public function getReadNotificationsAttribute()
    {
        return $this->notifications()->where('is_read', true)->get();
    }

    public function getUnreadNotificationsAttribute()
    {
        return $this->notifications()->where('is_read', false)->get();
    }
    public function lessons()
    {
        return $this->hasMany(Lesson::class)->orderBy('order');
    }

    public function getIsVideoAttribute(): bool
    {
        return !empty($this->video_url);
    }

    // app/Models/Cours.php
}
