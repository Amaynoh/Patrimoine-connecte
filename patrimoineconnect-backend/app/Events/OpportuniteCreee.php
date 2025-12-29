<?php

namespace App\Events;

use App\Models\Opportunite;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class OpportuniteCreee
{
    use Dispatchable, SerializesModels;

    public Opportunite $opportunite;

    public function __construct(Opportunite $opportunite)
    {
        $this->opportunite = $opportunite;
    }
}
