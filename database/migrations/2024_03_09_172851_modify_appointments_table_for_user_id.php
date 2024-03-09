<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('appointments', function (Blueprint $table) {
            // Check if the old columns exist before trying to drop them
            if (Schema::hasColumn('appointments', 'doctor_id')) {
                $table->dropForeign(['doctor_id']); // Drop foreign key constraint
                $table->dropColumn('doctor_id');
            }
            if (Schema::hasColumn('appointments', 'patient_id')) {
                $table->dropForeign(['patient_id']); // Drop foreign key constraint
                $table->dropColumn('patient_id');
            }
        });
    }

    public function down()
    {
        Schema::table('appointments', function (Blueprint $table) {
            // Remove the new columns
            $table->dropForeign(['doctor_user_id']);
            $table->dropColumn('doctor_user_id');
            $table->dropForeign(['patient_user_id']);
            $table->dropColumn('patient_user_id');

            // Optionally, re-add the old columns if you want to reverse the migration
            // $table->foreignId('doctor_user_id')->constrained('doctors')->onDelete('cascade');
            // $table->foreignId('patient_user_id')->constrained('patients')->onDelete('cascade');
        });
    }
};
