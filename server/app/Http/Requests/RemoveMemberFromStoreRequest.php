<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RemoveMemberFromStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'storeId' => ['required', 'exists:stores,id'],
            'userId' => ['required', 'exists:users,id'],
        ];
    }

    public function attributes(): array
    {
        return [
            'storeId' => 'store',
            'userId' => 'user',
        ];
    }

    public function messages(): array
    {
        return [
            'storeId.required' => 'A store ID is required.',
            'storeId.exists' => 'The selected store does not exist.',
            'userId.required' => 'A user ID is required.',
            'userId.exists' => 'The selected user does not exist.',
        ];
    }
}
