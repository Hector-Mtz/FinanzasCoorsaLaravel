<?php

namespace App\Http\Controllers;

use App\Exports\ExampleExport;
use App\Imports\PresupuestoImport;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class DiagramController extends Controller
{
    //
    public function index()
    {
        return Inertia::render(
            'Diagrams/DiagramsIndex',
            [
               
            ]
        );
    }

    public function getExample()
    {
        return Excel::download(new ExampleExport, 'ejemplo.xlsx');
    }

    public function importPresupuesto (Request $request)
    {
        $request->validate([
            'file' => ['required'],
        ]);

        Excel::import(new PresupuestoImport, $request['file']);
        return redirect()->back();
    }
}
