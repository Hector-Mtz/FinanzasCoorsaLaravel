<?php

namespace App\Http\Controllers;

use App\Models\Factura;
use App\Models\Ingreso;
use App\Models\Oc;
use App\Models\Venta;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

use function GuzzleHttp\Promise\queue;

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
        $this->authorize('ocs.create');
        $request->validate([
            'nombre' => ["required", "string", "unique:ocs,nombre"],
            'cantidad' => ["required", "numeric"],
            'venta_id' => ["required", "exists:ventas,id"],
            'fecha_alta' => ["required", "date"],
        ]);
        try {

            $urlContenido = null;
            if ($request->has('documento')) {
                if ($request['documento'] !== null) {
                    $contenido = $request['documento'];
                    $nombreCont = $contenido->getClientOriginalName();
                    $ruta_documento = $contenido->storeAs('documentos', $nombreCont, 'gcs');
                    $urlContenido = Storage::disk('gcs')->url($ruta_documento);

                    $newOc = Oc::create([
                        'nombre' => $request['nombre'],
                        'cantidad' => $request['cantidad'],
                        'fecha_alta' => $request['fecha_alta'],
                        'venta_id' => $request['venta_id'],
                        'documento' => $urlContenido
                    ]);
                } else {
                    $newOc = Oc::create([
                        'nombre' => $request['nombre'],
                        'cantidad' => $request['cantidad'],
                        'fecha_alta' => $request['fecha_alta'],
                        'venta_id' => $request['venta_id'],
                    ]);
                }
            } else {
                $newOc = Oc::create([
                    'nombre' => $request['nombre'],
                    'cantidad' => $request['cantidad'],
                    'fecha_alta' => $request['fecha_alta'],
                    'venta_id' => $request['venta_id'],
                ]);
            }

            $venta = Venta::select('ventas.id', 'ventas.cantidad', 'ventas.periodos')
                ->selectRaw('count(ocs.id) as total_ocs')
                ->leftJoin('ocs', 'ventas.id', '=', 'ocs.venta_id')
                ->groupBy('ventas.id', 'ventas.cantidad', 'ventas.periodos')
                ->firstWhere('ventas.id', '=', $newOc['venta_id']);
            // Cierre en automatico de ventas cuando el numero de ocs es igual al número de periodos
            if ($venta->periodos === $venta->total_ocs) {
                $venta->status_id = 2;
                $venta->save();
            }

            return redirect()->back();
        } catch (QueryException $e) {
            @throw ValidationException::withMessages([
                'nombre' => $e->getMessage()
            ]);
        }
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

        $this->authorize('ocs.edit');
        $newOc = $request->validate([
            'nombre' => ["required", "string", "unique:ocs,nombre," . $oc->id . ",id"],
            'cantidad' => ["required", "numeric"],
            'fecha_alta' => ["required", "date"],

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
            $newTotalOcs = $factura->total_ocs - $oc->cantidad + $newOc['cantidad'];
            if ($factura->cantidad < $newTotalOcs) {
                @throw ValidationException::withMessages([
                    'cantidad' => "La cantidad supera a la factura"
                ]);
                return redirect()->back();
            }
        }

        $urlContenido = null;
        if ($request->has('documento')) {
            if ($request['documento'] !== null) {
                $contenido = $request['documento'];
                $nombreCont = $contenido->getClientOriginalName();
                $ruta_documento = $contenido->storeAs('documentos', $nombreCont, 'gcs');
                $urlContenido = Storage::disk('gcs')->url($ruta_documento);

                Oc::where('ocs.id', '=', $oc->id)
                    ->update([
                        'nombre' => $request['nombre'],
                        'cantidad' => $request['cantidad'],
                        'fecha_alta' => $request['fecha_alta'],
                        'venta_id' => $request['venta_id'],
                        'documento' => $urlContenido
                    ]);
            } else {
                Oc::where('ocs.id', '=', $oc->id)
                    ->update([
                        'nombre' => $request['nombre'],
                        'cantidad' => $request['cantidad'],
                        'fecha_alta' => $request['fecha_alta'],
                        'venta_id' => $request['venta_id']
                    ]);
            }
        } else {
            Oc::where('ocs.id', '=', $oc->id)
                ->update([
                    'nombre' => $request['nombre'],
                    'cantidad' => $request['cantidad'],
                    'fecha_alta' => $request['fecha_alta'],
                    'venta_id' => $request['venta_id']
                ]);
        }
        return redirect()->back();
        //return response()->json($oc);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Oc  $oc
     * @return \Illuminate\Http\Response
     */
    public function destroy(Oc $oc)
    {
        $this->authorize('ocs.delete');
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
            $newTotalOcs = $factura->total_ocs - $oc->cantidad;
            if ($factura->cantidad < $newTotalOcs) {
                @throw ValidationException::withMessages([
                    'cantidad' => "Inconsistencia en la Factura:" . $factura->referencia
                ]);
                return;
            }
        }

        $oc->delete();
        return response()->json([
            'message' => 'Eliminado'
        ]);
    }


    public function catalogos()
    {
        $ocs = Oc::select("ocs.id", "ocs.nombre", "ocs.cantidad")
            ->whereNull('factura_id');
        if (request()->has("search")) {
            $search = strtr(request("search"), array("'" => "\\'", "%" => "\\%"));
            $ocs->where("ocs.nombre", "like", "%" . $search . "%");
        }

        return response()->json($ocs->limit(10)->get());
    }




    public function ocMonth(Request $request)
    {
        $validadData = $request->validate([
            'month' => ['required', 'numeric', 'min:1', 'max:12'],
            'year' => ['required', 'numeric', 'min:2000', 'max:2050'],
            'status' => ['required', 'in:pc,pp,c'],
            'lineas_negocio_id' => ['nullable', 'exists:lineas_negocios,id'],
            'cliente_id' => ['nullable', 'exists:clientes,id'],
        ]);
        switch ($validadData['status']) {
            case "pc":
                $daysStatus =  Oc::select(
                    'ocs.id',
                    'ocs.nombre',
                    'ocs.cantidad as total',
                    'ventas.nombre as  venta'
                )->selectRaw('day(ocs.fecha_alta) as day')
                    ->join('ventas', 'ocs.venta_id', 'ventas.id')
                    ->whereNull('ocs.factura_id')
                    ->whereMonth('ocs.fecha_alta', '=', $validadData['month'])
                    ->whereYear('ocs.fecha_alta', '=', $validadData['year']);
                if ($request->has('lineas_negocio_id') || $request->has('cliente_id')) {
                    $daysStatus->join('ventas', 'ocs.venta_id', '=', 'ventas.id')
                        ->join('cecos', 'ventas.ceco_id', '=', 'cecos.id');
                    //Encaso de tener linea de transporte
                    if ($request->has('lineas_negocio_id')) {
                        $daysStatus->where('cecos.lineas_negocio_id', '=', $validadData['lineas_negocio_id']);
                    }
                    //Caso de tener cliente
                    if ($request->has('cliente_id')) {
                        $daysStatus->where('cecos.cliente_id', '=', $validadData['cliente_id']);
                    }
                }
                break;
            case "pp":
                $daysStatus =  Factura::select(
                    'facturas.id',
                    'facturas.referencia as referencia',
                    'facturas.cantidad as total',
                )->selectRaw('day(facturas.fechaDePago) as day')
                    ->whereNull('facturas.ingreso_id')
                    ->whereMonth('facturas.fechaDePago', '=', $validadData['month'])
                    ->whereYear('facturas.fechaDePago', '=', $validadData['year']);

                if ($request->has('lineas_negocio_id') || $request->has('cliente_id')) {
                    $daysStatus->join('ocs', 'facturas.id', '=', 'ocs.factura_id')
                        ->join('ventas', 'ocs.venta_id', '=', 'ventas.id')
                        ->join('cecos', 'ventas.ceco_id', '=', 'cecos.id')
                        ->distinct();
                    //Encaso de tener linea de transporte
                    if ($request->has('lineas_negocio_id')) {
                        $daysStatus->where('cecos.lineas_negocio_id', '=', $validadData['lineas_negocio_id']);
                    }
                    //Caso de tener cliente
                    if ($request->has('cliente_id')) {
                        $daysStatus->where('cecos.lineas_negocio_id', '=', $validadData['lineas_negocio_id']);
                    }
                }

                break;
            case "c":
                $daysStatus =  Ingreso::select(
                    'ingresos.id',
                    'ingresos.nombre',
                    'ingresos.cantidad as total',
                )
                    ->selectRaw('day(ingresos.created_at) as day')
                    ->whereMonth('ingresos.created_at', '=', $validadData['month'])
                    ->whereYear('ingresos.created_at', '=', $validadData['year']);

                if ($request->has('lineas_negocio_id') || $request->has('cliente_id')) {
                    $daysStatus->join('facturas', 'ingresos.id', '=', 'facturas.ingreso_id')
                        ->distinct();
                    //Encaso de tener linea de transporte
                    if ($request->has('lineas_negocio_id')) {
                        $daysStatus->join('ocs', 'facturas.id', '=', 'ocs.factura_id')
                            ->join('ventas', 'ocs.venta_id', '=', 'ventas.id')
                            ->join('cecos', 'ventas.ceco_id', '=', 'cecos.id')
                            ->where('cecos.lineas_negocio_id', '=', $validadData['lineas_negocio_id']);
                    }
                    //Caso de tener cliente
                    if ($request->has('cliente_id')) {
                        $daysStatus->where('facturas.cliente_id', '=', $validadData['cliente_id']);
                    }
                }

                break;
        }
        return response()->json($daysStatus->get()->groupBy('day'));
    }
}
