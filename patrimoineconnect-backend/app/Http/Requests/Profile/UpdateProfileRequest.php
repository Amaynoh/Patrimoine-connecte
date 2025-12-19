<?php

namespace App\Http\Requests\Profile;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProfileRequest extends FormRequest
{
    /**
     * Détermine si l'utilisateur est autorisé à faire cette requête.
     */
    public function authorize(): bool
    {
        // L'utilisateur doit être authentifié (géré par le middleware auth:sanctum)
        return true;
    }

    /**
     * Règles de validation pour la mise à jour du profil.
     */
    public function rules(): array
    {
        return [
            'name' => 'sometimes|string|max:255',
            'city' => 'nullable|string|max:255',
            'specialty' => 'nullable|string|max:255',
            'bio' => 'nullable|string',
            'phone' => 'nullable|string|max:20',
        ];
    }

    /**
     * Messages d'erreur personnalisés.
     */
    public function messages(): array
    {
        return [
            'name.string' => 'Le nom doit être une chaîne de caractères.',
            'name.max' => 'Le nom ne peut pas dépasser 255 caractères.',
            'city.string' => 'La ville doit être une chaîne de caractères.',
            'city.max' => 'La ville ne peut pas dépasser 255 caractères.',
            'specialty.string' => 'La spécialité doit être une chaîne de caractères.',
            'specialty.max' => 'La spécialité ne peut pas dépasser 255 caractères.',
            'bio.string' => 'La biographie doit être une chaîne de caractères.',
            'phone.string' => 'Le téléphone doit être une chaîne de caractères.',
            'phone.max' => 'Le téléphone ne peut pas dépasser 20 caractères.',
        ];
    }
}
