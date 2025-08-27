<?php

namespace App\GraphQL\Mutations;

use App\Enums\StoreMemberRole;
use App\Enums\StorePlan;
use App\Enums\StoreStatus;
use App\GraphQL\Support\BaseMutation;
use App\Http\Requests\CreateStoreRequest;
use App\Models\Store;
use App\Models\StoreMember;
use Illuminate\Support\Facades\Auth;

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

            $storeData = [
                'name' => $validated['name'],
                'slug' => $validated['slug'],
                'owner_id' => Auth::id(),
                'plan' => StorePlan::Free->value,
                'status' => StoreStatus::Active->value,
            ];

            if (! empty($validated['domain'])) {
                $storeData['domain'] = $validated['domain'];
            }

            $store = Store::create($storeData);

            // Add the owner as a store member with Owner role
            StoreMember::create([
                'store_id' => $store->id,
                'user_id' => Auth::id(),
                'role' => StoreMemberRole::Owner,
            ]);

            return $this->success('CreateStorePayload', [
                'store' => $store->load(['owner', 'members.user']),
            ], __('store.create_success'));

        } catch (\Exception $e) {
            return $this->handleException($e, __('store.create_error'));
        }
    }
}
