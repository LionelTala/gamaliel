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
        Schema::create('pre_inscriptions', function (Blueprint $table) {
            $table->id();
            $table->string('nom_complet');
            $table->string('email');
            $table->string('telephone');
            $table->string('ville')->nullable();
            $table->string('formation'); // Nom de la formation
            $table->string('formation_id')->nullable(); // ID de la formation
            $table->string('statut')->default('en_attente'); // en_attente, contacte, inscrit, refuse
            $table->text('commentaire')->nullable();
            $table->timestamp('contacte_le')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pre_inscriptions');
    }
};
