<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TipopoliticasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tipopoliticas')->insert([
            'name' => 'Manual de Procedimientos',
            'logo' => '/assets/img/icono doc 1.png',
        ]);
        DB::table('tipopoliticas')->insert([
            'name' => 'Covid',
            'logo' => '/assets/img/icono doc 2.png',
        ]);
        DB::table('tipopoliticas')->insert([
            'name' => 'Guías',
            'logo' => '/assets/img/icono doc 4.png',
        ]);
        DB::table('tipopoliticas')->insert([
            'name' => 'Reglamentos',
            'logo' => '/assets/img/icono doc 5.png',
        ]);
        DB::table('tipopoliticas')->insert([
            'name' => 'Políticas',
            'logo' => '/assets/img/icono doc 6.png',
        ]);
        DB::table('tipopoliticas')->insert([
            'name' => 'Formatos',
            'logo' => '/assets/img/icono doc 7.png',
        ]);
        DB::table('tipopoliticas')->insert([
            'name' => 'Procesos',
            'logo' => '/assets/img/icono doc 8.png',
        ]);
        DB::table('tipopoliticas')->insert([
            'name' => 'Directorio',
            'logo' => '/assets/img/icono doc 9.png',
        ]);
        DB::table('tipopoliticas')->insert([
            'name' => 'Plan de Acción',
            'logo' => '/assets/img/icono doc 10.png',
        ]);

        DB::table('tipopoliticas')->insert([
            'name' => 'Plantillas',
            'logo' => '/assets/img/icono doc 11.png',
        ]);
    }
}
