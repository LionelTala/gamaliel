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
        Schema::table('students', function (Blueprint $table) {
            $table->foreignId('vague_id')
                ->nullable()
                ->after('user_id')
                ->constrained('vagues')
                ->cascadeOnDelete();

            $table->foreignId('certification_id')
                ->nullable()
                ->after('vague_id')
                ->constrained('certifications')
                ->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('students', function (Blueprint $table) {
             $table->dropForeign(['vague_id']);
            $table->dropForeign(['certification_id']);
            $table->dropColumn(['vague_id', 'certification_id']);
        });
    }
};
