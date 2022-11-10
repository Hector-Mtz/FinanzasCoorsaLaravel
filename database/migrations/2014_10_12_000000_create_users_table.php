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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('numero_empleado', 80)->nullable(true)->unique();
            $table->string('name');
            $table->string('apellido_paterno', 40)->nullable(true);
            $table->string('apellido_materno', 40)->nullable(true);
            $table->string('email')->unique();
            $table->date('fecha_nacimiento')->nullable(true);;
            $table->date('fecha_ingreso')->nullable(true);
            $table->date('fecha_ingreso_real')->nullable(true);
            $table->string('nss',20)->nullable(true);
            $table->string('curp', 50)->nullable(true);
            $table->string('rfc', 50)->nullable(true);
            $table->string('contacto_emergencia', 100)->nullable(true);
            $table->string('telefono', 20)->nullable(true);
            $table->string('hijos', 3)->nullable(true);
            $table->string('clave_bancaria', 40)->nullable(true);
            $table->string('numero_cuenta_bancaria', 40)->nullable(true);
            $table->double('salario_diario', 7, 2)->nullable(true);
            $table->double('salario_bruto', 7, 2)->nullable(true);
            $table->double('salario_imss', 7, 2)->nullable(true);
            $table->double('bono_puntualidad', 7, 2)->nullable(true);
            $table->double('bono_asistencia', 7, 2)->nullable(true);
            $table->double('despensa', 7, 2)->nullable(true);
            $table->double('fondo_ahorro', 7, 2)->nullable(true);
            $table->string('alergias', 60)->nullable(true);
            $table->string('enfermedades_cronicas', 60)->nullable(true);
            $table->foreignId('direccion_id')->nullable()->constrained('direcciones');
            $table->foreignId('estado_civil_id')->nullable()->constrained('cat_estados_civiles');
            $table->foreignId('banco_id')->nullable()->constrained('bancos');
            $table->foreignId('escolaridad_id')->nullable()->constrained('escolaridads');
            $table->foreignId('cat_tipos_nomina_id')->nullable()->constrained('cat_tipos_nominas');
            $table->foreignId('tipos_contrato_id')->nullable()->constrained('tipo_contratos');
            $table->foreignId('cat_genero_id')->nullable()->constrained('cat_generos');
            $table->foreignId('cat_tipo_sangre_id')->nullable()->constrained('cat_tipo_sangres');
            $table->boolean('activo')->default(1);
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->foreignId('current_team_id')->nullable();
            $table->string('profile_photo_path', 2048)->nullable();
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
        Schema::dropIfExists('users');
    }
};
