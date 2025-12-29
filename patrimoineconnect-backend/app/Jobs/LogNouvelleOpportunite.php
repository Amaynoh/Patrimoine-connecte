<?php

namespace App\Jobs;

use App\Models\Opportunite;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class LogNouvelleOpportunite implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;


    public Opportunite $opportunite;

    public function __construct(Opportunite $opportunite)
    {
        $this->opportunite = $opportunite;
    }

    public function handle(): void
    {
        Log::info('📧 [NOTIFICATION ADMIN] Nouvelle opportunité créée !', [
            'titre' => $this->opportunite->title,
            'auteur_id' => $this->opportunite->user_id,
            'auteur_nom' => $this->opportunite->user->name ?? 'Inconnu',
            'type' => $this->opportunite->type,
            'lieu' => $this->opportunite->location,
            'date_creation' => $this->opportunite->created_at,
        ]);
    }
}
