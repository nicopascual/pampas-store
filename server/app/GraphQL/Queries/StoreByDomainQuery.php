<?php

namespace App\GraphQL\Queries;

use App\Models\Store;

class StoreByDomainQuery
{
    /**
     * Find a store by domain.
     */
    public function __invoke(null $root, array $args): ?Store
    {
        return Store::where('domain', $args['domain'])
            ->with('owner')
            ->first();
    }
}
