<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Opportunite;
use App\Models\Candidature;
use App\Models\Category;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function stats()
    {
        $stats = [
            'totalUsers' => User::count(),
            'totalOpportunites' => Opportunite::count(),
            'totalCandidatures' => Candidature::count(),
            'totalCategories' => Category::count(),
            'usersByRole' => [
                'artisan' => User::where('role', 'artisan')->count(),
                'architecte' => User::where('role', 'architecte')->count(),
                'entreprise' => User::where('role', 'entreprise')->count(),
                'laureat' => User::where('role', 'laureat')->count(),
                'restaurateur' => User::where('role', 'restaurateur')->count(),
            ],
            'candidaturesParStatus' => [
                'en_attente' => Candidature::where('status', 'en_attente')->count(),
                'acceptee' => Candidature::where('status', 'acceptee')->count(),
                'refusee' => Candidature::where('status', 'refusee')->count(),
            ],
            'recentUsers' => User::latest()->take(5)->get(['id', 'name', 'email', 'role', 'created_at']),
            'recentOpportunites' => Opportunite::with('user:id,name')->latest()->take(5)->get(['id', 'title', 'user_id', 'created_at']),
        ];

        return response()->json($stats);
    }

    public function users(Request $request)
    {
        $query = User::query();

        if ($request->has('role') && $request->role !== 'all') {
            $query->where('role', $request->role);
        }
        if ($request->has('search') && !empty($request->search)) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $users = $query->orderBy('created_at', 'desc')->paginate(15);

        return response()->json($users);
    }

    public function deleteUser($id)
    {
        $user = User::findOrFail($id);

        if ($user->role === 'admin') {
            return response()->json(['message' => 'Impossible de supprimer un admin'], 403);
        }
        $user->opportunites()->delete();

        $user->portfolio()->delete();

        $user->delete();

        return response()->json(['message' => 'Utilisateur supprimé avec succès']);
    }

    public function opportunites(Request $request)
    {
        $query = Opportunite::with(['user:id,name,email', 'category:id,name']);

        if ($request->has('category_id') && $request->category_id) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->has('search') && !empty($request->search)) {
            $query->where('title', 'like', "%{$request->search}%");
        }

        $opportunites = $query->orderBy('created_at', 'desc')->paginate(15);

        return response()->json($opportunites);
    }

    public function deleteOpportunite($id)
    {
        $opportunite = Opportunite::findOrFail($id);

        Candidature::where('opportunite_id', $id)->delete();

        $opportunite->delete();

        return response()->json(['message' => 'Opportunité supprimée avec succès']);
    }

    public function candidatures(Request $request)
    {
        $query = Candidature::with([
            'user:id,name,email,role',
            'opportunite:id,title,user_id',
            'opportunite.user:id,name'
        ]);

        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        $candidatures = $query->orderBy('created_at', 'desc')->paginate(15);

        return response()->json($candidatures);
    }
}
