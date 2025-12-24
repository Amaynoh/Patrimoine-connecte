<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PortfolioImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PortfolioController extends Controller
{
    /**
     * Récupérer toutes les images du portfolio de l'utilisateur connecté
     */
    public function index(Request $request)
    {
        $images = $request->user()->portfolio()->orderBy('created_at', 'desc')->get();
        
        // Ajouter l'URL complète pour chaque image
        $images->transform(function ($image) {
            $image->url = asset('storage/' . $image->image_path);
            return $image;
        });

        return response()->json($images);
    }

    /**
     * Uploader une nouvelle image au portfolio
     */
    public function store(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:5120',
            'title' => 'nullable|string|max:255'
        ]);

        $user = $request->user();

        // Stocker l'image
        $path = $request->file('image')->store('portfolio/' . $user->id, 'public');

        // Créer l'enregistrement en base
        $portfolioImage = PortfolioImage::create([
            'user_id' => $user->id,
            'image_path' => $path,
            'title' => $request->input('title')
        ]);

        // Ajouter l'URL complète
        $portfolioImage->url = asset('storage/' . $path);

        return response()->json([
            'image' => $portfolioImage,
            'message' => 'Image ajoutée avec succès'
        ], 201);
    }

    /**
     * Supprimer une image du portfolio
     */
    public function destroy(Request $request, $id)
    {
        $user = $request->user();
        
        // Vérifier que l'image appartient à l'utilisateur
        $image = PortfolioImage::where('id', $id)
                               ->where('user_id', $user->id)
                               ->first();

        if (!$image) {
            return response()->json(['message' => 'Image non trouvée'], 404);
        }

        // Supprimer le fichier du storage
        if (Storage::disk('public')->exists($image->image_path)) {
            Storage::disk('public')->delete($image->image_path);
        }

        // Supprimer l'enregistrement
        $image->delete();

        return response()->json(['message' => 'Image supprimée avec succès']);
    }
}
