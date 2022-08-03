<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Factura extends Model
{
    use HasFactory;

    protected $fillable = [
        "cantidad",
        "status_id",
        "referencia",
        "fechaDePago",
        "cliente_id",
        "ingreso_id",
    ];


    public function fechaDePago(): Attribute
    {
        return Attribute::make(
            get: fn ($value)  => Carbon::parse($value)->format('d/m/y')
        );
    }

    public function ocs()
    {
        return $this->hasMany(Oc::class, 'factura_id');
    }
}
