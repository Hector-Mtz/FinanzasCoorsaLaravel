<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CecoConcepto extends Model
{
    use HasFactory;

    protected $fillable = [
        'concepto_id',
        'ceco_id',
    ];
}
