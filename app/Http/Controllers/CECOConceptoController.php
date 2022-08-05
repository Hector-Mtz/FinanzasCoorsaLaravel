<?php

namespace App\Http\Controllers;

use App\Models\Ceco;
use App\Models\CECOConcepto;
use App\Models\Concepto;
use App\Models\TipoMovimiento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CECOConceptoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function byCecoConcepto($x,$y){
        //Consulta para generar matriz ceco/concepto
    $object = DB::table(DB::raw('soli_movimientos'))
      ->select(DB::raw(
          'clientes.nombre AS Cliente,
           cecos.nombre AS CECO,
           grupo_conceptos.nombre AS GrupoConcepto,
           conceptos.nombre AS Concepto,
           SUM(productos.cantidad) AS Cantidad,
           tipo_movimientos.nombre AS Movimiento'
      ))
      ->join('productos', 'productos.soli_movimiento_id', '=', 'soli_movimientos.id')
      ->join('tipo_movimientos', 'soli_movimientos.tipo_movimiento_id', '=', 'tipo_movimientos.id')
      ->join('ceco_conceptos', 'soli_movimientos.ceco_concepto_id', '=', 'ceco_conceptos.id')
      ->join('cecos', 'ceco_conceptos.ceco_id', '=', 'cecos.id')
      ->join('clientes', 'cecos.cliente_id', '=', 'clientes.id')
      ->join('conceptos', 'ceco_conceptos.concepto_id', '=', 'conceptos.id')
      ->join('grupo_conceptos', 'conceptos.grupo_concepto_id', '=', 'grupo_conceptos.id')
      ->groupBy('grupo_conceptos.nombre')
      ->groupBy('conceptos.nombre')
      ->groupBy('clientes.nombre')
      ->groupBy('cecos.nombre')
      ->groupBy('tipo_movimientos.nombre')
      ->where('grupo_conceptos.nombre','LIKE','%'.$x.'%',)
      ->where('clientes.nombre','LIKE','%'.$y.'%',)
      ->get();

      $object2 = DB::table(DB::raw('cecos'))
      ->select('cecos.nombre')
      ->join('clientes','cecos.cliente_id','=','clientes.id')
      ->where('clientes.nombre','LIKE','%'.$y.'%')
      ->get();


      $object3 = DB::table(DB::raw('conceptos'))
      ->select('conceptos.nombre')
      ->join('grupo_conceptos','conceptos.grupo_concepto_id','=','grupo_conceptos.id')
      ->where('grupo_conceptos.nombre','LIKE','%'.$x.'%')
      ->get();

      $allObjects = [$object,$object2,$object3];
      return $allObjects;
    }

    public function byClienteConcepto ($x, $y)
    {
        $object = DB::table(DB::raw('productos'))
        ->select(DB::raw(
            'productos.id AS id,
            productos.nombre AS nombre,
            productos.cantidad  AS cantidad,
            cecos.nombre AS ceco,
            clientes.nombre  AS cliente,
            tipo_movimientos.nombre  AS movimiento,
            conceptos.nombre  AS concepto,
            grupo_conceptos.nombre  AS grupoConcepto,
            productos.created_at AS fecha'
        ))
        ->join('soli_movimientos', 'productos.soli_movimiento_id', '=', 'soli_movimientos.id')
        ->join('tipo_movimientos', 'soli_movimientos.tipo_movimiento_id', '=', 'tipo_movimientos.id')
        ->join('ceco_conceptos', 'soli_movimientos.ceco_concepto_id', '=', 'ceco_conceptos.id')
        ->join('cecos', 'ceco_conceptos.ceco_id', '=', 'cecos.id')
        ->join('clientes', 'cecos.cliente_id', '=', 'clientes.id')
        ->join('conceptos', 'ceco_conceptos.concepto_id', '=', 'conceptos.id')
        ->join('grupo_conceptos', 'conceptos.grupo_concepto_id', '=', 'grupo_conceptos.id')
        ->where('cecos.nombre','LIKE','%'.$y.'%',)
        ->where('conceptos.nombre','LIKE','%'.$x.'%',)
        ->get();

        $object2 = TipoMovimiento::all();
        $arrayObject = [$object, $object2];
        return $arrayObject ;
    }

    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\CECOConcepto  $cECOConcepto
     * @return \Illuminate\Http\Response
     */
    public function show(CECOConcepto $cECOConcepto)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\CECOConcepto  $cECOConcepto
     * @return \Illuminate\Http\Response
     */
    public function edit(CECOConcepto $cECOConcepto)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\CECOConcepto  $cECOConcepto
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, CECOConcepto $cECOConcepto)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\CECOConcepto  $cECOConcepto
     * @return \Illuminate\Http\Response
     */
    public function destroy(CECOConcepto $cECOConcepto)
    {
        //
    }
}
