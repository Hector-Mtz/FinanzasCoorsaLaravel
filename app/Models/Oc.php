<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Oc extends Model
{
    use HasFactory;


    protected $fillable = [
        'nombre',
        'cantidad',
        'status_id',
        'venta_id',
        'factura_id',
        'fecha_alta',
        'documento'
    ];

    public function fechaAlta(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => Carbon::parse($value)->format('d/m/Y')
        );
    }
}
