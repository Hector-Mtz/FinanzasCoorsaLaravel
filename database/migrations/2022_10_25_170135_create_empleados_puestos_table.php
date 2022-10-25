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
        Schema::create('empleados_puestos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('puesto_id')->constrained('puestos');
            $table->foreignId('departamento_id')->constrained('cecos');
            $table->foreignId('empleado_id')->constrained('users');
            $table->boolean('activo')->default(1)->nullable(false);
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
        Schema::dropIfExists('empleados_puestos');
    }
};
