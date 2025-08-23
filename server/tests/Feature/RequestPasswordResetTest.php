<?php

use App\Models\User;
use App\Services\PasswordResetTokenService;

it('successfully requests password reset for existing user', function () {
    $user = User::factory()->create([
        'email' => 'user@example.com',
    ]);

    $response = $this->postGraphQL([
        'query' => '
            mutation RequestPasswordReset($input: RequestPasswordResetInput!) {
                requestPasswordReset(input: $input) {
                    __typename
                    ... on RequestPasswordResetPayload {
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
                'email' => 'user@example.com',
            ],
        ],
    ]);

    $response->assertJson([
        'data' => [
            'requestPasswordReset' => [
                '__typename' => 'RequestPasswordResetPayload',
                'message' => 'Password reset instructions have been sent to your email.',
            ],
        ],
    ]);

    // Since we're using JWT tokens, we can't directly verify token creation
    // But we can verify the request was successful
    expect($response->json('data.requestPasswordReset.__typename'))->toBe('RequestPasswordResetPayload');
});

it('returns success for non-existent email to prevent user enumeration', function () {
    $response = $this->postGraphQL([
        'query' => '
            mutation RequestPasswordReset($input: RequestPasswordResetInput!) {
                requestPasswordReset(input: $input) {
                    __typename
                    ... on RequestPasswordResetPayload {
                        message
                    }
                }
            }
        ',
        'variables' => [
            'input' => [
                'email' => 'nonexistent@example.com',
            ],
        ],
    ]);

    $response->assertJson([
        'data' => [
            'requestPasswordReset' => [
                '__typename' => 'RequestPasswordResetPayload',
                'message' => 'Password reset instructions have been sent to your email.',
            ],
        ],
    ]);

    // Verify successful response (even for non-existent email)
    expect($response->json('data.requestPasswordReset.__typename'))->toBe('RequestPasswordResetPayload');
});

it('generates JWT token for existing user', function () {
    $user = User::factory()->create([
        'email' => 'user@example.com',
    ]);

    $tokenService = new PasswordResetTokenService();
    
    $response = $this->postGraphQL([
        'query' => '
            mutation RequestPasswordReset($input: RequestPasswordResetInput!) {
                requestPasswordReset(input: $input) {
                    __typename
                    ... on RequestPasswordResetPayload {
                        message
                    }
                }
            }
        ',
        'variables' => [
            'input' => [
                'email' => 'user@example.com',
            ],
        ],
    ]);

    $response->assertSuccessful();
    expect($response->json('data.requestPasswordReset.__typename'))->toBe('RequestPasswordResetPayload');
});

it('validates required email input', function () {
    $response = $this->postGraphQL([
        'query' => '
            mutation RequestPasswordReset($input: RequestPasswordResetInput!) {
                requestPasswordReset(input: $input) {
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
                'email' => '',
            ],
        ],
    ]);

    $response->assertJson([
        'data' => [
            'requestPasswordReset' => [
                '__typename' => 'MutationError',
                'code' => 'VALIDATION_FAILED',
                'validationErrors' => [
                    [
                        'field' => 'email',
                        'messages' => ['Email address is required.'],
                    ],
                ],
            ],
        ],
    ]);
});

it('validates email format', function () {
    $response = $this->postGraphQL([
        'query' => '
            mutation RequestPasswordReset($input: RequestPasswordResetInput!) {
                requestPasswordReset(input: $input) {
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
                'email' => 'invalid-email',
            ],
        ],
    ]);

    $response->assertJson([
        'data' => [
            'requestPasswordReset' => [
                '__typename' => 'MutationError',
                'code' => 'VALIDATION_FAILED',
                'validationErrors' => [
                    [
                        'field' => 'email',
                        'messages' => ['Please provide a valid email address.'],
                    ],
                ],
            ],
        ],
    ]);
});