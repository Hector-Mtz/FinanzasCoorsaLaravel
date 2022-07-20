<?php

namespace App\Http\Controllers;

use App\Models\Ceco;
use App\Models\Cliente;
use App\Models\GrupoConcepto;
use App\Models\Producto;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClienteController extends Controller
{
    /**
     * Display a listing of the resource.
     *Hola Hector
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        $clientes = Cliente::all();
        $grupo_conceptos = GrupoConcepto::all();

        
        $cantidades = DB::table(DB::raw('soli_movimientos'))
        ->select(DB::raw(
          'clientes.nombre AS Cliente,
          grupo_conceptos.nombre AS GrupoConcepto,
          SUM(productos.cantidad) AS Cantidad,
          tipo_movimientos.nombre AS Movimiento'
        ))
        ->join('productos', 'productos.soli_movimiento_id','=','soli_movimientos.id')
        ->join('tipo_movimientos', 'soli_movimientos.tipo_movimiento_id','=','tipo_movimientos.id')
        ->join('ceco_conceptos', 'soli_movimientos.ceco_concepto_id','=','ceco_conceptos.id')
        ->join('cecos', 'ceco_conceptos.ceco_id','=','cecos.id')
        ->join('clientes', 'cecos.cliente_id','=','clientes.id')
        ->join('conceptos', 'ceco_conceptos.concepto_id','=','conceptos.id')
        ->join('grupo_conceptos', 'conceptos.grupo_concepto_id','=','grupo_conceptos.id')
        ->groupBy('grupo_conceptos.nombre')
        ->groupBy('clientes.nombre')
        ->groupBy('tipo_movimientos.nombre')
        ->groupBy('soli_movimientos.nombre')
        ->get();


        return Inertia::render('Main', [
            'clientes' => $clientes,
            'grupo_conceptos' => $grupo_conceptos,
            'cantidades' => $cantidades
        ]);
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
     * @param  \App\Models\Cliente  $cliente
     * @return \Illuminate\Http\Response
     */
    public function show(Cliente $cliente)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Cliente  $cliente
     * @return \Illuminate\Http\Response
     */
    public function edit(Cliente $cliente)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Cliente  $cliente
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Cliente $cliente)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Cliente  $cliente
     * @return \Illuminate\Http\Response
     */
    public function destroy(Cliente $cliente)
    {
        //
    }
}
