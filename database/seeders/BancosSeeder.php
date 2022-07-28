<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BancosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('bancos')->insert([
            'nombre' => 'BBVA México',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('bancos')->insert([
            'nombre' => 'Santander',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('bancos')->insert([
            'nombre' => 'Banamex',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('bancos')->insert([
            'nombre' => 'Banorte',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('bancos')->insert([
            'nombre' => 'HSBC',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('bancos')->insert([
            'nombre' => 'Scotiabank',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('bancos')->insert([
            'nombre' => 'Inbursa',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('bancos')->insert([
            'nombre' => 'Banco Azteca',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
