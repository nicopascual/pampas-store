<?php

namespace App\Services;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Crypt;

class PasswordResetTokenService
{
    /**
     * Generate a JWT-like token for password reset.
     */
    public function generateToken(User $user): string
    {
        $payload = [
            'user_id' => $user->id,
            'email' => $user->email,
            'purpose' => 'password_reset',
            'iat' => now()->timestamp,
            'exp' => now()->addMinutes(config('auth.passwords.users.expire', 60))->timestamp,
        ];

        return Crypt::encryptString(json_encode($payload));
    }

    /**
     * Validate and decode a password reset token.
     */
    public function validateToken(string $token): ?array
    {
        try {
            $decrypted = Crypt::decryptString($token);
            $payload = json_decode($decrypted, true);

            if (!$payload || !$this->isValidPayload($payload)) {
                return null;
            }

            // Check if token has expired
            if (now()->timestamp > $payload['exp']) {
                return null;
            }

            return $payload;
        } catch (\Exception $e) {
            return null;
        }
    }

    /**
     * Get user from token.
     */
    public function getUserFromToken(string $token): ?User
    {
        $payload = $this->validateToken($token);
        
        if (!$payload) {
            return null;
        }

        return User::find($payload['user_id']);
    }

    /**
     * Check if token payload is valid.
     */
    private function isValidPayload(array $payload): bool
    {
        return isset(
            $payload['user_id'],
            $payload['email'],
            $payload['purpose'],
            $payload['iat'],
            $payload['exp']
        ) && $payload['purpose'] === 'password_reset';
    }

    /**
     * Check if token is expired.
     */
    public function isTokenExpired(string $token): bool
    {
        $payload = $this->validateToken($token);
        return !$payload || now()->timestamp > $payload['exp'];
    }
}