<?php

namespace App\Http\Requests\Opportunite;

use Illuminate\Foundation\Http\FormRequest;

class UpdateOpportuniteRequest extends FormRequest
{
    public function authorize(): bool
    {
        $opportunite = $this->route('opportunite');
        
        return $opportunite && $opportunite->user_id === $this->user()->id;
    }

    public function rules(): array
    {
        return [
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'type' => 'sometimes|in:emploi,projet,collaboration',
            'contract_type' => 'sometimes|in:CDI,Stage,Stage (PFE),Bénévolat',
            'location' => 'sometimes|string|max:255',
        ];
    }

    public function messages(): array
    {
        return [
            'title.string' => 'Le titre doit être une chaîne de caractères.',
            'title.max' => 'Le titre ne peut pas dépasser 255 caractères.',
            'description.string' => 'La description doit être une chaîne de caractères.',
            'type.in' => 'Le type doit être emploi, projet ou collaboration.',
            'location.string' => 'Le lieu doit être une chaîne de caractères.',
            'location.max' => 'Le lieu ne peut pas dépasser 255 caractères.',
        ];
    }

    public function failedAuthorization()
    {
        abort(403, 'Vous n\'êtes pas autorisé à modifier cette opportunité');
    }
}
