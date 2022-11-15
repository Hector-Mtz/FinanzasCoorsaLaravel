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
        Schema::create('direccion_municipios', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 100)->nullable(false);
            $table->foreignId('direccion_estado_id')->constrained('direccion_estados');
            $table->string('clave', 10)->nullable(false);
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
        Schema::dropIfExists('direccion_municipios');
    }
};
