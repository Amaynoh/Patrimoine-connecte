<?php

namespace App\Jobs;

use App\Models\Opportunite;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

/**
 * Job qui simule l'envoi d'une notification email.
 * 
 * EXPLICATION SIMPLE :
 * - Un Job, c'est une "tâche" à exécuter, potentiellement en arrière-plan.
 * - Ici, on simule l'envoi d'un email en écrivant dans les logs.
 * - Dans un vrai projet, tu remplacerais Log::info() par Mail::send().
 * 
 * POURQUOI ShouldQueue ?
 * - Cela permet d'exécuter le job de manière asynchrone (file d'attente).
 * - Par défaut (driver 'sync'), il s'exécute immédiatement.
 * - En production avec Redis, il serait traité en arrière-plan.
 */
class LogNouvelleOpportunite implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * L'opportunité concernée par la notification.
     */
    public Opportunite $opportunite;

    /**
     * Constructeur : reçoit l'opportunité à notifier.
     */
    public function __construct(Opportunite $opportunite)
    {
        $this->opportunite = $opportunite;
    }

    /**
     * Exécution du Job.
     * C'est ici que tu mettrais le vrai code d'envoi d'email.
     */
    public function handle(): void
    {
        // Pour l'instant, on simule l'email en écrivant dans le fichier de log
        // Tu peux voir les logs dans : storage/logs/laravel.log
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
