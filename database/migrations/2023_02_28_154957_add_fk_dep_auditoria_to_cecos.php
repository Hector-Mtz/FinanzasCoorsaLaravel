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
        Schema::table('cecos', function (Blueprint $table) {
            //
            $table->unsignedBigInteger('departamento_auditoria_id')->nullable()->before('nombre');
            $table->foreign('departamento_auditoria_id')->references('id')->on('departamentos_auditorias');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('cecos', function (Blueprint $table) {
            //
            $table->dropForeign('departamento_auditoria_id');
            $table->dropColumn('departamento_auditoria_id');
        });
    }
};
