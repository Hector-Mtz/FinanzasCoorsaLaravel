<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CatalogosController extends Controller
{
    public function index()
    {
        return Inertia::render('Catalogos/CatalogosIndex');
    }
}
