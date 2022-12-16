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

use function GuzzleHttp\Promise\queue;

class IngresoController extends Controller
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
            $ingresos = Ingreso::select('ingresos.*', 'bancos.nombre as banco')
                ->join('bancos', 'ingresos.banco_id', '=', 'bancos.id')
                ->join(
                    'facturas',
                    'facturas.id',
                    '=',
                    DB::raw("(SELECT id FROM facturas as fact_join WHERE fact_join.ingreso_id = ingresos.id LIMIT 1)")
                )
                ->join('clientes', 'facturas.cliente_id', '=', 'clientes.id')
                ->with('facturas:id,referencia,ingreso_id,cantidad,fechaDePago')
                ->where('clientes.id', '=', $clientes[$i]->id);
            if ($hasStatus) {
                $ingresos->where("ingresos.status_id", "=", request('status_id'));
            }
            if (isset($search)) {
                $ingresos->where('ingresos.nombre', 'like', '%' . $search . '%');
            }


            $clientes[$i]->ingresos = $ingresos->orderBy('id')->get();
        }
        //SIN CLIENTE
        $clientes->prepend(new Collection([
            'id' => -1,
            'nombre' => 'SIN CLIENTE',
            'ingresos' => []
        ]));

        $ingresos = Ingreso::select(
            'ingresos.*',
            'bancos.nombre as banco'
        )
            ->join('bancos', 'ingresos.banco_id', '=', 'bancos.id')
            ->leftJoin('facturas', 'ingresos.id', '=', 'facturas.ingreso_id')
            ->with('facturas:id,referencia,ingreso_id,cantidad,fechaDePago');
            /*->whereNull('facturas.referencia');*/
        if ($hasStatus) {
            $ingresos->where("ingresos.status_id", "=", request('status_id'));
        }
        if (isset($search)) {
            $ingresos->where('ingresos.nombre', 'like', '%' . $search . '%');
        }

        $clientes[0]['ingresos'] = $ingresos->orderBy('id')->get();
        $totalIngresos = Ingreso::selectRaw("ifnull(sum(ingresos.cantidad),0) total");
        if ($hasStatus) {
            $totalIngresos->where("ingresos.status_id", "=", request('status_id'));
        }


        return response()->json([
            'clientesIngresos' => $clientes,
            'totalIngresos' => $totalIngresos->first(),
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
        $this->authorize('deposito.create');
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
        $this->authorize('deposito.edit');
        $newIngreso = $request->validate([
            'nombre' => ['required', 'unique:ingresos,nombre,' . $ingreso->id . ',id'],
            'cantidad' => ['required', 'numeric'],
            'banco_id' => ['required', 'exists:bancos,id']
        ]);
        $facturas = Factura::selectRaw("ifnull(sum(facturas.cantidad),0) as total")
            ->where('ingreso_id', '=', $ingreso->id)
            ->first();
        //No esposible actualizar en caso de que la cantidad sea menor al total de facturas total
        if ($newIngreso['cantidad']  < $facturas->total) {
            @throw ValidationException::withMessages([
                'cantidad' => 'Monto insuficiente. Deposito en uso',
            ]);
            return;
        }
        $ingreso->update($newIngreso);

        return response()->json([
            'message' => 'Actualizado.'
        ]);
    }


    public function destroy(Ingreso $ingreso)
    {
        $this->authorize('deposito.delete');
        try {
            DB::beginTransaction();

            Factura::where('ingreso_id', '=', $ingreso->id)
                ->update([
                    'ingreso_id' => null
                ]);
            $ingreso->delete();
            DB::commit();
            return response()->json([
                'meesage' => 'Ingreso DELETED'
            ]);
            //No esposible actualizar en caso de que la cantidad sea menor al total de facturas total
        } catch (QueryException $e) {
            @throw ValidationException::withMessages([
                'message' => $e->getMessage(),
            ]);
            return;
        }

        return response()->json([
            'message' => 'Actualizado.'
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Ingreso  $ingreso
     * @return \Illuminate\Http\Response
     */
    public function changeStatus(Ingreso $ingreso)
    {
        $this->authorize('deposito.cerrar');
        $ingreso->status_id = $ingreso->status_id === 1 ? 2 : 1;
        $ingreso->save();

        return response()->json([
            'message' => 'Actualizado.'
        ]);
    }


    public function storeFactura(Request $request, Ingreso $ingreso)
    {
        $this->authorize('deposito.factura.create');
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
                    $ingreso->status_id = 2;
                    $ingreso->save();
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

    /**
     * Desasocia una factura de un ingreso
     */
    public function destroyFactura(Request $request, Ingreso $ingreso)
    {
        $this->authorize('deposito.factura.delete');
        $request->validate([
            'factura_id' => ["required", "exists:ocs,id"],
        ]);
        $factura = Factura::find($request->factura_id);
        $factura->ingreso_id = NULL;
        $factura->save();

        return response()->json([
            'message' => 'Eliminado'
        ]);
    }
}
