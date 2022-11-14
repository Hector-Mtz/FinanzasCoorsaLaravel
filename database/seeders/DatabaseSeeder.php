<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            PlataformasSeeder::class,
            PermissionsSeeder::class,
            RolesSeeder::class,
            UsersSeeder::class,
            TipoMovimientos::class,
            CientesSeeder::class,
            CecosSeeder::class,
            GrupoConceptosSeeder::class,
            ConceptosSeeder::class,
            PosicionesSeeder::class,
            AutorizaSeeder::class,
            AutorizacionesSeeder::class,
            CecoConceptosSeeder::class,
            SolicitudMovimientosSeeder::class,
            ProductosSeeder::class,
            StatusSeeder::class,
            TiposSeeder::class,
            BancosSeeder::class,
            DepartamentosAuditoriasSeeder::class,
            StatusPoliticasSeeder::class,
            TipopoliticasSeeder::class,
        ]);
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
