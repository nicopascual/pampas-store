<?php

require 'vendor/autoload.php';

use App\Models\User;
use Illuminate\Foundation\Application;

// Create a simple test to check if login works
$app = Application::getInstance() ?? require 'bootstrap/app.php';

// Test data
$testUser = [
    'name' => 'Test User',
    'email' => 'test@example.com',
    'password' => bcrypt('password'),
    'role' => 'CUSTOMER',
];

// Create user if not exists
$user = User::firstOrCreate(['email' => $testUser['email']], $testUser);

echo 'Test user created/found: '.$user->email.PHP_EOL;
echo 'User ID: '.$user->id.PHP_EOL;

// Test GraphQL query
$mutation = '
mutation {
    loginUser(input: {email: "test@example.com", password: "password"}) {
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
}';

echo 'GraphQL Mutation ready to test:'.PHP_EOL;
echo $mutation.PHP_EOL;
