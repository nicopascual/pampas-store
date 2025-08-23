<?php

namespace App\GraphQL\Mutations;

use App\GraphQL\Support\BaseMutation;
use App\Http\Requests\RequestPasswordResetRequest;
use App\Models\User;
use App\Services\PasswordResetTokenService;
use Illuminate\Support\Facades\Log;

final class RequestPasswordReset extends BaseMutation
{
    public function __construct(
        private PasswordResetTokenService $tokenService
    ) {}

    public function __invoke($_, array $args): array
    {
        try {
            $input = $args['input'] ?? $args;
            $validated = $this->validateInput($input, new RequestPasswordResetRequest, __('auth.password_reset.request_error'));

            if (isset($validated['__typename'])) {
                return $validated;
            }

            // Find user by email
            $user = User::where('email', $validated['email'])->first();

            // Always return success to prevent email enumeration attacks
            // But only actually create token if user exists
            if ($user) {
                // Generate a signed JWT token
                $token = $this->tokenService->generateToken($user);

                // TODO: In a real application, send the token via email
                // For now, we'll log it for testing purposes
                Log::info('Password reset token generated', [
                    'email' => $user->email,
                    'token' => $token, // In production, don't log the actual token
                ]);

                // TODO: Send email notification to user
                // Mail::to($user)->send(new PasswordResetMail($token));
            }

            // Always return success message to prevent user enumeration
            return $this->success('RequestPasswordResetPayload', [
            ], __('auth.password_reset.request_success'));

        } catch (\Exception $e) {
            return $this->handleException($e, __('auth.password_reset.request_error'));
        }
    }
}