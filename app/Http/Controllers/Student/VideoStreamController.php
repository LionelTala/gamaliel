<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Cours;
use App\Models\Lesson;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\StreamedResponse;

class VideoStreamController extends Controller
{
    public function streamCours(Request $request, Cours $cours)
    {
        $student = auth()->user()->student;
        abort_unless($student, 403);

        $this->verifierAcces($student, $cours);

        abort_unless($cours->video_url, 404);

        return $this->streamFromPath($cours->video_url, $request);
    }

    public function streamLesson(Request $request, Lesson $lesson)
    {
        $student = auth()->user()->student;
        abort_unless($student, 403);

        $cours = $lesson->cours;
        $this->verifierAcces($student, $cours);

        abort_unless($lesson->is_active, 404, '❌ Cette leçon n\'est pas disponible.');
        abort_unless($lesson->video_url, 404);

        return $this->streamFromPath($lesson->video_url, $request);
    }

    private function verifierAcces($student, Cours $cours): void
    {
        $hasAccess = false;

        if ($cours->type === 'vague' && $student->vague_id === $cours->vague_id) {
            $hasAccess = true;
        }
        if ($cours->type === 'certification' && $student->certification_id === $cours->certification_id) {
            $hasAccess = true;
        }

        if (!$hasAccess) {
            Log::warning('⚠️ [Stream] Accès refusé', [
                'student_id' => $student->id,
                'cours_id' => $cours->id,
            ]);
            abort(403, '❌ Vous n\'avez pas accès à ce contenu.');
        }

        $peutAcceder = $student->peutAccederContenu($cours->tranche_requise_id);
        abort_unless($peutAcceder, 403, '❌ Vous devez payer la tranche requise pour accéder à ce contenu.');
    }

    private function streamFromPath(string $rawPath, Request $request)
    {
        if (str_starts_with($rawPath, 'http')) {
            return redirect()->away($rawPath);
        }

        $relativePath = ltrim($rawPath, '/');
        $fullPath = storage_path('app/private/' . $relativePath); // ✅ private, corrigé

        abort_unless(file_exists($fullPath), 404);

        return $this->streamFile($fullPath, $request);
    }

    private function streamFile(string $path, Request $request): StreamedResponse
    {
        $fileSize = filesize($path);
        $mimeType = mime_content_type($path) ?: 'video/mp4';

        $start = 0;
        $end = $fileSize - 1;
        $statusCode = 200;

        $headers = [
            'Content-Type' => $mimeType,
            'Accept-Ranges' => 'bytes',
            'Cache-Control' => 'no-store, no-cache, must-revalidate',
            'X-Content-Type-Options' => 'nosniff',
            'Content-Disposition' => 'inline',
        ];

        if ($request->headers->has('Range')) {
            $range = $request->header('Range');
            preg_match('/bytes=(\d+)-(\d*)/', $range, $matches);

            $start = (int) $matches[1];
            $end = isset($matches[2]) && $matches[2] !== '' ? (int) $matches[2] : $fileSize - 1;

            $statusCode = 206;
            $headers['Content-Range'] = "bytes {$start}-{$end}/{$fileSize}";
        }

        $length = $end - $start + 1;
        $headers['Content-Length'] = $length;

        return response()->stream(function () use ($path, $start, $length) {
            $handle = fopen($path, 'rb');
            fseek($handle, $start);

            $bufferSize = 1024 * 1024;
            $bytesToRead = $length;

            while ($bytesToRead > 0 && !feof($handle)) {
                $readSize = min($bufferSize, $bytesToRead);
                echo fread($handle, $readSize);
                flush();
                $bytesToRead -= $readSize;
            }

            fclose($handle);
        }, $statusCode, $headers);
    }
}
