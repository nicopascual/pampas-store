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
            $validated = $this->validateInput($input, new InviteMemberToStoreRequest, __('store.member_invite_error'));

            if (isset($validated['__typename'])) {
                return $validated;
            }

            // Check if user is already a member of the store
            $existingMember = StoreMember::where('store_id', $validated['storeId'])
                ->where('user_id', $validated['userId'])
                ->first();

            if ($existingMember) {
                return $this->error(__('store.member_already_exists'), 'ALREADY_MEMBER');
            }

            $storeMember = StoreMember::create([
                'store_id' => $validated['storeId'],
                'user_id' => $validated['userId'],
                'role' => $validated['role'],
            ]);

            return $this->success('InviteMemberToStorePayload', [
                'storeMember' => $storeMember->load(['store.owner', 'user']),
            ], __('store.member_invite_success'));

        } catch (\Exception $e) {
            return $this->handleException($e, __('store.member_invite_error'));
        }
    }
}
