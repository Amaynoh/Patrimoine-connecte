<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\OpportuniteController;
use App\Http\Controllers\Api\HomeController;

use App\Http\Controllers\Api\PortfolioController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Routes publiques
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Données page Home (publiques)
Route::get('/projets', [HomeController::class, 'projets']);
Route::get('/etapes', [HomeController::class, 'etapes']);

// Opportunités publiques
Route::get('/opportunites', [OpportuniteController::class, 'index']);
Route::get('/opportunites/{id}', [OpportuniteController::class, 'show']);

// Annuaire public
Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{id}', [UserController::class, 'show']);

// Routes protégées (nécessitent authentification)
Route::middleware(['auth:sanctum'])->group(function () {
    // Authentification
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    
    // Profil
    Route::get('/profile', [ProfileController::class, 'show']);
    Route::put('/profile', [ProfileController::class, 'update']);
    Route::post('/profile/photo', [ProfileController::class, 'uploadPhoto']);
    
    // Portfolio
    Route::get('/portfolio', [PortfolioController::class, 'index']);
    Route::post('/portfolio', [PortfolioController::class, 'store']);
    Route::delete('/portfolio/{id}', [PortfolioController::class, 'destroy']);
    
    // Opportunités (création, modification, suppression)
    Route::post('/opportunites', [OpportuniteController::class, 'store']);
    Route::put('/opportunites/{opportunite}', [OpportuniteController::class, 'update']);
    Route::delete('/opportunites/{opportunite}', [OpportuniteController::class, 'destroy']);
    
    // Mes opportunités (pour le Dashboard)
    Route::get('/my-opportunities', [OpportuniteController::class, 'myOpportunities']);
});

