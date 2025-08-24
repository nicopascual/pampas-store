<?php

namespace App\Http\Middleware;

use App\Models\Store;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ResolveCurrentStore
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $currentStore = $this->resolveStore($request);

        // Add the current store to the request attributes
        $request->attributes->set('currentStore', $currentStore);

        // Also set it in the singleton container for easy access
        app()->instance('currentStore', $currentStore);

        return $next($request);
    }

    /**
     * Resolve the current store based on request context.
     */
    protected function resolveStore(Request $request): ?Store
    {
        $host = $request->getHost();

        // First, try to resolve by custom domain
        $store = Store::where('domain', $host)->first();

        if ($store) {
            return $store;
        }

        // If no custom domain match, try subdomain resolution
        // Assume main domain pattern: {slug}.yourdomain.com
        if ($this->isSubdomain($host)) {
            $slug = $this->extractSubdomain($host);
            $store = Store::where('slug', $slug)->first();

            if ($store) {
                return $store;
            }
        }

        return null;
    }

    /**
     * Check if the host is a subdomain.
     */
    protected function isSubdomain(string $host): bool
    {
        $parts = explode('.', $host);

        return count($parts) > 2;
    }

    /**
     * Extract subdomain from host.
     */
    protected function extractSubdomain(string $host): string
    {
        $parts = explode('.', $host);

        return $parts[0];
    }
}
