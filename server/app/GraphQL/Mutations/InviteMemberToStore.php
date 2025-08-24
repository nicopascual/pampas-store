<?php

namespace App\GraphQL\Mutations;

use App\GraphQL\Support\BaseMutation;
use App\Http\Requests\InviteMemberToStoreRequest;
use App\Models\StoreMember;

final class InviteMemberToStore extends BaseMutation
{
    public function __invoke($_, array $args): array
    {
        try {
            $input = $args['input'] ?? $args;
            $validated = $this->validateInput($input, new InviteMemberToStoreRequest, 'Failed to invite member to store.');

            if (isset($validated['__typename'])) {
                return $validated;
            }

            // Check if user is already a member of the store
            $existingMember = StoreMember::where('store_id', $validated['storeId'])
                ->where('user_id', $validated['userId'])
                ->first();

            if ($existingMember) {
                return $this->error('User is already a member of this store.', 'ALREADY_MEMBER');
            }

            $storeMember = StoreMember::create([
                'store_id' => $validated['storeId'],
                'user_id' => $validated['userId'],
                'role' => $validated['role'],
            ]);

            return $this->success('InviteMemberToStorePayload', [
                'storeMember' => $storeMember->load(['store.owner', 'user']),
            ], 'Member invited to store successfully.');

        } catch (\Exception $e) {
            return $this->handleException($e, 'Failed to invite member to store.');
        }
    }
}
