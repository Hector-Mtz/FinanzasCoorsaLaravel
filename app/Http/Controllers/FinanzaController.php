<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use App\Models\Factura;
use App\Models\Ingreso;
use App\Models\Oc;
use App\Models\Venta;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FinanzaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $clientes = Cliente::select('clientes.*')
            ->selectRaw('count(ventas.id) as total_ventas')
            ->join('cecos', 'clientes.id', '=', 'cecos.cliente_id')
            ->join('ventas', 'cecos.id', '=', 'ventas.ceco_id')
            ->with([
                'ventas' => function ($query) use ($request) {
                    $query->select(
                        "ventas.*",
                        "cecos.nombre as ceco",
                        "servicios.nombre as servicio",
                        "montos.cantidad as monto",
                        "montos.servicio_id"
                    )
                        ->join('montos', 'ventas.monto_id', '=', 'montos.id')
                        ->join('servicios', 'montos.servicio_id', '=', 'servicios.id')
                        ->orderBy('ventas.fechaInicial')
                        ->limit(100);

                    if ($request->status_id != "") {
                        $query->where("ventas.status_id", "=", $request->status_id);
                    }
                    if ($request->has("search")) {
                        $search = strtr($request->search, array("'" => "\\'", "%" => "\\%"));
                        $query->where("cecos.nombre", "like", "%" . $search . "%");
                    }
                }
            ])
            ->groupBy('clientes.id')
            ->orderBy('total_ventas', 'desc');

        if ($request->status_id != "") {
            $clientes->where("ventas.status_id", "=", $request->status_id);
        }


        //UNO ES PARA EL TOTAL Y OTRA DEPENDE DEL STATUS DONDE SE ENCUENTRE
        $totalVentas = Venta::selectRaw('ifnull(sum(montos.cantidad * ventas.periodos * ventas.cantidad + if(ventas.iva = 1,(montos.cantidad * ventas.periodos * ventas.cantidad)*.16,0)),0) as total')
            ->join('montos', 'ventas.monto_id', '=', 'montos.id');
        $totalVentasStatus = $totalVentas;
        if ($request->status_id != "") {
            $totalVentasStatus->where("ventas.status_id", "=", $request->status_id);
        }
        if ($request->has("search")) {
            $search = "%" . strtr($request->search, array("'" => "\\'", "%" => "\\%")) . "%";
            $clientes->where("cecos.nombre", "like",  $search);
            $totalVentasStatus
                ->join('cecos', 'ventas.ceco_id', '=', 'cecos.id')
                ->where("cecos.nombre", "like",  $search);
        }

        return Inertia::render('Finanzas/VentasIndex', [
            'clientes' =>  fn () =>  $clientes->get(),
            // 'totalVentas' => fn () =>  $totalVentas->first(),
            'totalVentasStatus' => fn () =>  $totalVentasStatus->first(),
            'totalOcs' => fn () => $this->totalStatus(),
            'filters' => $request->all(['search', 'status_id'])
        ]);
    }

    public function totalStatus()
    {

        $fecha_Actual =  date("Y");

        $status = collect(['pc' => 0, 'pp' => 0, 'c' => 0]);

        $ocs = Oc::selectRaw('ifnull(sum(ocs.cantidad),0) as total')
            ->whereNull('ocs.factura_id')
            ->where('ocs.fecha_alta', 'LIKE', '%' . $fecha_Actual . '%')
            ->first();
        $facturas = Factura::selectRaw('ifnull(sum(facturas.cantidad),0) as total')
            ->whereNull('facturas.ingreso_id')
            ->where('facturas.fechaDePago', 'LIKE', '%' . $fecha_Actual . '%')
            ->first();
        $ingreso = Ingreso::selectRaw('ifnull(sum(ingresos.cantidad),0) as total')
            ->where('ingresos.created_at', 'LIKE', '%' . $fecha_Actual . '%')
            ->first();

        $status['pc'] = $ocs->total;
        $status['pp'] =  $facturas->total;
        $status['c'] = $ingreso->total;
        return $status;
    }
}
