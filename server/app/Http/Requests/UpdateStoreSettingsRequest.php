<?php

namespace App\Http\Requests;

use App\Enums\StorePlan;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateStoreSettingsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        // Get current store from service container (set by tenant middleware)
        $currentStore = app('currentStore', null);
        $currentStoreId = $currentStore ? $currentStore->id : null;

        return [
            'name' => ['sometimes', 'string', 'max:255'],
            'domain' => ['sometimes', 'nullable', 'string', 'max:255', Rule::unique('stores', 'domain')->ignore($currentStoreId)],
            'plan' => ['sometimes', Rule::enum(StorePlan::class)],
        ];
    }

    public function attributes(): array
    {
        return [
            'name' => 'store name',
            'domain' => 'domain',
            'plan' => 'store plan',
        ];
    }

    public function messages(): array
    {
        return [
            'name.max' => 'The store name must not exceed 255 characters.',
            'domain.unique' => 'This domain is already taken.',
            'domain.max' => 'The domain must not exceed 255 characters.',
            'plan.enum' => 'The selected plan is invalid.',
        ];
    }
}
