<?php

namespace App\Policies;

use App\Models\Opportunite;
use App\Models\User;


class OpportunitePolicy
{
   
    public function viewAny(?User $user): bool
    {
        return true;
    }

   
    public function view(?User $user, Opportunite $opportunite): bool
    {
        return true; 
    }

    
    public function create(User $user): bool
    {
    
        return in_array($user->role, ['architecte', 'entreprise', 'admin']);
    }


    public function update(User $user, Opportunite $opportunite): bool
    {
        
        return $user->id === $opportunite->user_id || $user->role === 'admin';
    }

    public function delete(User $user, Opportunite $opportunite): bool
    {
        return $user->id === $opportunite->user_id || $user->role === 'admin';
    }
}
