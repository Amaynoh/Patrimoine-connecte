<?php

/**
 * ============================================================
 * SEEDER : EtapeSeeder
 * ============================================================
 * 
 * Un seeder sert à insérer des données initiales dans la base.
 * 
 * Ce seeder insère 3 étapes qui s'afficheront sur la Home
 * dans la section "Comment ça marche".
 * 
 * Pour exécuter : php artisan db:seed --class=EtapeSeeder
 */

namespace Database\Seeders;

use App\Models\Etape;
use Illuminate\Database\Seeder;

class EtapeSeeder extends Seeder
{
    /**
     * Exécuter le seeder : insérer les données
     */
    public function run(): void
    {
        
        Etape::create([
            'titre' => 'Créez votre profil',
            'description' => "Présentez votre expertise dans l'artisanat traditionnel.",
            'couleur' => 'bg-blue-500',
        ]);

        Etape::create([
            'titre' => 'Trouvez des opportunités',
            'description' => 'Découvrez des projets patrimoniaux près de chez vous.',
            'couleur' => 'bg-orange-500',
        ]);

        Etape::create([
            'titre' => 'Collaborez',
            'description' => 'Échangez avec les propriétaires de projets.',
            'couleur' => 'bg-yellow-500',
        ]);
    }
}
