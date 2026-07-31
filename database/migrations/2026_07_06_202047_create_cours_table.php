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
        Schema::create('cours', function (Blueprint $table) {
            $table->id();
            $table->string('titre');
            $table->text('description')->nullable();
            $table->json('contenu')->nullable();
            $table->string('video_url')->nullable();
            $table->string('video_title')->nullable();
            $table->foreignId('formation_id')->constrained()->onDelete('cascade');
            $table->foreignId('vague_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('certification_id')->nullable()->constrained()->onDelete('cascade');
            $table->enum('type', ['vague', 'certification'])->default('vague');
            $table->boolean('is_active')->default(true);
            $table->integer('viewed_count')->default(0);
            $table->foreignId('tranche_requise_id')->nullable()->constrained('tranches')->nullOnDelete();
            $table->foreignId('student_id')->nullable()->constrained()->cascadeOnDelete();
            $table->integer('order')->default(0);
            $table->boolean('has_notification_sent')->default(false);
            $table->timestamp('notification_sent_at')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cours');
    }
};
