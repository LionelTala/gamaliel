<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Cours;
use App\Models\Lesson;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\StreamedResponse;

class VideoStreamController extends Controller
{
    public function streamCours(Request $request, Cours $cours)
    {
        abort_unless(auth()->user()->isAdmin(), 403);
        abort_unless($cours->video_url, 404);

        return $this->streamFromPath($cours->video_url, $request);
    }

    public function streamLesson(Request $request, Lesson $lesson)
    {
        abort_unless(auth()->user()->isAdmin(), 403);
        abort_unless($lesson->video_url, 404);

        return $this->streamFromPath($lesson->video_url, $request);
    }

    private function streamFromPath(string $rawPath, Request $request)
    {
        if (str_starts_with($rawPath, 'http')) {
            return redirect()->away($rawPath);
        }

        $relativePath = ltrim($rawPath, '/');
        $fullPath = storage_path('app/private/' . $relativePath);

        abort_unless(file_exists($fullPath), 404);

        return $this->streamFile($fullPath, $request);
    }

    private function streamFile(string $path, Request $request): StreamedResponse
    {
        $fileSize = filesize($path);

    $extension = strtolower(pathinfo($path, PATHINFO_EXTENSION));
    $mimeTypes = [
        'mp4' => 'video/mp4',
        'webm' => 'video/webm',
        'ogg' => 'video/ogg',
        'mov' => 'video/quicktime',
        'm4v' => 'video/mp4',
     ];
    $mimeType = $mimeTypes[$extension] ?? (mime_content_type($path) ?: 'video/mp4');

      $start = 0;
        $end = $fileSize - 1;
        $statusCode = 200;

        $headers = [
            'Content-Type' => $mimeType,
            'Accept-Ranges' => 'bytes',
            'Cache-Control' => 'no-store, no-cache, must-revalidate',
            'X-Content-Type-Options' => 'nosniff',
            'Content-Disposition' => 'inline; filename="' . basename($path) . '"',
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
