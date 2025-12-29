<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

class AuthTest extends TestCase
{
    use RefreshDatabase; 
    
    public function test_un_utilisateur_peut_sinscrire()
    {
        $donnees = [
            'name' => 'Ahmed Test',
            'email' => 'ahmed@test.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'role' => 'artisan'
        ];
        $response = $this->postJson('/api/register', $donnees);
        $response->assertStatus(201);
        $this->assertDatabaseHas('users', [
            'email' => 'ahmed@test.com',
            'name' => 'Ahmed Test'
        ]);
    }
    public function test_un_utilisateur_peut_se_connecter()
    {
        $user = User::factory()->create([
            'email' => 'test@test.com',
            'password' => bcrypt('password123')
        ]);
        $response = $this->postJson('/api/login', [
            'email' => 'test@test.com',
            'password' => 'password123'
        ]);
        $response->assertStatus(200);
        $response->assertJsonStructure(['token']);
    }

    public function test_connexion_echoue_avec_mauvais_mot_de_passe()
    {
        User::factory()->create([
            'email' => 'test@test.com',
            'password' => bcrypt('password123')
        ]);
        $response = $this->postJson('/api/login', [
            'email' => 'test@test.com',
            'password' => 'mauvais_mot_de_passe'
        ]);
        $response->assertStatus(401);
    }
}
