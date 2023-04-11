<?php

namespace App\Http\Controllers;

use App\Models\Ceco;
use App\Models\CecoConcepto;
use App\Models\Cliente;
use App\Models\Concepto;
use App\Models\GrupoConcepto;
use App\Models\LineasNegocio;
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
        $request->validate([
            'lineas_negocio_id' => ['nullable', 'exists:lineas_negocios,id'],
            'fecha' => ['nullable', 'date'],
        ]);

        $cliente_cecos = Cliente::select(
            'clientes.*'
        )->with(['cecos' => function($query) use ($request)
        {
            $query->select('cecos.*')
            ->where('cecos.activo_finanzas','=',1);

            if($request->has('lineas_negocio_id'))
            {
               if($request['lineas_negocio_id'] !== 0)
               {
                $query->where('cecos.lineas_negocio_id',"=", $request['lineas_negocio_id']);
               }
            }
        }])
        ->where('clientes.activo_finanzas','=',1);



        $grupoConcepto_conceptos = GrupoConcepto::select(
            'grupo_conceptos.*'
        )->with('conceptos')
        ->get();

        $cantidades = DB::table(DB::raw('soli_movimientos'))
            ->selectRaw(
                '
                soli_movimientos.id as soli_id,
                soli_movimientos.nombre as soli_name,
                tipo_movimientos.id as tipo_mov_id,
                tipo_movimientos.nombre as tipo_mov_name,
                SUM(productos.cantidad) as cantidad,
                ceco_conceptos.id as ceco_conceptos_id,
                conceptos.id as concepto_id,
                conceptos.nombre as concepto_name,
                cecos.id as ceco_id,
                cecos.nombre as ceco_name,
                clientes.id as cliente_id,
                clientes.nombre as cliente_name,
                grupo_conceptos.id as grupo_conceptos_id,
                grupo_conceptos.nombre as grupo_conceptos_name,
                cecos.lineas_negocio_id as linea_negocio'
            )
            ->join('productos', 'productos.soli_movimiento_id', '=', 'soli_movimientos.id')
            ->join('tipo_movimientos', 'soli_movimientos.tipo_movimiento_id', '=', 'tipo_movimientos.id')
            ->join('ceco_conceptos', 'soli_movimientos.ceco_concepto_id', '=', 'ceco_conceptos.id')
            ->join('cecos', 'ceco_conceptos.ceco_id', '=', 'cecos.id')
            ->join('clientes', 'cecos.cliente_id', '=', 'clientes.id')
            ->join('conceptos', 'ceco_conceptos.concepto_id', '=', 'conceptos.id')
            ->join('grupo_conceptos', 'conceptos.grupo_concepto_id', '=', 'grupo_conceptos.id')
            ->groupBy('soli_movimientos.ceco_concepto_id')
            ->groupBy('tipo_movimientos.id');

            
            if($request->has('fecha'))
            {
               $cantidades->where('soli_movimientos.created_at','LIKE','%'.$request['fecha'].'%');
            }
            
            if($request->has('lineas_negocio_id'))
            {
              if($request['lineas_negocio_id'] !== 0)
              {
                $cantidades->where('cecos.lineas_negocio_id',"=", $request['lineas_negocio_id']);
              }
            }

            $lineas_negocio = LineasNegocio::all();
        /*
        $request->validate(
            [
                'grupoType' => ['in:clientes'], //valida el grupo si viene contenga clientes
                'grupoType2' => ['in:grupo_conceptos']
            ]
        );//validamos la data que viene 

        //Si el request trae el tipo de grupo cliente hace la sig consulta
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

        //Si el request trae el tipo de grupo grupoConcepto hace la sig consulta
        if($request->has('grupoType2'))
        {
            $grupo_conceptos = GrupoConcepto::selectRaw('CONCAT(grupo_conceptos.nombre,conceptos.nombre) AS nombre,
            conceptos.nombre AS concepto,
            grupo_conceptos.nombre AS grupoConcepto' )
            ->join('conceptos', 'grupo_conceptos.id','=','conceptos.grupo_concepto_id');
        }
        else
        {
            $grupo_conceptos = GrupoConcepto::selectRaw('grupo_conceptos.*');
        }
        
        $movimientos = TipoMovimiento::all();
        $solicitudes = SoliMovimiento::all();
        $cantidades = DB::table(DB::raw('soli_movimientos'))
            ->selectRaw(
                '
                 grupo_conceptos.nombre AS GrupoConcepto,
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
            ->groupBy(['grupo_conceptos.nombre', 'conceptos.nombre',
            'clientes.nombre',
            'cecos.nombre',
            'tipo_movimientos.nombre',
            'grupo_conceptos.id',
            'clientes.id',
            'cecos.id',
            'conceptos.id'
            ])->orderBy('Cliente', 'DESC' )
            ->orderBy('GrupoConcepto', 'DESC' );


         if($request->has('grupoType')){
            $cantidades->selectRaw('CONCAT(clientes.nombre,cecos.nombre) AS Cliente,
            clientes.id AS clientes_id,
            conceptos.id AS concepto_id');
         }else{
            $cantidades->selectRaw('clientes.nombre AS Cliente,
            clientes.id AS clientes_id,
            conceptos.id AS concepto_id');
         }   

         if($request->has('grupoType2')){
            $cantidades->selectRaw('CONCAT(grupo_conceptos.nombre,conceptos.nombre) AS GrupoConcepto,
            grupo_conceptos.id AS grupoConcepto_id,
             clientes.id AS clientes_id,
             cecos.id AS ceco_id');
         }else{
            $cantidades->selectRaw('grupo_conceptos.nombre AS 
            GrupoConcepto,grupo_conceptos.id AS grupoConcepto_id, 
            clientes.id AS clientes_id,
            cecos.id AS ceco_id');
         }  

       //return response()->json($cantidades);
*/
        return Inertia::render(
            'Presupuestos/PresupuestosIndex',
            [
                'clientes_cecos' => fn()  => $cliente_cecos->get(),
                'grupoConceptos_conceptos' => $grupoConcepto_conceptos,
                'cantidades' => fn() => $cantidades->get(),
                'lineas_negocio' => $lineas_negocio,
                'filters' => $request->all(['lineas_negocio_id', 'fecha'])
                /*
            'filtros' => $request->all(['grupoType','grupoType2']), //parametro que filtrara para saber como esta agrupado
            'clientes' => fn() => $clientes->get(),
            'grupo_conceptos' => fn() => $grupo_conceptos->get(),
            'cantidades' => fn() => $cantidades->get(),
            'movimientos' => $movimientos,
            'solicitudes' => $solicitudes
            */
            ]
        );
    }


    /**
     * Display a listing of ventas by cliente.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Cliente  $cliente
     * @return \Illuminate\Http\JsonResponse
     */
    public function ventas(Request $request, Cliente $cliente)
    {
        $request->validate([
            'lineas_negocio_id' => ['nullable', 'exists:lineas_negocios,id'],
            'fecha_inicio' => ['nullable', 'date'],
            'fecha_fin' => ['required_with:fecha_inicio', 'date']
        ]);

        $ventas =  $cliente->ventas()->select(
            "ventas.*",
            "cecos.nombre as ceco",
            "servicios.nombre as servicio",
            "montos.cantidad as monto",
            "montos.servicio_id"
        )
            ->join('montos', 'ventas.monto_id', '=', 'montos.id')
            ->join('servicios', 'montos.servicio_id', '=', 'servicios.id')
            ->orderBy('ventas.fechaInicial', 'desc');

        if ($request->status_id != "") {
            $ventas->where("ventas.status_id", "=", $request->status_id);
        }
        if ($request->has("search")) {
            $search = "%" . strtr($request->search, array("'" => "\\'", "%" => "\\%")) . "%";
            $ventas->where("cecos.nombre", "like",  $search);
        }

        if ($request->has("lineas_negocio_id")) {
            $ventas->where("cecos.lineas_negocio_id", "=",  $request->input("lineas_negocio_id"));
        }

        if ($request->has("fecha_inicio")) {
            $ventas->where("ventas.fechaInicial", ">=",  $request->input("fecha_inicio"))
                ->where("ventas.fechaInicial", '<=', $request->input("fecha_fin"));
        }


        return response()->json($ventas->paginate(5));
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

    public function clienteGrupoCon($cliente, $grupoConcepto)
    {
         //consulta todos los cecos y conceptos de ese cliente y grupoConcept
         $cecos = Ceco::select(
            'cecos.*'
         )
         ->join('clientes','cecos.cliente_id','clientes.id')
         ->where('clientes.nombre','=',$cliente)
         ->where('cecos.activo_finanzas','=',1)
         ->get();

         $conceptos = Concepto::select(
            'conceptos.*'
         )
         ->join('grupo_conceptos','conceptos.grupo_concepto_id','grupo_conceptos.id')
         ->where('grupo_conceptos.nombre','=',$grupoConcepto)
         ->get();

         return [$cecos, $conceptos];
    }

    public function ceco_grupoConcepto($grupoConcepto)
    {
       return Concepto::select(
        'conceptos.*'
     )
     ->join('grupo_conceptos','conceptos.grupo_concepto_id','grupo_conceptos.id')
     ->where('grupo_conceptos.nombre','=',$grupoConcepto)
     ->get();
    }

    public function cliente_concepto($cliente)
    {
       return Ceco::select(
            'cecos.*'
         )
         ->join('clientes','cecos.cliente_id','clientes.id')
         ->where('clientes.nombre','=',$cliente)
         ->where('cecos.activo_finanzas','=',1)
         ->get();
    }

    public function solicitudes_gastos($ceco, $concepto)
    {
        
     return  SoliMovimiento::select(
            'soli_movimientos.*',
             DB::raw("SUM(productos.cantidad) as cantidad"),
        )
        ->with('productos')
        ->join('ceco_conceptos','soli_movimientos.ceco_concepto_id','ceco_conceptos.id')
        ->join('cecos', 'ceco_conceptos.ceco_id','cecos.id')
        ->join('conceptos','ceco_conceptos.concepto_id', 'conceptos.id')
        ->join('productos','productos.soli_movimiento_id','soli_movimientos.id')
        ->where('cecos.nombre','=', $ceco)
        ->where('conceptos.nombre','=',$concepto)
        ->groupBy('soli_movimientos.id')
        ->get();
    }

    public function consulta_comportamiento($ejex, $ejey)
    {
      return SoliMovimiento::select(
         'soli_movimientos.*',
         DB::raw("SUM(productos.cantidad) as cantidad"),
         'tipo_movimientos.nombre as tipo_movimiento'
      )
      ->join('tipo_movimientos','soli_movimientos.tipo_movimiento_id','tipo_movimientos.id')
      ->join('ceco_conceptos','soli_movimientos.ceco_concepto_id','ceco_conceptos.id')
      ->join('cecos','ceco_conceptos.ceco_id','cecos.id')
      ->join('clientes', 'cecos.cliente_id','clientes.id')
      ->join('conceptos','ceco_conceptos.concepto_id','conceptos.id')
      ->join('grupo_conceptos','conceptos.grupo_concepto_id','grupo_conceptos.id')
      ->join('productos','productos.soli_movimiento_id','soli_movimientos.id')
      ->where(function ($query) use ($ejey) //evaluamos el ejex si es cliente o ceco
       {
           $query->where('clientes.nombre','=',$ejey)
           ->orWhere('cecos.nombre','=',$ejey);
       })
       ->where(function ($query) use ($ejex) //evaluamos el ejex si es grupoConcepto o concepto
       {
           $query->where('grupo_conceptos.nombre','=',$ejex)
           ->orWhere('conceptos.nombre','=',$ejex);
       })
       ->groupBy('soli_movimientos.id')
       ->orderBy('soli_movimientos.created_at', 'ASC')
      ->get();
    }
}
