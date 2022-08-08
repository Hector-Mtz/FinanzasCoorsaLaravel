<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GrupoConcepto extends Model
{
    use HasFactory;


    protected $fillable = [
        'nombre'
    ];


    public function conceptos()
    {
        return $this->hasMany(Concepto::class, 'grupo_concepto_id', 'id');
    }
}
