<?php

namespace Database\Factories;

use App\Models\PortfolioImage;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class PortfolioImageFactory extends Factory
{
    protected $model = PortfolioImage::class;

    public function definition(): array
    {
        $titles = [
            'Restauration riad Fès',
            'Zellige traditionnel',
            'Plâtre sculpté médina',
            'Porte en bois de cèdre',
            'Fontaine mosaïque',
            'Arc mauresque',
            'Jardin andalou',
            'Moucharabieh artisanal',
            'Tadelakt hammam',
            'Calligraphie murale'
        ];

        $imageId = fake()->numberBetween(100, 500);
        
        return [
            'user_id' => User::factory(),
            'image_path' => "https://picsum.photos/seed/{$imageId}/800/600",
            'title' => fake()->randomElement($titles),
        ];
    }
}
