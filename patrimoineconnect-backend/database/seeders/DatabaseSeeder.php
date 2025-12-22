<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    /**
     * Insérer les données initiales dans la base de données
     * 
     * Cette méthode est appelée quand on exécute : php artisan db:seed
     */
    public function run(): void
    {
        // Créer un utilisateur pour rattacher les opportunités
        \App\Models\User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@patrimoine.ma',
            'role' => 'architecte',
        ]);

        $this->call([
            EtapeSeeder::class,
            ProjetSeeder::class,
            OpportuniteSeeder::class,
        ]);
        
        // Autres utilisateurs
        \App\Models\User::factory(10)->create();

        $architectesEtEntreprises = \App\Models\User::whereIn('role', ['architecte', 'entreprise'])->get();
        if ($architectesEtEntreprises->count() > 0) {
            foreach (range(1, 10) as $index) {
                \App\Models\Opportunite::factory()->create([
                    'user_id' => $architectesEtEntreprises->random()->id,
                ]);
            }
        }
    }
}
