<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table("status")->insert([
            "id" => 1,
            "nombre" => "ABIERTA",
            "created_at" => now(),
            "updated_at" => now(),
        ]);
        DB::table("status")->insert([
            "id" => 2,
            "nombre" => "CERRADA",
            "created_at" => now(),
            "updated_at" => now(),
        ]);
    }
}
