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
        Schema::create('poles', function (Blueprint $table) {
            $table->id();
            $table->string('nom');                 // "Paramédical & Santé"
            $table->string('slug')->unique();       // "paramedical" — utilisé dans les URLs (?pole=paramedical)
            $table->text('description');            // description longue affichée dans le modal
            $table->string('description_courte')->nullable(); // résumé pour la carte
            $table->string('image')->nullable();     // chemin vers l'image du pôle
            $table->string('couleur', 7);            // #E13A4B — couleur d'accent du pôle
            $table->string('icone')->nullable();      // nom d'icône Heroicons ('HeartIcon', etc.)
            $table->unsignedInteger('ordre')->default(0); // pour contrôler l'ordre d'affichage
            $table->boolean('actif')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('poles');
    }
};
