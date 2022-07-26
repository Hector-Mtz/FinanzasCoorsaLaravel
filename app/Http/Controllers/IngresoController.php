<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use App\Models\Factura;
use App\Models\Ingreso;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class IngresoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $clientes = Cliente::select('clientes.id', 'clientes.nombre')->get();
        $numClientes = $clientes->count();

        if (request()->has('search')) {
            $search = strtr(request('search'), array("'" => "\\'", "%" => "\\%"));
        }

        for ($i = 0; $i < $numClientes; $i++) {
            $ingresos = Ingreso::select('ingresos.*', 'bancos.nombre as banco', 'facturas.referencia')
                ->join('bancos', 'ingresos.banco_id', '=', 'bancos.id')
                ->join('facturas', 'ingresos.id', '=', 'facturas.ingreso_id')
                ->join(
                    'ocs',
                    'ocs.id',
                    '=',
                    DB::raw("(SELECT id FROM ocs as ocs_join WHERE ocs_join.factura_id = facturas.id LIMIT 1)")
                )
                ->join('ventas', 'ocs.venta_id', '=', 'ventas.id')
                ->join('cecos', 'ventas.ceco_id', '=', 'cecos.id')
                ->join('clientes', 'cecos.cliente_id', '=', 'clientes.id')
                ->where('clientes.id', '=', $clientes[$i]->id);
            if (isset($search)) {
                $ingresos->where('ingresos.nombre', 'like', '%' . $search . '%');
            }


            $clientes[$i]->ingresos = $ingresos->get();
        }
        //SIN CLIENTE
        $clientes->prepend(new Collection([
            'id' => -1,
            'nombre' => 'SIN CLIENTE',
            'ingresos' => []
        ]));

        $ingresos = Ingreso::select(
            'ingresos.*',
            'bancos.nombre as banco',
            'facturas.referencia'
        )
            ->join('bancos', 'ingresos.banco_id', '=', 'bancos.id')
            ->leftJoin('facturas', 'ingresos.id', '=', 'facturas.ingreso_id')
            ->whereNull('facturas.referencia');

        if (isset($search)) {
            $ingresos->where('ingresos.nombre', 'like', '%' . $search . '%');
        }

        $clientes[0]['ingresos'] = $ingresos->get();
        return response()->json($clientes);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $newIngreso = $request->validate([
            'nombre' => ['required', 'unique:ingresos,nombre'],
            'cantidad' => ['required', 'numeric'],
            'banco_id' => ['required', 'exists:bancos,id']
        ]);

        $ingreso = Ingreso::create($newIngreso);

        return response()->json($ingreso);
    }





    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Ingreso  $ingreso
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Ingreso $ingreso)
    {
        //
    }


    public function storeFactura(Request $request, Ingreso $ingreso)
    {
        $request->validate([
            'factura_id' => ["required", "exists:facturas,id"],
        ]);

        $facturas = Factura::selectRaw("ifnull(sum(facturas.cantidad),0) as total")
            ->where('ingreso_id', '=', $ingreso->id)
            ->first();
        //Nueva Factura a actualizar
        $factura = Factura::find($request->factura_id);

        $totalFacturas =  $facturas->total + $factura->cantidad;

        if ($totalFacturas > $ingreso->cantidad) {
            @throw ValidationException::withMessages([
                'message' => 'Monto insuficiente.',
            ]);
            return;
        } else {
            try {
                DB::beginTransaction();
                $factura->ingreso_id = $ingreso->id;
                $factura->save();
                if ($totalFacturas == $ingreso->cantidad) {
                    // :TODO UPDATE STATUS VENTAS Y INGRESOS
                }

                DB::commit();
                return response()->json([
                    'message' => 'Guardado.'
                ]);
            } catch (QueryException $e) {
                @throw ValidationException::withMessages([
                    'message' => $e->getMessage(),
                ]);
                return;
            }
        }
    }
}
