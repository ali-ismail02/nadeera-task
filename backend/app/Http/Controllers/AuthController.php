<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Models\User;
use JWTAuth;


class AuthController extends Controller
{
    // Adjusted to login without password and return user data
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

    // check if the email has been used
    public function checkEmail(Request $request){
        if($user = User::where('email', $request->email)->first()){
            return response()->json([
                'status' => 'error',
                'message' => 'Email already exists',
            ], 200);
        }
        return response()->json([
            'status' => 'success',
            'message' => 'Email is available',
        ], 200);
    }
    
}