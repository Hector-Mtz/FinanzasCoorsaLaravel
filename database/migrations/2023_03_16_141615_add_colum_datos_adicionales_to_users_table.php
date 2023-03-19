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
        Schema::table('users', function (Blueprint $table) {
            //
            $table->string('correo_empresarial')->nullable();
            $table->string('foto_empresarial')->nullable();
            $table->string('telefono_empresarial')->nullable();

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            //
            $table->dropColumn('correo_empresarial');
            $table->dropColumn('foto_empresarial');
            $table->dropColumn('telefono_empresarial');
        });
    }
};
