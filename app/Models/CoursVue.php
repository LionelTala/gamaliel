<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CoursVue extends Model
{
    use HasFactory;

    protected $fillable = [
        'cours_id',
        'student_id',
        'viewed_at',
    ];

    protected $casts = [
        'viewed_at' => 'datetime',
    ];

    public function cours()
    {
        return $this->belongsTo(Cours::class);
    }

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
