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
        Schema::create('calf_rubro_mes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('rubro_id')->constrained('rubros');
            $table->integer('valor');
            $table->integer('mes');
            $table->integer('año');
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
        Schema::dropIfExists('calf_rubro_mes');
    }
};
