<?php

namespace App\Listeners;

use App\Events\OpportuniteCreee;
use App\Mail\NouvelleOpportuniteMail;
use Illuminate\Support\Facades\Mail;

class EnvoyerNotificationAdmin
{

    public function handle(OpportuniteCreee $event): void
    {
        $adminEmail = 'amina.habab@gmail.com';
        
        Mail::to($adminEmail)->send(new NouvelleOpportuniteMail($event->opportunite));
    }
}

