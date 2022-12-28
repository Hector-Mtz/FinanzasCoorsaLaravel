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
            $table->foreignId('ubicacione_id')->nullable()->after('cliente_id')->constrained();
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
            $table->dropConstrainedForeignId('ubicacione_id');
        });
    }
};
