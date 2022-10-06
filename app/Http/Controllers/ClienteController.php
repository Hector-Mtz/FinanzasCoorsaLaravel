<?php

namespace App\Http\Controllers;

use App\Models\Ceco;
use App\Models\Cliente;
use App\Models\GrupoConcepto;
use App\Models\Producto;
use App\Models\TipoMovimiento;
use App\Models\SoliMovimiento;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClienteController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $request->validate(
            [
                'grupoType' => ['in:clientes'] //valida el grupo si viene contenga clientes
            ]
        );//validamos la data que viene 

        if($request->has('grupoType'))
        { 
          $clientes = Cliente::selectRaw('CONCAT(clientes.nombre,cecos.nombre) AS nombre,
          cecos.nombre AS ceco,
          clientes.nombre AS grupoCliente')
          ->join('cecos', 'clientes.id', '=', 'cecos.cliente_id');
        }
        else
        {
            $clientes = Cliente::selectRaw('clientes.*');
        }

        $grupo_conceptos = GrupoConcepto::all();
        $movimientos = TipoMovimiento::all();
        $solicitudes = SoliMovimiento::all();
        $cantidades = DB::table(DB::raw('soli_movimientos'))
            ->selectRaw(
                'grupo_conceptos.nombre AS GrupoConcepto,
                 SUM(productos.cantidad) AS Cantidad,
                 tipo_movimientos.nombre AS Movimiento'
            )
            ->join('productos', 'productos.soli_movimiento_id', '=', 'soli_movimientos.id')
            ->join('tipo_movimientos', 'soli_movimientos.tipo_movimiento_id', '=', 'tipo_movimientos.id')
            ->join('ceco_conceptos', 'soli_movimientos.ceco_concepto_id', '=', 'ceco_conceptos.id')
            ->join('cecos', 'ceco_conceptos.ceco_id', '=', 'cecos.id')
            ->join('clientes', 'cecos.cliente_id', '=', 'clientes.id')
            ->join('conceptos', 'ceco_conceptos.concepto_id', '=', 'conceptos.id')
            ->join('grupo_conceptos', 'conceptos.grupo_concepto_id', '=', 'grupo_conceptos.id')
            ->groupBy(['grupo_conceptos.nombre', 
            'clientes.nombre',
            'cecos.nombre',
            'tipo_movimientos.nombre',
            ]);

         if($request->has('grupoType')){
            $cantidades->selectRaw('CONCAT(clientes.nombre,cecos.nombre) AS Cliente');
         }else{
            $cantidades->selectRaw('clientes.nombre AS Cliente');
         }   
       //return response()->json($cantidades);

        return Inertia::render('Presupuestos/PresupuestosIndex', 
        [
            'filtros' => $request->all(['grupoType']), //parametro que filtrara para saber como esta agrupado
            'clientes' => fn() => $clientes->get(),
            'grupo_conceptos' => $grupo_conceptos,
            'cantidades' => fn() => $cantidades->get(),
            'movimientos' => $movimientos,
            'solicitudes' => $solicitudes
        ]);
    }

    public function listado()
    {
        request()->validate([
            'direction' => 'in:desc,asc'
        ]);

        $clientes =  Cliente::select('clientes.id', 'clientes.nombre');
        if (request()->has('search')) {
            $search =  strtr(request('search'), array("'" => "\\'", "%" => "\\%"));
            $clientes->where('clientes.nombre', 'like', '%' . $search . '%');
        }

        if (request()->has('field')) {
            $clientes->orderBy(request('field'), request('direction'));
        } else {
            $clientes->orderBy('clientes.created_at', 'desc');
        }
        return response()->json($clientes->paginate(15));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $newCliente = $request->validate([
            'nombre' => 'unique:clientes,nombre'
        ]);

        return response()->json(Cliente::create($newCliente));
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Cliente  $cliente
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Cliente $cliente)
    {
        $newCliente = $request->validate([
            'nombre' => 'unique:clientes,nombre,' . $cliente->id . ',id',
        ]);
        $cliente->update($newCliente);

        return response()->json($cliente);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Cliente  $cliente
     * @return \Illuminate\Http\Response
     */
    public function destroy(Cliente $cliente)
    {
        //
    }
}
