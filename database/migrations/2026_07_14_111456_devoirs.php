<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('devoirs', function (Blueprint $table) {
            $table->id();
            $table->string('titre');
            $table->text('description')->nullable();
            $table->json('contenu')->nullable();
            $table->dateTime('date_limite')->nullable();

            $table->foreignId('formation_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('vague_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('certification_id')->nullable()->constrained()->nullOnDelete();
 

            $table->enum('type', ['vague', 'certification'])->default('vague');
            $table->boolean('is_active')->default(true);
            $table->integer('order')->default(0);

            $table->boolean('has_notification_sent')->default(false);
            $table->dateTime('notification_sent_at')->nullable();
            $table->foreignId('tranche_requise_id')->nullable()->constrained('tranches')->nullOnDelete();
            $table->foreignId('student_id')->nullable()->constrained()->cascadeOnDelete();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('devoirs');
    }
};
