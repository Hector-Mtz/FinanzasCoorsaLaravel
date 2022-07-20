<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CecoConceptosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('ceco_conceptos')->insert(
            ['ceco_id' => "1",
            'concepto_id' => "1",
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
            ]
        );

        DB::table('ceco_conceptos')->insert(
            ['ceco_id' => "2",
            'concepto_id' => "2",
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
            ]
        );

        DB::table('ceco_conceptos')->insert(
            ['ceco_id' => "3",
            'concepto_id' => "3",
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
            ]
        );

        DB::table('ceco_conceptos')->insert(
            ['ceco_id' => "3",
            'concepto_id' => "2",
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
            ]
        );
    }
}
