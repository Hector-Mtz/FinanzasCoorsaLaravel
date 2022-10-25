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
        Schema::create('bajas_empleados', function (Blueprint $table) {
            $table->foreignId('cat_bajas_empleado_id')->constrained('cat_bajas_empleados');
            $table->foreignId('empleado_id')->constrained('users');
            $table->timestamp('fecha_baja')->nullable();
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
        Schema::dropIfExists('bajas_empleados');
    }
};
