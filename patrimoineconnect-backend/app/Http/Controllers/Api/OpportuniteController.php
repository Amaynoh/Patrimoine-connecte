<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Opportunite\OpportuniteSearchRequest;
use App\Http\Requests\Opportunite\StoreOpportuniteRequest;
use App\Http\Requests\Opportunite\UpdateOpportuniteRequest;
use App\Models\Opportunite;
use Illuminate\Http\Request;

class OpportuniteController extends Controller
{
    /**
     * Afficher toutes les opportunités avec filtres
     */
    public function index(OpportuniteSearchRequest $request)
    {
        $query = Opportunite::with('user:id,name,role');

        // Filtre par type
        if ($request->has('type')) {
            $query->where('type', $request->type);
        }

        // Filtre par lieu
        if ($request->has('location')) {
            $query->where('location', 'like', '%' . $request->location . '%');
        }

        $opportunites = $query->latest()->get();

        return response()->json($opportunites);
    }

    /**
     * Créer une nouvelle opportunité
     */
    public function store(StoreOpportuniteRequest $request)
    {

        $opportunite = $request->user()->opportunites()->create([
            'title' => $request->title,
            'description' => $request->description,
            'type' => $request->type,
            'location' => $request->location,
        ]);

        $opportunite->load('user:id,name,role');

        return response()->json([
            'opportunite' => $opportunite,
            'message' => 'Opportunité créée avec succès'
        ], 201);
    }

    /**
     * Afficher une opportunité spécifique
     */
    public function show($id)
    {
        $opportunite = Opportunite::with('user:id,name,role,city,phone')->findOrFail($id);

        return response()->json($opportunite);
    }

    /**
     * Modifier une opportunité
     */
    public function update(UpdateOpportuniteRequest $request, Opportunite $opportunite)
    {

        $opportunite->update($request->only(['title', 'description', 'type', 'location']));

        $opportunite->load('user:id,name,role');

        return response()->json([
            'opportunite' => $opportunite,
            'message' => 'Opportunité mise à jour avec succès'
        ]);
    }

    /**
     * Supprimer une opportunité
     */
    public function destroy(Opportunite $opportunite)
    {
        // Vérifier que l'utilisateur est le propriétaire
        if ($opportunite->user_id !== request()->user()->id) {
            return response()->json([
                'message' => 'Vous n\'êtes pas autorisé à supprimer cette opportunité'
            ], 403);
        }

        $opportunite->delete();

        return response()->json([
            'message' => 'Opportunité supprimée avec succès'
        ]);
    }
}
