<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    /**
     * Afficher le profil de l'utilisateur connecté
     */
    public function show(Request $request)
    {
        return response()->json($request->user());
    }

    /**
     * Modifier le profil de l'utilisateur connecté
     */
    public function update(Request $request)
    {
        $user = $request->user();

        $request->validate([
            'name' => 'sometimes|string|max:255',
            'city' => 'nullable|string|max:255',
            'specialty' => 'nullable|string|max:255',
            'bio' => 'nullable|string',
            'phone' => 'nullable|string|max:20',
        ]);

        $user->update($request->only(['name', 'city', 'specialty', 'bio', 'phone']));

        return response()->json([
            'user' => $user,
            'message' => 'Profil mis à jour avec succès'
        ]);
    }
}
