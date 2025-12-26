<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Profile\UpdateProfileRequest;
use App\Models\PortfolioImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    public function show(Request $request)
    {
        return response()->json($request->user());
    }

    public function update(UpdateProfileRequest $request)
    {
        $user = $request->user();
        $user->update($request->only(['name', 'city', 'specialty', 'bio', 'phone']));
        
        if ($request->hasFile('photo')) {
            if ($user->photo && Storage::disk('public')->exists($user->photo)) {
                Storage::disk('public')->delete($user->photo);
            }
            $path = $request->file('photo')->store('profiles', 'public');
            $user->photo = $path;
            $user->save();
        }

        return response()->json([
            'user' => $user,
            'message' => 'Profil mis à jour avec succès'
        ]);
    }

    public function uploadPhoto(Request $request)
    {
        $request->validate([
            'photo' => 'required|image|mimes:jpeg,png,jpg,gif|max:5120'
        ]);

        $user = $request->user();

        if ($user->photo && Storage::disk('public')->exists($user->photo)) {
            Storage::disk('public')->delete($user->photo);
        }

        $path = $request->file('photo')->store('profiles', 'public');
        $user->photo = $path;
        $user->save();

        return response()->json([
            'user' => $user,
            'photo_url' => asset('storage/' . $path),
            'message' => 'Photo mise à jour avec succès'
        ]);
    }

    public function getPortfolio(Request $request)
    {
        $images = $request->user()->portfolio()->orderBy('created_at', 'desc')->get();
        $images->transform(function ($image) {
            $image->url = str_starts_with($image->image_path, 'http') 
                ? $image->image_path 
                : asset('storage/' . $image->image_path);
            return $image;
        });
        return response()->json($images);
    }

    public function addPortfolioImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:5120',
            'title' => 'nullable|string|max:255'
        ]);

        $user = $request->user();
        $path = $request->file('image')->store('portfolio/' . $user->id, 'public');

        $portfolioImage = PortfolioImage::create([
            'user_id' => $user->id,
            'image_path' => $path,
            'title' => $request->input('title')
        ]);

        $portfolioImage->url = asset('storage/' . $path);

        return response()->json([
            'image' => $portfolioImage,
            'message' => 'Image ajoutée avec succès'
        ], 201);
    }

    public function deletePortfolioImage(Request $request, $id)
    {
        $user = $request->user();
        
        $image = PortfolioImage::where('id', $id)->where('user_id', $user->id)->first();

        if (!$image) {
            return response()->json(['message' => 'Image non trouvée'], 404);
        }

        if (Storage::disk('public')->exists($image->image_path)) {
            Storage::disk('public')->delete($image->image_path);
        }
        
        $image->delete();
        return response()->json(['message' => 'Image supprimée avec succès']);
    }
}
