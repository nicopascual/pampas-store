<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'unique:stores,slug'],
            'domain' => ['nullable', 'string', 'max:255', 'unique:stores,domain'],
        ];
    }

    public function attributes(): array
    {
        return [
            'name' => 'store name',
            'slug' => 'slug',
            'domain' => 'domain',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'The store name is required.',
            'name.max' => 'The store name must not exceed 255 characters.',
            'slug.required' => 'The slug is required.',
            'slug.unique' => 'This slug is already taken.',
            'slug.max' => 'The slug must not exceed 255 characters.',
            'domain.unique' => 'This domain is already taken.',
            'domain.max' => 'The domain must not exceed 255 characters.',
        ];
    }
}
