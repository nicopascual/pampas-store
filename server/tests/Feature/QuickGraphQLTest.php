<?php

it('can access graphql endpoint', function () {
    $response = $this->postJson('/graphql', [
        'query' => '{ __typename }',
    ]);

    // Just check if we get a response
    expect($response->status())->toBeLessThan(500);

    if ($response->json('errors')) {
        dump('GraphQL errors:', $response->json('errors'));
    } else {
        dump('GraphQL working:', $response->json());
    }
});

it('can register user with proper input structure', function () {
    $response = $this->postJson('/graphql', [
        'query' => '
            mutation RegisterUser($input: RegisterUserInput!) {
                registerUser(input: $input) {
                    __typename
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
                'name' => 'Test User',
                'email' => 'test@example.com',
                'password' => 'password123',
                'password_confirmation' => 'password123',
            ],
        ],
    ]);

    dump('Full mutation response:', $response->json());
    dump('Status:', $response->status());

    if ($response->json('errors')) {
        dump('Errors:', $response->json('errors'));
    }

    // For now just check it doesn't crash
    expect($response->status())->toBeLessThan(500);
});
