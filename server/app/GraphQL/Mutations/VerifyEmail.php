<?php

namespace App\GraphQL\Mutations;

use App\GraphQL\Support\BaseMutation;
use App\Http\Requests\VerifyEmailRequest;
use App\Models\User;
use Illuminate\Support\Facades\URL;
use Carbon\Carbon;

final class VerifyEmail extends BaseMutation
{
    public function __invoke($_, array $args): array
    {
        try {
            $input = $args['input'] ?? $args;
            $validated = $this->validateInput($input, new VerifyEmailRequest, __('auth.verification.invalid_token'));

            if (isset($validated['__typename'])) {
                return $validated;
            }

            // Decode the verification token
            $tokenData = $this->decodeVerificationToken($validated['token']);
            
            if (!$tokenData) {
                return $this->error(__('auth.verification.invalid_token'), 'INVALID_TOKEN');
            }

            // Find the user
            $user = User::find($tokenData['user_id']);

            if (!$user) {
                return $this->error(__('auth.verification.user_not_found'), 'USER_NOT_FOUND');
            }

            // Check if email is already verified
            if ($user->hasVerifiedEmail()) {
                return $this->error(__('auth.verification.already_verified'), 'ALREADY_VERIFIED');
            }

            // Check if token has expired (default: 60 minutes)
            $expiration = config('auth.verification.expire', 60);
            if (Carbon::parse($tokenData['created_at'])->addMinutes($expiration)->isPast()) {
                return $this->error(__('auth.verification.expired'), 'TOKEN_EXPIRED');
            }

            // Verify that the email in the token matches the user's current email
            if ($tokenData['email'] !== $user->email) {
                return $this->error(__('auth.verification.invalid_token'), 'INVALID_TOKEN');
            }

            // Mark email as verified
            $user->markEmailAsVerified();

            return $this->success('VerifyEmailPayload', [
                'user' => $user,
            ], __('auth.verification.success'));

        } catch (\Exception $e) {
            return $this->handleException($e, __('auth.verification.error'));
        }
    }

    private function decodeVerificationToken(string $token): ?array
    {
        try {
            // Decode base64 encoded JSON token
            $decoded = base64_decode($token);
            $data = json_decode($decoded, true);

            if (!$data || !isset($data['user_id'], $data['created_at'], $data['email'])) {
                return null;
            }

            return $data;
        } catch (\Exception $e) {
            return null;
        }
    }
}