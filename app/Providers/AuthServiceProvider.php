<?php

namespace App\Providers;

use App\Models\permission;
use App\Models\User;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Gate::before(
            //NO RETORNAR NADA EN CASO CONTRARIO YA QUE ASUME LOS DEMAS
            function ($user, $abilitys) {
                if ($user->is_admin) {
                    return true;
                }
            }
        );

        try {
            permission::where('plataforma_id', '=', 2)->get(['id', 'nombre'])
                ->map(function ($permission) {
                    Gate::define(
                        $permission->nombre,
                        function (User $user) use ($permission) {
                            return $user->HasPermission($permission->id);
                        }
                    );
                });
        } catch (\Illuminate\Database\QueryException $ex) {
        }
    }
}
