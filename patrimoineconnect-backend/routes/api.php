<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\OpportuniteController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Routes publiques
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Annuaire public
Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{id}', [UserController::class, 'show']);

// Opportunités publiques
Route::get('/opportunites', [OpportuniteController::class, 'index']);
Route::get('/opportunites/{id}', [OpportuniteController::class, 'show']);

// Routes protégées (nécessitent authentification)
Route::middleware(['auth:sanctum'])->group(function () {
    // Authentification
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    
    // Profil
    Route::get('/profile', [ProfileController::class, 'show']);
    Route::put('/profile', [ProfileController::class, 'update']);
    
    // Opportunités (création, modification, suppression)
    Route::post('/opportunites', [OpportuniteController::class, 'store']);
    Route::put('/opportunites/{id}', [OpportuniteController::class, 'update']);
    Route::delete('/opportunites/{id}', [OpportuniteController::class, 'destroy']);
});
