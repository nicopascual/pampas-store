<?php

namespace App\GraphQL\Mutations;

use App\GraphQL\Support\BaseMutation;
use App\Http\Requests\ResetPasswordRequest;
use App\Services\PasswordResetTokenService;
use Illuminate\Support\Facades\Hash;

final class ResetPassword extends BaseMutation
{
    public function __construct(
        private PasswordResetTokenService $tokenService
    ) {}

    public function __invoke($_, array $args): array
    {
        try {
            $input = $args['input'] ?? $args;
            $validated = $this->validateInput($input, new ResetPasswordRequest, __('auth.password_reset.reset_error'));

            if (isset($validated['__typename'])) {
                return $validated;
            }

            // Validate and get user from token
            $user = $this->tokenService->getUserFromToken($validated['token']);

            if (!$user) {
                return $this->error(__('auth.password_reset.invalid_token'), 'INVALID_TOKEN');
            }

            // Check if token is expired
            if ($this->tokenService->isTokenExpired($validated['token'])) {
                return $this->error(__('auth.password_reset.token_expired'), 'TOKEN_EXPIRED');
            }

            // Update user's password
            $user->password = Hash::make($validated['newPassword']);
            $user->save();

            // Revoke all existing access tokens for security
            $user->tokens()->delete();

            return $this->success('ResetPasswordPayload', [
                'user' => $user,
            ], __('auth.password_reset.reset_success'));

        } catch (\Exception $e) {
            return $this->handleException($e, __('auth.password_reset.reset_error'));
        }
    }
}