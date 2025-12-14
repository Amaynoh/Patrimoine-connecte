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
        'description',
        'type',
        'location',
    ];

    /**
     * Get the user that owns the opportunite.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
