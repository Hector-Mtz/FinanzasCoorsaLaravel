<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use App\Models\Factura;
use App\Models\Ingreso;
use App\Models\LineasNegocio;
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

        $request->validate([
            'lineas_negocio_id' => ['nullable', 'exists:lineas_negocios,id'],
            'fecha_inicio' => ['nullable', 'date'],
            'fecha_fin' => ['required_with:fecha_inicio', 'date']
        ]);

        $clientes = Cliente::select('clientes.*')
            ->selectRaw('count(ventas.id) as total_ventas')
            ->join('cecos', 'clientes.id', '=', 'cecos.cliente_id')
            ->join('ventas', 'cecos.id', '=', 'ventas.ceco_id')
            ->groupBy('clientes.id')
            ->orderBy('total_ventas', 'desc');

        //UNO ES PARA EL TOTAL Y OTRA DEPENDE DEL STATUS DONDE SE ENCUENTRE
        $totalVentas = Venta::selectRaw('ifnull(sum(montos.cantidad * ventas.periodos * ventas.cantidad + if(ventas.iva = 1,(montos.cantidad * ventas.periodos * ventas.cantidad)*.16,0)),0) as total')
            ->join('montos', 'ventas.monto_id', '=', 'montos.id')
            ->join('cecos', 'ventas.ceco_id', '=', 'cecos.id');
        $totalVentasStatus = $totalVentas;
        if ($request->status_id != "") {
            $clientes->where("ventas.status_id", "=", $request->status_id);
            $totalVentasStatus->where("ventas.status_id", "=", $request->status_id);
        }
        if ($request->has("search")) {
            $search = "%" . strtr($request->search, array("'" => "\\'", "%" => "\\%")) . "%";
            $clientes->where("cecos.nombre", "like",  $search);
            $totalVentasStatus->where("cecos.nombre", "like",  $search);
        }

        if ($request->has("lineas_negocio_id")) {
            $clientes->where("cecos.lineas_negocio_id", "=",  $request->input("lineas_negocio_id"));
            $totalVentasStatus->where("cecos.nombre", "like",  $request->input("lineas_negocio_id"));
        }

        if ($request->has("fecha_inicio")) {
            $clientes->where("ventas.fechaInicial", ">=",  $request->input("fecha_inicio"))
                ->where("ventas.fechaFinal", '<=', $request->input("fecha_fin"));
            $totalVentasStatus->where("ventas.fechaInicial", ">=",  $request->input("fecha_inicio"))
                ->where("ventas.fechaFinal", '<=', $request->input("fecha_fin"));
        }


        return Inertia::render('Finanzas/VentasIndex', [
            'clientes' =>  fn () =>  $clientes->get(),
            // 'totalVentas' => fn () =>  $totalVentas->first(),
            'totalVentasStatus' => fn () =>  $totalVentasStatus->first(),
            'totalOcs' => fn () => $this->totalStatus(),
            'lineasNegocios' => fn () => LineasNegocio::select('id', 'name')->get(),
            'filters' => $request->all(['search', 'status_id', 'lineas_negocio_id', 'fecha_inicio', 'fecha_fin'])
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
