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
        Schema::create('politics', function (Blueprint $table) {
            $table->id();
            $table->string('namepolitica');
            $table->string('descripcion');
            $table->foreignId('type_politic')->constrained('tipopoliticas');
            $table->foreignId('id_statu')->constrained('status_politicas');
            $table->string('autor');
            $table->string('imagePolitic');
            $table->string('pdf');
            $table->foreignId('empleado_id')->constrained('users');
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
        Schema::dropIfExists('politics');
    }
};
