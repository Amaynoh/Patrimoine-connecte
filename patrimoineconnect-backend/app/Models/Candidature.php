<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Candidature extends Model
{
    use HasFactory;

    protected $fillable = ['opportunite_id', 'user_id', 'message', 'status'];

    public function opportunite()
    {
        return $this->belongsTo(Opportunite::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
