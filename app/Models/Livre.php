<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Livre extends Model
{
    use HasFactory;

    protected $fillable = ['titre', 'description', 'prix', 'lien_achat', 'image', 'is_active'];

    protected $casts = [
        'is_active' => 'boolean',
        'prix' => 'decimal:2',
    ];
}
