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
        Schema::create('ventas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('monto_id')->constrained('montos');
            $table->string('nombre', 100);
            $table->date('fechaInicial');
            $table->date('fechaFinal');
            $table->boolean('iva')->default(0);
            $table->smallInteger('periodos')->default(1);
            $table->smallInteger('cantidad');
            $table->foreignId('tipo_id')->constrained('tipos');
            $table->foreignId('status_id')->default(1)->constrained('status');
            $table->foreignId('ceco_id')->constrained('cecos');
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
        Schema::dropIfExists('ventas');
    }
};
