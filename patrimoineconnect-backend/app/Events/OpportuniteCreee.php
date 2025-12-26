<?php

namespace App\Events;

use App\Models\Opportunite;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

/**
 * Événement déclenché quand une nouvelle opportunité est créée.
 * 
 * EXPLICATION SIMPLE :
 * - Un Event, c'est comme une "annonce" dans ton application.
 * - Quand on crée une opportunité, on "annonce" que ça s'est passé.
 * - D'autres parties du code (Listeners) peuvent écouter cette annonce et réagir.
 */
class OpportuniteCreee
{
    use Dispatchable, SerializesModels;

    /**
     * L'opportunité qui vient d'être créée.
     * On la stocke ici pour que les Listeners puissent y accéder.
     */
    public Opportunite $opportunite;

    /**
     * Constructeur : reçoit l'opportunité créée.
     */
    public function __construct(Opportunite $opportunite)
    {
        $this->opportunite = $opportunite;
    }
}
