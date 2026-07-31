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
        Schema::table('formations_presentiel', function (Blueprint $table) {
            $table->foreignId('pole_id')
                ->nullable() // nullable pendant la transition — à passer en NOT NULL une fois les données migrées
                ->after('id')
                ->constrained('poles')
                ->nullOnDelete();
        });
        Schema::table('formations', function (Blueprint $table) {
            $table->foreignId('pole_id')
                ->nullable()
                ->after('id')
                ->constrained('poles')
                ->nullOnDelete();
        });


    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('formations_presentiel', function (Blueprint $table) {
            $table->dropConstrainedForeignId('pole_id');
        });

        Schema::table('formations', function (Blueprint $table) {
            $table->dropConstrainedForeignId('pole_id');
        });
    }
};
