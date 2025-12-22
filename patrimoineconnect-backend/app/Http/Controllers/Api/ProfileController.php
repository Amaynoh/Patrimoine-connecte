<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Profile\UpdateProfileRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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

        // Mise à jour des champs texte
        $user->update($request->only(['name', 'city', 'specialty', 'bio', 'phone']));

        // Gestion de l'upload de la photo de profil
        if ($request->hasFile('photo')) {
            // Supprimer l'ancienne photo si elle existe
            if ($user->photo && Storage::disk('public')->exists($user->photo)) {
                Storage::disk('public')->delete($user->photo);
            }
            
            // Stocker la nouvelle photo
            $path = $request->file('photo')->store('profiles', 'public');
            $user->photo = $path;
            $user->save();
        }

        return response()->json([
            'user' => $user,
            'message' => 'Profil mis à jour avec succès'
        ]);
    }

    /**
     * Uploader une photo de profil séparément
     */
    public function uploadPhoto(Request $request)
    {
        $request->validate([
            'photo' => 'required|image|mimes:jpeg,png,jpg,gif|max:5120'
        ]);

        $user = $request->user();

        // Supprimer l'ancienne photo
        if ($user->photo && Storage::disk('public')->exists($user->photo)) {
            Storage::disk('public')->delete($user->photo);
        }

        // Stocker la nouvelle photo
        $path = $request->file('photo')->store('profiles', 'public');
        $user->photo = $path;
        $user->save();

        return response()->json([
            'user' => $user,
            'photo_url' => asset('storage/' . $path),
            'message' => 'Photo mise à jour avec succès'
        ]);
    }
}
