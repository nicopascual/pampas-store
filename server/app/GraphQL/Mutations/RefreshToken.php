<?php

namespace App\GraphQL\Mutations;

use App\GraphQL\Support\BaseMutation;
use App\Http\Requests\RefreshTokenRequest;
use Laravel\Sanctum\PersonalAccessToken;

final class RefreshToken extends BaseMutation
{
    public function __invoke($_, array $args): array
    {
        try {
            $input = $args['input'] ?? $args;
            $validated = $this->validateInput($input, new RefreshTokenRequest, __('auth.invalid_refresh_token'));

            if (isset($validated['__typename'])) {
                return $validated;
            }

            // Find the refresh token
            $token = PersonalAccessToken::findToken($validated['refreshToken']);

            if (! $token) {
                return $this->error(__('auth.invalid_refresh_token'), 'INVALID_REFRESH_TOKEN');
            }

            // Check if token is expired
            if ($token->expires_at && $token->expires_at->isPast()) {
                return $this->error(__('auth.refresh_token_expired'), 'REFRESH_TOKEN_EXPIRED');
            }

            // Check if this is actually a refresh token (by name)
            if ($token->name !== 'refresh-token') {
                return $this->error(__('auth.invalid_refresh_token'), 'INVALID_REFRESH_TOKEN');
            }

            $user = $token->tokenable;

            if (! $user) {
                return $this->error(__('auth.invalid_refresh_token'), 'INVALID_REFRESH_TOKEN');
            }

            // Generate new access token
            $newAccessToken = $user->createToken('access-token', expiresAt: now()->addMinutes(15))->plainTextToken;

            return $this->success('RefreshTokenPayload', [
                'accessToken' => $newAccessToken,
            ], __('auth.token_refreshed'));

        } catch (\Exception $e) {
            return $this->handleException($e, __('auth.refresh_token_error'));
        }
    }
}
