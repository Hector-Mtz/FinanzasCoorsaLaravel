<?php

namespace App\Http\Controllers;

use App\Models\Venta;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VentaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $ventas = Venta::select(
            "ventas.*",
            "cecos.nombre as ceco",
            "clientes.nombre as cliente",
            "montos.cantidad as total",
        )
            ->join('montos', 'ventas.monto_id', '=', 'montos.id')
            ->join('cecos', 'ventas.ceco_id', '=', 'cecos.id')
            ->join('clientes', 'cecos.cliente_id', "=", "clientes.id");
        if (request()->has("status_id") && request("status_id") != "") {
            $ventas->where("ventas.status_id", "=", request("status_id"));
        }

        if (request()->has("search")) {
            $search = strtr(request('search'), array("'" => "\\'", "%" => "\\%"));
            $ventas->where(function ($query) use ($search) {
                $query->where("cecos.nombre", "like", "%" . $search . "%")
                    ->orWhere("clientes.nombre", "like", "%" . $search . "%");
            });
        }

        return Inertia::render('Finanzas/VentasIndex', [
            'ventas' => fn () => $ventas->get(),
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
            "nombre" =>  ["required", "max:100"],
            "fechaInicial" =>  ["required", "date"],
            "fechaFinal" =>  ["required", "date", "after:fechaInicial"],
            "periodos" =>  ["required", "numeric", "min:1"],
            "cantidad" =>  ["required", "numeric", "min:1"],
            "tipo_id" =>  ["required", "exists:tipos,id"],
            "ceco_id" =>  ["required", "exists:cecos,id"],
        ]);

        // por falta de default value
        $newVenta["status_id"] = 1;

        Venta::create($newVenta);

        return redirect()->back();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Venta  $venta
     * @return \Illuminate\Http\Response
     */
    public function show(Venta $venta)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Venta  $venta
     * @return \Illuminate\Http\Response
     */
    public function edit(Venta $venta)
    {
        //
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
        //
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
}
