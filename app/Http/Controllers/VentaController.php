<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use App\Models\Factura;
use App\Models\Ingreso;
use App\Models\Oc;
use App\Models\Venta;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class VentaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        request()->validate([
            'direction' => 'in:asc,desc'
        ]);

        $ventas = Venta::select(
            "ventas.*",
            "cecos.nombre as ceco",
            "servicios.nombre as servicio",
            "montos.cantidad as monto",
            "montos.servicio_id"
        )->selectRaw('(montos.cantidad  * ventas.periodos * ventas.cantidad) sub_total')
            ->join('cecos', 'ventas.ceco_id', '=', 'cecos.id')
            ->join('montos', 'ventas.monto_id', '=', 'montos.id')
            ->join('servicios', 'montos.servicio_id', '=', 'servicios.id');

        if ($request->status_id != "") {
            $ventas->where("ventas.status_id", "=", $request->status_id);
        }
        if ($request->has("search")) {
            $search = strtr($request->search, array("'" => "\\'", "%" => "\\%"));
            $ventas->where("cecos.nombre", "like", "%" . $search . "%");
        }

        if ($request->has('field')) {
            $ventas->orderBy(DB::raw(request('field')), request('direction'));
        } else {
            $ventas->orderBy('ventas.fechaInicial', 'desc');
        }
        return response()->json([
            'ventas' =>  $ventas->paginate(10),
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
        //Authorization
        $this->authorize('ventas.create');
        $request->validate([
            "monto_id" =>  ["required", "exists:montos,id"],
            "nombre" =>  ["required", "max:100"],
            "fechaInicial" =>  ["required", "date"],
            "fechaFinal" =>  ["required", "date", "after:fechaInicial"],
            "periodos" =>  ["required", "numeric", "min:1"],
            "cantidad" =>  ["required", "numeric", "min:1"],
            "comentario" =>  ["nullable", "string"],
            "tipo_id" =>  ["required", "exists:tipos,id"],
            "ceco_id" =>  ["required", "exists:cecos,id"],
        ]);

        $urlContenido = null;
        if ($request->hasFile('documento')) {
            $contenido = $request['documento'];
            $nombreCont = $contenido->getClientOriginalName();
            $ruta_documento = $contenido->storeAs('documentos', $nombreCont, 'gcs');
            $urlContenido = Storage::disk('gcs')->url($ruta_documento);

            Venta::create([
                'monto_id' => $request['monto_id'],
                'nombre' => $request['nombre'],
                'fechaInicial' => $request['fechaInicial'],
                'fechaFinal' => $request['fechaFinal'],
                'periodos' => $request['periodos'],
                'cantidad' => $request['cantidad'],
                'comentario' => $request['comentario'],
                'tipo_id' => $request['tipo_id'],
                'ceco_id' => $request['ceco_id'],
                'documento' => $urlContenido
            ]);
        } else {
            Venta::create([
                'monto_id' => $request['monto_id'],
                'nombre' => $request['nombre'],
                'fechaInicial' => $request['fechaInicial'],
                'fechaFinal' => $request['fechaFinal'],
                'periodos' => $request['periodos'],
                'cantidad' => $request['cantidad'],
                'comentario' => $request['comentario'],
                'tipo_id' => $request['tipo_id'],
                'ceco_id' => $request['ceco_id']
            ]);
        }

        return redirect()->back();
    }



    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Venta  $venta
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Venta $venta)
    {
        //Authorization
        $this->authorize('ventas.edit');
        /*
        $request->validate([
            "monto_id" =>  ["required", "exists:montos,id"],
            "nombre" =>  ["required", "max:100"],
            "fechaInicial" =>  ["required", "date"],
            "fechaFinal" =>  ["required", "date", "after:fechaInicial"],
            "periodos" =>  ["required", "numeric", "min:1"],
            "cantidad" =>  ["required", "numeric", "min:1"],
            "comentario" =>  ["nullable", "string"],
            "tipo_id" =>  ["required", "exists:tipos,id"],
            "ceco_id" =>  ["required", "exists:cecos,id"],
        ]);
        */

        $urlContenido = null;
        if ($request->has('documento')) {
            $contenido = $request['documento'];
            $nombreCont = $contenido->getClientOriginalName();
            $ruta_documento = $contenido->storeAs('documentos', $nombreCont, 'gcs');
            $urlContenido = Storage::disk('gcs')->url($ruta_documento);

            Venta::where('ventas.id', '=', $venta->id)
                ->update(
                    [
                        'monto_id' => $request['monto_id'],
                        'nombre' => $request['nombre'],
                        'fechaInicial' => $request['fechaInicial'],
                        'fechaFinal' => $request['fechaFinal'],
                        'periodos' => $request['periodos'],
                        'cantidad' => $request['cantidad'],
                        'comentario' => $request['comentario'],
                        'tipo_id' => $request['tipo_id'],
                        'ceco_id' => $request['ceco_id'],
                        'documento' => $urlContenido
                    ]
                );
        } else {
            Venta::where('ventas.id', '=', $venta->id)
                ->update(
                    [
                        'monto_id' => $request['monto_id'],
                        'nombre' => $request['nombre'],
                        'fechaInicial' => $request['fechaInicial'],
                        'fechaFinal' => $request['fechaFinal'],
                        'periodos' => $request['periodos'],
                        'cantidad' => $request['cantidad'],
                        'comentario' => $request['comentario'],
                        'tipo_id' => $request['tipo_id'],
                        'ceco_id' => $request['ceco_id']
                    ]
                );
        }


        return redirect()->back();
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Venta  $venta
     * @return \Illuminate\Http\Response
     */
    public function activeIva(Request $request, Venta $venta)
    {
        $venta->iva = !$venta->iva;
        $venta->save();
        return response()->json([
            'message' => 'updated'
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Venta  $venta
     * @return \Illuminate\Http\Response
     */
    public function changeRevisado(Venta $venta)
    {
        request()->validate([
            'revisado' => ['required', 'boolean']
        ]);
        $venta->revisado = request('revisado');
        $venta->save();
        return response()->json([
            'message' => 'ok'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Venta  $venta
     * @return \Illuminate\Http\Response
     */
    public function destroy($venta)
    {
        //Authorization
        $this->authorize('ventas.delete');
        $ventaAEliminar = Venta::find($venta);
        $ventaAEliminar->delete();
        return redirect()->back();
    }


    public function ventasMonth(Request $request)
    {
        //monto.cantidad * venta.periodos * venta.cantidad
        $validadData = $request->validate([
            'month' => ['required', 'numeric', 'min:1', 'max:12'],
            'year' => ['required', 'numeric', 'min:2000', 'max:2050'],
            'lineas_negocio_id' => ['nullable', 'exists:lineas_negocios,id'],
            'cliente_id' => ['nullable', 'exists:clientes,id'],
        ]);

        $ventas = Venta::select('ventas.id', 'ventas.revisado')
            ->selectRaw('concat(cecos.nombre,"-",servicios.nombre) as nombre,
            montos.cantidad * ventas.periodos * ventas.cantidad AS subtotal,
             ifnull(montos.cantidad * ventas.periodos * ventas.cantidad + if(ventas.iva = 1,(montos.cantidad * ventas.periodos * ventas.cantidad)*.16,0),0) as total')
            ->selectRaw('day(ventas.fechaInicial) as day,ventas.comentario, (ocs.id IS NOT NULL) as pagado')
            ->join('montos', 'ventas.monto_id', '=', 'montos.id')
            ->join('servicios', 'montos.servicio_id', '=', 'servicios.id')
            ->join('cecos', 'ventas.ceco_id', '=', 'cecos.id')
            ->leftJoin(
                'ocs',
                'ocs.id',
                '=',
                DB::raw("(SELECT ocs.id FROM ocs as ocs_join 
                INNER JOIN facturas ON ocs_join.factura_id = facturas.id 
                AND facturas.ingreso_id IS NOT NULL 
                WHERE ocs_join.venta_id = ventas.id LIMIT 1)")
            )
            ->groupBy(
                'ventas.id',
                'day',
                'cecos.nombre',
                'servicios.nombre',
                'montos.cantidad',
            )
            ->whereMonth('ventas.fechaInicial', '=', $validadData['month'])
            ->whereYear('ventas.fechaInicial', '=', $validadData['year']);

        //Intento evitar join cuando no tiene filtros
        if ($request->has('lineas_negocio_id') || $request->has('cliente_id')) {
            //Encaso de tener linea de transporte
            if ($request->has('lineas_negocio_id')) {
                $ventas->where('cecos.lineas_negocio_id', '=', $validadData['lineas_negocio_id']);
            }

            if ($request->has('cliente_id')) {
                $ventas->where('cecos.cliente_id', '=', $validadData['cliente_id']);
            }
        }
        $ventas = $ventas->get()->groupBy('day');
        return response()->json($ventas);
    }


    // public function totalStatus()
    // {

    //     $fecha_Actual =  date("Y");

    //     $status = collect(['pc' => 0, 'pp' => 0, 'c' => 0]);

    //     $ocs = Oc::selectRaw('ifnull(sum(ocs.cantidad),0) as total')
    //         ->whereNull('ocs.factura_id')
    //         ->where('ocs.fecha_alta', 'LIKE', '%' . $fecha_Actual . '%')
    //         ->first();
    //     $facturas = Factura::selectRaw('ifnull(sum(facturas.cantidad),0) as total')
    //         ->whereNull('facturas.ingreso_id')
    //         ->where('facturas.fechaDePago', 'LIKE', '%' . $fecha_Actual . '%')
    //         ->first();
    //     $ingreso = Ingreso::selectRaw('ifnull(sum(ingresos.cantidad),0) as total')
    //         ->where('ingresos.created_at', 'LIKE', '%' . $fecha_Actual . '%')
    //         ->first();

    //     $status['pc'] = $ocs->total;
    //     $status['pp'] =  $facturas->total;
    //     $status['c'] = $ingreso->total;
    //     return $status;
    // }

    /**
     * Get ocs by Venta
     */
    public function ocsIndex(Venta $venta)
    {
        $ocs = $venta->ocs()->select(
            "ocs.id",
            "ocs.nombre as oc",
        )
            ->selectRaw("CONCAT('$',FORMAT(ocs.cantidad,2,'en_US')) as cantidad, facturas.referencia as factura")
            ->leftJoin("facturas", 'ocs.factura_id', "=", "facturas.id");
        if (request()->has("search")) {
            $search = strtr(request("search"), array("'" => "\\'", "%" => "\\%"));
            $ocs->where("ocs.nombre", "like", "%" . $search . "%");
        }
        return response()->json($ocs->get());
    }
}
