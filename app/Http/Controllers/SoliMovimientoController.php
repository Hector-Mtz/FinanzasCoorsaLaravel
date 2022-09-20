<?php

namespace App\Http\Controllers;

use App\Models\SoliMovimiento;
use Illuminate\Http\Request;

class SoliMovimientoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
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

        //$datosSolicitud =request()->except('productos'); //insertamos los datos excepto la de los productos
        //SoliMovimiento::insert($datosSolicitud);
         $lastInsert = SoliMovimiento::latest('id')->first(); //rescatamos el ultimo reg insertado
         $datosProductos = request()->except('nombre,tipo_movimiento_id,ceco_concepto_id,autorizacion_id');
         $productos=$datosProductos['productos'];
          
         $idSolicitud = $lastInsert['id'];
         //var_dump($productos);
         $productosArreglo = [];
         foreach ($productos as $fila) 
         {
            //var_dump($fila);      
            $nombreProducto = $fila['nombreProducto'];
            $total = $fila['total'];
            $productosArreglo = array( 'nombre' => $nombreProducto, 
                                       'total' => $total,
                                       'id_solicitud' => $idSolicitud
                                     );
         }
         return $productosArreglo;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\SoliMovimiento  $soliMovimiento
     * @return \Illuminate\Http\Response
     */
    public function show(SoliMovimiento $soliMovimiento)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\SoliMovimiento  $soliMovimiento
     * @return \Illuminate\Http\Response
     */
    public function edit(SoliMovimiento $soliMovimiento)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\SoliMovimiento  $soliMovimiento
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, SoliMovimiento $soliMovimiento)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\SoliMovimiento  $soliMovimiento
     * @return \Illuminate\Http\Response
     */
    public function destroy(SoliMovimiento $soliMovimiento)
    {
        //
    }
}
