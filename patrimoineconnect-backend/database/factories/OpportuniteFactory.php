<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Opportunite>
 */
class OpportuniteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $contractTypes = ['CDI', 'Stage', 'Stage (PFE)', 'Bénévolat'];
        $locations = ['Rabat', 'Casablanca', 'Fès', 'Marrakech', 'Tanger', 'Meknès', 'Essaouira'];
        $organizations = ['Maroc Telecom', 'Inwi', 'Agence Urbaine', 'Arch Group', 'Patrimoine Maroc'];
        
        $titles = [
            'Restauration de Riad historique',
            'Recherche artisan zellige',
            'Projet de rénovation médina',
            'Collaboration restauration mosquée',
            'Emploi restaurateur patrimoine',
            'Artisan bois sculpté recherché',
            'Restauration palais ancien',
            'Projet conservation patrimoine'
        ];

        return [
            'title' => fake()->randomElement($titles),
            'organization' => fake()->randomElement($organizations),
            'description' => fake()->paragraph(3),
            'contract_type' => fake()->randomElement($contractTypes),
            'location' => fake()->randomElement($locations),
            'status' => 'Active',
            'missions' => null,
            'competences' => null,
            'deadline' => fake()->optional()->dateTimeBetween('now', '+1 year'),
            'budget' => fake()->optional()->randomElement(['10 000 MAD', '50 000 MAD', '100 000 MAD', 'Non défini']),
        ];
    }
}
