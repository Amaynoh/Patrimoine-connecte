<?php

namespace App\Providers;

use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;

// Import de notre Event et Listener personnalisés
use App\Events\OpportuniteCreee;
use App\Listeners\EnvoyerNotificationAdmin;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event to listener mappings for the application.
     * 
     * EXPLICATION SIMPLE :
     * - Ce tableau dit à Laravel : "Quand cet Event arrive, appelle ce(s) Listener(s)".
     * - OpportuniteCreee -> EnvoyerNotificationAdmin
     *
     * @var array<class-string, array<int, class-string>>
     */
    protected $listen = [
        // Event Laravel par défaut (inscription utilisateur)
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
        
        // NOTRE EVENT : Quand une opportunité est créée
        OpportuniteCreee::class => [
            EnvoyerNotificationAdmin::class,
        ],
    ];

    /**
     * Register any events for your application.
     */
    public function boot(): void
    {
        //
    }

    /**
     * Determine if events and listeners should be automatically discovered.
     */
    public function shouldDiscoverEvents(): bool
    {
        return false;
    }
}
