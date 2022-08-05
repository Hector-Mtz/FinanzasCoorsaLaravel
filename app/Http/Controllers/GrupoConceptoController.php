<?php

namespace App\Http\Controllers;

use App\Models\GrupoConcepto;
use Illuminate\Http\Request;

class GrupoConceptoController extends Controller
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

        $grupoConceptos =  GrupoConcepto::select('grupo_conceptos.id', 'grupo_conceptos.nombre');
        if (request()->has('search')) {
            $search =  strtr(request('search'), array("'" => "\\'", "%" => "\\%"));
            $grupoConceptos->where('grupo_conceptos.nombre', 'like', '%' . $search . '%');
        }

        if (request()->has('field')) {
            $grupoConceptos->orderBy(request('field'), request('direction'));
        } else {
            $grupoConceptos->orderBy('grupo_conceptos.created_at', 'desc');
        }
        return response()->json($grupoConceptos->paginate(15));
    }



    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $newGrupo = $request->validate([
            'nombre' => 'unique:grupo_conceptos,nombre'
        ]);

        return response()->json(GrupoConcepto::create($newGrupo));
    }




    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\GrupoConcepto  $grupoConcepto
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, GrupoConcepto $grupoConcepto)
    {
        $newGrupo = $request->validate([
            'nombre' => 'unique:grupo_conceptos,nombre,' . $grupoConcepto->id . ',id',
        ]);
        $grupoConcepto->update($newGrupo);

        return response()->json($grupoConcepto);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\GrupoConcepto  $grupoConcepto
     * @return \Illuminate\Http\Response
     */
    public function destroy(GrupoConcepto $grupoConcepto)
    {
        //
    }
}
