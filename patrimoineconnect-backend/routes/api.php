<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\OpportuniteController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Routes publiques
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

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
    
    // Profil
    Route::get('/profile', [ProfileController::class, 'show']);
    Route::put('/profile', [ProfileController::class, 'update']);
    Route::post('/profile/photo', [ProfileController::class, 'uploadPhoto']);
    
    // Portfolio (fait partie du profil)
    Route::get('/profile/portfolio', [ProfileController::class, 'getPortfolio']);
    Route::post('/profile/portfolio', [ProfileController::class, 'addPortfolioImage']);
    Route::delete('/profile/portfolio/{id}', [ProfileController::class, 'deletePortfolioImage']);
    
    // Opportunités (création, modification, suppression)
    Route::post('/opportunites', [OpportuniteController::class, 'store']);
    Route::put('/opportunites/{opportunite}', [OpportuniteController::class, 'update']);
    Route::delete('/opportunites/{opportunite}', [OpportuniteController::class, 'destroy']);
    
    // Mes opportunités (pour le Dashboard)
    Route::get('/my-opportunities', [OpportuniteController::class, 'myOpportunities']);
    
    // Candidatures
    Route::post('/candidatures', [\App\Http\Controllers\Api\CandidatureController::class, 'postuler']);
    Route::get('/candidatures/mes-candidatures', [\App\Http\Controllers\Api\CandidatureController::class, 'mesCandidatures']);
    Route::get('/candidatures/recues', [\App\Http\Controllers\Api\CandidatureController::class, 'candidaturesRecues']);
    Route::put('/candidatures/{id}/accepter', [\App\Http\Controllers\Api\CandidatureController::class, 'accepter']);
    Route::put('/candidatures/{id}/refuser', [\App\Http\Controllers\Api\CandidatureController::class, 'refuser']);
    Route::delete('/candidatures/{id}', [\App\Http\Controllers\Api\CandidatureController::class, 'annuler']);
});
