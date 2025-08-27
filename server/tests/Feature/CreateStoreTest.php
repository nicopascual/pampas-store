<?php

use App\Enums\StoreMemberRole;
use App\Enums\StorePlan;
use App\Enums\StoreStatus;
use App\Models\Store;
use App\Models\StoreMember;
use App\Models\User;

it('creates a store successfully for authenticated user', function () {
    $user = User::factory()->create();

    $input = [
        'name' => 'My Awesome Store',
        'slug' => 'my-awesome-store',
    ];

    $response = $this->actingAs($user)->graphQL(/**@lang GraphQL*/ '
        mutation CreateStore($input: CreateStoreInput!) {
            createStore(input: $input) {
                ... on CreateStorePayload {
                    store {
                        id
                        name
                        slug
                        owner {
                            id
                            name
                            email
                        }
                        domain
                        plan
                        status
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
    expect($response->json('data.createStore.store.name'))->toBe('My Awesome Store')
        ->and($response->json('data.createStore.store.slug'))->toBe('my-awesome-store')
        ->and($response->json('data.createStore.store.owner.id'))->toBe((string) $user->id)
        ->and($response->json('data.createStore.store.plan'))->toBe('Free')
        ->and($response->json('data.createStore.store.status'))->toBe('Active')
        ->and($response->json('data.createStore.store.domain'))->toBeNull()
        ->and($response->json('data.createStore.message'))->toBe(__('store.create_success'));

    $store = Store::where('name', 'My Awesome Store')->first();
    expect($store)->not->toBeNull()
        ->and($store->name)->toBe('My Awesome Store')
        ->and($store->slug)->toBe('my-awesome-store')
        ->and($store->owner_id)->toBe($user->id)
        ->and($store->plan)->toBe(StorePlan::Free)
        ->and($store->status)->toBe(StoreStatus::Active);

    // Verify owner is added as a store member with Owner role
    $storeMember = StoreMember::where('store_id', $store->id)
        ->where('user_id', $user->id)
        ->first();
    expect($storeMember)->not->toBeNull()
        ->and($storeMember->role)->toBe(StoreMemberRole::Owner);
});

it('creates a store with custom domain', function () {
    $user = User::factory()->create();

    $input = [
        'name' => 'My Store',
        'slug' => 'my-store',
        'domain' => 'mystore.com',
    ];

    $response = $this->actingAs($user)->graphQL(/**@lang GraphQL*/ '
        mutation CreateStore($input: CreateStoreInput!) {
            createStore(input: $input) {
                ... on CreateStorePayload {
                    store {
                        id
                        name
                        slug
                        domain
                        plan
                        status
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

    $response->assertOk();
    expect($response->json('data.createStore.store.domain'))->toBe('mystore.com');

    $store = Store::where('name', 'My Store')->first();
    expect($store->domain)->toBe('mystore.com');

    // Verify owner is added as a store member with Owner role
    $storeMember = StoreMember::where('store_id', $store->id)
        ->where('user_id', $user->id)
        ->first();
    expect($storeMember)->not->toBeNull()
        ->and($storeMember->role)->toBe(StoreMemberRole::Owner);
});

it('validates unique slug', function () {
    $user = User::factory()->create();

    // Create existing store with the same slug
    Store::factory()->create(['name' => 'Existing Store', 'slug' => 'test-store']);

    $input = [
        'name' => 'Test Store',
        'slug' => 'test-store', // Same slug as existing store
    ];

    $response = $this->actingAs($user)->graphQL(/**@lang GraphQL*/ '
        mutation CreateStore($input: CreateStoreInput!) {
            createStore(input: $input) {
                ... on CreateStorePayload {
                    store {
                        id
                        name
                        slug
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
    expect($response->json('data.createStore.code'))->toBe('VALIDATION_FAILED');

    $validationErrors = $response->json('data.createStore.validationErrors');
    $slugError = collect($validationErrors)->firstWhere('field', 'slug');
    expect($slugError)->not->toBeNull()
        ->and($slugError['messages'][0])->toContain('already taken');
});

it('requires authentication', function () {
    $input = [
        'name' => 'My Store',
        'slug' => 'my-store',
    ];

    $response = $this->graphQL(/**@lang GraphQL*/ '
        mutation CreateStore($input: CreateStoreInput!) {
            createStore(input: $input) {
                ... on CreateStorePayload {
                    store {
                        id
                        name
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

    $response->assertGraphQLErrorMessage('Unauthenticated.');
});

it('validates unique domain', function () {
    $user = User::factory()->create();

    // Create existing store with domain
    Store::factory()->create(['domain' => 'existing.com']);

    $input = [
        'name' => 'My Store',
        'slug' => 'my-store',
        'domain' => 'existing.com',
    ];

    $response = $this->actingAs($user)->graphQL(/**@lang GraphQL*/ '
        mutation CreateStore($input: CreateStoreInput!) {
            createStore(input: $input) {
                ... on CreateStorePayload {
                    store {
                        id
                        name
                        domain
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
    expect($response->json('data.createStore.code'))->toBe('VALIDATION_FAILED');

    $validationErrors = $response->json('data.createStore.validationErrors');
    $domainError = collect($validationErrors)->firstWhere('field', 'domain');
    expect($domainError)->not->toBeNull()
        ->and($domainError['messages'][0])->toContain('already taken');
});

it('validates maximum name length', function () {
    $user = User::factory()->create();

    $input = [
        'name' => str_repeat('A', 256), // 256 characters, exceeds max of 255
        'slug' => 'test-slug',
    ];

    $response = $this->actingAs($user)->graphQL(/**@lang GraphQL*/ '
        mutation CreateStore($input: CreateStoreInput!) {
            createStore(input: $input) {
                ... on CreateStorePayload {
                    store {
                        id
                        name
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
    expect($response->json('data.createStore.code'))->toBe('VALIDATION_FAILED');

    $validationErrors = $response->json('data.createStore.validationErrors');
    $nameError = collect($validationErrors)->firstWhere('field', 'name');
    expect($nameError)->not->toBeNull()
        ->and($nameError['messages'][0])->toContain('255 characters');
});
