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
        Schema::create('paiement_tranches', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained()->cascadeOnDelete();
            $table->foreignId('tranche_id')->constrained()->cascadeOnDelete();
            $table->timestamp('paye_le')->nullable();
            $table->foreignId('confirme_par')->nullable()->constrained('users')->nullOnDelete(); // ✅ admin qui a validé
            $table->text('note')->nullable();
            $table->timestamps();
            $table->unique(['student_id', 'tranche_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('paiement_tranches');
    }
};
