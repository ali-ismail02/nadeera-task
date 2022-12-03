<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Todo;
use Database\Seeders\TodoSeeder;
use JWTAuth;

class UserController extends Controller
{
    public function register(Request $request){
        // Convert the base64 image to a image file and save it
        $img = $request->image;
        $img = str_replace('data:image/jpeg;base64,', '', $img);
        $img = str_replace(' ', '+', $img);
        $data = base64_decode($img);
        $filee = uniqid() . '.jpeg';
        $file = public_path('images')."\\".$filee;
        file_put_contents($file, $data);
        
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'date_of_birth' => $request->date_of_birth,
            'image' => $filee,
        ]);

        // Create 10 todos for the user
        $todoSeeder = new TodoSeeder();
        $todoSeeder->run($user);

        // Create a token for the user
        $token = JWTAuth::fromUser($user);

        return response()->json([
            'status' => 'success',
            'message' => 'User created successfully',
            'data' => $user,
            'token' => $token
        ], 201);
    }

    public function getTodos(Request $request){
        $user = User::where('id', $request->user_id)->first();
        $todos = $user->todos;
        return response()->json([
            'status' => 'success',
            'message' => 'Todos fetched successfully',
            'data' => $todos
        ], 200);
    }
}
