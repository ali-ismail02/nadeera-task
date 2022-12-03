<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Models\User;
use JWTAuth;


class AuthController extends Controller
{
    public function login(Request $request)
    {
        $user= User::where('email', $request->email)->first();
        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid Email',
            ], 401);
        }
        $token = JWTAuth::fromUser($user);

        return response()->json([
            'status' => 'success',
            'token' => $token,
            'user' => $user
        ]);
    }
    
}