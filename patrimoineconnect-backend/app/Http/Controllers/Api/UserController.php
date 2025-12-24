<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $query = User::query();

        if ($request->has('role') && $request->role) {
            $query->where('role', $request->role);
        }
        if ($request->has('city') && $request->city) {
            $query->where('city', $request->city);
        }

        if ($request->has('specialty') && $request->specialty) {
            $query->where('specialty', 'like', '%' . $request->specialty . '%');
        }

        $users = $query->select('id', 'name', 'role', 'city', 'specialty', 'bio', 'photo')
                       ->orderBy('created_at', 'desc')
                       ->get();

        return response()->json($users);
    }

    public function show($id)
    {
        $user = User::with('portfolio')
                    ->select('id', 'name', 'role', 'city', 'specialty', 'bio', 'phone', 'email', 'photo')
                    ->find($id);
        
        if (!$user) {
            return response()->json(['message' => 'Utilisateur non trouvé'], 404);
        }

        return response()->json($user);
    }
}


