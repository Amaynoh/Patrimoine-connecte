<?php

namespace App\Http\Requests\Opportunite;

use Illuminate\Foundation\Http\FormRequest;

class OpportuniteSearchRequest extends FormRequest
{
    /**
     * Détermine si l'utilisateur est autorisé à faire cette requête.
     */
    public function authorize(): bool
    {
        // Tout le monde peut voir la liste des opportunités
        return true;
    }

    /**
     * Règles de validation pour la recherche.
     */
    public function rules(): array
    {
        return [
            'type' => 'nullable|string|max:50',
            'location' => 'nullable|string|max:255',
        ];
    }
}
