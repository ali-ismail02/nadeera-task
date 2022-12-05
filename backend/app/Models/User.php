<?php

namespace App\Models;

use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Models\Todo;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;
    protected $table = 'users';

    protected $fillable = [
        'name',
        'email',
        'date_of_birth',
        'image',
    ];

    public function todos(){
        return $this->hasMany(Todo::class);
    }
    
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}