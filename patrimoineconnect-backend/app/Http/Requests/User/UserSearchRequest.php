<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class UserSearchRequest extends FormRequest
{
    /**
     * Détermine si l'utilisateur est autorisé à faire cette requête.
     */
    public function authorize(): bool
    {
        // Tout le monde peut voir l'annuaire
        return true;
    }

    /**
     * Règles de validation pour la recherche.
     */
    public function rules(): array
    {
        return [
            'role' => 'nullable|string|in:laureat,artisan,architecte,restaurateur,entreprise',
            'city' => 'nullable|string|max:255',
            'specialty' => 'nullable|string|max:255',
        ];
    }

    /**
     * Messages d'erreur personnalisés.
     */
    public function messages(): array
    {
        return [
            'role.in' => 'Le rôle sélectionné n\'est pas valide.',
        ];
    }
}
