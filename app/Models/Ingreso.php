<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ingreso extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'cantidad',
        'banco_id',
        'status_id',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'cantidad' => 'float',
    ];


    public function facturas()
    {
        return $this->hasMany(Factura::class, 'ingreso_id', 'id');
    }
}
