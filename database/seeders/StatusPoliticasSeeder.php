<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StatusPoliticasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('status_politicas')->insert([
            'id' => 1,
            'name' => 'Activo',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('status_politicas')->insert([
            'id' => 2,
            'name' => 'In Activo',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
