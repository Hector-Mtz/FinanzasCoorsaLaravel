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
        Schema::create('cecos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 60)->unique();
            $table->foreignId('cliente_id')->constrained('clientes');
            $table->boolean('bandera')->nullable();
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
        Schema::dropIfExists('cecos');
    }
};
