<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use App\Models\Factura;
use App\Models\Ingreso;
use App\Models\Oc;
use App\Models\Venta;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
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

        $clientes = Cliente::select('clientes.*')
            ->with([
                'ventas' => function ($query) use ($request) {
                    $query->select(
                        "ventas.*",
                        "cecos_ventas.nombre as ceco",
                        "servicios.nombre as servicio",
                        "montos.cantidad as monto",
                        "montos.servicio_id"
                    )
                        ->join('montos', 'ventas.monto_id', '=', 'montos.id')
                        ->join('servicios', 'montos.servicio_id', '=', 'servicios.id')
                        ->join('cecos as cecos_ventas', 'ventas.ceco_id', '=', 'cecos_ventas.id')
                        ->orderBy('ventas.fechaInicial');

                    if ($request->status_id != "") {
                        $query->where("ventas.status_id", "=", $request->status_id);
                    }
                    if ($request->has("search")) {
                        $search = strtr($request->search, array("'" => "\\'", "%" => "\\%"));
                        $query->where("cecos_ventas.nombre", "like", "%" . $search . "%");
                    }
                }
            ]);



        //UNO ES PARA EL TOTAL Y OTRA DEPENDE DEL STATUS DONDE SE ENCUENTRE
        $totalVentas = Venta::selectRaw('ifnull(sum(montos.cantidad * ventas.periodos * ventas.cantidad + if(ventas.iva = 1,(montos.cantidad * ventas.periodos * ventas.cantidad)*.16,0)),0) as total')
            ->join('montos', 'ventas.monto_id', '=', 'montos.id');
        $totalVentasStatus = $totalVentas;
        if ($request->status_id != "") {
            $totalVentasStatus->where("ventas.status_id", "=", $request->status_id);
        }

        return Inertia::render('Finanzas/VentasIndex', [
            'clientes' =>  fn () =>  $clientes->get(),
            'totalVentas' => fn () =>  $totalVentas->first(),
            'totalVentasStatus' => fn () =>  $totalVentasStatus->first(),
            'totalOcs' => fn () => $this->totalStatus(),
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
        $newVenta = $request->validate([
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


        Venta::create($newVenta);

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
        $newVenta = $request->validate([
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
        $venta->update($newVenta);
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

    public function totals(Request $request)
    {
        //monto.cantidad * venta.periodos * venta.cantidad
        $validadData = $request->validate([
            'month' => ['required', 'numeric', 'min:1', 'max:12'],
            'year' => ['required', 'numeric', 'min:2000', 'max:2050'],
        ]);

        $ventas = Venta::selectRaw('sum(montos.cantidad * ventas.periodos * ventas.cantidad  +
            if(ventas.iva = 1,(montos.cantidad * ventas.periodos * ventas.cantidad)*.16,0)) as total')
            ->join('montos', 'ventas.monto_id', '=', 'montos.id')
            ->whereMonth('ventas.fechaInicial', '=', $validadData['month'])
            ->whereYear('ventas.fechaInicial', '=', $validadData['year'])
            ->first();
        if ($ventas->total === null) {
            $ventas->total = 0;
        }
        return response()->json($ventas);
    }


    public function ventasMonth(Request $request)
    {
        //monto.cantidad * venta.periodos * venta.cantidad
        $validadData = $request->validate([
            'month' => ['required', 'numeric', 'min:1', 'max:12'],
            'year' => ['required', 'numeric', 'min:2000', 'max:2050'],
        ]);

        $ventas = Venta::select('ventas.id', 'ventas.revisado')
            ->selectRaw('concat(cecos.nombre,"-",servicios.nombre) as nombre,montos.cantidad * ventas.periodos * ventas.cantidad AS subtotal, ifnull(montos.cantidad * ventas.periodos * ventas.cantidad
               + if(ventas.iva = 1,(montos.cantidad * ventas.periodos * ventas.cantidad)*.16,0),0) as total')
            ->selectRaw('day(ventas.fechaInicial) as day,ventas.comentario')
            ->join('montos', 'ventas.monto_id', '=', 'montos.id')
            ->join('servicios', 'montos.servicio_id', '=', 'servicios.id')
            ->join('cecos', 'ventas.ceco_id', '=', 'cecos.id')
            ->groupBy(
                'ventas.id',
                'day',
                'cecos.nombre',
                'servicios.nombre',
                'montos.cantidad',
                'ventas.periodos',
                'ventas.cantidad',
                'ventas.iva',
                'ventas.comentario',
                'ventas.revisado'
            )
            ->whereMonth('ventas.fechaInicial', '=', $validadData['month'])
            ->whereYear('ventas.fechaInicial', '=', $validadData['year'])
            ->get();
        $ventas = $ventas->groupBy('day');
        return response()->json($ventas);
    }


    public function totalStatus()
    {
        $status = collect(['pc' => 0, 'pp' => 0, 'c' => 0]);

        $ocs = Oc::selectRaw('ifnull(sum(ocs.cantidad),0) as total')
            ->whereNull('ocs.factura_id')
            ->first();
        $facturas = Factura::selectRaw('ifnull(sum(facturas.cantidad),0) as total')
            ->whereNull('facturas.ingreso_id')
            ->first();
        $ingreso = Ingreso::selectRaw('ifnull(sum(ingresos.cantidad),0) as total')
            ->first();

        $status['pc'] = $ocs->total;
        $status['pp'] =  $facturas->total;
        $status['c'] = $ingreso->total;
        return $status;
    }
}
