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
        $types = ['emploi', 'projet', 'collaboration'];
        $locations = ['Rabat', 'Casablanca', 'Fès', 'Marrakech', 'Tanger', 'Meknès', 'Essaouira'];
        
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
            'description' => fake()->paragraph(3),
            'type' => fake()->randomElement($types),
            'location' => fake()->randomElement($locations),
        ];
    }
}
