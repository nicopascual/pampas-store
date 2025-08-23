<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RefreshTokenRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'refreshToken' => ['required', 'string'],
        ];
    }

    public function messages(): array
    {
        return [
            'refreshToken.required' => __('validation.required', ['attribute' => 'refresh token']),
            'refreshToken.string' => __('validation.string', ['attribute' => 'refresh token']),
        ];
    }
}
