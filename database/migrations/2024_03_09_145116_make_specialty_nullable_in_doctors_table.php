<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class MakeSpecialtyNullableInDoctorsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('doctors', function (Blueprint $table) {
            // Make specialty nullable
            $table->string('specialty')->nullable()->change();
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
            // Revert specialty to not nullable
            // Note: This assumes specialty was not nullable before. 
            // If it had a default value, you'll need to adjust this accordingly.
            $table->string('specialty')->nullable(false)->change();
        });
    }
}