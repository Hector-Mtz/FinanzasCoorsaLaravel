<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Laravel\Jetstream\HasProfilePhoto;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens;
    use HasFactory;
    use HasProfilePhoto;
    use Notifiable;
    use TwoFactorAuthenticatable;

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'banco_id',

    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
        'two_factor_recovery_codes',
        'two_factor_secret',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'profile_photo_url',
        'is_admin',
    ];

    public function getIsAdminAttribute()
    {
        return $this->role_id === 1; // admin
    }

    public function role()
    {
        return $this->belongsTo(role::class, 'role_id');
    }

    /**
     * Determina si puede authenticarse
     */
    public function canAccess()
    {
        $can = true;
        if (!$this->is_admin) {
            if ($this->role === null) {
                return false;
            }
            return  $this->role->permissions()->where('permissions.plataforma_id', '=', 1)
                ->where('permissions.is_acceso', 1)->exists();
        }

        return $can;
    }

    public function getCansAttribute()
    {
        $cans = array();
        if ($this->is_admin) {
            $permissions = Permission::select('id', 'nombre')
                ->where('plataforma_id', '=', 1)->get();
        } else {
            if ($this->role === null) {
                return $cans;
            }
            $permissions = $this->role->permissions()
                ->where('plataforma_id', '=', 1)->get();
        }
        foreach ($permissions as $permission) {
            $cans[$permission->nombre] =   $this->can($permission->nombre);
        }
        return $cans;
    }

    public function hasPermission(Int $idPermission)
    {
        return $this->role->permissions()->where('permissions.id', $idPermission)->exists();
    }
}
