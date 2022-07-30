<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use App\Models\Venta;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
                        "montos.cantidad as total",
                        "montos.servicio_id"
                    )
                        ->join('montos', 'ventas.monto_id', '=', 'montos.id')
                        ->join('cecos as cecos_ventas', 'ventas.ceco_id', '=', 'cecos_ventas.id');

                    if ($request->status_id != "") {
                        $query->where("ventas.status_id", "=", $request->status_id);
                    }
                }
            ]);


        if ($request->has("search")) {
            $search = strtr($request->search, array("'" => "\\'", "%" => "\\%"));
            $clientes->where("clientes.nombre", "like", "%" . $search . "%");
        }

        return Inertia::render('Finanzas/VentasIndex', [
            'clientes' =>  fn () =>  $clientes->get(),
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
        $newVenta = $request->validate([
            "monto_id" =>  ["required", "exists:montos,id"],
            "nombre" =>  ["required", "max:100", "unique:ventas,nombre"],
            "fechaInicial" =>  ["required", "date"],
            "fechaFinal" =>  ["required", "date", "after:fechaInicial"],
            "periodos" =>  ["required", "numeric", "min:1"],
            "cantidad" =>  ["required", "numeric", "min:1"],
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
        $newVenta = $request->validate([
            "monto_id" =>  ["required", "exists:montos,id"],
            "nombre" =>  ["required", "max:100", "unique:ventas,nombre," . $venta->id . ",id"],
            "fechaInicial" =>  ["required", "date"],
            "fechaFinal" =>  ["required", "date", "after:fechaInicial"],
            "periodos" =>  ["required", "numeric", "min:1"],
            "cantidad" =>  ["required", "numeric", "min:1"],
            "tipo_id" =>  ["required", "exists:tipos,id"],
            "ceco_id" =>  ["required", "exists:cecos,id"],
        ]);

        $venta->update($newVenta);
        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Venta  $venta
     * @return \Illuminate\Http\Response
     */
    public function destroy(Venta $venta)
    {
        //
    }

    public function totals(Request $request)
    {
        //monto.cantidad * venta.periodos * venta.cantidad
        $validadData = $request->validate([
            'month' => ['required', 'numeric', 'min:1', 'max:12'],
            'year' => ['required', 'numeric', 'min:2000', 'max:2050'],
        ]);

        $ventas = Venta::selectRaw('ifnull(sum(montos.cantidad * ventas.periodos * ventas.cantidad),0) as total')
            ->join('montos', 'ventas.monto_id', '=', 'montos.id')
            ->whereMonth('ventas.fechaInicial', '=', $validadData['month'])
            ->whereYear('ventas.fechaInicial', '=', $validadData['year'])
            ->first();

        return response()->json($ventas);
    }


    public function ventasMonth(Request $request)
    {
        //monto.cantidad * venta.periodos * venta.cantidad
        $validadData = $request->validate([
            'month' => ['required', 'numeric', 'min:1', 'max:12'],
            'year' => ['required', 'numeric', 'min:2000', 'max:2050'],
        ]);

        $ventas = Venta::select('ventas.id')
            ->selectRaw('day(ventas.fechaInicial) as day')
            ->whereMonth('ventas.fechaInicial', '=', $validadData['month'])
            ->whereYear('ventas.fechaInicial', '=', $validadData['year'])
            ->get();
        $ventas = $ventas->groupBy('day');
        return response()->json($ventas);
    }
}
