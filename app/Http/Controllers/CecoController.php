<?php

namespace App\Http\Controllers;

use App\Models\Ceco;
use App\Models\Cliente;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CecoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, Cliente $cliente)
    {
        $request->validate([
            'direction' => 'in:desc,asc'
        ]);

        $cecos =  $cliente->cecos()->select('cecos.id', 'cecos.nombre');
        if ($request->has('search')) {
            $search =  strtr(request('search'), array("'" => "\\'", "%" => "\\%"));
            $cecos->where('cecos.nombre', 'like', '%' . $search . '%');
        }

        if ($request->has('field')) {
            $cecos->orderBy(request('field'), request('direction'));
        } else {
            $cecos->orderBy('cecos.created_at', 'desc');
        }
        return response()->json($cecos->paginate(15));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Cliente $cliente)
    {
        $newCeco = $request->validate([
            'nombre' => 'unique:cecos,nombre'
        ]);

        return response()->json($cliente->cecos()->create($newCeco));
    }




    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Ceco  $ceco
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Cliente $cliente, Ceco $ceco)
    {
        $newCeco = $request->validate([
            'nombre' => 'unique:cecos,nombre,' . $ceco->id . ',id',
        ]);
        $ceco->update($newCeco);

        return response()->json($ceco);
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
