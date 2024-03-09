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
        Schema::create('appointments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('doctor_user_id')->constrained('doctors')->onDelete('cascade');
            $table->foreignId('patient_user_id')->constrained('patients')->onDelete('cascade');
            $table->integer('appointment_number');
            $table->dateTime('date_time');
            $table->enum('status', ['scheduled', 'completed', 'cancelled']);
            $table->timestamps();
            $table->unique(['doctor_user_id', 'appointment_number'], 'doctor_appointment_number_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appointments');
    }
};
