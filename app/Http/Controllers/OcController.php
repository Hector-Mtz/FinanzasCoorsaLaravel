<?php

namespace App\Http\Controllers;

use App\Models\Factura;
use App\Models\Ingreso;
use App\Models\Oc;
use App\Models\Venta;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
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
        $newOc = $request->validate([
            'nombre' => ["required", "string", "unique:ocs,nombre"],
            'cantidad' => ["required", "numeric"],
            'venta_id' => ["required", "exists:ventas,id"],
            'fecha_alta' => ["required", "date"],
        ]);
        try {
            $oc = Oc::create($newOc);
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
            return response()->json($oc);
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
                return;
            }
        }

        $oc->update($newOc);
        return response()->json($oc);
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


    /**
     * Mostra la sumatoria de los totales de los status PC PP C
     * Agrupados
     */
    public function totalesStatus(Request $request)
    {
        $validadData = $request->validate([
            'month' => ['required', 'numeric', 'min:1', 'max:12'],
            'year' => ['required', 'numeric', 'min:2000', 'max:2050'],
        ]);
        $status = collect(['pc' => 0, 'pp' => 0, 'c' => 0]);

        $ocs = Oc::selectRaw('ifnull(sum(ocs.cantidad),0) as total')
            ->whereNull('ocs.factura_id')
            ->whereMonth('ocs.fecha_alta', '=', $validadData['month'])
            ->whereYear('ocs.fecha_alta', '=', $validadData['year'])
            ->first();

        $facturas = Factura::selectRaw('ifnull(sum(facturas.cantidad),0) as total')
            // ->join('ocs', 'facturas.id', '=', 'ocs.factura_id')
            ->whereNull('facturas.ingreso_id')
            ->whereMonth('facturas.fechaDePago', '=', $validadData['month'])
            ->whereYear('facturas.fechaDePago', '=', $validadData['year'])
            ->first();
        $ingreso = Ingreso::selectRaw('ifnull(sum(ingresos.cantidad),0) as total')
            ->whereMonth('ingresos.created_at', '=', $validadData['month'])
            ->whereYear('ingresos.created_at', '=', $validadData['year'])
            ->first();

        $status['pc'] =  $ocs->total;
        $status['pp'] =  $facturas->total;
        $status['c'] = $ingreso->total;

        return response()->json($status);
    }


    public function ocMonth(Request $request)
    {
        $validadData = $request->validate([
            'month' => ['required', 'numeric', 'min:1', 'max:12'],
            'year' => ['required', 'numeric', 'min:2000', 'max:2050'],
            'status' => ['required', 'in:pc,pp,c']
        ]);
        switch ($validadData['status']) {
            case "pc":
                $daysStatus =  Oc::select('ocs.id', 
                    'ocs.nombre', 
                    'ocs.cantidad as total',
                    'ventas.nombre as ventas_nombre',
                    'ventas.cantidad AS ventas_cantidad',
                    'facturas.referencia AS factura_referencia',
                    'facturas.cantidad AS factura_cantidad'.
                    'ingresos.nombre AS ingreso_nombre',
                    'ingresos.cantidad AS ingreso_cantidad')
                    ->selectRaw('day(ocs.created_at) as day')
                    ->whereNull('ocs.factura_id')
                    ->whereMonth('ocs.fecha_alta', '=', $validadData['month'])
                    ->whereYear('ocs.fecha_alta', '=', $validadData['year'])
                    ->leftJoin('ventas', 'ocs.venta_id', 'ventas.id')
                    ->leftJoin('facturas', 'ocs.factura_id', 'facturas.id')
                    ->leftJoin('ingresos','facturas.ingreso_id', 'ingresos.id')
                    ->get();
                break;
            case "pp":
                $daysStatus =  Factura::select('facturas.id', 
                'facturas.referencia as referencia', 
                'facturas.cantidad as total',
                'ocs.nombre AS ocs_name',
                'ocs.cantidad AS ocs_cantidad',
                'ventas.nombre AS ventas_nombre',
                'ventas.cantidad AS venta_cantidad'
                )
                    ->selectRaw('day(facturas.fechaDePago) as day')
                    ->whereNull('facturas.ingreso_id')
                    ->whereMonth('facturas.fechaDePago', '=', $validadData['month'])
                    ->whereYear('facturas.fechaDePago', '=', $validadData['year'])
                    ->leftJoin('ocs', 'ocs.factura_id', 'facturas.id')
                    ->leftJoin('ventas', 'ocs.venta_id', 'ventas.id')
                    ->get();
                break;
            case "c":
                $daysStatus =  Ingreso::select('ingresos.id', 
                'ingresos.nombre', 
                'ingresos.cantidad as total',
                'facturas.referencia AS factura_referencia',
                'facturas.cantidad AS factura_cantidad',
                'ventas.nombre AS venta_name',
                'ventas.cantidad AS venta_cantidad',
                'ocs.nombre AS oc_name',
                'ocs.cantidad AS oc_cantidad')
                    ->selectRaw('day(ingresos.created_at) as day')
                    ->leftJoin('facturas', 'facturas.ingreso_id', 'ingresos.id')
                    ->leftJoin('ocs', 'ocs.factura_id', 'facturas.id')
                    ->leftJoin('ventas', 'ocs.venta_id', 'ventas.id')
                    ->whereMonth('ingresos.created_at', '=', $validadData['month'])
                    ->whereYear('ingresos.created_at', '=', $validadData['year'])
                    ->get();
                break;
        }
        return response()->json($daysStatus->groupBy('day'));
    }
}
