<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('soumission_evaluations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('evaluation_id')->constrained()->onDelete('cascade');
            $table->foreignId('student_id')->constrained()->onDelete('cascade');
            $table->json('fichier')->nullable();
            $table->text('commentaire')->nullable();
            $table->decimal('note', 5, 2)->nullable();
            $table->enum('statut', ['en_attente', 'soumis', 'corrige'])->default('en_attente');
            $table->timestamp('submitted_at')->nullable();
            $table->timestamp('corrected_at')->nullable();
            $table->timestamps();
            $table->unique(['evaluation_id', 'student_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('soumission_evaluations');
    }
};
