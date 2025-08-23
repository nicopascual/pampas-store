<?php

namespace App\GraphQL\Mutations;

use App\GraphQL\Support\BaseMutation;
use App\Http\Requests\LoginUserRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

final class LoginUser extends BaseMutation
{
    public function __invoke($_, array $args): array
    {
        try {
            $input = $args['input'] ?? $args;
            $validated = $this->validateInput($input, new LoginUserRequest, __('auth.failed'));

            if (isset($validated['__typename'])) {
                return $validated;
            }

            // Find user by email
            $user = User::where('email', $validated['email'])->first();

            // Check if user exists and password is correct
            if (! $user || ! Hash::check($validated['password'], $user->password)) {
                return $this->error(__('auth.failed'), 'INVALID_CREDENTIALS');
            }

            // Generate Sanctum tokens
            $accessToken = $user->createToken('access-token', expiresAt: now()->addMinutes(15))->plainTextToken;
            $refreshToken = $user->createToken('refresh-token', expiresAt: now()->addDays(7))->plainTextToken;

            return $this->success('LoginUserPayload', [
                'user' => $user,
                'accessToken' => $accessToken,
                'refreshToken' => $refreshToken,
            ], __('auth.login.success'));

        } catch (\Exception $e) {
            return $this->handleException($e, __('auth.login.error'));
        }
    }
}
