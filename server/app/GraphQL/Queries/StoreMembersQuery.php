<?php

namespace App\GraphQL\Queries;

use App\Models\StoreMember;

final class StoreMembersQuery
{
    public function __invoke($_, array $args)
    {
        $storeId = $args['storeId'];

        return StoreMember::where('store_id', $storeId)
            ->with(['store.owner', 'user'])
            ->get();
    }
}
