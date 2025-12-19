<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\UserSearchRequest;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Afficher l'annuaire des professionnels avec filtres
     */
    public function index(UserSearchRequest $request)
    {
        $query = User::query();

        // Filtre par rôle
        if ($request->has('role')) {
            $query->where('role', $request->role);
        }

        // Filtre par ville
        if ($request->has('city')) {
            $query->where('city', $request->city);
        }

        // Filtre par spécialité
        if ($request->has('specialty')) {
            $query->where('specialty', 'like', '%' . $request->specialty . '%');
        }

        $users = $query->select('id', 'name', 'role', 'city', 'specialty', 'bio')->get();

        return response()->json($users);
    }

    /**
     * Afficher un profil public
     */
    public function show($id)
    {
        $user = User::select('id', 'name', 'role', 'city', 'specialty', 'bio', 'phone')
            ->findOrFail($id);

        return response()->json($user);
    }
}
