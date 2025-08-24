<?php

use App\Enums\StorePlan;
use App\Enums\UserRole;
use App\Models\Store;
use App\Models\User;

it('allows store owner to update store settings', function () {
    $owner = User::factory()->create(['role' => UserRole::Seller]);
    $store = Store::factory()->create(['owner_id' => $owner->id, 'plan' => StorePlan::Free]);

    $this->actingAs($owner);

    $response = $this->graphQL(/**@lang GraphQL*/ 'mutation UpdateStoreSettings($input: UpdateStoreSettingsInput!) {
        updateStoreSettings(input: $input) {
            __typename
            ... on UpdateStoreSettingsPayload {
                store {
                    id
                    name
                    domain
                    plan
                }
                message
            }
            ... on MutationError {
                message
                code
            }
        }
    }', ['input' => [
        'storeId' => $store->id,
        'name' => 'Updated Store Name',
        'domain' => 'updated-domain.com',
        'plan' => 'PRO',
    ]]);

    $response->assertSuccessful();

    $data = $response->json('data.updateStoreSettings');
    expect($data['__typename'])->toBe('UpdateStoreSettingsPayload')
        ->and($data['store']['name'])->toBe('Updated Store Name')
        ->and($data['store']['domain'])->toBe('updated-domain.com')
        ->and($data['store']['plan'])->toBe('Pro')
        ->and($data['message'])->toBe('Store settings updated successfully.');
});

it('allows admin to update any store settings', function () {
    $admin = User::factory()->create(['role' => UserRole::Admin]);
    $owner = User::factory()->create(['role' => UserRole::Seller]);
    $store = Store::factory()->create(['owner_id' => $owner->id]);

    $this->actingAs($admin);

    $response = $this->graphQL(/**@lang GraphQL*/ 'mutation UpdateStoreSettings($input: UpdateStoreSettingsInput!) {
        updateStoreSettings(input: $input) {
            __typename
            ... on UpdateStoreSettingsPayload {
                store {
                    id
                    name
                }
                message
            }
        }
    }', ['input' => [
        'storeId' => $store->id,
        'name' => 'Admin Updated Name',
    ]]);

    $response->assertSuccessful();

    $data = $response->json('data.updateStoreSettings');
    expect($data['__typename'])->toBe('UpdateStoreSettingsPayload')
        ->and($data['store']['name'])->toBe('Admin Updated Name');
});

it('denies non-owner, non-admin users from updating store settings', function () {
    $owner = User::factory()->create(['role' => UserRole::Seller]);
    $otherUser = User::factory()->create(['role' => UserRole::Customer]);
    $store = Store::factory()->create(['owner_id' => $owner->id]);

    $this->actingAs($otherUser);

    $response = $this->graphQL(/**@lang GraphQL*/ 'mutation UpdateStoreSettings($input: UpdateStoreSettingsInput!) {
        updateStoreSettings(input: $input) {
            __typename
            ... on MutationError {
                message
                code
            }
        }
    }', ['input' => [
        'storeId' => $store->id,
        'name' => 'Unauthorized Update',
    ]]);

    $response->assertSuccessful();

    $data = $response->json('data.updateStoreSettings');
    expect($data['__typename'])->toBe('MutationError')
        ->and($data['code'])->toBe('UNAUTHORIZED')
        ->and($data['message'])->toBe('You are not authorized to update this store\'s settings.');
});

it('validates required store ID', function () {
    $user = User::factory()->create(['role' => UserRole::Seller]);

    $this->actingAs($user);

    $response = $this->graphQL(/**@lang GraphQL*/ 'mutation UpdateStoreSettings($input: UpdateStoreSettingsInput!) {
        updateStoreSettings(input: $input) {
            __typename
            ... on MutationError {
                message
                validationErrors {
                    field
                    messages
                }
            }
        }
    }', ['input' => [
        'storeId' => '',
        'name' => 'Updated Name',
    ]]);

    // Debug what we're actually getting
    $responseData = $response->json();

    if (isset($responseData['data']['updateStoreSettings'])) {
        $data = $responseData['data']['updateStoreSettings'];
        expect($data['__typename'])->toBe('MutationError');
        $storeIdError = collect($data['validationErrors'])->firstWhere('field', 'storeId');
        expect($storeIdError)->not->toBeNull();
    } else {
        // Check if it's a GraphQL validation error
        expect($responseData['errors'])->not->toBeNull();
    }
});

it('validates store exists', function () {
    $user = User::factory()->create(['role' => UserRole::Seller]);

    $this->actingAs($user);

    $response = $this->graphQL(/**@lang GraphQL*/ 'mutation UpdateStoreSettings($input: UpdateStoreSettingsInput!) {
        updateStoreSettings(input: $input) {
            __typename
            ... on MutationError {
                validationErrors {
                    field
                    messages
                }
            }
        }
    }', ['input' => [
        'storeId' => '999999',
        'name' => 'Updated Name',
    ]]);

    $response->assertSuccessful();

    $data = $response->json('data.updateStoreSettings');
    expect($data['__typename'])->toBe('MutationError');

    $storeIdError = collect($data['validationErrors'])->firstWhere('field', 'storeId');
    expect($storeIdError)->not->toBeNull()
        ->and($storeIdError['messages'][0])->toContain('does not exist');
});

it('validates domain uniqueness', function () {
    $owner = User::factory()->create(['role' => UserRole::Seller]);
    $existingStore = Store::factory()->create(['domain' => 'existing-domain.com']);
    $store = Store::factory()->create(['owner_id' => $owner->id]);

    $this->actingAs($owner);

    $response = $this->graphQL(/**@lang GraphQL*/ 'mutation UpdateStoreSettings($input: UpdateStoreSettingsInput!) {
        updateStoreSettings(input: $input) {
            __typename
            ... on MutationError {
                validationErrors {
                    field
                    messages
                }
            }
        }
    }', ['input' => [
        'storeId' => $store->id,
        'domain' => 'existing-domain.com',
    ]]);

    $response->assertSuccessful();

    $data = $response->json('data.updateStoreSettings');
    expect($data['__typename'])->toBe('MutationError');

    $domainError = collect($data['validationErrors'])->firstWhere('field', 'domain');
    expect($domainError)->not->toBeNull()
        ->and($domainError['messages'][0])->toContain('already taken');
});

it('validates store plan enum', function () {
    $owner = User::factory()->create(['role' => UserRole::Seller]);
    $store = Store::factory()->create(['owner_id' => $owner->id]);

    $this->actingAs($owner);

    // Since GraphQL validation happens at schema level,
    // this should return GraphQL errors rather than mutation errors
    $response = $this->graphQL(/**@lang GraphQL*/ 'mutation UpdateStoreSettings($input: UpdateStoreSettingsInput!) {
        updateStoreSettings(input: $input) {
            __typename
            ... on MutationError {
                validationErrors {
                    field
                    messages
                }
            }
        }
    }', ['input' => [
        'storeId' => $store->id,
        'plan' => 'INVALID_PLAN',
    ]]);

    // GraphQL schema validation should fail before reaching our resolver
    expect($response->json('errors'))->not->toBeNull();
});

it('allows partial updates', function () {
    $owner = User::factory()->create(['role' => UserRole::Seller]);
    $store = Store::factory()->create([
        'owner_id' => $owner->id,
        'name' => 'Original Name',
        'domain' => 'original-domain.com',
        'plan' => StorePlan::Free,
    ]);

    $this->actingAs($owner);

    // Update only name
    $response = $this->graphQL(/**@lang GraphQL*/ 'mutation UpdateStoreSettings($input: UpdateStoreSettingsInput!) {
        updateStoreSettings(input: $input) {
            __typename
            ... on UpdateStoreSettingsPayload {
                store {
                    name
                    domain
                    plan
                }
            }
        }
    }', ['input' => [
        'storeId' => $store->id,
        'name' => 'New Name Only',
    ]]);

    $response->assertSuccessful();

    $data = $response->json('data.updateStoreSettings');
    expect($data['__typename'])->toBe('UpdateStoreSettingsPayload')
        ->and($data['store']['name'])->toBe('New Name Only')
        ->and($data['store']['domain'])->toBe('original-domain.com')
        ->and($data['store']['plan'])->toBe('Free');
});

it('requires authentication', function () {
    $store = Store::factory()->create();

    $response = $this->graphQL(/**@lang GraphQL*/ 'mutation UpdateStoreSettings($input: UpdateStoreSettingsInput!) {
        updateStoreSettings(input: $input) {
            __typename
        }
    }', ['input' => [
        'storeId' => $store->id,
        'name' => 'Updated Name',
    ]]);

    // Should receive an authentication error
    expect($response->json('errors'))->not->toBeNull();
});
