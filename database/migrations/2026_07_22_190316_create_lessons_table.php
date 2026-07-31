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
        Schema::create('lessons', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cours_id')->constrained()->cascadeOnDelete();
            $table->string('titre');
            $table->text('description')->nullable();
            $table->text('contenu')->nullable(); // Contenu textuel riche
            $table->string('video_url')->nullable();
            $table->string('video_title')->nullable();
            $table->json('files')->nullable(); // Fichiers joints
            $table->integer('order')->default(0);
            $table->boolean('is_free')->default(false); // Leçon gratuite (sans tranche requise)
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lessons');
    }
};
