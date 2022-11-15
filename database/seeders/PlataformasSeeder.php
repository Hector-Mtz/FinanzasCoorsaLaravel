<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PlataformasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('plataformas')->insert([
            'id' => 1,
            'nombre' => "Finanzas",
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('plataformas')->insert([
            'id' => 2,
            'nombre' => "Control Interno",
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
