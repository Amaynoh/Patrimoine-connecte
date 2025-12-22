<?php

namespace Database\Seeders;

use App\Models\Opportunite;
use App\Models\User;
use Illuminate\Database\Seeder;

class OpportuniteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Assurons-nous qu'il y a un utilisateur
        $user = User::first() ?? User::factory()->create();

        $opportunites = [
            [
                'title' => 'Assistant Senior - Projets Administratifs',
                'organization' => 'Maroc Telecom',
                'contract_type' => 'Stage (PFE)',
                'location' => 'Casablanca',
                'description' => 'Nous recherchons un(e) assistant(e) senior pour nous aider dans la gestion de nos projets administratifs...',
                'status' => 'Active',
            ],
            [
                'title' => 'Conception Bouquet Étudiants - Offres',
                'organization' => 'Inwi',
                'contract_type' => 'Stage',
                'location' => 'Rabat',
                'description' => 'Participez à la conception de nouvelles offres destinées aux étudiants...',
                'status' => 'Active',
            ],
            [
                'title' => 'Partenariat Rénovation Médina de Fès',
                'organization' => 'Agence Urbaine',
                'contract_type' => 'Bénévolat',
                'location' => 'Fès',
                'description' => 'Un projet passionnant de rénovation du patrimoine historique de la médina...',
                'status' => 'Active',
            ],
            [
                'title' => 'Stage Architecture d\'Intérieur',
                'organization' => 'Arch Group',
                'contract_type' => 'Stage',
                'location' => 'Marrakech',
                'description' => 'Assistez nos architectes dans des projets résidentiels haut de gamme...',
                'status' => 'Active',
            ],
        ];

        foreach ($opportunites as $opp) {
            Opportunite::create(array_merge($opp, ['user_id' => $user->id]));
        }
    }
}
