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
        Schema::table('tipo_activo_campos', function (Blueprint $table) {
            //
            $table->unsignedBigInteger('tabla_id')->nullable()->before('tipo_input_id');
            $table->foreign('tabla_id')->references('id')->on('tipo_activo_campos');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tipo_activo_campos', function (Blueprint $table) {
            //
            $table->dropForeign('tabla_id');
            $table->dropColumn('tabla_id');
        });
    }
};
