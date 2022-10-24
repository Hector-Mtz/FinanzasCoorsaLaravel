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
    public function byCecoConcepto($GrupoConcepto,$Cliente){
        //Consulta para generar matriz ceco/concepto
      $object = DB::table(DB::raw('soli_movimientos'))
      ->select(DB::raw(
          '
           cecos.nombre AS Cliente,
           conceptos.nombre AS GrupoConcepto,
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
      ->where('grupo_conceptos.id','LIKE','%'.$GrupoConcepto.'%',)
      ->where('clientes.id','LIKE','%'.$Cliente.'%',)
      ->get();

      $object2 = DB::table(DB::raw('cecos'))
      ->selectRaw('cecos.nombre')
      ->join('clientes','cecos.cliente_id','=','clientes.id')
      ->where('clientes.id','LIKE','%'.$Cliente.'%')
      ->get();


      $object3 = DB::table(DB::raw('conceptos'))
      ->selectRaw('conceptos.nombre')
      ->join('grupo_conceptos','conceptos.grupo_concepto_id','=','grupo_conceptos.id')
      ->where('grupo_conceptos.id','LIKE','%'.$GrupoConcepto.'%')
      ->get();

      $allObjects = [$object,$object2,$object3];
      return $allObjects;
    }

    public function byClienteConcepto ($x, $y)
    {
        $object = DB::table(DB::raw('soli_movimientos'))
        ->select(DB::raw(
            'soli_movimientos.id AS id,
            soli_movimientos.nombre AS nombre,
            SUM(productos.cantidad) AS cantidad,
            tipo_movimientos.nombre  AS movimiento,
            cecos.nombre AS ceco,
            clientes.nombre  AS cliente,
            conceptos.nombre  AS concepto,
            grupo_conceptos.nombre  AS grupoConcepto,
            soli_movimientos.created_at AS fecha'
        ))
        ->join('productos', 'productos.soli_movimiento_id', '=', 'soli_movimientos.id')
        ->join('tipo_movimientos', 'soli_movimientos.tipo_movimiento_id', '=', 'tipo_movimientos.id')
        ->join('ceco_conceptos', 'soli_movimientos.ceco_concepto_id', '=', 'ceco_conceptos.id')
        ->join('cecos', 'ceco_conceptos.ceco_id', '=', 'cecos.id')
        ->join('clientes', 'cecos.cliente_id', '=', 'clientes.id')
        ->join('conceptos', 'ceco_conceptos.concepto_id', '=', 'conceptos.id')
        ->join('grupo_conceptos', 'conceptos.grupo_concepto_id', '=', 'grupo_conceptos.id')
        ->where('cecos.nombre','LIKE','%'.$y.'%',)
        ->where('conceptos.nombre','LIKE','%'.$x.'%',)
        ->groupBy('soli_movimientos.id')
        ->groupBy('soli_movimientos.nombre')
        ->groupBy('tipo_movimientos.nombre')
        ->groupBy('cecos.nombre')
        ->groupBy('clientes.nombre')
        ->groupBy('conceptos.nombre')
        ->groupBy('grupo_conceptos.nombre')
        ->groupBy('soli_movimientos.created_at')
        ->get();

        $object2 = TipoMovimiento::all();
        return response()->json([
            'tiposMovimiento' => $object2,
            'salidas' => $object
        ]) ;
    }

    public function consulta_ceco_concepto($x, $y)
    {
        //$x = Ceco 
        //$y = concepto  
        if( !is_numeric($x))
        {
            $object = DB::table(DB::raw('ceco_conceptos'))
            ->select(DB::raw(
            'ceco_conceptos.id'
            ))
            ->join('cecos', 'ceco_conceptos.ceco_id', '=', 'cecos.id')
            ->join('conceptos', 'ceco_conceptos.concepto_id', '=', 'conceptos.id')
            ->where('cecos.nombre','LIKE','%'.$x.'%',)
            ->where('conceptos.nombre','LIKE','%'.$y.'%',)
            ->get();
        }
        else
        {
            $object = DB::table(DB::raw('ceco_conceptos'))
            ->select(DB::raw(
            'ceco_conceptos.id'
            ))
            ->where('ceco_id','LIKE','%'.$x.'%',)
            ->where('concepto_id','LIKE','%'.$y.'%',)
            ->get();
        }
    
        //validacion para saber que existe en la db
        if(count($object) > 0 )
        {
            echo "Existe";
            return  $object;
        }
        else
        {
            DB::insert('insert into ceco_conceptos (ceco_id, concepto_id) values (?, ?)',[$x,$y]);
            $object = DB::table(DB::raw('ceco_conceptos'))
            ->select(DB::raw(
            'ceco_conceptos.id'
            ))
            ->where('ceco_id','LIKE','%'.$x.'%',)
            ->where('concepto_id','LIKE','%'.$y.'%',)
            ->get();
            return  $object;
        }

    }

    public function ceco_grupo_concepto ($ceco, $grupoConcepto)
    {

        $sql =  DB::table(DB::raw('soli_movimientos'))
        ->selectRaw(
            'SUM(productos.cantidad) AS Cantidad,
             cecos.nombre AS Cliente,
             conceptos.nombre AS GrupoConcepto,
             tipo_movimientos.nombre AS Movimiento'
        )
        ->join('productos','productos.soli_movimiento_id','=','soli_movimientos.id')
        ->join('tipo_movimientos','soli_movimientos.tipo_movimiento_id','=','tipo_movimientos.id')
        ->join('ceco_conceptos','soli_movimientos.ceco_concepto_id','=','ceco_conceptos.id')
        ->join('cecos','ceco_conceptos.ceco_id','=','cecos.id')
        ->join('conceptos','ceco_conceptos.concepto_id','=','conceptos.id' )
        ->join('grupo_conceptos','conceptos.grupo_concepto_id','=','conceptos.id')
        ->where('cecos.id','=',$ceco)
        ->where('grupo_conceptos.id','=',$grupoConcepto)
        ->groupBy('conceptos.nombre','cecos.nombre','tipo_movimientos.nombre')
        ->get();

        $uniqueCeco = DB::table(DB::raw('cecos'))
        ->selectRaw(
            'cecos.id, cecos.nombre'
        )
        ->where('cecos.id','=',$ceco)
        ->get();

        $conceptos = DB::table(DB::raw('conceptos'))
        ->selectRaw(
            'conceptos.id, conceptos.nombre'
        )
        ->where('conceptos.grupo_concepto_id','=',$grupoConcepto)
        ->get();

        $datos = [$sql,$uniqueCeco,$conceptos];
        return $datos;
       
    }

    public function concepto_clientes ($concepto, $clientes)
    {
      $sql =  DB::table(DB::raw('soli_movimientos'))
      ->selectRaw(
          'SUM(productos.cantidad) AS Cantidad,
           cecos.nombre AS Cliente,
           conceptos.nombre AS GrupoConcepto,
           tipo_movimientos.nombre AS Movimiento'
      )
      ->join('ceco_conceptos','soli_movimientos.ceco_concepto_id','=','ceco_conceptos.id')
      ->join('productos','productos.soli_movimiento_id','=','soli_movimientos.id')
      ->join('tipo_movimientos','soli_movimientos.tipo_movimiento_id','=','tipo_movimientos.id')
      ->join('cecos','ceco_conceptos.ceco_id','=','cecos.id')
      ->join('clientes','cecos.cliente_id','=','clientes.id' )
      ->join('conceptos','ceco_conceptos.concepto_id','=','conceptos.id')
      ->where('conceptos.id','=',$concepto)
      ->where('clientes.id','=',$clientes)
      ->groupBy('conceptos.nombre','cecos.nombre','tipo_movimientos.nombre')
      ->get();;

      $cecos = DB::table(DB::raw('cecos'))
      ->selectRaw(
          'cecos.id, cecos.nombre'
      )
      ->where('cecos.cliente_id','=',$clientes)
      ->get();

      $uniqueConcepto = DB::table(DB::raw('conceptos'))
      ->selectRaw(
          'conceptos.id, conceptos.nombre'
      )
      ->where('conceptos.id','=',$concepto)
      ->get();

      $arrayObjects = [$sql, $cecos, $uniqueConcepto];
      return $arrayObjects ;
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
