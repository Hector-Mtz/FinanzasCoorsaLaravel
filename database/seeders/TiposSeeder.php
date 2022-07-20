<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TiposSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        DB::table('tipos')->insert([
            "id" => 1,
            "nombre" => "QUINCENAL",
            "created_at" => now(),
            "updated_at" => now(),
        ]);
        DB::table('tipos')->insert([
            "id" => 2,
            "nombre" => "MENSUAL",
            "created_at" => now(),
            "updated_at" => now(),
        ]);
        DB::table('tipos')->insert([
            "id" => 3,
            "nombre" => "TRIMESTRAL",
            "created_at" => now(),
            "updated_at" => now(),
        ]);
        DB::table('tipos')->insert([
            "id" => 4,
            "nombre" => "SEMESTRAL",
            "created_at" => now(),
            "updated_at" => now(),
        ]);
        DB::table('tipos')->insert([
            "id" => 5,
            "nombre" => "ANUAL",
            "created_at" => now(),
            "updated_at" => now(),
        ]);
    }
}
