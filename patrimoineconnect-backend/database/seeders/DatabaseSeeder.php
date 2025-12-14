<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Créer 15 utilisateurs avec différents rôles
        \App\Models\User::factory(15)->create();

        // Récupérer les architectes et entreprises pour créer des opportunités
        $architectesEtEntreprises = \App\Models\User::whereIn('role', ['architecte', 'entreprise'])->get();

        // Créer 10 opportunités
        if ($architectesEtEntreprises->count() > 0) {
            foreach (range(1, 10) as $index) {
                \App\Models\Opportunite::factory()->create([
                    'user_id' => $architectesEtEntreprises->random()->id,
                ]);
            }
        }
    }
}
