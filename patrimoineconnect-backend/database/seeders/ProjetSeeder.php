<?php

/**
 * ============================================================
 * SEEDER : ProjetSeeder
 * ============================================================
 * 
 * Un seeder sert à insérer des données initiales dans la base.
 * 
 * Ce seeder insère 3 projets qui s'afficheront sur la Home.
 * 
 * Pour exécuter : php artisan db:seed --class=ProjetSeeder
 */

namespace Database\Seeders;

use App\Models\Projet;
use Illuminate\Database\Seeder;

class ProjetSeeder extends Seeder
{
    /**
     * Exécuter le seeder : insérer les données
     */
    public function run(): void
    {
        
        Projet::create([
            'titre' => 'Restauration Dar El-Makhzen',
            'description' => 'Restauration du palais historique de Fès avec des techniques traditionnelles et des artisans locaux.',
            'image' => 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=400&h=300&fit=crop',
            'lieu' => 'Fès',
            'statut' => 'en_cours',
        ]);

        Projet::create([
            'titre' => 'Rénovation Médina Marrakech',
            'description' => 'Projet de réhabilitation des riads traditionnels dans la médina de Marrakech.',
            'image' => 'https://images.unsplash.com/photo-1577147443647-81856d5150a4?w=400&h=300&fit=crop',
            'lieu' => 'Marrakech',
            'statut' => 'en_cours',
        ]);

        Projet::create([
            'titre' => 'Conservation Kasbah Aït Benhaddou',
            'description' => 'Programme de préservation de ce site classé patrimoine mondial de l\'UNESCO.',
            'image' => 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=400&h=300&fit=crop',
            'lieu' => 'Ouarzazate',
            'statut' => 'en_cours',
        ]);
    }
}
