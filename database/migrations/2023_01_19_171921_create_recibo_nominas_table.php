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
        Schema::create('recibo_nominas', function (Blueprint $table) {
            $table->id();
            $table->date('fecha');
            $table->foreignId('empleado_id')->constrained('users');
            $table->foreignId('tipo_nomina_id')->constrained('tipo_nominas');
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
        Schema::dropIfExists('recibo_nominas');
    }
};
