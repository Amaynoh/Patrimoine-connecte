<?php

namespace App\Mail;

use App\Models\Opportunite;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

/**
 * Email envoyé quand une nouvelle opportunité est créée.
 */
class NouvelleOpportuniteMail extends Mailable
{
    use Queueable, SerializesModels;

    public Opportunite $opportunite;

    public function __construct(Opportunite $opportunite)
    {
        $this->opportunite = $opportunite;
    }

    public function build()
    {
        return $this->subject('Nouvelle opportunité publiée : ' . $this->opportunite->title)
                    ->view('emails.nouvelle-opportunite');
    }
}
