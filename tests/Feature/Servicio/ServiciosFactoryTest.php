<?php

namespace Tests\Feature\Servicio;

use App\Models\Monto;
use App\Models\Servicio;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ServiciosFactoryTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function can_factory_servicios()
    {
        $servicios = Servicio::factory()->count(4)
            ->has(Monto::factory()->count(3))
            ->create();
        foreach ($servicios as $servicio) {
            var_dump($servicio->monto->toArray());
        }
    }
}
