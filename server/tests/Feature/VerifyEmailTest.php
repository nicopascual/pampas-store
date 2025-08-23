<?php

use App\Models\User;
use Carbon\Carbon;

it('successfully verifies email with valid token', function () {
    // Create an unverified user
    $user = User::factory()->create([
        'email_verified_at' => null,
    ]);

    // Generate a verification token
    $token = $user->generateVerificationToken();

    // Perform the verification
    $response = $this->postGraphQL([
        'query' => '
            mutation VerifyEmail($input: VerifyEmailInput!) {
                verifyEmail(input: $input) {
                    __typename
                    ... on VerifyEmailPayload {
                        user {
                            id
                            email
                            email_verified_at
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
            ],
        ],
    ]);

    $response->assertJson([
        'data' => [
            'verifyEmail' => [
                '__typename' => 'VerifyEmailPayload',
                'user' => [
                    'id' => (string) $user->id,
                    'email' => $user->email,
                ],
                'message' => 'Email verified successfully.',
            ],
        ],
    ]);

    // Verify the user's email was marked as verified
    $user->refresh();
    expect($user->email_verified_at)->not->toBeNull();
    expect($user->hasVerifiedEmail())->toBeTrue();
});

it('returns error for invalid token format', function () {
    $response = $this->postGraphQL([
        'query' => '
            mutation VerifyEmail($input: VerifyEmailInput!) {
                verifyEmail(input: $input) {
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
            ],
        ],
    ]);

    $response->assertJson([
        'data' => [
            'verifyEmail' => [
                '__typename' => 'MutationError',
                'message' => 'Invalid verification token.',
                'code' => 'INVALID_TOKEN',
            ],
        ],
    ]);
});

it('returns error for non-existent user', function () {
    // Create a token for a non-existent user
    $tokenData = [
        'user_id' => 99999,
        'email' => 'nonexistent@example.com',
        'created_at' => now()->toISOString(),
    ];
    $token = base64_encode(json_encode($tokenData));

    $response = $this->postGraphQL([
        'query' => '
            mutation VerifyEmail($input: VerifyEmailInput!) {
                verifyEmail(input: $input) {
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
            ],
        ],
    ]);

    $response->assertJson([
        'data' => [
            'verifyEmail' => [
                '__typename' => 'MutationError',
                'message' => 'User not found.',
                'code' => 'USER_NOT_FOUND',
            ],
        ],
    ]);
});

it('returns error for already verified email', function () {
    // Create an already verified user
    $user = User::factory()->create([
        'email_verified_at' => now(),
    ]);

    $token = $user->generateVerificationToken();

    $response = $this->postGraphQL([
        'query' => '
            mutation VerifyEmail($input: VerifyEmailInput!) {
                verifyEmail(input: $input) {
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
            ],
        ],
    ]);

    $response->assertJson([
        'data' => [
            'verifyEmail' => [
                '__typename' => 'MutationError',
                'message' => 'Email is already verified.',
                'code' => 'ALREADY_VERIFIED',
            ],
        ],
    ]);
});

it('returns error for expired token', function () {
    $user = User::factory()->create([
        'email_verified_at' => null,
    ]);

    // Create an expired token (created 2 hours ago)
    $tokenData = [
        'user_id' => $user->id,
        'email' => $user->email,
        'created_at' => Carbon::now()->subHours(2)->toISOString(),
    ];
    $token = base64_encode(json_encode($tokenData));

    $response = $this->postGraphQL([
        'query' => '
            mutation VerifyEmail($input: VerifyEmailInput!) {
                verifyEmail(input: $input) {
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
            ],
        ],
    ]);

    $response->assertJson([
        'data' => [
            'verifyEmail' => [
                '__typename' => 'MutationError',
                'message' => 'Verification token has expired.',
                'code' => 'TOKEN_EXPIRED',
            ],
        ],
    ]);
});

it('returns error for token with mismatched email', function () {
    $user = User::factory()->create([
        'email' => 'current@example.com',
        'email_verified_at' => null,
    ]);

    // Create a token with a different email
    $tokenData = [
        'user_id' => $user->id,
        'email' => 'old@example.com',
        'created_at' => now()->toISOString(),
    ];
    $token = base64_encode(json_encode($tokenData));

    $response = $this->postGraphQL([
        'query' => '
            mutation VerifyEmail($input: VerifyEmailInput!) {
                verifyEmail(input: $input) {
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
            ],
        ],
    ]);

    $response->assertJson([
        'data' => [
            'verifyEmail' => [
                '__typename' => 'MutationError',
                'message' => 'Invalid verification token.',
                'code' => 'INVALID_TOKEN',
            ],
        ],
    ]);
});

it('validates required token input', function () {
    $response = $this->postGraphQL([
        'query' => '
            mutation VerifyEmail($input: VerifyEmailInput!) {
                verifyEmail(input: $input) {
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
            ],
        ],
    ]);

    $response->assertJson([
        'data' => [
            'verifyEmail' => [
                '__typename' => 'MutationError',
                'code' => 'VALIDATION_FAILED',
                'validationErrors' => [
                    [
                        'field' => 'token',
                        'messages' => ['Verification token is required.'],
                    ],
                ],
            ],
        ],
    ]);
});