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
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'date_of_birth' => $request->date_of_birth,
            'image' => $request->image,
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
        $user = User::where('id', $request->user_data->id)->first();
        $todos = $user->todos()->get();
        return response()->json([
            'status' => 'success',
            'message' => 'Todos fetched successfully',
            'data' => $todos
        ], 200);
    }
}
