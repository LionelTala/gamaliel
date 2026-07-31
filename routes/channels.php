<?php

use App\Models\Discussion;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('user.{userId}', function ($user, $userId) {
    return (int) $user->id === (int) $userId;
});

Broadcast::channel('chat.{channel}', function ($user, $channel) {
    // ✅ Admin : accès à tout
    if ($user->isAdmin()) {
        return true;
    }

    // ✅ Étudiant : accès à ses discussions
    $student = $user->student;
    if (!$student) {
        return false;
    }

    $parts = explode('.', $channel);
    $type = $parts[0];
    $id = $parts[1];

    $discussion = Discussion::where(function ($query) use ($type, $id) {
        if ($type === 'vague') {
            $query->where('vague_id', $id);
        } elseif ($type === 'certification') {
            $query->where('certification_id', $id);
        }
    })->first();

    if (!$discussion) {
        return false;
    }

    // Vérifier que l'étudiant fait partie de cette discussion
    if ($discussion->vague_id && $student->vague_id === $discussion->vague_id) {
        return true;
    }

    if ($discussion->certification_id && $student->certification_id === $discussion->certification_id) {
        return true;
    }

    return false;
});
