<?php

use App\Http\Controllers\BancoController;
use App\Http\Controllers\CatalogosController;
use App\Http\Controllers\CecoController;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\ConceptoController;
use App\Http\Controllers\FacturaController;
use App\Http\Controllers\FinanzaController;
use App\Http\Controllers\GrupoConceptoController;
use App\Http\Controllers\IngresoController;
use App\Http\Controllers\LineasNegocioController;
use App\Http\Controllers\MontoController;
use App\Http\Controllers\OcController;
use App\Http\Controllers\ServicioController;
use App\Http\Controllers\SoliMovimientoController;
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
})->middleware('guest');



Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('finanzas', [FinanzaController::class, 'index'])->name('finanzas.index');
    Route::apiResource('/ventas', VentaController::class)->except('show', 'update');



    Route::put('/ventas/{venta}/iva', [VentaController::class, 'activeIva'])->name('ventas.iva');
    Route::put('/ventas/{venta}/revisado', [VentaController::class, 'changeRevisado'])->name('ventas.revisado');
    Route::get('/ventas/{venta}/ocs', [VentaController::class, 'ocsIndex'])->name('ventas.ocs.index');
    Route::get('/ventas/totals', [VentaController::class, 'totals'])->name('ventas.totals');
    Route::get('/ventas/months', [VentaController::class, 'ventasMonth'])->name('ventas.month');
    Route::post('/ventas/{venta}', [VentaController::class, 'update'])->name('ventas.update');
    Route::apiResource('/ocs', OcController::class)->except('show', 'update');
    Route::get('/ocs/catalogos', [OcController::class, "catalogos"])->name("ocs.catalogos");
    Route::get('/ocs/totals-status', [OcController::class, "totalesStatus"])->name("ocs.totals-status");
    Route::get('/ocs/months', [OcController::class, "ocMonth"])->name("ocs.month");
    Route::post('/ocs/{oc}', [OcController::class, 'update'])->name('ocs.update');


    Route::apiResource('/facturas', FacturaController::class)->except('show', 'update');
    Route::get('/facturas/catalogos', [FacturaController::class, 'catalogos'])->name('facturas.catalogos');
    Route::post('/facturas/{factura}/ocs', [FacturaController::class, "storeOc"])->name("facturas.ocs.store");
    Route::delete('/facturas/{factura}/ocs', [FacturaController::class, "destroyOc"])->name("facturas.ocs.destroy");
    Route::get('/facturas/{factura}/ocs', [FacturaController::class, "ocsIndex"])->name("facturas.ocs.index");
    Route::post('/facturas/{factura}', [FacturaController::class, 'update'])->name('facturas.update');

    Route::apiResource('/ingresos', IngresoController::class)->except('show', 'update');
    Route::put('/ingresos/{ingreso}/status', [IngresoController::class, 'changeStatus'])->name('ingresos.status');
    Route::post('/ingresos/{ingreso}/facturas', [IngresoController::class, "storeFactura"])->name("ingresos.facturas.store");
    Route::delete('/ingresos/{ingreso}/facturas', [IngresoController::class, "destroyFactura"])->name("ingresos.facturas.destroy");
    Route::post('/ingresos/{ingreso}', [IngresoController::class, "update"])->name("ingresos.update");

    Route::apiResource('bancos', BancoController::class)->only('index');

    Route::get('catalogos', [CatalogosController::class, 'index'])->name('catalogos.index');
    Route::apiResource('/servicios', ServicioController::class)->except('show');
    Route::apiResource('/grupo-conceptos', GrupoConceptoController::class)->except('show');
    //Clientes
    Route::get('clientes/listados', [ClienteController::class, 'listado'])->name('clientes.listado');
    Route::apiResource('/clientes/{cliente}/cecos', CecoController::class)->except('show');
    Route::get('/clientes/{cliente}/ventas', [ClienteController::class, 'ventas'])->name('clientes.ventas.index');

    Route::apiResource('/lineas-negocios', LineasNegocioController::class)->except('show');
    Route::apiResource('/grupo-conceptos/{grupo_concepto}/conceptos', ConceptoController::class)->except('show');
    Route::apiResource('/servicios/{servicio}/montos', MontoController::class)->except('show');

    Route::get('/cecos/catalogo', [CecoController::class, 'catalogo'])->name('cecos.catalogo');
    Route::get('/servicios/catalogo', [ServicioController::class, 'catalogo'])->name('servicios.catalogo');
    Route::get('/tipos/catalogo', [TipoController::class, 'catalogo'])->name('tipos.catalogo');
});


Route::apiResource('/presupuestos', ClienteController::class);
Route::apiResource('/soliMovimientos', SoliMovimientoController::class);
/*Peticiones Axios*/ 
Route::get('/clienteGrupoCon/{cliente}/{grupoConcepto}',[ClienteController::class, 'clienteGrupoCon'])->name('cliente.grupoCon');
