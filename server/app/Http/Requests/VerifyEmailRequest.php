<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class VerifyEmailRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'token' => ['required', 'string'],
        ];
    }

    public function messages(): array
    {
        return [
            'token.required' => 'Verification token is required.',
            'token.string' => 'Verification token must be a string.',
        ];
    }

    public function attributes(): array
    {
        return [
            'token' => 'verification token',
        ];
    }
}