<?php

namespace App\Http\Controllers;

use App\Models\Monto;
use App\Models\Servicio;
use Illuminate\Http\Request;

class MontoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, Servicio $servicio)
    {
        $request->validate([
            'direction' => 'in:desc,asc'
        ]);

        $montos =  $servicio->montos()->select('montos.id', 'montos.cantidad');
        if ($request->has('search')) {
            $search =  strtr(request('search'), array("'" => "\\'", "%" => "\\%"));
            $montos->where('montos.cantidad', 'like', '%' . $search . '%');
        }

        if ($request->has('field')) {
            $montos->orderBy(request('field'), request('direction'));
        } else {
            $montos->orderBy('montos.created_at', 'desc');
        }
        return response()->json($montos->paginate(10));
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Servicio $servicio)
    {
        $newCeco = $request->validate([
            'cantidad' => ['required', 'numeric']
        ]);

        return response()->json($servicio->montos()->create($newCeco));
    }



    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Monto  $monto
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Servicio $servicio, Monto $monto)
    {
        $newMonto = $request->validate([
            'cantidad' => ['required', 'numeric'],
        ]);
        $monto->update($newMonto);

        return response()->json($monto);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Monto  $monto
     * @return \Illuminate\Http\Response
     */
    public function destroy(Monto $monto)
    {
        //
    }
}
