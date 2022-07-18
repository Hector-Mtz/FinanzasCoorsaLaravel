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
        Schema::create('ceco_conceptos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ceco_id')->constrained('cecos');
            $table->foreignId('concepto_id')->constrained('conceptos');
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
        Schema::dropIfExists('ceco_conceptos');
    }
};
