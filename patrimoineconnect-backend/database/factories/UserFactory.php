<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    protected static ?string $password;

    public function definition(): array
    {
        $nomsMarocains = [
            'Ahmed Bennis', 'Fatima Zahra El Idrissi', 'Youssef Alaoui', 'Khadija Bennani',
            'Omar El Fassi', 'Salma Tazi', 'Mehdi Berrada', 'Leila Chraibi',
            'Rachid El Amrani', 'Nadia Benjelloun', 'Hamza Kettani', 'Sara Lahlou',
            'Khalid Benhaddou', 'Aicha Sqalli', 'Amine Filali', 'Houda Cherkaoui',
            'Yassine El Mansouri', 'Zineb Ouazzani', 'Karim Bekkali', 'Meryem Tounsi'
        ];

        $roles = ['laureat', 'artisan', 'architecte', 'restaurateur', 'entreprise'];
        
        $cities = ['Rabat', 'Casablanca', 'Fès', 'Marrakech', 'Tanger', 'Meknès', 'Essaouira', 'Chefchaouen', 'Tétouan', 'Oujda'];
        
        $specialties = [
            'Zellige traditionnel', 'Sculpture sur bois de cèdre', 'Plâtre sculpté (Gebs)',
            'Fer forgé ornemental', 'Restauration de riads', 'Architecture andalouse',
            'Calligraphie arabe', 'Tadelakt artisanal', 'Menuiserie moucharabieh',
            'Céramique de Fès', 'Dinanderie et cuivre', 'Restoration de médinas',
            'Maçonnerie traditionnelle', 'Décoration intérieure', 'Jardins andalous'
        ];

        $bios = [
            'Maître artisan avec plus de 20 ans d\'expérience dans la restauration du patrimoine marocain.',
            'Spécialiste reconnu dans la préservation des techniques ancestrales de construction.',
            'Passionné par la transmission des savoir-faire traditionnels aux nouvelles générations.',
            'Expert en restauration de monuments historiques classés au patrimoine mondial.',
            'Architecte diplômé de l\'ENA Rabat, spécialisé en architecture traditionnelle.',
            'Artisan héritier d\'une tradition familiale de 4 générations dans le zellige.',
            'Consultant international pour la restauration de sites patrimoniaux au Maroc.',
            'Fondateur d\'une coopérative d\'artisans spécialisés dans le patrimoine.',
            'Lauréat de plusieurs prix nationaux pour la préservation du patrimoine.',
            'Formateur en techniques traditionnelles à l\'Institut National du Patrimoine.'
        ];

        $name = fake()->randomElement($nomsMarocains);
        
        return [
            'name' => $name . ' ' . fake()->randomNumber(2),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'role' => fake()->randomElement($roles),
            'city' => fake()->randomElement($cities),
            'specialty' => fake()->randomElement($specialties),
            'bio' => fake()->randomElement($bios),
            'phone' => '06' . fake()->numerify('########'),
            'photo' => 'https://ui-avatars.com/api/?name=' . urlencode($name) . '&background=random&size=200',
            'remember_token' => Str::random(10),
        ];
    }
    public function architecte(): static
    {
        return $this->state(fn (array $attributes) => [
            'role' => 'architecte',
            'specialty' => fake()->randomElement(['Restauration de médinas', 'Architecture andalouse', 'Restauration de riads']),
        ]);
    }

    public function artisan(): static
    {
        return $this->state(fn (array $attributes) => [
            'role' => 'artisan',
            'specialty' => fake()->randomElement(['Zellige traditionnel', 'Sculpture sur bois de cèdre', 'Plâtre sculpté (Gebs)']),
        ]);
    }
    public function entreprise(): static
    {
        return $this->state(fn (array $attributes) => [
            'role' => 'entreprise',
            'name' => fake()->randomElement(['Patrimoine & Co', 'Artisanat du Maroc', 'Fès Tradition', 'Medina Restore', 'Atlas Heritage']),
        ]);
    }

    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
