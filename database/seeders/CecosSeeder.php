<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CecosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('cecos')->insert(
            ['nombre' => "U1",
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
            'cliente_id' => "1"],
        );

        DB::table('cecos')->insert(
            ['nombre' => "U2",
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
            'cliente_id' => "1"],
        );

        DB::table('cecos')->insert(
            ['nombre' => "U3",
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
            'cliente_id' => "2"],
        );

        DB::table('cecos')->insert(
            ['nombre' => "U4",
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
            'cliente_id' => "2"],
        );
    }
}
