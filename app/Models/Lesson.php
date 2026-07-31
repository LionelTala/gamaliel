<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    use HasFactory;

    protected $fillable = [
        'cours_id',
        'titre',
        'description',
        'contenu',
        'video_url',
        'video_title',
        'files',
        'order',
        'is_active',
    ];

    protected $casts = [
        'files' => 'array',
        'is_active' => 'boolean',
    ];

    // ===================== RELATIONS =====================

    public function cours()
    {
        return $this->belongsTo(Cours::class);
    }

    // ✅ RELATION AVEC LESSON_VUE
    public function vues()
    {
        return $this->hasMany(LessonVue::class);
    }

    // ===================== ACCESSORS =====================

    public function getVideoEmbedUrlAttribute()
    {
        if (!$this->video_url) return null;

        if (strpos($this->video_url, 'youtube.com/watch?v=') !== false) {
            parse_str(parse_url($this->video_url, PHP_URL_QUERY), $params);
            if (isset($params['v'])) {
                return 'https://www.youtube.com/embed/' . $params['v'] . '?rel=0&modestbranding=1&showinfo=0&controls=1&autoplay=0';
            }
        }

        if (strpos($this->video_url, 'youtu.be/') !== false) {
            $videoId = substr(parse_url($this->video_url, PHP_URL_PATH), 1);
            return 'https://www.youtube.com/embed/' . $videoId . '?rel=0&modestbranding=1&showinfo=0&controls=1&autoplay=0';
        }

        return null;
    }

    public function getHasVideoAttribute()
    {
        return !empty($this->video_url);
    }

    public function getHasFilesAttribute()
    {
        return !empty($this->files) && count($this->files) > 0;
    }
}
