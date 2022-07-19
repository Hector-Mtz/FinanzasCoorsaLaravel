<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AutorizaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('autorizas')->insert(
            ['posicion_id' => "1",
            'tipo_movimiento_id' => "1",
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
            ]
        );

        DB::table('autorizas')->insert(
            ['posicion_id' => "2",
            'tipo_movimiento_id' => "2",
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
            ]
        );
    }
}
