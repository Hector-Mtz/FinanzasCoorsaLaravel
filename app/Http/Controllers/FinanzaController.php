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
        $totalVentasStatus = Venta::selectRaw('ifnull(sum(montos.cantidad * ventas.periodos * ventas.cantidad + if(ventas.iva = 1,(montos.cantidad * ventas.periodos * ventas.cantidad)*.16,0)),0) as total')
            ->join('montos', 'ventas.monto_id', '=', 'montos.id')
            ->join('cecos', 'ventas.ceco_id', '=', 'cecos.id');
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
            $totalVentasStatus->where("cecos.lineas_negocio_id", "=",  $request->input("lineas_negocio_id"));
        }

        if ($request->has("fecha_inicio")) {
            $clientes->where("ventas.fechaInicial", ">=",  $request->input("fecha_inicio"))
                ->where("ventas.fechaInicial", '<=', $request->input("fecha_fin"));
            $totalVentasStatus->where("ventas.fechaInicial", ">=",  $request->input("fecha_inicio"))
                ->where("ventas.fechaInicial", '<=', $request->input("fecha_fin"));
        }


        return Inertia::render('Finanzas/VentasIndex', [
            'clientes' =>  fn () =>  $clientes->get(),
            'totalVentasStatus' => fn () =>  $totalVentasStatus->first(),
            'lineasNegocios' => fn () => LineasNegocio::select('id', 'name')->orderBy('name')->get(),
            'listClientes' => fn () => Cliente::select('id', 'nombre')->orderBy('nombre')->get(),
            'filters' => $request->all(['search', 'status_id', 'lineas_negocio_id', 'fecha_inicio', 'fecha_fin'])
        ]);
    }

    /**
     * Get Totales Globales de
     * ventas, pc, pp, c
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function totalesStatus(Request $request)
    {
        $validadData = $request->validate([
            'year' => ['required', 'numeric', 'min:2000', 'max:2050'],
            'month' => ['nullable', 'numeric', 'min:1', 'max:12'],
            'lineas_negocio_id' => ['nullable', 'exists:lineas_negocios,id'],
            'cliente_id' => ['nullable', 'exists:clientes,id'],
        ]);

        $status = collect(['ventas' => 0, 'pc' => 0, 'pp' => 0, 'c' => 0]);

        $ventas = Venta::selectRaw('ifnull(sum(montos.cantidad * ventas.periodos * ventas.cantidad + 
        if(ventas.iva = 1,(montos.cantidad * ventas.periodos * ventas.cantidad)*.16,0)),0) as total')
            ->join('montos', 'ventas.monto_id', '=', 'montos.id')
            ->whereYear('ventas.fechaInicial', '=', $validadData['year']);

        $ocs = Oc::selectRaw('ifnull(sum(ocs.cantidad),0) as total')
            ->whereNull('ocs.factura_id')
            ->whereYear('ocs.fecha_alta', '=', $validadData['year']);
        $facturas = Factura::whereNull('facturas.ingreso_id')
            ->whereYear('facturas.fechaDePago', '=', $validadData['year']);
        $ingreso = Ingreso::whereYear('ingresos.created_at', '=', $validadData['year']);

        if ($request->has('month')) {
            $ventas->whereMonth('ventas.fechaInicial', '=', $validadData['month']);
            $ocs->whereMonth('ocs.fecha_alta', '=', $validadData['month']);
            $facturas->whereMonth('facturas.fechaDePago', '=', $validadData['month']);
            $ingreso->whereMonth('ingresos.created_at', '=', $validadData['month']);
        }

        //Intento evitar join cuando no tiene filtros
        if ($request->has('lineas_negocio_id') || $request->has('cliente_id')) {
            $ventas->join('cecos', 'ventas.ceco_id', '=', 'cecos.id');
            $ocs->join('ventas', 'ocs.venta_id', '=', 'ventas.id')
                ->join('cecos', 'ventas.ceco_id', '=', 'cecos.id');
            $ingreso
                ->select('ingresos.id', 'cecos.lineas_negocio_id', 'facturas.cantidad as total')
                ->join('facturas', 'ingresos.id', '=', 'facturas.ingreso_id');



            //Encaso de tener linea de transporte
            if ($request->has('lineas_negocio_id')) {
                $ventas->where('cecos.lineas_negocio_id', '=', $validadData['lineas_negocio_id']);
                $ocs->where('cecos.lineas_negocio_id', '=', $validadData['lineas_negocio_id']);
                //Facturas
                $facturas->select('facturas.id', 'cecos.lineas_negocio_id', 'facturas.cantidad as total')
                    ->join('ocs', 'facturas.id', '=', 'ocs.factura_id')
                    ->join('ventas', 'ocs.venta_id', '=', 'ventas.id')
                    ->join('cecos', 'ventas.ceco_id', '=', 'cecos.id')
                    ->where('cecos.lineas_negocio_id', '=', $validadData['lineas_negocio_id'])
                    ->distinct();
                //Depositos
                $ingreso->join('ocs', 'facturas.id', '=', 'ocs.factura_id')
                    ->join('ventas', 'ocs.venta_id', '=', 'ventas.id')
                    ->join('cecos', 'ventas.ceco_id', '=', 'cecos.id')
                    ->where('cecos.lineas_negocio_id', '=', $validadData['lineas_negocio_id']);
            }

            if ($request->has('cliente_id')) {
                $ventas->where('cecos.cliente_id', '=', $validadData['cliente_id']);
                $ocs->where('cecos.cliente_id', '=', $validadData['cliente_id']);
                $facturas->where('facturas.cliente_id', '=', $validadData['cliente_id']);
                $ingreso->where('facturas.cliente_id', '=', $validadData['cliente_id']);
            }
            $status['c'] = $ingreso->distinct()->get()->sum('total');
        } else {
            $ingreso->selectRaw('ifnull(sum(ingresos.cantidad),0) as total');
            $status['c'] = $ingreso->first()->total;
        }
        //DEBIDO A QUE LOS IF DE ARRIVA CONDICIONAL LA CONSULTA AGREGANDO WHERE
        //EN CASO DE UNA AGRUPACION NO PUEDE IR CON FIRST
        if ($request->has('lineas_negocio_id')) {
            $status['pp'] =  $facturas->get()->sum('total');
        } else {
            $status['pp'] =  $facturas->selectRaw('ifnull(sum(facturas.cantidad),0) as total')
                ->first()->total;
        }


        $status['ventas'] = $ventas->first()->total;
        $status['pc'] = $ocs->first()->total;
        return response()->json($status);
    }
}
