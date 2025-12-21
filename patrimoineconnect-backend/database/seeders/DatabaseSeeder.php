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
        $this->call([
            ProjetSeeder::class,
            EtapeSeeder::class,
        ]);

        \App\Models\User::factory(15)->create();

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
