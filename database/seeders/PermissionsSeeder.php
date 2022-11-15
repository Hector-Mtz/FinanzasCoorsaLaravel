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
        DB::table('permissions')->insert([
            'nombre' => "noticias.create",
            'plataforma_id' => 2,
            'is_acceso' => 0,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('permissions')->insert([
            'nombre' => "video.create",
            'plataforma_id' => 2,
            'is_acceso' => 0,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('permissions')->insert([
            'nombre' => "menu.create",
            'plataforma_id' => 2,
            'is_acceso' => 0,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('permissions')->insert([
            'nombre' => "ocs.create",
            'plataforma_id' => 1,
            'is_acceso' => 0,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('permissions')->insert([
            'nombre' => "ocs.edit",
            'plataforma_id' => 1,
            'is_acceso' => 0,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('permissions')->insert([
            'nombre' => "ocs.delete",
            'plataforma_id' => 1,
            'is_acceso' => 0,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('permissions')->insert([
            'nombre' => "facturas.create",
            'plataforma_id' => 1,
            'is_acceso' => 0,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('permissions')->insert([
            'nombre' => "facturas.edit",
            'plataforma_id' => 1,
            'is_acceso' => 0,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('permissions')->insert([
            'nombre' => "facturas.delete",
            'plataforma_id' => 1,
            'is_acceso' => 0,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('permissions')->insert([
            'nombre' => "facturas.oc.relation",
            'plataforma_id' => 1,
            'is_acceso' => 0,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('permissions')->insert([
            'nombre' => "deposito.create",
            'plataforma_id' => 1,
            'is_acceso' => 0,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('permissions')->insert([
            'nombre' => "deposito.edit",
            'plataforma_id' => 1,
            'is_acceso' => 0,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('permissions')->insert([
            'nombre' => "deposito.delete",
            'plataforma_id' => 1,
            'is_acceso' => 0,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('permissions')->insert([
            'nombre' => "deposito.factura.relation",
            'plataforma_id' => 1,
            'is_acceso' => 0,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('permissions')->insert([
            'nombre' => "deposito.cerrar",
            'plataforma_id' => 1,
            'is_acceso' => 0,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('permissions')->insert([
            'nombre' => "ventas.create",
            'plataforma_id' => 1,
            'is_acceso' => 0,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('permissions')->insert([
            'nombre' => "ventas.edit",
            'plataforma_id' => 1,
            'is_acceso' => 0,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('permissions')->insert([
            'nombre' => "ventas.delete",
            'plataforma_id' => 1,
            'is_acceso' => 0,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
