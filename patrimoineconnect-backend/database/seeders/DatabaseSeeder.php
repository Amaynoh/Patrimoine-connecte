<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Opportunite;
use App\Models\PortfolioImage;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Admin Patrimoine',
            'email' => 'admin@patrimoine.ma',
            'role' => 'architecte',
            'city' => 'Rabat',
            'specialty' => 'Gestion du patrimoine',
            'bio' => 'Administrateur de la plateforme PatrimoineConnect.',
            'photo' => 'https://ui-avatars.com/api/?name=Admin+Patrimoine&background=1e3a8a&color=fff&size=200',
        ]);
        
        User::factory(5)->architecte()->create();
        User::factory(8)->artisan()->create();
        User::factory(3)->entreprise()->create();
        User::factory(4)->create();
        
        $this->call([
            OpportuniteSeeder::class,
        ]);
        
        $publisheurs = User::whereIn('role', ['architecte', 'entreprise'])->get();
        if ($publisheurs->count() > 0) {
            foreach (range(1, 8) as $index) {
                Opportunite::factory()->create([
                    'user_id' => $publisheurs->random()->id,
                ]);
            }
        }

        $usersWithPortfolio = User::whereIn('role', ['artisan', 'architecte'])->get();
        foreach ($usersWithPortfolio as $user) {
            $nbImages = fake()->numberBetween(2, 5);
            for ($i = 0; $i < $nbImages; $i++) {
                PortfolioImage::factory()->create([
                    'user_id' => $user->id,
                ]);
            }
        }

        echo "\n✅ Base de données peuplée !\n";
        echo "   - 21 utilisateurs avec photos\n";
        echo "   - Portfolio images pour artisans/architectes\n";
        echo "   - Opportunités créées\n\n";
    }
}
