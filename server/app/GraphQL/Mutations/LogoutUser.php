<?php

namespace App\GraphQL\Mutations;

use App\GraphQL\Support\BaseMutation;
use Illuminate\Support\Facades\Auth;

final class LogoutUser extends BaseMutation
{
    public function __invoke($_, array $args): array
    {
        try {
            $user = Auth::user();

            if (! $user) {
                return $this->error(__('auth.not_authenticated'), 'NOT_AUTHENTICATED');
            }

            // Delete all tokens for this user (both access and refresh tokens)
            $user->tokens()->delete();

            return $this->success('LogoutUserPayload', [], __('auth.logout.success'));

        } catch (\Exception $e) {
            return $this->handleException($e, __('auth.logout.error'));
        }
    }
}
