<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Candidature;
use App\Models\Opportunite;
use Illuminate\Http\Request;

class CandidatureController extends Controller
{
    public function postuler(Request $request)
    {
        $request->validate([
            'opportunite_id' => 'required|exists:opportunites,id',
            'message' => 'nullable|string|max:1000'
        ]);

        $user = $request->user();
        $opportunite = Opportunite::find($request->opportunite_id);
        if ($opportunite->user_id === $user->id) {
            return response()->json(['message' => 'Vous ne pouvez pas postuler à votre propre opportunité'], 403);
        }
        $existe = Candidature::where('opportunite_id', $request->opportunite_id)
                             ->where('user_id', $user->id)
                             ->exists();
        if ($existe) {
            return response()->json(['message' => 'Vous avez déjà postulé à cette opportunité'], 409);
        }

        $candidature = Candidature::create([
            'opportunite_id' => $request->opportunite_id,
            'user_id' => $user->id,
            'message' => $request->message,
            'status' => 'en_attente'
        ]);

        return response()->json([
            'candidature' => $candidature,
            'message' => 'Candidature envoyée avec succès'
        ], 201);
    }

    public function mesCandidatures(Request $request)
    {
        $candidatures = Candidature::where('user_id', $request->user()->id)
            ->with('opportunite')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($candidatures);
    }

    public function candidaturesRecues(Request $request)
    {
        $user = $request->user();
        $opportuniteIds = Opportunite::where('user_id', $user->id)->pluck('id');
        
        $candidatures = Candidature::whereIn('opportunite_id', $opportuniteIds)
            ->with(['opportunite', 'user'])
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($candidatures);
    }
    public function accepter(Request $request, $id)
    {
        $candidature = $this->getCandidatureOwned($request->user(), $id);
        if (!$candidature) {
            return response()->json(['message' => 'Candidature non trouvée'], 404);
        }

        $candidature->update(['status' => 'acceptee']);
        return response()->json(['message' => 'Candidature acceptée', 'candidature' => $candidature]);
    }
    public function refuser(Request $request, $id)
    {
        $candidature = $this->getCandidatureOwned($request->user(), $id);
        if (!$candidature) {
            return response()->json(['message' => 'Candidature non trouvée'], 404);
        }

        $candidature->update(['status' => 'refusee']);
        return response()->json(['message' => 'Candidature refusée', 'candidature' => $candidature]);
    }

    public function annuler(Request $request, $id)
    {
        $candidature = Candidature::where('id', $id)
                                  ->where('user_id', $request->user()->id)
                                  ->first();

        if (!$candidature) {
            return response()->json(['message' => 'Candidature non trouvée'], 404);
        }

        $candidature->delete();
        return response()->json(['message' => 'Candidature annulée']);
    }
  
    private function getCandidatureOwned($user, $candidatureId)
    {
        $opportuniteIds = Opportunite::where('user_id', $user->id)->pluck('id');
        return Candidature::where('id', $candidatureId)
                         ->whereIn('opportunite_id', $opportuniteIds)
                         ->first();
    }
}
