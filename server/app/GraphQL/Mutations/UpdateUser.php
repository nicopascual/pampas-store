<?php

namespace App\GraphQL\Mutations;

use App\GraphQL\Support\BaseMutation;
use App\Models\User;

final class UpdateUser extends BaseMutation
{
    public function __invoke($_, array $args): array
    {
        try {
            // Example validation (you would create UpdateUserRequest)
            $rules = [
                'id' => ['required', 'exists:users,id'],
                'name' => ['sometimes', 'string', 'max:255'],
                'email' => ['sometimes', 'email', 'unique:users,email,'.($args['id'] ?? '')],
            ];

            $validator = validator($args, $rules);

            if ($validator->fails()) {
                return $this->error(__('Update failed due to validation errors.'), 'VALIDATION_FAILED');
            }

            $user = User::findOrFail($args['id']);
            $user->update($validator->validated());

            return $this->success('UpdateUserPayload', [
                'user' => $user,
            ], __('User updated successfully.'));

        } catch (\Exception $e) {
            return $this->handleException($e, __('An error occurred while updating the user.'));
        }
    }
}
