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
        Schema::create('finiquitos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('empleado_id')->nullable()->constrained('users');
            $table->double('monto', 7, 2)->nullable(false);
            $table->timestamp('fecha_finiquito')->nullable();
            $table->timestamps();
            $table->boolean('pagado')->default(0)->nullable(false);
            $table->boolean('activo')->default(1)->nullable(false);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('finiquitos');
    }
};
