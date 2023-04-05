<?php

namespace App\Imports;

use App\Models\Ceco;
use App\Models\CecoConcepto;
use App\Models\Concepto;
use App\Models\Producto;
use App\Models\SoliMovimiento;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Spatie\Ignition\Contracts\Solution;

class PresupuestoImport implements ToModel, WithHeadingRow
{
     /**
     * @param array $row
     *
     * @return Ceco|null
     */
    public function model(array $row)
    {
      $ceco = Ceco::select('cecos.*')
      ->where('cecos.nombre','=', $row['ceco'])
      ->get();
       
      $concepto = Concepto::select('conceptos.*')
      ->where('conceptos.nombre','=',$row['concepto'])
      ->get();

     $cecoConcepto = CecoConcepto::updateOrCreate([
        'ceco_id' => $ceco[0]->id,
        'concepto_id' => $concepto[0]->id
      ]);

      $fechaActual = date('Y-m-d');
      $soli_movimiento = SoliMovimiento::updateOrCreate([
        'nombre' => 'S-'.$fechaActual,
        'ceco_concepto_id' => $cecoConcepto->id,
        'tipo_movimiento_id' => 3, //Presupuesto
      ]);

      $productos = Producto::updateOrCreate([
        'nombre' => 'P-'.$fechaActual.'-'.$ceco[0]->nombre.'-'.$concepto[0]->nombre,
        'cantidad' => $row['cantidad'],
        'soli_movimiento_id' => $soli_movimiento->id
      ]);
    }
}
