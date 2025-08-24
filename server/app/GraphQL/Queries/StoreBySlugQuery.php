<?php

namespace App\GraphQL\Queries;

use App\Models\Store;

class StoreBySlugQuery
{
    /**
     * Find a store by slug.
     */
    public function __invoke(null $root, array $args): ?Store
    {
        return Store::where('slug', $args['slug'])
            ->with('owner')
            ->first();
    }
}
