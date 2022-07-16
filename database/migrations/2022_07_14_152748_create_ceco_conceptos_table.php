<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ceco_conceptos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ceco_id')->constrained('cecos');
            $table->foreignId('concepto_id')->constrained('conceptos');
            $table->foreignId('tipo_movimiento_id')->constrained('tipo_movimientos');
            $table->foreignId('autorizacion_id')->constrained('autorizacions');
            $table->foreignId('soli_gastos_id')->constrained('soli_gastos');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ceco_conceptos');
    }
};
