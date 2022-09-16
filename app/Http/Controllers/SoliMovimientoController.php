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

        $datosSolicitud =request()->except('productos');
        //SoliMovimiento::insert($datosSolicitud);

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
