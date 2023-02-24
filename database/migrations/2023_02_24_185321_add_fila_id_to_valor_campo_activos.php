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
        Schema::table('valor_campo_activos', function (Blueprint $table) {
            //
            $table->unsignedBigInteger('fila_id')->nullable()->before('tipo_activo_campo_id');
            $table->foreign('fila_id')->references('id')->on('filas');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('valor_campo_activos', function (Blueprint $table) {
            //
            $table->dropForeign('fila_id');
            $table->dropColumn('fila_id');
        });
    }
};
