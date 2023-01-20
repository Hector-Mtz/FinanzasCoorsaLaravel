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
        Schema::create('evidencias_activos', function (Blueprint $table) {
            $table->id();       
            $table->string('nombre');
            $table->string('imagen');
            $table->foreignId('tipo_evidencia_id')->constrained('tipo_evidencias');
            $table->foreignId('user_id')->constrained('users');
            $table->foreignId('activo_id')->constrained('activos_items');
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
        Schema::dropIfExists('evidencias_activos');
    }
};
