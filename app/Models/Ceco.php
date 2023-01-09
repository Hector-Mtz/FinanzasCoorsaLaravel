<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ceco extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'cliente_id',
        'lineas_negocio_id',
        'activo_finanzas'
    ];

    protected $casts = [
        'activo_finanzas' => 'boolean'
    ];
}
