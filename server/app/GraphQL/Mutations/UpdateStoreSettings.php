<?php

namespace App\GraphQL\Mutations;

use App\GraphQL\Support\BaseMutation;
use App\GraphQL\Support\HasCurrentStore;
use App\Http\Requests\UpdateStoreSettingsRequest;
use GraphQL\Type\Definition\ResolveInfo;
use Illuminate\Support\Facades\Auth;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

final class UpdateStoreSettings extends BaseMutation
{
    use HasCurrentStore;

    public function __invoke($root, array $args, GraphQLContext $context, ResolveInfo $resolveInfo): array
    {
        try {
            // Get the current store from context (tenant isolation)
            $store = $this->requireCurrentStore($root, $args, $context, $resolveInfo);

            $input = $args['input'] ?? $args;
            $validated = $this->validateInput($input, new UpdateStoreSettingsRequest, __('store.update_error'));

            if (isset($validated['__typename'])) {
                return $validated;
            }

            // Authorization: only owner or admin can update store settings
            $user = Auth::user();
            if ($store->owner_id !== $user->id && $user->role->value !== 'ADMIN') {
                return $this->error(__('store.unauthorized'), 'UNAUTHORIZED');
            }

            // Update only provided fields
            $updateData = [];
            if (isset($validated['name'])) {
                $updateData['name'] = $validated['name'];
            }
            if (isset($validated['domain'])) {
                $updateData['domain'] = $validated['domain'];
            }
            if (isset($validated['plan'])) {
                $updateData['plan'] = $validated['plan'];
            }

            if (! empty($updateData)) {
                $store->update($updateData);
            }

            return $this->success('UpdateStoreSettingsPayload', [
                'store' => $store->load('owner'),
            ], __('store.update_success'));

        } catch (\Exception $e) {
            return $this->handleException($e, __('store.update_error'));
        }
    }
}
