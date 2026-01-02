<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\OpportuniteController;
use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\CategoryController;

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

// Catégories publiques 
Route::get('/categories', [CategoryController::class, 'index']);

Route::middleware(['auth:sanctum'])->group(function () {
    // Authentification
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // Profil
    Route::get('/profile', [ProfileController::class, 'show']);
    Route::put('/profile', [ProfileController::class, 'update']);
    Route::post('/profile/photo', [ProfileController::class, 'uploadPhoto']);

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

// Routes Admin (protégées par middleware admin)
Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    // Statistiques
    Route::get('/stats', [AdminController::class, 'stats']);
    
    // Gestion des utilisateurs
    Route::get('/users', [AdminController::class, 'users']);
    Route::delete('/users/{id}', [AdminController::class, 'deleteUser']);
    
    // Gestion des opportunités
    Route::get('/opportunites', [AdminController::class, 'opportunites']);
    Route::delete('/opportunites/{id}', [AdminController::class, 'deleteOpportunite']);
    
    // Gestion des candidatures
    Route::get('/candidatures', [AdminController::class, 'candidatures']);
    
    // CRUD Catégories (admin only pour création/modification/suppression)
    Route::post('/categories', [CategoryController::class, 'store']);
    Route::put('/categories/{id}', [CategoryController::class, 'update']);
    Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);
});
