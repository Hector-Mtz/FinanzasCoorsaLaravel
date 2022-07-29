<?php

use App\Http\Controllers\BancoController;
use App\Http\Controllers\CecoController;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\FacturaController;
use App\Http\Controllers\IngresoController;
use App\Http\Controllers\OcController;
use App\Http\Controllers\ServicioController;
use App\Http\Controllers\TipoController;
use App\Http\Controllers\VentaController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Auth/Login', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});



Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::apiResource('/ventas', VentaController::class)->except('destroy', 'show');
    Route::get('/ventas/totals', [VentaController::class, 'totals'])->name('ventas.totals');
    Route::get('/ventas/months', [VentaController::class, 'ventasMonth'])->name('ventas.month');
    Route::apiResource('/ocs', OcController::class)->except('destroy', 'show');
    Route::get('/ocs/catalogos', [OcController::class, "catalogos"])->name("ocs.catalogos");
    Route::get('/ocs/totals-status', [OcController::class, "totalesStatus"])->name("ocs.totals-status");
    Route::get('/ocs/months', [OcController::class, "ocMonth"])->name("ocs.month");


    Route::apiResource('/facturas', FacturaController::class)->except('destroy', 'show');
    Route::get('/facturas/catalogos', [FacturaController::class, 'catalogos'])->name('facturas.catalogos');
    Route::post('/facturas/{factura}/ocs', [FacturaController::class, "storeOc"])->name("facturas.ocs.store");
    Route::delete('/facturas/{factura}/ocs', [FacturaController::class, "destroyOc"])->name("facturas.ocs.destroy");

    Route::apiResource('/ingresos', IngresoController::class)->except('destroy', 'show');
    Route::put('/ingresos/{ingreso}/status', [IngresoController::class, 'changeStatus'])->name('ingresos.status');
    Route::post('/ingresos/{ingreso}/facturas', [IngresoController::class, "storeFactura"])->name("ingresos.facturas.store");
    Route::delete('/ingresos/{ingreso}/facturas', [IngresoController::class, "destroyFactura"])->name("ingresos.facturas.destroy");

    Route::apiResource('bancos', BancoController::class)->only('index');

    Route::get('/cecos/catalogo', [CecoController::class, 'catalogo'])->name('cecos.catalogo');
    Route::get('/servicios/catalogo', [ServicioController::class, 'catalogo'])->name('servicios.catalogo');
    Route::get('/tipos/catalogo', [TipoController::class, 'catalogo'])->name('tipos.catalogo');
});
Route::apiResource('/clientes', ClienteController::class);
