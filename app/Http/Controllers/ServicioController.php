<?php

namespace App\Http\Controllers;

use App\Models\Servicio;
use Illuminate\Http\Request;

class ServicioController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        request()->validate([
            'direction' => 'in:desc,asc'
        ]);

        $servicios =  Servicio::select('servicios.id', 'servicios.nombre');
        if (request()->has('search')) {
            $search =  strtr(request('search'), array("'" => "\\'", "%" => "\\%"));
            $servicios->where('servicios.nombre', 'like', '%' . $search . '%');
        }

        if (request()->has('field')) {
            $servicios->orderBy(request('field'), request('direction'));
        } else {
            $servicios->orderBy('servicios.created_at', 'desc');
        }
        return response()->json($servicios->paginate(15));
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $newServicio = $request->validate([
            'nombre' => 'unique:servicios,nombre'
        ]);

        return response()->json(Servicio::create($newServicio));
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Servicio  $servicio
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Servicio $servicio)
    {
        $newServicio = $request->validate([
            'nombre' => 'unique:servicios,nombre,' . $servicio->id . ',id',
        ]);
        $servicio->update($newServicio);

        return response()->json($servicio);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Servicio  $servicio
     * @return \Illuminate\Http\Response
     */
    public function destroy(Servicio $servicio)
    {
        //
    }

    /**
     * Obtiene los servicios con sus montos correspondientes
     */
    public function catalogo()
    {
        $servicios = Servicio::select("id", "nombre")
            ->with('montos:id,cantidad,servicio_id')
            ->get();
        return response()->json($servicios);
    }
}
