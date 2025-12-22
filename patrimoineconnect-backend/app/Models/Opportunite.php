<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Opportunite extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'user_id',
        'title',
        'organization',
        'image',
        'description',
        'contract_type',
        'location',
        'status',
        'missions',
        'competences',
        'deadline',
        'budget',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'missions' => 'array',
        'competences' => 'array',
        'deadline' => 'date',
    ];

    /**
     * Get the user that owns the opportunite.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
