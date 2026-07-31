<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('soumission_devoirs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('devoir_id')->constrained()->cascadeOnDelete();
            $table->foreignId('student_id')->constrained()->cascadeOnDelete();
            $table->json('fichier')->nullable();
            $table->text('commentaire')->nullable();
            $table->decimal('note', 5, 2)->nullable();
            $table->string('statut')->default('en_attente');
            $table->dateTime('submitted_at')->nullable();
            $table->dateTime('corrected_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('soumission_devoirs');
    }
};
