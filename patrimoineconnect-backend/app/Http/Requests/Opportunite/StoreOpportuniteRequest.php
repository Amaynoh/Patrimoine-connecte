<?php

namespace App\Http\Requests\Opportunite;

use Illuminate\Foundation\Http\FormRequest;

class StoreOpportuniteRequest extends FormRequest
{
    /**
     * Détermine si l'utilisateur est autorisé à faire cette requête.
     */
    public function authorize(): bool
    {
        // Vérifier que l'utilisateur est architecte ou entreprise
        return in_array($this->user()->role, ['architecte', 'entreprise']);
    }

    /**
     * Règles de validation pour la création d'opportunité.
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'type' => 'required|in:emploi,projet,collaboration',
            'location' => 'required|string|max:255',
            'missions' => 'nullable|array',
            'competences' => 'nullable|array',
            'budget' => 'nullable|string|max:255',
            'deadline' => 'nullable|date',
        ];
    }

    /**
     * Messages d'erreur personnalisés.
     */
    public function messages(): array
    {
        return [
            'title.required' => 'Le titre est obligatoire.',
            'title.max' => 'Le titre ne peut pas dépasser 255 caractères.',
            'description.required' => 'La description est obligatoire.',
            'type.required' => 'Le type est obligatoire.',
            'type.in' => 'Le type doit être emploi, projet ou collaboration.',
            'location.required' => 'Le lieu est obligatoire.',
            'location.max' => 'Le lieu ne peut pas dépasser 255 caractères.',
        ];
    }

    /**
     * Message d'erreur d'autorisation personnalisé.
     */
    public function failedAuthorization()
    {
        abort(403, 'Seuls les architectes et entreprises peuvent créer des opportunités');
    }
}
