<?php

namespace App\GraphQL\Directives;

use Closure;
use GraphQL\Type\Definition\ResolveInfo;
use Illuminate\Database\Eloquent\Builder;
use Nuwave\Lighthouse\Schema\Directives\BaseDirective;
use Nuwave\Lighthouse\Schema\Values\FieldValue;
use Nuwave\Lighthouse\Support\Contracts\DefinedDirective;
use Nuwave\Lighthouse\Support\Contracts\FieldMiddleware;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class ScopeByCurrentStoreDirective extends BaseDirective implements DefinedDirective, FieldMiddleware
{
    public static function definition(): string
    {
        return /** @lang GraphQL */ '
        """
        Automatically scope the query by the current store context.
        """
        directive @scopeByCurrentStore(
            """
            The column name to scope by. Defaults to "store_id".
            """
            column: String = "store_id"
        ) on FIELD_DEFINITION
        ';
    }

    /**
     * Wrap around the final field resolver.
     */
    public function handleField(FieldValue $fieldValue, Closure $next): FieldValue
    {
        $originalResolver = $fieldValue->getResolver();

        $fieldValue->setResolver(function ($root, array $args, GraphQLContext $context, ResolveInfo $resolveInfo) use ($originalResolver) {
            $currentStore = $context->currentStore ?? null;

            if (! $currentStore) {
                throw new \Exception('No store context found. This operation requires a valid store context.');
            }

            // Call the original resolver
            $result = $originalResolver($root, $args, $context, $resolveInfo);

            // If the result is an Eloquent query builder, scope it by the current store
            if ($result instanceof Builder) {
                $column = $this->directiveArgValue('column', 'store_id');
                $result->where($column, $currentStore->id);
            }

            return $result;
        });

        return $next($fieldValue);
    }
}
