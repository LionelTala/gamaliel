<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'telephone',
        'role',
        'is_active',
        'last_login_at',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'last_login_at' => 'datetime',
        'is_active' => 'boolean',
    ];

    // Vérifier si l'utilisateur est admin
    public function isAdmin(): bool
    {
        return in_array($this->role, ['super_admin', 'admin_centre', 'admin']);
    }
     public function getLoginAttribute()
    {
        return $this->email ?? $this->telephone;
    }

    // Vérifier si l'utilisateur est super admin
    public function isSuperAdmin(): bool
    {
        return $this->role === 'super_admin';
    }

    // Vérifier si l'utilisateur est admin centre
    public function isAdminCentre(): bool
    {
        return $this->role === 'admin_centre';
    }

    // Vérifier si l'utilisateur est étudiant
    public function isStudent(): bool
    {
        return in_array($this->role, ['student_online', 'student_certif']);
    }

    // Relation avec Student
    public function student()
    {
        return $this->hasOne(Student::class);
    }
    public function notifications()
    {
        return \App\Models\Notification::forAdmin($this->id)->latest();
    }

    public function unreadNotificationsCount(): int
    {
        return \App\Models\Notification::forAdmin($this->id)->unread()->count();
    }
}
