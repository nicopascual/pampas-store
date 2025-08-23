<?php

it('groups validation errors by field with multiple messages', function () {
    $input = [
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'password' => '123', // Too short
        'password_confirmation' => 'different', // Doesn't match
    ];

    $response = $this->graphQL('
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
    $passwordError = collect($validationErrors)->firstWhere('field', 'password');

    // Should have exactly one entry for password field
    expect($passwordError)->not->toBeNull();
    expect($passwordError['field'])->toBe('password');

    // Should have multiple messages grouped together
    expect($passwordError['messages'])->toBeArray();
    expect(count($passwordError['messages']))->toBeGreaterThan(1);

    // Verify we have both validation messages
    $messages = implode(' ', $passwordError['messages']);
    expect($messages)->toContain('at least 8 characters');
    expect($messages)->toContain('confirmation does not match');

    // Verify no duplicate field entries
    $passwordFields = collect($validationErrors)->where('field', 'password');
    expect($passwordFields->count())->toBe(1);

    dump('Grouped validation errors:', $validationErrors);
});
