<?php

use App\Enums\StoreMemberRole;
use App\Models\Store;
use App\Models\StoreMember;
use App\Models\User;

it('invites a member to store successfully', function () {
    $owner = User::factory()->create();
    $store = Store::factory()->create(['owner_id' => $owner->id]);
    $user = User::factory()->create();

    $this->actingAs($owner, 'sanctum');

    $input = [
        'storeId' => $store->id,
        'userId' => $user->id,
        'role' => 'Manager',
    ];

    $response = $this->graphQL(/**@lang GraphQL*/ '
        mutation InviteMemberToStore($input: InviteMemberToStoreInput!) {
            inviteMemberToStore(input: $input) {
                ... on InviteMemberToStorePayload {
                    storeMember {
                        id
                        role
                        user {
                            id
                            name
                            email
                        }
                        store {
                            id
                            name
                        }
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
    expect($response->json('data.inviteMemberToStore.storeMember.role'))->toBe('Manager')
        ->and($response->json('data.inviteMemberToStore.storeMember.user.id'))->toBe((string) $user->id)
        ->and($response->json('data.inviteMemberToStore.storeMember.store.id'))->toBe((string) $store->id)
        ->and($response->json('data.inviteMemberToStore.message'))->toBe('Member invited to store successfully.');

    $storeMember = StoreMember::where('store_id', $store->id)
        ->where('user_id', $user->id)
        ->first();

    expect($storeMember)->not->toBeNull()
        ->and($storeMember->role->value)->toBe('MANAGER');
});

it('prevents duplicate member invitations', function () {
    $owner = User::factory()->create();
    $store = Store::factory()->create(['owner_id' => $owner->id]);
    $user = User::factory()->create();

    StoreMember::create([
        'store_id' => $store->id,
        'user_id' => $user->id,
        'role' => StoreMemberRole::Staff,
    ]);

    $this->actingAs($owner, 'sanctum');

    $input = [
        'storeId' => $store->id,
        'userId' => $user->id,
        'role' => 'Manager',
    ];

    $response = $this->graphQL(/**@lang GraphQL*/ '
        mutation InviteMemberToStore($input: InviteMemberToStoreInput!) {
            inviteMemberToStore(input: $input) {
                ... on InviteMemberToStorePayload {
                    storeMember {
                        id
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
    expect($response->json('data.inviteMemberToStore.message'))->toBe('User is already a member of this store.')
        ->and($response->json('data.inviteMemberToStore.code'))->toBe('ALREADY_MEMBER');
});

it('removes a member from store successfully', function () {
    $owner = User::factory()->create();
    $store = Store::factory()->create(['owner_id' => $owner->id]);
    $user = User::factory()->create();

    $storeMember = StoreMember::create([
        'store_id' => $store->id,
        'user_id' => $user->id,
        'role' => StoreMemberRole::Staff,
    ]);

    $this->actingAs($owner, 'sanctum');

    $input = [
        'storeId' => $store->id,
        'userId' => $user->id,
    ];

    $response = $this->graphQL(/**@lang GraphQL*/ '
        mutation RemoveMemberFromStore($input: RemoveMemberFromStoreInput!) {
            removeMemberFromStore(input: $input) {
                ... on RemoveMemberFromStorePayload {
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
    expect($response->json('data.removeMemberFromStore.message'))->toBe('Member removed from store successfully.');

    expect(StoreMember::find($storeMember->id))->toBeNull();
});

it('handles removing non-existent member', function () {
    $owner = User::factory()->create();
    $store = Store::factory()->create(['owner_id' => $owner->id]);
    $user = User::factory()->create();

    $this->actingAs($owner, 'sanctum');

    $input = [
        'storeId' => $store->id,
        'userId' => $user->id,
    ];

    $response = $this->graphQL(/**@lang GraphQL*/ '
        mutation RemoveMemberFromStore($input: RemoveMemberFromStoreInput!) {
            removeMemberFromStore(input: $input) {
                ... on RemoveMemberFromStorePayload {
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
    expect($response->json('data.removeMemberFromStore.message'))->toBe('User is not a member of this store.')
        ->and($response->json('data.removeMemberFromStore.code'))->toBe('NOT_A_MEMBER');
});

it('retrieves store members successfully', function () {
    $owner = User::factory()->create();
    $store = Store::factory()->create(['owner_id' => $owner->id]);
    $user1 = User::factory()->create(['name' => 'John Manager']);
    $user2 = User::factory()->create(['name' => 'Jane Staff']);

    StoreMember::create([
        'store_id' => $store->id,
        'user_id' => $user1->id,
        'role' => StoreMemberRole::Manager,
    ]);

    StoreMember::create([
        'store_id' => $store->id,
        'user_id' => $user2->id,
        'role' => StoreMemberRole::Staff,
    ]);

    $this->actingAs($owner, 'sanctum');

    $response = $this->graphQL(/**@lang GraphQL*/ '
        query StoreMembers($storeId: ID!) {
            storeMembers(storeId: $storeId) {
                id
                role
                user {
                    id
                    name
                    email
                }
                store {
                    id
                    name
                }
            }
        }
    ', ['storeId' => $store->id]);

    $response->assertOk();

    $members = $response->json('data.storeMembers');
    expect($members)->toHaveCount(2);

    $manager = collect($members)->firstWhere('role', 'Manager');
    $staff = collect($members)->firstWhere('role', 'Staff');

    expect($manager)->not->toBeNull()
        ->and($manager['user']['name'])->toBe('John Manager')
        ->and($staff)->not->toBeNull()
        ->and($staff['user']['name'])->toBe('Jane Staff');
});

it('validates store member invitation input', function () {
    $owner = User::factory()->create();
    $this->actingAs($owner, 'sanctum');

    $input = [
        'storeId' => 999, // Non-existent store
        'userId' => 888, // Non-existent user
        'role' => 'Manager', // Valid enum value
    ];

    $response = $this->graphQL(/**@lang GraphQL*/ '
        mutation InviteMemberToStore($input: InviteMemberToStoreInput!) {
            inviteMemberToStore(input: $input) {
                ... on InviteMemberToStorePayload {
                    storeMember {
                        id
                    }
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
    expect($response->json('data.inviteMemberToStore.code'))->toBe('VALIDATION_FAILED');

    $validationErrors = $response->json('data.inviteMemberToStore.validationErrors');
    $errorFields = collect($validationErrors)->pluck('field')->toArray();

    expect($errorFields)->toContain('storeId')
        ->and($errorFields)->toContain('userId');
});
