<?php

namespace App\Http\Requests\Opportunite;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Opportunite;

class StoreOpportuniteRequest extends FormRequest
{

    public function authorize(): bool
    {
        return $this->user()->can('create', Opportunite::class);
    }

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

    protected function failedAuthorization(): void
    {
        abort(403, 'Seuls les architectes, entreprises et admins peuvent créer des opportunités');
    }
}
