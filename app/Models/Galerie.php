<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Galerie extends Model
{
    use HasFactory;

    protected $fillable = [
        'titre',
        'description',
        'fichier',
        'type',
        'mime_type',
        'taille',
        'ordre',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'taille' => 'integer',
    ];

    // Accesseurs
    public function getUrlAttribute(): string
    {
        return asset('storage/galerie/' . $this->fichier);
    }

    public function getTailleFormattedAttribute(): string
    {
        if (!$this->taille) return '0 Ko';
        $units = ['o', 'Ko', 'Mo', 'Go'];
        $i = 0;
        while ($this->taille >= 1024 && $i < 3) {
            $this->taille /= 1024;
            $i++;
        }
        return round($this->taille, 2) . ' ' . $units[$i];
    }

    public function getTypeIconAttribute(): string
    {
        $icons = [
            'image' => 'fa-image',
            'video' => 'fa-video',
            'pdf' => 'fa-file-pdf',
            'document' => 'fa-file-alt',
        ];
        return $icons[$this->type] ?? 'fa-file';
    }

    public function getTypeLabelAttribute(): string
    {
        $labels = [
            'image' => 'Image',
            'video' => 'Vidéo',
            'pdf' => 'PDF',
            'document' => 'Document',
        ];
        return $labels[$this->type] ?? 'Fichier';
    }

    public function getIsImageAttribute(): bool
    {
        return str_starts_with($this->mime_type, 'image/');
    }

    public function getIsVideoAttribute(): bool
    {
        return str_starts_with($this->mime_type, 'video/');
    }

    public function getIsPdfAttribute(): bool
    {
        return $this->mime_type === 'application/pdf';
    }

    public function getIsDocumentAttribute(): bool
    {
        return !$this->is_image && !$this->is_video && !$this->is_pdf;
    }
}