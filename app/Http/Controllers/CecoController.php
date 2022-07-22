<?php

namespace App\Http\Controllers;

use App\Models\Ceco;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CecoController extends Controller
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
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Ceco  $ceco
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Ceco $ceco)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Ceco  $ceco
     * @return \Illuminate\Http\Response
     */
    public function destroy(Ceco $ceco)
    {
        //
    }

    /**
     * Obtiene los servicios con sus montos correspondientes
     */
    public function catalogo()
    {
        $cecos = Ceco::select("id", "nombre")
            ->get();
        return response()->json($cecos);
    }
}
