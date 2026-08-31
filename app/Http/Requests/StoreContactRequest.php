<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreContactRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // formulaire public, pas d'authentification requise
    }

    public function rules(): array
    {
        return [
            'nom' => ['required', 'string', 'max:150'],
            'email' => ['nullable', 'email', 'max:150'],
            'telephone' => ['required', 'string', 'max:30'],
            'sujet' => ['nullable', 'string', 'max:150'],
            'message' => ['required', 'string', 'max:2000'],
        ];
    }

    public function messages(): array
    {
        return [
            'nom.required' => 'Veuillez indiquer votre nom.',
            'telephone.required' => 'Veuillez indiquer un numéro de téléphone.',
            'message.required' => 'Le message ne peut pas être vide.',
            'email.email' => 'L\'adresse email n\'est pas valide.',
        ];
    }
}