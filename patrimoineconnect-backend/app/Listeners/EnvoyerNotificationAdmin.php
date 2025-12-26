<?php

namespace App\Listeners;

use App\Events\OpportuniteCreee;
use App\Jobs\LogNouvelleOpportunite;

class EnvoyerNotificationAdmin
{
    /**
     * Méthode appelée automatiquement quand l'événement est déclenché.
     * 
     * @param OpportuniteCreee $event L'événement reçu avec l'opportunité
     */
    public function handle(OpportuniteCreee $event): void
    {
        LogNouvelleOpportunite::dispatch($event->opportunite);
    }
}
