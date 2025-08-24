<?php

namespace App\Providers;

use App\Models\Store;
use Illuminate\Support\ServiceProvider;
use Nuwave\Lighthouse\Events\StartExecution;

class GraphQLServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        // Listen for GraphQL execution start to inject currentStore into context
        $this->app['events']->listen(StartExecution::class, function (StartExecution $event) {
            $currentStore = app()->bound('currentStore') ? app('currentStore') : null;

            // Add current store to GraphQL context
            $event->context->currentStore = $currentStore;
        });
    }
}
