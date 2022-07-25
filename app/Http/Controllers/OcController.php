<?php

namespace App\Http\Controllers;

use App\Models\Factura;
use App\Models\Oc;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class OcController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        request()->validate([
            'venta_id' => ['required', 'exists:ventas,id']
        ]);

        $ocs = Oc::select("ocs.*", "facturas.referencia")
            ->leftJoin("facturas", 'ocs.factura_id', "=", "facturas.id")
            ->where('ocs.venta_id', request('venta_id'));

        return response()->json($ocs->get());
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $newOc = $request->validate([
            'nombre' => ["required", "string", "unique:ocs,nombre"],
            'cantidad' => ["required", "numeric"],
            'venta_id' => ["required", "exists:ventas,id"],
        ]);

        $oc = Oc::create($newOc);
        return response()->json($oc);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Oc  $oc
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Oc $oc)
    {
        $newOc = $request->validate([
            'nombre' => ["required", "string", "unique:ocs,nombre," . $oc->id . ",id"],
            'cantidad' => ["required", "numeric"],
        ]);

        if ($oc->factura_id !== null) {
            $factura = Factura::select('facturas.*')->selectRaw("ifnull(sum(ocs.cantidad),0) total_ocs")
                ->leftJoin('ocs', 'facturas.id', "=", "ocs.factura_id")
                ->groupBy(
                    "facturas.id",
                    "facturas.cantidad",
                    "facturas.status_id",
                    "facturas.referencia",
                    "facturas.fechaDePago"
                )
                ->firstWhere("facturas.id", "=", $oc->factura_id);
            $newTotalOcs = $factura->totals_ocs - $oc->cantidad + $newOc['cantidad'];
            if ($factura->cantidad < $newTotalOcs) {
                @throw ValidationException::withMessages([
                    'message' => "La cantidad supera a la factura",
                    'cantidad' => "La cantidad supera a la factura"
                ]);
            }
        }

        $oc->update($newOc);
        return response()->json($oc);
    }


    public function catalogos()
    {
        $ocs = Oc::select("ocs.id", "ocs.nombre")
            ->whereNull('factura_id');
        if (request()->has("search")) {
            $search = strtr(request("search"), array("'" => "\\'", "%" => "\\%"));
            $ocs->where("ocs.nombre", "like", "%" . $search . "%");
        }

        return response()->json($ocs->limit(10)->get());
    }
}
