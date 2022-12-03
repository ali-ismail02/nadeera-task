<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use JWTAuth;

class UserController extends Controller
{
    public function register(Request $request){
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->date_of_birth = $request->date_of_birth;
        // Convert the base64 image to a image file and save it
        $img = $request->image;
        $img = str_replace('data:image/jpeg;base64,', '', $img);
        $img = str_replace(' ', '+', $img);
        $data = base64_decode($img);
        $filee = uniqid() . '.jpeg';
        $file = public_path('images')."\\".$filee;
        $user->image = $filee;
        file_put_contents($file, $data);
        
        $user->save();
        // Create a token for the user
        $token = JWTAuth::fromUser($user);

        return response()->json([
            'status' => 'success',
            'message' => 'User created successfully',
            'data' => $user,
            'token' => $token
        ], 201);
    }
}
