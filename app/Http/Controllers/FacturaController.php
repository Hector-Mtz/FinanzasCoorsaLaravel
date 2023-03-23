<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use App\Models\Factura;
use App\Models\Oc;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
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


        $clientes = Cliente::select('clientes.id', 'clientes.nombre')->orderBy('id')->get();
        $numClientes = $clientes->count();

        $hasStatus = request('status_id') != "";

        if (request()->has('search')) {
            $search = strtr(request('search'), array("'" => "\\'", "%" => "\\%"));
        }

        for ($i = 0; $i < $numClientes; $i++) {
            $facturas = Factura::select("facturas.*")
                ->selectRaw("ifnull(sum(ocs.cantidad),0) total_ocs")
                ->with('ocs:id,nombre,cantidad,factura_id,created_at')
                ->leftJoin('ocs', 'facturas.id', "=", "ocs.factura_id")
                ->groupBy(
                    "facturas.id",
                    "facturas.cantidad",
                    "facturas.status_id",
                    "facturas.referencia",
                    "facturas.fechaDePago",
                )->where('facturas.cliente_id', '=', $clientes[$i]->id);
            if ($hasStatus) {
                $facturas->where("facturas.status_id", "=", request('status_id'));
            }
            if (isset($search)) {
                $facturas->where('facturas.referencia', 'like', '%' . $search . '%');
            }


            $clientes[$i]->facturas = $facturas->orderBy('id')->get();
        }
        //SIN CLIENTE
        $clientes->prepend(new Collection([
            'id' => -1,
            'nombre' => 'SIN CLIENTE',
            'facturas' => []
        ]));

        $facturas = Factura::select("facturas.*")
            ->selectRaw("ifnull(sum(ocs.cantidad),0) total_ocs")
            ->with('ocs:id,nombre,cantidad,factura_id,created_at')
            ->leftJoin('ocs', 'facturas.id', "=", "ocs.factura_id")
            ->groupBy(
                "facturas.id",
                "facturas.cantidad",
                "facturas.status_id",
                "facturas.referencia",
                "facturas.fechaDePago",
                "facturas.cliente_id",
            )->whereNull('facturas.cliente_id');
        if ($hasStatus) {
            $facturas->where("facturas.status_id", "=", request('status_id'));
        }
        if (isset($search)) {
            $facturas->where('facturas.referencia', 'like', '%' . $search . '%');
        }

        $totalFacturas  = Factura::selectRaw("ifnull(sum(facturas.cantidad),0) total");
        if ($hasStatus) {
            $totalFacturas->where("facturas.status_id", "=", request('status_id'));
        }

        $clientes[0]['facturas'] = $facturas->orderBy('id')->get();
        return response()->json([
            'clientesFacturas' => $clientes,
            'totalFacturas' => $totalFacturas->first()
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
        $this->authorize('facturas.create');
         $request->validate([
            "cantidad" => ["required", "numeric"],
            "referencia" => ["required", "unique:facturas,referencia"],
            "fechaDePago" => ["required", "date"],
        ]);

        $urlContenido = null;
        if($request->has('documento'))
        {
            $contenido = $request['documento'];  
            $nombreCont = $contenido->getClientOriginalName();
            $ruta_documento = $contenido->storeAs('documentos', $nombreCont, 'gcs');
            $urlContenido = Storage::disk('gcs')->url($ruta_documento);

            $factura = Factura::create(
                [
                 'cantidad' => $request['cantidad'],
                 'referencia' => $request['referencia'],
                 'fechaDePago' => $request['fechaDePago'],
                 'documento' => $urlContenido,
                ]
            );

            $factura->total_ocs = 0;
            $factura->ocs = [];
            //return response()->json($factura);
        }
        else
        {
            $factura = Factura::create(
                [ 'cantidad' => $request['cantidad'],
                  'referencia' => $request['referencia'],
                  'fechaDePago' => $request['fechaDePago'],
                ]
            );

            $factura->total_ocs = 0;
            $factura->ocs = [];
            //return response()->json($factura);
        }

        return redirect()->back();
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
        $this->authorize('facturas.edit');
        $request->validate([
            "cantidad" => ["required", "numeric"],
            "referencia" => ["required", "unique:facturas,referencia," . $factura->id . ",id"],
            "fechaDePago" => ["required", "date"],
            "documento" => ["required"]
        ]);

        $urlContenido = null;
        if($request->has('documento'))
        {
            $contenido = $request['documento'];  
            $nombreCont = $contenido->getClientOriginalName();
            $ruta_documento = $contenido->storeAs('documentos', $nombreCont, 'gcs');
            $urlContenido = Storage::disk('gcs')->url($ruta_documento);

            Factura::where('facturas.id', '=', $factura->id)->
            update([
                'cantidad' => $request['cantidad'],
                'referencia' => $request['referencia'],
                'fechaDePago' => $request['fechaDePago'],
                'documento' => $urlContenido,
            ]);
        }
        else
        {
            Factura::where('facturas.id', '=', $factura->id)->
            update([
                    'cantidad' => $request['cantidad'],
                   'referencia' => $request['referencia'],
                  'fechaDePago' => $request['fechaDePago'],
            ]);
        }

        return redirect()->back();
       // $factura->update();
        //return response()->json($factura);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Factura  $factura
     * @return \Illuminate\Http\Response
     */
    public function destroy(Factura $factura)
    {
        $this->authorize('facturas.delete');
        // Removemos todos los ocs asociados
        Oc::where('factura_id', '=', $factura->id)
            ->update(['factura_id' => null]);
        $factura->delete();
        return response()->json([
            'message' => 'Factura DELETED'
        ]);
    }


    public function storeOc(Request $request, Int $factura)
    {
        $this->authorize('facturas.oc.create');
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
                "facturas.fechaDePago",
                "facturas.ingreso_id",
            )
            ->firstWhere("facturas.id", "=", $factura);
        if ($facturaFind === null) {
            @throw ValidationException::withMessages([
                'message' => "Factura Invalida"
            ]);
        }

        $oc = Oc::select('ocs.*', 'clientes.id as cliente_id')
            ->join('ventas', 'ventas.id', '=', 'ocs.venta_id')
            ->join('cecos', 'ventas.ceco_id', '=', 'cecos.id')
            ->join('clientes', 'cecos.cliente_id', '=', 'clientes.id')->find($request->oc_id);

        if ($facturaFind->cliente_id !== null && $facturaFind->cliente_id !== $oc->cliente_id) {
            @throw ValidationException::withMessages([
                'message' => "EL CLIENTE DEBE SER EL MISMO"
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
                // Encaso de no tener cliente se lo agregamos
                if ($facturaFind->cliente_id === null) {
                    $facturaFind->cliente_id = $oc->cliente_id;
                    $facturaFind->save();
                }


                DB::commit();
                $facturaFind->total_ocs = $nuevaCantidad; // no es un valor a almacenar
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
        $this->authorize('facturas.oc.delete');
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
            //NO EXISTE OCS CON ESTA FACTURA CAMBIAR EL CLIENTE A NULL
            $ocs = Oc::firstWhere('factura_id', '=', $factura->id);
            if ($ocs === null) {
                $factura->cliente_id = null;
                $factura->save();
            }

            DB::commit();
            return response()->json([
                'message' => 'Eliminado'
            ]);
        } catch (QueryException $e) {
            DB::rollBack();
            @throw ValidationException::withMessages([
                'message' => $e->getMessage(),
            ]);
        }
    }

    /**
     *
     */
    public function catalogos(Request $request)
    {
        $facturas = Factura::select('facturas.id', 'facturas.referencia')
            ->whereNull('facturas.ingreso_id')->get();
        return response()->json($facturas);
    }


    /**
     * 
     */
    /**
     * Get ocs by Venta
     */
    public function ocsIndex(Factura $factura)
    {
        $ocs = $factura->ocs()->select(
            "ocs.id",
            "ocs.nombre as oc",
        )
            ->selectRaw("CONCAT('$',FORMAT(ocs.cantidad,2,'en_US')) as cantidad");
        if (request()->has("search")) {
            $search = strtr(request("search"), array("'" => "\\'", "%" => "\\%"));
            $ocs->where("ocs.nombre", "like", "%" . $search . "%");
        }
        return response()->json($ocs->get());
    }
}
