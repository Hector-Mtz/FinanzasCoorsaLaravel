<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
    ];

    public function ceco()
    {
        return $this->belongsTo(Ceco::class, 'ceco_id', 'id');
    }

    public function cecos()
    {
        return $this->hasMany(Ceco::class, 'cliente_id', 'id');
    }

    public function ventas()
    {
        return $this->hasManyThrough(Venta::class, Ceco::class);
    }
}
