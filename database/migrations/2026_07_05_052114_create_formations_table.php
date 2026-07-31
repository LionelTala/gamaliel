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
        Schema::create('formations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('abbreviation')->unique();
            $table->string('slug')->unique();
            $table->text('description');
            $table->text('debouches');
            $table->string('duration');
            $table->string('diplome');
            $table->decimal('frais', 10, 2);
            $table->string('image')->nullable();
            $table->string('lien_externe')->nullable();
            $table->string('lien_label')->nullable();
            $table->boolean('is_active')->default(true);
            $table->integer('order')->default(0);
            $table->string('lien_paiement_total')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('formations');
    }
};
