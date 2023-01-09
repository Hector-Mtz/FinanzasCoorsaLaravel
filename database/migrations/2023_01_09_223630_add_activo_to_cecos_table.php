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
        Schema::table('cecos', function (Blueprint $table) {
            $table->boolean('activo_erp')->default(1)->after('ubicacione_id');
            $table->boolean('activo_finanzas')->default(1)->after('activo_erp');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('cecos', function (Blueprint $table) {
            $table->dropColumn('activo_erp');
            $table->dropColumn('activo_finanzas');
        });
    }
};
