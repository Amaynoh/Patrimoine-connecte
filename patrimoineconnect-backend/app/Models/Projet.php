<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Projet extends Model
{
    use HasFactory;

    /**
     * Les champs qui peuvent être remplis via create() ou update()
     * 
     * C'est une protection Laravel appelée "mass assignment protection"
     * On liste ici tous les champs qu'on autorise à modifier
     */
    protected $fillable = [
        'titre',
        'description',
        'image',
        'lieu',
        'statut',
    ];
}
