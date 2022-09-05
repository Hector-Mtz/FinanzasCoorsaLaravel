<?php

use App\Http\Controllers\CECOConceptoController;
use App\Http\Controllers\ProductoController;
use Illuminate\Http\Request;
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

Route::get('/ceco_concepto/{x}/{y}',[CECOConceptoController::class, 'byCecoConcepto'])->name('ceco_concepto');

Route::get('/cliente_concepto/{x}/{y}',[CECOConceptoController::class, 'byClienteConcepto'])->name('cliente_concepto');

Route::get('/productos/{x}',[ProductoController::class, 'byProductos'])->name('productos');

Route::get('/cecos_grupoconcepto/{x}/{y}',[CECOConceptoController::class, 'byCecosGrupoConcepot'])->name('cecos_grupoconcepto');