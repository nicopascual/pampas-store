import { createAuthClient } from "better-auth/client";
import { createMiddleware } from "@tanstack/react-start";

// Server-side customer auth client with explicit URL (not proxied through Vite)
// Must use process.env for server-side code, not import.meta.env
const SERVER_URL = process.env.VITE_SERVER_URL || "http://localhost:3000";

const serverAuthClient = createAuthClient({
	baseURL: SERVER_URL,
	basePath: "/api/customer-auth",
});

export const authMiddleware = createMiddleware().server(
	async ({ next, request }) => {
		// Forward the original headers for multi-tenant resolution
		const headers = new Headers(request.headers);

		const session = await serverAuthClient.getSession({
			fetchOptions: {
				headers,
				throw: true,
			},
		});
		return next({
			context: { session },
		});
	},
);
