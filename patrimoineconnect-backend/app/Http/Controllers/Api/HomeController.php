<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Projet;
use App\Models\Etape;

class HomeController extends Controller
{
    /**
     * Récupérer tous les projets en cours depuis la base de données
     * 
     * Endpoint : GET /api/projets
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function projets()
    {
        $projets = Projet::all();
        return response()->json($projets);
    }

    /**
     * Récupérer toutes les étapes depuis la base de données
     * 
     * Endpoint : GET /api/etapes
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function etapes()
    {
        $etapes = Etape::all();
        return response()->json($etapes);
    }
}
