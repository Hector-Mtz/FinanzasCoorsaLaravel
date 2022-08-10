<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Venta extends Model
{
    use HasFactory;


    protected $fillable = [
        'monto_id',
        'nombre',
        'cantidad',
        'iva',
        'fechaInicial',
        'fechaFinal',
        'periodos',
        'tipo_id',
        'status_id',
        'ceco_id',
    ];

    protected $casts = [
        'iva' => 'boolean'
    ];

    public function ceco()
    {
        return $this->belongsTo(Ceco::class, 'ceco_id');
    }
}
