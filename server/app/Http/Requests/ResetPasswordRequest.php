<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class ResetPasswordRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'token' => ['required', 'string'],
            'newPassword' => ['required', Password::defaults()],
        ];
    }

    public function messages(): array
    {
        return [
            'token.required' => 'Reset token is required.',
            'token.string' => 'Reset token must be a string.',
            'newPassword.required' => 'New password is required.',
        ];
    }

    public function attributes(): array
    {
        return [
            'token' => 'reset token',
            'newPassword' => 'new password',
        ];
    }
}