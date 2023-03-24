<?php

namespace App\Http\Controllers;

use App\Models\Concepto;
use App\Models\GrupoConcepto;
use Illuminate\Http\Request;

class ConceptoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, GrupoConcepto $grupoConcepto)
    {
        $request->validate([
            'direction' => 'in:desc,asc'
        ]);

        $conceptos =  $grupoConcepto->conceptos()->select('conceptos.id', 'conceptos.nombre');
        if ($request->has('search')) {
            $search =  strtr(request('search'), array("'" => "\\'", "%" => "\\%"));
            $conceptos->where('conceptos.nombre', 'like', '%' . $search . '%');
        }

        if ($request->has('field')) {
            $conceptos->orderBy(request('field'), request('direction'));
        } else {
            $conceptos->orderBy('conceptos.created_at', 'desc');
        }
        return response()->json($conceptos->paginate(10));
    }



    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, GrupoConcepto $grupoConcepto)
    {
        $newConcepto = $request->validate([
            'nombre' => 'unique:cecos,nombre'
        ]);

        return response()->json($grupoConcepto->conceptos()->create($newConcepto));
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Concepto  $concepto
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, GrupoConcepto $grupoConcepto, Concepto $concepto)
    {
        $newConcepto = $request->validate([
            'nombre' => 'unique:cecos,nombre,' . $concepto->id . ',id',
        ]);
        $concepto->update($newConcepto);

        return response()->json($concepto);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Concepto  $concepto
     * @return \Illuminate\Http\Response
     */
    public function destroy(Concepto $concepto)
    {
        //
    }
}
