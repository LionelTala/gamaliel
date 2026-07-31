<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Notification extends Model
{
    use HasFactory;

    protected $fillable = [
'user_id', 'student_id', 'candidature_id',
        'notifiable_id', 'notifiable_type',
        'type', 'title', 'message', 'link', 'data', 'read_at',  'user_creator_id'  ];

    protected $casts = [
        'data' => 'array',
        'read_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function candidature()
    {
        return $this->belongsTo(Candidature::class);
    }

    // Notifications visibles par un admin donné : les siennes + les globales
    public function scopeForAdmin(Builder $query, int $userId): Builder
    {
        return $query->where(function ($q) use ($userId) {
            $q->whereNull('user_id')->orWhere('user_id', $userId);
        });
    }

    public function scopeUnread(Builder $query): Builder
    {
        return $query->whereNull('read_at');
    }

    public function markAsRead(): void
    {
        if (!$this->read_at) {
            $this->update(['read_at' => now()]);
        }
    }
    public function notifiable()
    {
        return $this->morphTo();
    }
}
