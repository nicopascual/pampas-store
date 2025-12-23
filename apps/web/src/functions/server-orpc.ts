import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import type { RouterClient } from "@orpc/server";
import type { appRouter } from "@pampas-store/api/routers/index";
import type { QueryClient } from "@tanstack/react-query";
import { createMiddleware } from "@tanstack/react-start";

// Middleware to capture the request with cookies
export const requestMiddleware = createMiddleware().server(
	async ({ next, request }) => {
		return next({ context: { request } });
	},
);

// Create an ORPC client that forwards cookies to the backend
export const createServerORPCClient = (
	request: Request,
): RouterClient<typeof appRouter> => {
	const link = new RPCLink({
		url: `${process.env.VITE_SERVER_URL}/rpc`,
		headers: () => {
			const cookie = request.headers.get("cookie");
			return cookie ? { cookie } : {};
		},
	});
	return createORPCClient(link);
};

type PrefetchableQuery = {
	queryOptions: () => { queryKey: readonly unknown[] };
};

/**
 * Helper to set query data in the cache after fetching.
 * Use with server functions in loaders.
 *
 * @example
 * loader: async ({ context }) => {
 *   await prefetch(getTodos(), orpc.todo.getAll, context.queryClient);
 * }
 */
export async function prefetch<T>(
	dataPromise: Promise<T>,
	queryUtils: PrefetchableQuery,
	queryClient: QueryClient,
): Promise<T> {
	const data = await dataPromise;
	queryClient.setQueryData(queryUtils.queryOptions().queryKey, data);
	return data;
}
