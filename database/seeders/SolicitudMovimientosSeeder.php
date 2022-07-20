<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SolicitudMovimientosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('soli_movimientos')->insert(
            ['nombre' => "S1",
            'ceco_concepto_id' => "1",
            'tipo_movimiento_id' => "3",
            'autorizacion_id' => "1",
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
            ]
        );

        DB::table('soli_movimientos')->insert(
            ['nombre' => "S2",
            'ceco_concepto_id' => "2",
            'tipo_movimiento_id' => "1",
            'autorizacion_id' => "2",
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
            ]
        );

        DB::table('soli_movimientos')->insert(
            ['nombre' => "S3",
            'ceco_concepto_id' => "3",
            'tipo_movimiento_id' => "1",
            'autorizacion_id' => "1",
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
            ]
        );

        DB::table('soli_movimientos')->insert(
            ['nombre' => "S4",
            'ceco_concepto_id' => "4",
            'tipo_movimiento_id' => "1",
            'autorizacion_id' => "2",
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
            ]
        );

        DB::table('soli_movimientos')->insert(
            ['nombre' => "S4",
            'ceco_concepto_id' => "4",
            'tipo_movimiento_id' => "3",
            'autorizacion_id' => "1",
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
            ]
        );
    }
}
