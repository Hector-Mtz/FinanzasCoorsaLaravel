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
        Schema::create('ocs', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 100)->unique();
            $table->float('cantidad', 10, 2);
            $table->foreignId('status_id')->default(1)->constrained('status');
            $table->foreignId('venta_id')->constrained('ventas');
            $table->foreignId('factura_id')->nullable()->constrained('facturas');
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
        Schema::dropIfExists('ocs');
    }
};
