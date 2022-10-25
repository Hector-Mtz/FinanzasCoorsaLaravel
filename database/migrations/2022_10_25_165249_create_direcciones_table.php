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
        Schema::create('direcciones', function (Blueprint $table) {
            $table->id();
            $table->foreignId('direccion_localidade_id')->constrained('direccion_localidades');
            $table->string('calle', 255)->nullable(false);
            $table->string('numero', 100)->nullable(false);
            $table->string('colonia', 100)->nullable(false);
            $table->string('codigo_postal', 15)->nullable(false);
            $table->string('lote', 255)->nullable(true);
            $table->string('manzana', 255)->nullable(true);
            $table->timestamps();
            $table->boolean('activo')->default(1)->nullable(false);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('direcciones');
    }
};
