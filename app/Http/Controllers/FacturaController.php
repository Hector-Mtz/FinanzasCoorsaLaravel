<?php

namespace App\Http\Controllers;

use App\Models\Factura;
use App\Models\Oc;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class FacturaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {


        $facturas = Factura::select("facturas.*")
            ->selectRaw("ifnull(sum(ocs.cantidad),0) total_ocs")
            ->with('ocs:id,nombre,cantidad,factura_id,created_at')
            ->leftJoin('ocs', 'facturas.id', "=", "ocs.factura_id")
            ->groupBy(
                "facturas.id",
                "facturas.cantidad",
                "facturas.status_id",
                "facturas.referencia",
                "facturas.fechaDePago"
            );
        if (request("status_id") != "") {
            $facturas->where("facturas.status_id", "=", request("status_id"));
        }


        if (request()->has("search")) {
            $search = strtr(request("search"), array("'" => "\\'", "%" => "\\%"));
            $facturas->where("facturas.referencia", "like", "%" . $search . "%");
        }

        return response()->json($facturas->get());
    }



    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $newFactura = $request->validate([
            "cantidad" => ["required", "numeric"],
            "referencia" => ["required", "unique:facturas,referencia"],
            "fechaDePago" => ["required", "date"],
        ]);

        $factura = Factura::create($newFactura);
        $factura->total_ocs = 0;
        $factura->ocs = [];
        return response()->json($factura);
    }



    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Factura  $factura
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Factura $factura)
    {
        $newFactura = $request->validate([
            "cantidad" => ["required", "numeric"],
            "status_id" => ["required", "exists:status,id"],
            "referencia" => ["required", "unique:facturas,refrencia"],
            "fechaDePago" => ["required", "date"],
        ]);

        $factura->update($newFactura);
        $factura->load("ocs:id,nombre,cantidad,factura_id");
        return response()->json($factura);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Factura  $factura
     * @return \Illuminate\Http\Response
     */
    public function destroy(Factura $factura)
    {
        //
    }


    public function storeOc(Request $request, Int $factura)
    {
        $request->validate([
            'oc_id' => ["required", "exists:ocs,id"],
        ]);

        $facturaFind  = Factura::select("facturas.*")->selectRaw("ifnull(sum(ocs.cantidad),0) total_ocs")
            ->leftJoin('ocs', 'facturas.id', "=", "ocs.factura_id")
            ->groupBy(
                "facturas.id",
                "facturas.cantidad",
                "facturas.status_id",
                "facturas.referencia",
                "facturas.fechaDePago"
            )
            ->firstWhere("facturas.id", "=", $factura);
        if ($facturaFind === null) {
            @throw ValidationException::withMessages([
                'message' => "Factura Invalida"
            ]);
        }
        $ultimoOc = Oc::firstWhere("ocs.factura_id", "=", $facturaFind->id);
        $oc = Oc::find($request->oc_id);

        if ($ultimoOc !== null && $ultimoOc->venta_id !== $oc->venta_id) {
            @throw ValidationException::withMessages([
                'message' => "EL OC NO PERTENECE A LA VENTA"
            ]);
            return "Error";
        }

        $nuevaCantidad = $facturaFind->total_ocs + $oc->cantidad;
        if ($nuevaCantidad > $facturaFind->cantidad) {
            @throw ValidationException::withMessages([
                'message' => "Cantidad supera la Factura",
                'cantidad' => ["Canitdad Invalida"],
            ]);
        } else {
            try {
                DB::beginTransaction();

                $oc->factura_id = $facturaFind->id;
                $oc->save();
                if ($nuevaCantidad === $facturaFind->cantidad) {
                    $facturaFind->status_id = 2; // Cerrada
                    $facturaFind->save();
                }
                DB::commit();
                $facturaFind->total_ocs = $nuevaCantidad; // no es un valor a almacenar
                $facturaFind->load("ocs:id,nombre,cantidad,factura_id,created_at");
                return response()->json($facturaFind);
            } catch (QueryException $e) {
                DB::rollBack();
                @throw ValidationException::withMessages([
                    'message' => $e->getMessage(),
                ]);
            }
        }
    }


    public function destroyOc(Request $request, Factura $factura)
    {
        $request->validate([
            'oc_id' => ["required", "exists:ocs,id"],
        ]);


        try {
            $oc = Oc::find($request->oc_id);
            DB::beginTransaction();
            if ($factura->status_id == 2) {
                $factura->status_id = 1;
                $factura->save();
            }
            $oc->factura_id = NULL;
            $oc->save();
            DB::commit();
        } catch (QueryException $e) {
            DB::rollBack();
            @throw ValidationException::withMessages([
                'message' => $e->getMessage(),
            ]);
        }
    }
}
