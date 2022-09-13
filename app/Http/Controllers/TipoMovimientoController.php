<?php

namespace App\Http\Controllers;

use App\Models\TipoMovimiento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TipoMovimientoController extends Controller
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

    public function consultaMovimiento ($id)
     {
        $object = DB::table(DB::raw('tipo_movimientos'))
        ->select(DB::raw(
            'nombre'
        ))
        ->where('id','LIKE','%'.$id.'%',)
        ->get();

        return $object;
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
     * @param  \App\Models\TipoMovimiento  $tipoMovimiento
     * @return \Illuminate\Http\Response
     */
    public function show(TipoMovimiento $tipoMovimiento)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\TipoMovimiento  $tipoMovimiento
     * @return \Illuminate\Http\Response
     */
    public function edit(TipoMovimiento $tipoMovimiento)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\TipoMovimiento  $tipoMovimiento
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, TipoMovimiento $tipoMovimiento)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\TipoMovimiento  $tipoMovimiento
     * @return \Illuminate\Http\Response
     */
    public function destroy(TipoMovimiento $tipoMovimiento)
    {
        //
    }
}
