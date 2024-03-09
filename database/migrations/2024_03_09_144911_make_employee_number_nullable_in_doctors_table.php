<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class MakeEmployeeNumberNullableInDoctorsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('doctors', function (Blueprint $table) {
            // Make employee_number nullable
            $table->string('employee_number')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('doctors', function (Blueprint $table) {
            // Revert employee_number to not nullable
            // Note: This assumes employee_number was not nullable before. 
            // If it had a default value, you'll need to adjust this accordingly.
            $table->string('employee_number')->nullable(false)->change();
        });
    }
}