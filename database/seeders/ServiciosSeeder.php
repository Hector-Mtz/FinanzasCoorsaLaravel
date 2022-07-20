<?php

namespace Database\Seeders;

use App\Models\Monto;
use App\Models\Servicio;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ServiciosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Servicio::factory()->count(4)
            // ->has(Monto::factory()->count(3))
            ->hasMontos(3)
            ->create();
    }
}
