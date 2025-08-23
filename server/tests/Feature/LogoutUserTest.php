<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\PersonalAccessToken;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->accessToken = $this->user->createToken('access-token', expiresAt: now()->addMinutes(15))->plainTextToken;
    $this->refreshToken = $this->user->createToken('refresh-token', expiresAt: now()->addDays(7))->plainTextToken;
});

it('successfully logs out authenticated user and invalidates all tokens', function () {
    // Verify tokens exist before logout
    expect($this->user->tokens()->count())->toBe(2);

    $response = $this->graphQL(/**@lang GraphQL*/'mutation LogoutUser {
            logoutUser {
                __typename
                ... on LogoutUserPayload {
                    message
                }
                ... on MutationError {
                    message
                    code
                }
            }
        }')->withHeaders([
        'Authorization' => 'Bearer '.$this->accessToken,
    ]);
    dd($response);
    $data = $response->json('data.logoutUser');

    expect($data['__typename'])->toBe('LogoutUserPayload');
    expect($data['message'])->toBe('Successfully logged out.');

    // Verify all tokens are deleted
    $this->user->refresh();
    expect($this->user->tokens()->count())->toBe(0);
});

it('fails to logout without authentication', function () {
    $response = $this->graphQL(/**@lang GraphQL*/'mutation LogoutUser {
            logoutUser {
                __typename
                ... on LogoutUserPayload {
                    message
                }
                ... on MutationError {
                    message
                    code
                }
            }
        }');

    // Should return unauthenticated error due to @guard directive
    $response->assertStatus(200);
    expect($response->json('errors'))->not->toBeEmpty()
        ->and($response->json('errors.0.extensions.category'))->toBe('authentication');
});

it('fails to logout with invalid token', function () {
    $response = $this->withHeaders([
        'Authorization' => 'Bearer invalid-token',
    ])->graphQL(/**@lang GraphQL*/'mutation LogoutUser {
            logoutUser {
                __typename
                ... on LogoutUserPayload {
                    message
                }
                ... on MutationError {
                    message
                    code
                }
            }
        }');

    // Should return unauthenticated error due to @guard directive
    $response->assertStatus(200);
    expect($response->json('errors'))->not->toBeEmpty()
        ->and($response->json('errors.0.extensions.category'))->toBe('authentication');
});

it('invalidates both access and refresh tokens on logout', function () {
    // Create additional tokens
    $additionalAccessToken = $this->user->createToken('access-token', expiresAt: now()->addMinutes(15))->plainTextToken;
    $additionalRefreshToken = $this->user->createToken('refresh-token', expiresAt: now()->addDays(7))->plainTextToken;

    // Should have 4 tokens total now
    expect($this->user->tokens()->count())->toBe(4);

    $response = $this->withHeaders([
        'Authorization' => 'Bearer '.$this->accessToken,
    ])->graphQL(/**@lang GraphQL*/'mutation LogoutUser {
            logoutUser {
                __typename
                ... on LogoutUserPayload {
                    message
                }
            }
        }');

    $response->assertSuccessful();

    // Verify all tokens are deleted
    $this->user->refresh();
    expect($this->user->tokens()->count())->toBe(0);

    // Verify that the invalidated tokens cannot be used anymore
    $tokenCheck = PersonalAccessToken::findToken($additionalAccessToken);
    expect($tokenCheck)->toBeNull();

    $refreshTokenCheck = PersonalAccessToken::findToken($additionalRefreshToken);
    expect($refreshTokenCheck)->toBeNull();
});
