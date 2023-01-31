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
        Schema::table('activos_items', function (Blueprint $table) {
            //
            $table->unsignedBigInteger('status_activo_id')->nullable()->before('status');
            $table->foreign('status_activo_id')->references('id')->on('status_activo_items');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('activos_items', function (Blueprint $table) {
            //
            Schema::table('tipo_activo_campos', function (Blueprint $table) {
                //
                $table->dropForeign('status_activo_id');
                $table->dropColumn('status_activo_id');
            });
        });
    }
};
