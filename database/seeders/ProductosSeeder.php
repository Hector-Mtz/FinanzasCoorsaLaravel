<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('productos')->insert(
            ['nombre' => "P1",
            'cantidad'=> '500',
            'soli_movimiento_id'=> '1',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),],
        );

        DB::table('productos')->insert(
            ['nombre' => "P2",
            'cantidad'=> '200',
            'soli_movimiento_id'=> '2',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),],
        );

        DB::table('productos')->insert(
            ['nombre' => "P3",
            'cantidad'=> '600',
            'soli_movimiento_id'=> '3',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),],
        );

        DB::table('productos')->insert(
            ['nombre' => "P4",
            'cantidad'=> '700',
            'soli_movimiento_id'=> '4',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),],
        );

        DB::table('productos')->insert(
            ['nombre' => "P5",
            'cantidad'=> '350',
            'soli_movimiento_id'=> '5',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),]
        );

        DB::table('productos')->insert(
            ['nombre' => "P6",
            'cantidad'=> '652',
            'soli_movimiento_id'=> '4',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),],
        );
    }
}
