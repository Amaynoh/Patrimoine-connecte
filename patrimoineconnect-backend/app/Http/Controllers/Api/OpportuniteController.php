<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Opportunite;
use Illuminate\Http\Request;

class OpportuniteController extends Controller
{
    /**
     * Afficher toutes les opportunités avec filtres
     */
    public function index(Request $request)
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
    public function store(Request $request)
    {
        // Vérifier que l'utilisateur est architecte ou entreprise
        if (!in_array($request->user()->role, ['architecte', 'entreprise'])) {
            return response()->json([
                'message' => 'Seuls les architectes et entreprises peuvent créer des opportunités'
            ], 403);
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'type' => 'required|in:emploi,projet,collaboration',
            'location' => 'required|string|max:255',
        ]);

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
    public function update(Request $request, $id)
    {
        $opportunite = Opportunite::findOrFail($id);

        // Vérifier que l'utilisateur est le propriétaire
        if ($opportunite->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Vous n\'êtes pas autorisé à modifier cette opportunité'
            ], 403);
        }

        $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'type' => 'sometimes|in:emploi,projet,collaboration',
            'location' => 'sometimes|string|max:255',
        ]);

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
    public function destroy(Request $request, $id)
    {
        $opportunite = Opportunite::findOrFail($id);

        // Vérifier que l'utilisateur est le propriétaire
        if ($opportunite->user_id !== $request->user()->id) {
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
