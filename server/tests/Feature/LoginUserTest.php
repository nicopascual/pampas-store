<?php

use App\Models\User;
use Illuminate\Support\Facades\Hash;

it('can login with valid credentials', function () {
    $user = User::factory()->create([
        'email' => 'test@example.com',
        'password' => Hash::make('password123'),
    ]);

    $response = $this->graphQL(/**@lang GraphQL*/'mutation LoginUser($input: LoginUserInput!) {
                loginUser(input: $input) {
                    __typename
                    ... on LoginUserPayload {
                        user {
                            id
                            email
                            name
                        }
                        accessToken
                        refreshToken
                        message
                    }
                    ... on MutationError {
                        message
                        code
                    }
                }
            }', [ 'input' => [
        'email' => 'test@example.com',
        'password' => 'password123',
    ]]);


    $response->assertSuccessful();

    $data = $response->json('data.loginUser');
    expect($data['__typename'])->toBe('LoginUserPayload')
        ->and($data['user']['email'])->toBe('test@example.com')
        ->and($data['accessToken'])->not->toBeEmpty()
        ->and($data['refreshToken'])->not->toBeEmpty()
        ->and($data['accessToken'])->toBeString()
        ->and($data['refreshToken'])->toBeString()
        ->and($data['message'])->toBe('Successfully logged in.');
});

it('fails login with invalid credentials', function () {
    $user = User::factory()->create([
        'email' => 'test@example.com',
        'password' => Hash::make('password123'),
    ]);

    $response = $this->graphQL(/**@lang GraphQL*/'mutation LoginUser($input: LoginUserInput!) {
                loginUser(input: $input) {
                    __typename
                    ... on LoginUserPayload {
                        user {
                            id
                            email
                        }
                        accessToken
                    }
                    ... on MutationError {
                        message
                        code
                    }
                }
            }', [ 'input' => [
        'email' => 'test@example.com',
        'password' => 'wrongpassword',
    ]]);

    $response->assertSuccessful();

    $data = $response->json('data.loginUser');
    expect($data['__typename'])->toBe('MutationError');
    expect($data['code'])->toBe('INVALID_CREDENTIALS');
    expect($data['message'])->toBe('These credentials do not match our records.');
});

it('validates invalid input fields', function () {
    $response = $this->graphQL(/**@lang GraphQL*/'mutation LoginUser($input: LoginUserInput!) {
                loginUser(input: $input) {
                    __typename
                    ... on MutationError {
                        message
                        validationErrors {
                            field
                            messages
                        }
                    }
                }
            }', [ 'input' => [
        'email' => 'invalid-email-format',
        'password' => 'valid-password',
    ]]);

    $response->assertSuccessful();

    $data = $response->json('data.loginUser');
    expect($data)->not->toBeNull()
        ->and($data['__typename'])->toBe('MutationError')
        ->and($data['validationErrors'])->toHaveCount(1);

    $emailError = collect($data['validationErrors'])->firstWhere('field', 'email');
    expect($emailError)->not->toBeNull()
        ->and($emailError['messages'][0])->toContain('email');
});

it('validates email format', function () {
    $response = $this->graphQL(/**@lang GraphQL*/'mutation LoginUser($input: LoginUserInput!) {
                loginUser(input: $input) {
                    __typename
                    ... on MutationError {
                        validationErrors {
                            field
                            messages
                        }
                    }
                }
            }', [ 'input' => [
        'email' => 'invalid-email',
        'password' => 'password123',
    ]]);

    $response->assertSuccessful();

    $data = $response->json('data.loginUser');
    expect($data['__typename'])->toBe('MutationError');

    $emailError = collect($data['validationErrors'])->firstWhere('field', 'email');
    expect($emailError)->not->toBeNull();
    expect($emailError['messages'][0])->toContain('email');
});
