<?php

namespace App\GraphQL\Mutations;

use App\Enums\StorePlan;
use App\Enums\StoreStatus;
use App\GraphQL\Support\BaseMutation;
use App\Http\Requests\CreateStoreRequest;
use App\Models\Store;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

final class CreateStore extends BaseMutation
{
    public function __invoke($_, array $args): array
    {
        try {
            $input = $args['input'] ?? $args;
            $validated = $this->validateInput($input, new CreateStoreRequest, __('store.create_error'));

            if (isset($validated['__typename'])) {
                return $validated;
            }

            // Auto-generate slug from name
            $baseSlug = Str::slug($validated['name']);
            $slug = $baseSlug;
            $counter = 1;

            // Ensure slug uniqueness
            while (Store::where('slug', $slug)->exists()) {
                $slug = $baseSlug.'-'.$counter;
                $counter++;
            }

            $storeData = [
                'name' => $validated['name'],
                'slug' => $slug,
                'owner_id' => Auth::id(),
                'plan' => StorePlan::Free->value,
                'status' => StoreStatus::Active->value,
            ];

            if (! empty($validated['domain'])) {
                $storeData['domain'] = $validated['domain'];
            }

            $store = Store::create($storeData);

            return $this->success('CreateStorePayload', [
                'store' => $store->load('owner'),
            ], __('store.create_success'));

        } catch (\Exception $e) {
            return $this->handleException($e, __('store.create_error'));
        }
    }
}
