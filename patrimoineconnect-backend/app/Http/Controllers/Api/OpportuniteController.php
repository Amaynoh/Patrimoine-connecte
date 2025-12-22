<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Opportunite;
use App\Http\Requests\Opportunite\StoreOpportuniteRequest;
use App\Http\Requests\Opportunite\UpdateOpportuniteRequest;

class OpportuniteController extends Controller
{
    /**
     * Afficher toutes les opportunités avec filtres
     */
    public function index(Request $request)
    {
        $query = Opportunite::with('user:id,name,role');

        // Filtre par contract_type
        if ($request->has('contract_type')) {
            $query->where('contract_type', $request->contract_type);
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
            'missions' => $request->missions,
            'competences' => $request->competences,
            'budget' => $request->budget,
            'deadline' => $request->deadline,
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

        $opportunite->update($request->only(['title', 'description', 'type', 'location', 'missions', 'competences', 'budget', 'deadline']));

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
