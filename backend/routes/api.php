<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;

Route::group(['prefix' => 'auth'], function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('check-email', [AuthController::class, 'checkEmail']);
});

Route::group(['prefix' => 'user'], function () {
    Route::post('signup', [UserController::class, 'register']);
    Route::group(['middleware' => "jwt"], function () {
        Route::get('todos', [UserController::class, 'getTodos']);
    });
});
