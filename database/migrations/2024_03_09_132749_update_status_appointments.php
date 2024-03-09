<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up()
    {
        DB::statement("ALTER TABLE appointments MODIFY COLUMN status ENUM('pending confirmation', 'scheduled', 'completed', 'canceled') NOT NULL");
    }

    public function down()
    {
        DB::statement("ALTER TABLE appointments MODIFY COLUMN status ENUM('scheduled', 'completed', 'canceled') NOT NULL");
    }
};