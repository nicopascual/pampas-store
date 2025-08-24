<?php

namespace App\GraphQL\Support;

use App\Models\Store;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

trait HasCurrentStore
{
    /**
     * Get the current store from GraphQL context.
     */
    protected function getCurrentStore(mixed $root, array $args, GraphQLContext $context, ResolveInfo $resolveInfo): ?Store
    {
        return $context->currentStore ?? null;
    }

    /**
     * Ensure a current store exists, throw exception if not found.
     */
    protected function requireCurrentStore(mixed $root, array $args, GraphQLContext $context, ResolveInfo $resolveInfo): Store
    {
        $currentStore = $this->getCurrentStore($root, $args, $context, $resolveInfo);

        if (! $currentStore) {
            throw new \Exception('No store context found. This operation requires a valid store context.');
        }

        return $currentStore;
    }
}
