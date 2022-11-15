<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DepartamentosAuditoriasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('departamentos_auditorias')->insert([
            'nombre' => 'Recursos Humanos',
            'logo' => '/assets/img/icono RRHH.png',
        ]);
        DB::table('departamentos_auditorias')->insert([
            'nombre' => 'Finanzas',
            'logo' => '/assets/img/datos_monetarios.png',
        ]);
        DB::table('departamentos_auditorias')->insert([
            'nombre' => 'Comunicación Coorporativa',
            'logo' => '/assets/img/icono comunicación.png',
        ]);
        DB::table('departamentos_auditorias')->insert([
            'nombre' => 'Operaciones',
            'logo' => '/assets/img/icono operaciones.png',
        ]);
        DB::table('departamentos_auditorias')->insert([
            'nombre' => 'Ingenierías',
            'logo' => '/assets/img/icono ingenierias.png',
        ]);
    }
}
