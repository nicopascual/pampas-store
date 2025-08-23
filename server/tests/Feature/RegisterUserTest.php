<?php

use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Hash;

it('registers a new user successfully', function () {
    Event::fake();

    $input = [
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'password' => 'password123',
        'password_confirmation' => 'password123',
        'role' => 'CUSTOMER',
    ];

    $response = $this->graphQL(/**@lang GraphQL*/'
        mutation RegisterUser($input: RegisterUserInput!) {
            registerUser(input: $input) {
                ... on RegisterUserPayload {
                    user {
                        id
                        name
                        email
                        role
                        created_at
                    }
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
        }
    ', ['input' => $input]);

    $response->assertOk();
    expect($response->json('data.registerUser.user.name'))->toBe('John Doe')
        ->and($response->json('data.registerUser.user.email'))->toBe('john@example.com')
        ->and($response->json('data.registerUser.user.role'))->toBe('CUSTOMER');

    $user = User::where('email', 'john@example.com')->first();
    expect($user)->not->toBeNull()
        ->and($user->name)->toBe('John Doe')
        ->and($user->email)->toBe('john@example.com')
        ->and($user->role->value)->toBe('CUSTOMER')
        ->and(Hash::check('password123', $user->password))->toBeTrue();

    Event::assertDispatched(Registered::class, function ($event) use ($user) {
        return $event->user->id === $user->id;
    });
});

it('returns validation errors for invalid input fields', function () {
    $input = [
        'name' => 'Valid Name',  // Valid name
        'email' => 'invalid-email',  // Invalid email format
        'password' => 'short',  // Too short password (< 8 chars)
        'password_confirmation' => 'different', // Different confirmation
    ];

    $response = $this->graphQL(/**@lang GraphQL*/'
        mutation RegisterUser($input: RegisterUserInput!) {
            registerUser(input: $input) {
                ... on RegisterUserPayload {
                    user {
                        id
                        name
                        email
                    }
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
        }
    ', ['input' => $input]);

    $response->assertOk();
    expect($response->json('data.registerUser.code'))->toBe('VALIDATION_FAILED')
        ->and($response->json('data.registerUser.message'))->toBe('Registration failed due to validation errors.');

    $validationErrors = $response->json('data.registerUser.validationErrors');
    expect($validationErrors)->toBeArray()
        ->and($validationErrors)->not->toBeEmpty();

    $errorFields = collect($validationErrors)->pluck('field')->toArray();
    expect($errorFields)->toContain('email')
        ->and($errorFields)->toContain('password');
});

it('validates email format', function () {
    $input = [
        'name' => 'John Doe',
        'email' => 'invalid-email',
        'password' => 'password123',
        'password_confirmation' => 'password123',
    ];

    $response = $this->graphQL(/**@lang GraphQL*/'
        mutation RegisterUser($input: RegisterUserInput!) {
            registerUser(input: $input) {
                ... on RegisterUserPayload {
                    user {
                        id
                        name
                        email
                    }
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
        }
    ', ['input' => $input]);

    $response->assertOk();
    expect($response->json('data.registerUser.code'))->toBe('VALIDATION_FAILED');

    $validationErrors = $response->json('data.registerUser.validationErrors');
    $emailError = collect($validationErrors)->firstWhere('field', 'email');
    expect($emailError)->not->toBeNull()
        ->and($emailError['messages'][0])->toContain('email');
});

it('validates unique email', function () {
    User::factory()->create(['email' => 'existing@example.com']);

    $input = [
        'name' => 'John Doe',
        'email' => 'existing@example.com',
        'password' => 'password123',
        'password_confirmation' => 'password123',
    ];

    $response = $this->graphQL(/**@lang GraphQL*/'
        mutation RegisterUser($input: RegisterUserInput!) {
            registerUser(input: $input) {
                ... on RegisterUserPayload {
                    user {
                        id
                        name
                        email
                    }
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
        }
    ', ['input' => $input]);

    $response->assertJson([
        'data' => [
            'registerUser' => [
                'message' => 'Registration failed due to validation errors.',
                'code' => 'VALIDATION_FAILED',
            ],
        ],
    ]);

    $validationErrors = $response->json('data.registerUser.validationErrors');
    $emailError = collect($validationErrors)->firstWhere('field', 'email');
    expect($emailError['messages'][0])->toContain('already been taken');
});

it('validates minimum password length', function () {
    $input = [
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'password' => '123',
        'password_confirmation' => '123',
    ];

    $response = $this->graphQL(/**@lang GraphQL*/'
        mutation RegisterUser($input: RegisterUserInput!) {
            registerUser(input: $input) {
                ... on RegisterUserPayload {
                    user {
                        id
                        name
                        email
                    }
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
        }
    ', ['input' => $input]);

    $response->assertJson([
        'data' => [
            'registerUser' => [
                'message' => 'Registration failed due to validation errors.',
                'code' => 'VALIDATION_FAILED',
            ],
        ],
    ]);

    $validationErrors = $response->json('data.registerUser.validationErrors');
    $passwordError = collect($validationErrors)->firstWhere('field', 'password');
    expect($passwordError['messages'][0])->toContain('at least 8 characters');
});

it('validates password confirmation', function () {
    $input = [
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'password' => 'password123',
        'password_confirmation' => 'different123',
    ];

    $response = $this->graphQL(/**@lang GraphQL*/'
        mutation RegisterUser($input: RegisterUserInput!) {
            registerUser(input: $input) {
                ... on RegisterUserPayload {
                    user {
                        id
                        name
                        email
                    }
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
        }
    ', ['input' => $input]);

    $response->assertJson([
        'data' => [
            'registerUser' => [
                'message' => 'Registration failed due to validation errors.',
                'code' => 'VALIDATION_FAILED',
            ],
        ],
    ]);

    $validationErrors = $response->json('data.registerUser.validationErrors');
    $passwordError = collect($validationErrors)->firstWhere('field', 'password');

    // Check if any message contains the confirmation error text
    $hasConfirmationError = collect($passwordError['messages'])->contains(function ($message) {
        return str_contains($message, 'confirmation does not match');
    });

    expect($hasConfirmationError)->toBeTrue();
});

it('defaults role to CUSTOMER when not specified', function () {
    Event::fake();

    $input = [
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'password' => 'password123',
        'password_confirmation' => 'password123',
    ];

    $response = $this->graphQL(/**@lang GraphQL*/'
        mutation RegisterUser($input: RegisterUserInput!) {
            registerUser(input: $input) {
                ... on RegisterUserPayload {
                    user {
                        id
                        name
                        email
                        role
                    }
                    message
                }
                ... on MutationError {
                    message
                    code
                }
            }
        }
    ', ['input' => $input]);

    $response->assertJson([
        'data' => [
            'registerUser' => [
                'user' => [
                    'role' => 'CUSTOMER',
                ],
            ],
        ],
    ]);
});

it('returns localized error messages in Spanish', function () {
    App::setLocale('es');

    $input = [
        'name' => 'Valid Name',  // Valid name
        'email' => 'invalid-email',  // Invalid email format
        'password' => 'short',  // Too short password (< 8 chars)
        'password_confirmation' => 'different', // Different confirmation
    ];

    $response = $this->graphQL(/**@lang GraphQL*/'
        mutation RegisterUser($input: RegisterUserInput!) {
            registerUser(input: $input) {
                ... on RegisterUserPayload {
                    user {
                        id
                        name
                        email
                    }
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
        }
    ', ['input' => $input]);

    $response->assertJson([
        'data' => [
            'registerUser' => [
                'message' => 'El registro falló debido a errores de validación.',
                'code' => 'VALIDATION_FAILED',
            ],
        ],
    ]);

    // Reset locale
    App::setLocale('en');
});
