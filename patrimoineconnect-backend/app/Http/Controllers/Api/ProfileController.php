<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Profile\UpdateProfileRequest;
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
    public function update(UpdateProfileRequest $request)
    {
        $user = $request->user();

        $user->update($request->only(['name', 'city', 'specialty', 'bio', 'phone']));

        return response()->json([
            'user' => $user,
            'message' => 'Profil mis à jour avec succès'
        ]);
    }
}
