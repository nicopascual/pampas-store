<?php

use App\Models\User;
use App\Services\PasswordResetTokenService;
use Illuminate\Support\Facades\Hash;

it('successfully resets password with valid token', function () {
    $user = User::factory()->create([
        'email' => 'user@example.com',
        'password' => Hash::make('old-password'),
    ]);

    // Generate a JWT token for password reset
    $tokenService = new PasswordResetTokenService();
    $token = $tokenService->generateToken($user);

    $response = $this->postGraphQL([
        'query' => '
            mutation ResetPassword($input: ResetPasswordInput!) {
                resetPassword(input: $input) {
                    __typename
                    ... on ResetPasswordPayload {
                        user {
                            id
                            email
                        }
                        message
                    }
                    ... on MutationError {
                        message
                        code
                    }
                }
            }
        ',
        'variables' => [
            'input' => [
                'token' => $token,
                'newPassword' => 'new-password123',
            ],
        ],
    ]);

    $response->assertJson([
        'data' => [
            'resetPassword' => [
                '__typename' => 'ResetPasswordPayload',
                'user' => [
                    'id' => (string) $user->id,
                    'email' => 'user@example.com',
                ],
                'message' => 'Password has been reset successfully.',
            ],
        ],
    ]);

    // Verify password was changed
    $user->refresh();
    expect(Hash::check('new-password123', $user->password))->toBeTrue();
    expect(Hash::check('old-password', $user->password))->toBeFalse();

    // Verify all tokens were revoked
    expect($user->tokens()->count())->toBe(0);
});

it('returns error for invalid token', function () {
    $response = $this->postGraphQL([
        'query' => '
            mutation ResetPassword($input: ResetPasswordInput!) {
                resetPassword(input: $input) {
                    __typename
                    ... on MutationError {
                        message
                        code
                    }
                }
            }
        ',
        'variables' => [
            'input' => [
                'token' => 'invalid-token',
                'newPassword' => 'new-password123',
            ],
        ],
    ]);

    $response->assertJson([
        'data' => [
            'resetPassword' => [
                '__typename' => 'MutationError',
                'message' => 'Invalid or expired reset token.',
                'code' => 'INVALID_TOKEN',
            ],
        ],
    ]);
});

it('returns error for expired token', function () {
    $user = User::factory()->create([
        'email' => 'user@example.com',
    ]);

    // Create an expired token by manipulating the service
    $tokenService = new PasswordResetTokenService();
    
    // Create a token that's already expired
    $expiredPayload = [
        'user_id' => $user->id,
        'email' => $user->email,
        'purpose' => 'password_reset',
        'iat' => now()->subHours(2)->timestamp,
        'exp' => now()->subHours(1)->timestamp, // Expired 1 hour ago
    ];
    
    $expiredToken = encrypt(json_encode($expiredPayload));

    $response = $this->postGraphQL([
        'query' => '
            mutation ResetPassword($input: ResetPasswordInput!) {
                resetPassword(input: $input) {
                    __typename
                    ... on MutationError {
                        message
                        code
                    }
                }
            }
        ',
        'variables' => [
            'input' => [
                'token' => $expiredToken,
                'newPassword' => 'new-password123',
            ],
        ],
    ]);

    $response->assertJson([
        'data' => [
            'resetPassword' => [
                '__typename' => 'MutationError',
                'message' => 'Reset token has expired. Please request a new one.',
                'code' => 'TOKEN_EXPIRED',
            ],
        ],
    ]);
});

it('returns error for token with non-existent user', function () {
    // Create a token for a non-existent user
    $payload = [
        'user_id' => 99999,
        'email' => 'nonexistent@example.com',
        'purpose' => 'password_reset',
        'iat' => now()->timestamp,
        'exp' => now()->addMinutes(60)->timestamp,
    ];
    
    $token = encrypt(json_encode($payload));

    $response = $this->postGraphQL([
        'query' => '
            mutation ResetPassword($input: ResetPasswordInput!) {
                resetPassword(input: $input) {
                    __typename
                    ... on MutationError {
                        message
                        code
                    }
                }
            }
        ',
        'variables' => [
            'input' => [
                'token' => $token,
                'newPassword' => 'new-password123',
            ],
        ],
    ]);

    $response->assertJson([
        'data' => [
            'resetPassword' => [
                '__typename' => 'MutationError',
                'message' => 'Invalid or expired reset token.',
                'code' => 'INVALID_TOKEN',
            ],
        ],
    ]);
});

it('validates required fields', function () {
    $response = $this->postGraphQL([
        'query' => '
            mutation ResetPassword($input: ResetPasswordInput!) {
                resetPassword(input: $input) {
                    __typename
                    ... on MutationError {
                        message
                        code
                        validationErrors {
                            field
                            messages
                        }
                    }
                }
            }
        ',
        'variables' => [
            'input' => [
                'token' => '',
                'newPassword' => '',
            ],
        ],
    ]);

    $response->assertJson([
        'data' => [
            'resetPassword' => [
                '__typename' => 'MutationError',
                'code' => 'VALIDATION_FAILED',
            ],
        ],
    ]);

    // Should have validation errors for required fields
    $data = $response->json();
    expect($data['data']['resetPassword']['validationErrors'])->toHaveCount(2);
});

it('validates password strength', function () {
    $user = User::factory()->create();
    $tokenService = new PasswordResetTokenService();
    $token = $tokenService->generateToken($user);

    $response = $this->postGraphQL([
        'query' => '
            mutation ResetPassword($input: ResetPasswordInput!) {
                resetPassword(input: $input) {
                    __typename
                    ... on MutationError {
                        message
                        code
                        validationErrors {
                            field
                            messages
                        }
                    }
                }
            }
        ',
        'variables' => [
            'input' => [
                'token' => $token,
                'newPassword' => '123', // Weak password
            ],
        ],
    ]);

    $response->assertJson([
        'data' => [
            'resetPassword' => [
                '__typename' => 'MutationError',
                'code' => 'VALIDATION_FAILED',
            ],
        ],
    ]);
});