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
            $table->unsignedBigInteger('tipo_input_id')->nullable()->before('campo');
            $table->foreign('tipo_input_id')->references('id')->on('tipo_inputs');
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
            $table->dropForeign('tipo_input_id');
            $table->dropColumn('tipo_input_id');
        });
    }
};
