<?php

namespace App\Http\Controllers;

use App\Models\LineasNegocio;
use Illuminate\Http\Request;

class LineasNegocioController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $request->validate([
            'direction' => 'in:desc,asc'
        ]);

        $lineasNegocios =  LineasNegocio::select('lineas_negocios.id', 'lineas_negocios.name as nombre');
        if ($request->has('search')) {
            $search = '%' .  strtr(request('search'), array("'" => "\\'", "%" => "\\%")) . '%';
            $lineasNegocios->where('lineas_negocios.name', 'like',  $search);
        }

        if ($request->has('field')) {
            $lineasNegocios->orderBy(request('field'), request('direction'));
        } else {
            $lineasNegocios->orderBy('lineas_negocios.created_at', 'desc');
        }
        return response()->json([
            'pagination' => $lineasNegocios->paginate(15),
            'list' => LineasNegocio::select('lineas_negocios.id', 'lineas_negocios.name')->get()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $newLineaNegocio = $request->validate([
            'nombre' => 'unique:lineas_negocios,name'
        ]);
        $newLineaNegocio['name'] = $newLineaNegocio['nombre'];
        $lineaNegocio = LineasNegocio::create($newLineaNegocio);

        return response()->json($lineaNegocio);
    }




    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Ceco  $ceco
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, LineasNegocio $lineas_negocio)
    {
        $newLineaNegocio = $request->validate([
            'nombre' => 'unique:lineas_negocios,name,' . $lineas_negocio->id . ',id',
        ]);

        $newLineaNegocio['name'] = $newLineaNegocio['nombre'];
        $lineas_negocio->update($newLineaNegocio);
        $lineas_negocio->nombre =    $newLineaNegocio['name'];

        return response()->json($lineas_negocio);
    }
}
