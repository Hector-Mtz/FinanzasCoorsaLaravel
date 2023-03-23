<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Venta extends Model
{
    use HasFactory;

    protected $fillable = [
        'monto_id' ,
        'nombre' ,
        'fechaInicial' ,
        'fechaFinal' ,
        'periodos' ,
        'cantidad',
        'comentario',
        'tipo_id' ,
        'ceco_id',
        'documento'
    ];

    protected $guarded = ['id'];

    protected $casts = [
        'iva' => 'boolean',
        'revisado' => 'boolean',
    ];

    public function ceco()
    {
        return $this->belongsTo(Ceco::class, 'ceco_id');
    }
}
