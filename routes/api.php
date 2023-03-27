<?php

use App\Http\Controllers\CECOConceptoController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\TipoMovimientoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

/*
Route::get('/ceco_concepto/{x}/{y}', [CECOConceptoController::class, 'byCecoConcepto'])->name('ceco_concepto');

Route::get('/cliente_concepto/{x}/{y}', [CECOConceptoController::class, 'byClienteConcepto'])->name('cliente_concepto');

Route::get('/productos/{x}', [ProductoController::class, 'byProductos'])->name('productos');

Route::get('/cecos_grupoconcepto/{x}/{y}', [CECOConceptoController::class, 'byCecosGrupoConcepot'])->name('cecos_grupoconcepto');

Route::get('/consultaMovimiento/{x}', [TipoMovimientoController::class, 'consultaMovimiento'])->name('consultaMovimiento');

Route::get('/consulta_ceco_concepto/{x}/{y}', [CECOConceptoController::class, 'consulta_ceco_concepto'])->name('consulta_ceco_concepto');

Route::get('/ceco_grupo_concepto/{x}/{y}', [CECOConceptoController::class, 'ceco_grupo_concepto'])->name('ceco_grupo_concepto');

Route::get('/concepto_clientes/{x}/{y}', [CECOConceptoController::class, 'concepto_clientes'])->name('concepto_clientes');
*/

Route::get('artisan', function () {
    Artisan::call('migrate', [
        '--force' => true
    ]);
    return "ok";
});
