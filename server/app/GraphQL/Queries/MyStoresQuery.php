<?php

namespace App\GraphQL\Queries;

use App\Models\Store;
use Illuminate\Support\Collection;

class MyStoresQuery
{
    /**
     * Get all stores owned by the authenticated user.
     */
    public function __invoke(null $root, array $args, $context): Collection
    {
        $user = $context->user();

        return Store::where('owner_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get();
    }
}
