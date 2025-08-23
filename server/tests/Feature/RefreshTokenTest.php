<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->accessToken = $this->user->createToken('access-token', expiresAt: now()->addMinutes(15))->plainTextToken;
    $this->refreshToken = $this->user->createToken('refresh-token', expiresAt: now()->addDays(7))->plainTextToken;
});

it('successfully refreshes an access token with valid refresh token', function () {
    $response = $this->graphQL(/**@lang GraphQL*/'mutation RefreshToken($input: RefreshTokenInput!) {
            refreshToken(input: $input) {
                __typename
                ... on RefreshTokenPayload {
                    accessToken
                    message
                }
                ... on MutationError {
                    message
                    code
                }
            }
        }', [ 'input' => [
        'refreshToken' => $this->refreshToken,
    ]]);

    $response->assertSuccessful();
    $data = $response->json('data.refreshToken');

    expect($data['__typename'])->toBe('RefreshTokenPayload')
        ->and($data['accessToken'])->not->toBeEmpty()
        ->and($data['message'])->toBe('Access token refreshed successfully.');
});

it('fails with invalid refresh token', function () {
    $response = $this->graphQL(/**@lang GraphQL*/'mutation RefreshToken($input: RefreshTokenInput!) {
            refreshToken(input: $input) {
                __typename
                ... on RefreshTokenPayload {
                    accessToken
                    message
                }
                ... on MutationError {
                    message
                    code
                }
            }
        }', [ 'input' => [
        'refreshToken' => 'invalid-token',
    ]]);

    $response->assertSuccessful();
    $data = $response->json('data.refreshToken');

    expect($data['__typename'])->toBe('MutationError')
        ->and($data['message'])->toBe('Invalid refresh token.')
        ->and($data['code'])->toBe('INVALID_REFRESH_TOKEN');
});

it('fails with expired refresh token', function () {
    $expiredRefreshToken = $this->user->createToken('refresh-token', expiresAt: now()->subDays(1))->plainTextToken;

    $response = $this->graphQL(/**@lang GraphQL*/'mutation RefreshToken($input: RefreshTokenInput!) {
            refreshToken(input: $input) {
                __typename
                ... on RefreshTokenPayload {
                    accessToken
                    message
                }
                ... on MutationError {
                    message
                    code
                }
            }
        }', [ 'input' => [
        'refreshToken' => $expiredRefreshToken,
    ]]);

    $response->assertSuccessful();
    $data = $response->json('data.refreshToken');

    expect($data['__typename'])->toBe('MutationError');
    expect($data['message'])->toBe('Refresh token has expired.');
    expect($data['code'])->toBe('REFRESH_TOKEN_EXPIRED');
});

it('fails when using access token as refresh token', function () {
    $response = $this->graphQL(/**@lang GraphQL*/'mutation RefreshToken($input: RefreshTokenInput!) {
            refreshToken(input: $input) {
                __typename
                ... on RefreshTokenPayload {
                    accessToken
                    message
                }
                ... on MutationError {
                    message
                    code
                }
            }
        }', [ 'input' => [
        'refreshToken' => $this->accessToken, // Using access token instead of refresh token
    ]]);

    $response->assertSuccessful();
    $data = $response->json('data.refreshToken');

    expect($data['__typename'])->toBe('MutationError')
        ->and($data['message'])->toBe('Invalid refresh token.')
        ->and($data['code'])->toBe('INVALID_REFRESH_TOKEN');
});

it('validates invalid refresh token format', function () {
    $response = $this->graphQL(/**@lang GraphQL*/'mutation RefreshToken($input: RefreshTokenInput!) {
            refreshToken(input: $input) {
                __typename
                ... on RefreshTokenPayload {
                    accessToken
                    message
                }
                ... on MutationError {
                    message
                    code
                    validationErrors {
                        field
                        messages
                    }
                }
            }
        }', [ 'input' => [
        'refreshToken' => 'clearly-invalid-token-format'
    ]]);

    $response->assertSuccessful();
    $data = $response->json('data.refreshToken');

    expect($data['__typename'])->toBe('MutationError')
        ->and($data['message'])->toBe('Invalid refresh token.')
        ->and($data['code'])->toBe('INVALID_REFRESH_TOKEN');
});
