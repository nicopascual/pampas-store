<?php

use App\Http\Middleware\ResolveCurrentStore;
use App\Models\Store;
use App\Models\User;
use Illuminate\Http\Request;

test('middleware resolves current store via subdomain', function () {
    $user = User::factory()->create();
    $store = Store::factory()->create([
        'slug' => 'test-store',
        'owner_id' => $user->id,
    ]);

    $middleware = new ResolveCurrentStore;
    $request = Request::create('http://test-store.pampas.test/graphql');

    $middleware->handle($request, function ($req) {
        return response('OK');
    });

    // Verify that the middleware resolved the store correctly
    expect(app()->has('currentStore'))->toBeTrue();
    expect(app('currentStore')->id)->toBe($store->id);
});

test('middleware resolves current store via custom domain', function () {
    $user = User::factory()->create();
    $store = Store::factory()->create([
        'domain' => 'custom-domain.com',
        'owner_id' => $user->id,
    ]);

    $middleware = new ResolveCurrentStore;
    $request = Request::create('http://custom-domain.com/graphql');

    $middleware->handle($request, function ($req) {
        return response('OK');
    });

    // Verify that the middleware resolved the store correctly
    expect(app()->has('currentStore'))->toBeTrue();
    expect(app('currentStore')->id)->toBe($store->id);
});

test('middleware returns null when no matching store found', function () {
    $middleware = new ResolveCurrentStore;
    $request = Request::create('http://non-existent.pampas.test/graphql');

    $middleware->handle($request, function ($req) {
        return response('OK');
    });

    // Verify that no store was resolved
    expect(app()->has('currentStore'))->toBeFalse();
});

test('current store is accessible in service container', function () {
    $user = User::factory()->create();
    $store = Store::factory()->create([
        'slug' => 'test-store',
        'owner_id' => $user->id,
    ]);

    // Simulate middleware setting current store
    app()->instance('currentStore', $store);

    // Verify current store is accessible
    expect(app()->has('currentStore'))->toBeTrue();
    expect(app('currentStore')->id)->toBe($store->id);
    expect(app('currentStore')->slug)->toBe('test-store');
});
