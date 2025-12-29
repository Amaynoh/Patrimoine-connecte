<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Opportunite;
use App\Http\Requests\Opportunite\StoreOpportuniteRequest;
use App\Http\Requests\Opportunite\UpdateOpportuniteRequest;
use App\Events\OpportuniteCreee;

class OpportuniteController extends Controller
{
   
    public function index(Request $request)
    {
        $query = Opportunite::with('user:id,name,role');
        if ($request->has('contract_type')) {
            $query->where('contract_type', $request->contract_type);
        }
        if ($request->has('location')) {
            $query->where('location', 'like', '%' . $request->location . '%');
        }

        $opportunites = $query->latest()->get();

        return response()->json($opportunites);
    }

    public function store(StoreOpportuniteRequest $request)
    {
        $this->authorize('create', Opportunite::class);

        $opportunite = $request->user()->opportunites()->create([
            'title' => $request->title,
            'description' => $request->description,
            'type' => $request->type,
            'location' => $request->location,
            'missions' => $request->missions,
            'competences' => $request->competences,
            'budget' => $request->budget,
            'deadline' => $request->deadline,
        ]);

        $opportunite->load('user:id,name,role');
        event(new OpportuniteCreee($opportunite));

        return response()->json([
            'opportunite' => $opportunite,
            'message' => 'Opportunité créée avec succès'
        ], 201);
    }

    public function show($id)
    {
        $opportunite = Opportunite::with('user:id,name,role,city,phone')->findOrFail($id);

        return response()->json($opportunite);
    }

    public function update(UpdateOpportuniteRequest $request, Opportunite $opportunite)
    {
        $this->authorize('update', $opportunite);

        $opportunite->update($request->only(['title', 'description', 'type', 'contract_type', 'location', 'missions', 'competences', 'budget', 'deadline']));

        $opportunite->load('user:id,name,role');

        return response()->json([
            'opportunite' => $opportunite,
            'message' => 'Opportunité mise à jour avec succès'
        ]);
    }

    public function destroy(Opportunite $opportunite)
    {
        $this->authorize('delete', $opportunite);

        $opportunite->delete();

        return response()->json([
            'message' => 'Opportunité supprimée avec succès'
        ]);
    }

    public function myOpportunities(Request $request)
    {
        $opportunites = $request->user()
            ->opportunites()
            ->with('user:id,name,role')
            ->latest()
            ->get();

        return response()->json($opportunites);
    }
}
