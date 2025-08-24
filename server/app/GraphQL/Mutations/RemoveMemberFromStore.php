<?php

namespace App\GraphQL\Mutations;

use App\GraphQL\Support\BaseMutation;
use App\Http\Requests\RemoveMemberFromStoreRequest;
use App\Models\StoreMember;

final class RemoveMemberFromStore extends BaseMutation
{
    public function __invoke($_, array $args): array
    {
        try {
            $input = $args['input'] ?? $args;
            $validated = $this->validateInput($input, new RemoveMemberFromStoreRequest, __('store.member_remove_error'));

            if (isset($validated['__typename'])) {
                return $validated;
            }

            $storeMember = StoreMember::where('store_id', $validated['storeId'])
                ->where('user_id', $validated['userId'])
                ->first();

            if (! $storeMember) {
                return $this->error(__('store.member_not_found'), 'NOT_A_MEMBER');
            }

            $storeMember->delete();

            return $this->success('RemoveMemberFromStorePayload', [], __('store.member_remove_success'));

        } catch (\Exception $e) {
            return $this->handleException($e, __('store.member_remove_error'));
        }
    }
}
