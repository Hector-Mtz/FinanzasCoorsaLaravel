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
        Schema::create('valor_campo_activos', function (Blueprint $table) {
            $table->id();
            $table->string('valor');
            $table->foreignId('tipo_activo_campo_id')->constrained('tipo_activo_campos');
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
        Schema::dropIfExists('valor_campo_activos');
    }
};
