<?php

namespace App\Listeners;

use App\Events\OpportuniteCreee;
use App\Jobs\LogNouvelleOpportunite;

/**
 * Listener qui écoute l'événement OpportuniteCreee.
 * 
 * EXPLICATION SIMPLE :
 * - Un Listener, c'est comme une "oreille" qui écoute une annonce (Event).
 * - Quand l'annonce "OpportuniteCreee" est faite, ce Listener réagit.
 * - Ici, il lance un Job pour traiter l'action (simuler l'envoi d'email).
 */
class EnvoyerNotificationAdmin
{
    /**
     * Méthode appelée automatiquement quand l'événement est déclenché.
     * 
     * @param OpportuniteCreee $event L'événement reçu avec l'opportunité
     */
    public function handle(OpportuniteCreee $event): void
    {
        // On dispatch un Job pour traiter l'action de manière asynchrone
        // Pour l'instant, le Job va juste écrire dans les logs
        LogNouvelleOpportunite::dispatch($event->opportunite);
    }
}
