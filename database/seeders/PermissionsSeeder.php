<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('permissions')->insert([
            'nombre' => "access.finanzas",
            'plataforma_id' => 1,
            'is_acceso' => 1,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('permissions')->insert([
            'nombre' => "access.control-interno",
            'plataforma_id' => 2,
            'is_acceso' => 1,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('permissions')->insert([
            'nombre' => "users.manager",
            'plataforma_id' => 2,
            'is_acceso' => 0,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('permissions')->insert([
            'nombre' => "roles.manager",
            'plataforma_id' => 2,
            'is_acceso' => 0,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('permissions')->insert([
            'nombre' => "politics.create",
            'plataforma_id' => 2,
            'is_acceso' => 0,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('permissions')->insert([
            'nombre' => "politics.update",
            'plataforma_id' => 2,
            'is_acceso' => 0,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('permissions')->insert([
            'nombre' => "politics.delete",
            'plataforma_id' => 2,
            'is_acceso' => 0,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('permissions')->insert([
            'nombre' => "calificacion.show",
            'plataforma_id' => 2,
            'is_acceso' => 0,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('permissions')->insert([
            'nombre' => "calificacion.create",
            'plataforma_id' => 2,
            'is_acceso' => 0,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('permissions')->insert([
            'nombre' => "calificacion.update",
            'plataforma_id' => 2,
            'is_acceso' => 0,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('permissions')->insert([
            'nombre' => "calificacion.delete",
            'plataforma_id' => 2,
            'is_acceso' => 0,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
