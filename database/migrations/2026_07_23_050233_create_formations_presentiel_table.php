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
        Schema::create('formations_presentiel', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('abbreviation');
            $table->text('description');
            $table->string('duration');
            $table->string('diplome');
            $table->decimal('price', 10, 2);
            $table->string('image')->nullable();
            $table->string('icon')->nullable();
            $table->json('tags')->nullable();
            $table->json('debouches')->nullable();
            $table->json('programme')->nullable();
            $table->enum('couleur', ['blue', 'red'])->default('blue');
            $table->boolean('is_active')->default(true);
            $table->integer('ordre')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('formations_presentiel');
    }
};
