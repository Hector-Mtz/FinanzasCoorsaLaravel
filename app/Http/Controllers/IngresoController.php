<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use App\Models\Factura;
use App\Models\Ingreso;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class IngresoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $request->validate([
            'direction' => 'in:asc,desc'
        ]);
        $ingresos = Ingreso::select('ingresos.*', 'bancos.nombre as banco')
            ->join('bancos', 'ingresos.banco_id', '=', 'bancos.id')
            ->leftJoin(
                'facturas',
                'facturas.id',
                '=',
                DB::raw("(SELECT id FROM facturas as fact_join WHERE fact_join.ingreso_id = ingresos.id LIMIT 1)")
            )
            ->leftJoin('clientes', 'facturas.cliente_id', '=', 'clientes.id')
            ->with('facturas:id,referencia,ingreso_id,cantidad,fechaDePago')
            ->withCasts([
                'created_at' => 'datetime:Y-m-d H:m'
            ]);


        if ($request->has("search")) {
            $search = '%' . strtr($request->search, array("'" => "\\'", "%" => "\\%")) . '%';
            $ingresos->where('ingresos.nombre', 'like',  $search);
        }

        if ($request->has('field')) {
            $ingresos->orderBy(request('field'), request('direction'));
        } else {
            $ingresos->orderBy('ingresos.created_at', 'desc');
        }

        return response()->json([
            'ingresos' => $ingresos->paginate(5),
        ]);
    }





    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function totalIngresosCliente()
    {


        $clientesIngresos = Ingreso::selectRaw("clientes.id,ifnull(clientes.nombre,'SIN CLIENTE') as nombre,
            count(ingresos.id) as total_ingresos")
            ->leftJoin(
                'facturas',
                'facturas.id',
                '=',
                DB::raw("(SELECT id FROM facturas as fact_join WHERE fact_join.ingreso_id = ingresos.id LIMIT 1)")
            )
            ->leftJoin('clientes', 'facturas.cliente_id', '=', 'clientes.id')
            ->groupBy(['clientes.id'])
            ->orderBy('total_ingresos', 'desc');



        $totalIngresos = Ingreso::selectRaw("ifnull(sum(ingresos.cantidad),0) total");


        if (request()->has('status_id')) {
            $clientesIngresos->where("ingresos.status_id", "=", request('status_id'));
            $totalIngresos->where("ingresos.status_id", "=", request('status_id'));
        }


        if (request()->has('search')) {
            $search = '%' . strtr(request('search'), array("'" => "\\'", "%" => "\\%")) . '%';
            $clientesIngresos->where('ingresos.nombre', 'like',  $search);
            $totalIngresos->where('ingresos.nombre', 'like',  $search);
        }


        return response()->json([
            'clientesIngresos' => $clientesIngresos->get(),
            'totalIngresos' => $totalIngresos->first(),
        ]);
    }


    /**
     * Display a listing of Facturas by cliente.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Cliente  $cliente
     * @return \Illuminate\Http\JsonResponse
     */
    public function indexByCliente(Request $request, int $cliente = null)
    {

        if ($cliente === null) {
            $ingresos =  Ingreso::select(
                'ingresos.*',
                'bancos.nombre as banco'
            )
                ->join('bancos', 'ingresos.banco_id', '=', 'bancos.id')
                ->with('facturas:id,referencia,ingreso_id,cantidad,fechaDePago')
                ->leftJoin(
                    'facturas',
                    'facturas.id',
                    '=',
                    DB::raw("(SELECT id FROM facturas as fact_join WHERE fact_join.ingreso_id = ingresos.id LIMIT 1)")
                )
                ->leftJoin('clientes', 'facturas.cliente_id', '=', 'clientes.id')
                ->whereNull('clientes.id');
        } else {
            $finCliente = Cliente::find($cliente);
            $ingresos =   Ingreso::select('ingresos.*', 'bancos.nombre as banco')
                ->join('bancos', 'ingresos.banco_id', '=', 'bancos.id')
                ->join(
                    'facturas',
                    'facturas.id',
                    '=',
                    DB::raw("(SELECT id FROM facturas as fact_join WHERE fact_join.ingreso_id = ingresos.id LIMIT 1)")
                )
                ->join('clientes', 'facturas.cliente_id', '=', 'clientes.id')
                ->with('facturas:id,referencia,ingreso_id,cantidad,fechaDePago')
                ->where('clientes.id', '=', $finCliente->id);
        }

        $ingresos->orderBy('ingresos.created_at', 'desc');

        if ($request->has('status_id')) {
            $ingresos->where("ingresos.status_id", "=", request('status_id'));
        }
        if ($request->has("search")) {
            $search = "%" . strtr($request->search, array("'" => "\\'", "%" => "\\%")) . "%";
            $ingresos->where('ingresos.nombre', 'like', $search);
        }

        return response()->json($ingresos->paginate(5));
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
        $request->validate([
            'nombre' => ['required', 'unique:ingresos,nombre'],
            'cantidad' => ['required', 'numeric'],
            'banco_id' => ['required', 'exists:bancos,id'],
            'created_at' => ['required']
        ]);

        $urlContenido = null;
        $ingreso = null;
        if ($request->has('documento')) {
            if ($request['documento'] !== null) {
                $contenido = $request['documento'];
                $nombreCont = $contenido->getClientOriginalName();
                $ruta_documento = $contenido->storeAs('documentos', $nombreCont, 'gcs');
                $urlContenido = Storage::disk('gcs')->url($ruta_documento);

                $ingreso = Ingreso::create(
                    [
                        'nombre' => $request['nombre'],
                        'cantidad' => $request['cantidad'],
                        'banco_id' => $request['banco_id'],
                        'created_at' => $request['created_at'],
                        'documento' => $urlContenido
                    ]
                );
            } else {
                $ingreso = Ingreso::create(
                    [
                        'nombre' => $request['nombre'],
                        'cantidad' => $request['cantidad'],
                        'banco_id' => $request['banco_id'],
                        'created_at' => $request['created_at'],
                    ]
                );
            }
        } else {
            $ingreso = Ingreso::create(
                [
                    'nombre' => $request['nombre'],
                    'cantidad' => $request['cantidad'],
                    'banco_id' => $request['banco_id'],
                    'created_at' => $request['created_at'],
                ]
            );
        }

        return redirect()->back();
        // return response()->json($ingreso);
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
        $request->validate([
            'nombre' => ['required', 'unique:ingresos,nombre,' . $ingreso->id . ',id'],
            'cantidad' => ['required', 'numeric'],
            'banco_id' => ['required', 'exists:bancos,id'],
            'created_at' =>  ['required']
        ]);
        $facturas = Factura::selectRaw("ifnull(sum(facturas.cantidad),0) as total")
            ->where('ingreso_id', '=', $ingreso->id)
            ->first();
        //No esposible actualizar en caso de que la cantidad sea menor al total de facturas total
        if ($request['cantidad']  < $facturas->total) {
            @throw ValidationException::withMessages([
                'cantidad' => 'Monto insuficiente. Deposito en uso',
            ]);
            return;
        }

        $urlContenido = null;
        if ($request->hasFile('documento')) {
            $contenido = $request['documento'];
            $nombreCont = $contenido->getClientOriginalName();
            $ruta_documento = $contenido->storeAs('documentos', $nombreCont, 'gcs');
            $urlContenido = Storage::disk('gcs')->url($ruta_documento);

            Ingreso::where('ingresos.id', '=', $ingreso->id)
                ->update([
                    'nombre' => $request['nombre'],
                    'cantidad' => $request['cantidad'],
                    'banco_id' => $request['banco_id'],
                    'created_at' => $request['created_at'],
                    'documento' => $urlContenido
                ]);
        } else {
            Ingreso::where('ingresos.id', '=', $ingreso->id)
                ->update([
                    'nombre' => $request['nombre'],
                    'cantidad' => $request['cantidad'],
                    'banco_id' => $request['banco_id'],
                    'created_at' => $request['created_at']
                ]);
        }

        return redirect()->back();
        /*
        return response()->json([
            'message' => 'Actualizado.'
        ]);
        */
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
        $totalFacturas = number_format($totalFacturas, 2, '.', '');

        if ($totalFacturas > $ingreso->cantidad) {
            @throw ValidationException::withMessages([
                'message' => 'Monto insuficiente. : ' . $totalFacturas . '> ' . $ingreso->cantidad,
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
                $ingreso->load('facturas:id,referencia,ingreso_id,cantidad,fechaDePago');
                return response()->json($ingreso);
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
            'factura_id' => ["required", "exists:facturas,id"],
        ]);
        $factura = $ingreso->facturas()->find($request->factura_id);
        $factura->ingreso_id = NULL;
        $factura->save();

        return response()->json([
            'message' => 'Eliminado'
        ]);
    }


    /**
     * Get Facturas by Venta
     */
    public function facturasIndex(Ingreso $ingreso)
    {
        $facturas = $ingreso->facturas()->select(
            "facturas.id",
            "facturas.referencia as factura",
        )
            ->selectRaw("CONCAT('$',FORMAT(facturas.cantidad,2,'en_US')) as cantidad,
            ventas.nombre as venta,
            ocs.nombre as oc")
            ->leftJoin('ocs', 'facturas.id', '=', 'ocs.factura_id')
            ->leftJoin('ventas', 'ocs.venta_id', '=', 'ventas.id');
        return response()->json($facturas->get());
    }
}
