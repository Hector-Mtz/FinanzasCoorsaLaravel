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
        Schema::create('direccion_localidades', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 120)->nullable(false);
            $table->string('clave', 10)->nullable(false);
            $table->string('latitud', 40)->nullable(false);
            $table->string('longitud', 40)->nullable(false);
            $table->string('altitud', 40)->nullable(false);
            $table->foreignId('direccion_municipio_id')->constrained('direccion_municipios');
            $table->string('carta', 40)->nullable(false);
            $table->string('ambito', 40)->nullable(true);
            $table->string('poblacion', 40)->nullable(true);
            $table->string('masculino', 40)->nullable(true);
            $table->string('femenino', 40)->nullable(true);
            $table->string('viviendas', 40)->nullable(true);
            $table->string('lat', 40)->nullable(true);
            $table->string('lng', 40)->nullable(true);
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
        Schema::dropIfExists('direccion_localidades');
    }
};
