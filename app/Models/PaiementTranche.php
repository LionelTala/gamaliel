<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PaiementTranche extends Model
{
    protected $fillable = ['student_id', 'tranche_id', 'paye_le', 'confirme_par', 'note'];
    protected $casts = ['paye_le' => 'datetime'];

    public function tranche() { return $this->belongsTo(Tranche::class); }
    public function student() { return $this->belongsTo(Student::class); }
    public function confirmateur() { return $this->belongsTo(User::class, 'confirme_par'); }
}
