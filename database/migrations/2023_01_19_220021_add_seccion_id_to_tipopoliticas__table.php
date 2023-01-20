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
        Schema::table('tipopoliticas', function (Blueprint $table) {
            //
            $table->unsignedBigInteger('seccion_id')->nullable()->before('color');
            $table->foreign('seccion_id')->references('id')->on('seccion_politicas');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tipopoliticas', function (Blueprint $table) {
            //
            $table->dropForeign('seccion_id');
            $table->dropColumn('seccion_id');
        });
    }
};
