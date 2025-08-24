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
            $validated = $this->validateInput($input, new RemoveMemberFromStoreRequest, 'Failed to remove member from store.');

            if (isset($validated['__typename'])) {
                return $validated;
            }

            $storeMember = StoreMember::where('store_id', $validated['storeId'])
                ->where('user_id', $validated['userId'])
                ->first();

            if (! $storeMember) {
                return $this->error('User is not a member of this store.', 'NOT_A_MEMBER');
            }

            $storeMember->delete();

            return $this->success('RemoveMemberFromStorePayload', [], 'Member removed from store successfully.');

        } catch (\Exception $e) {
            return $this->handleException($e, 'Failed to remove member from store.');
        }
    }
}
