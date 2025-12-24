import { createAuthClient } from "better-auth/client";
import { createMiddleware } from "@tanstack/react-start";

// Server-side admin auth client with explicit URL (not proxied through Vite)
// Must use process.env for server-side code, not import.meta.env
const SERVER_URL = process.env.VITE_SERVER_URL || "http://localhost:3000";

const serverAdminAuthClient = createAuthClient({
	baseURL: SERVER_URL,
	basePath: "/api/admin-auth",
});

export const adminAuthMiddleware = createMiddleware().server(
	async ({ next, request }) => {
		console.log("[Web:AdminAuth] Checking session for:", request.url);
		try {
			// Forward the original Host header for multi-tenant resolution
			const headers = new Headers(request.headers);

			const session = await serverAdminAuthClient.getSession({
				fetchOptions: {
					headers,
				},
			});
			console.log("[Web:AdminAuth] Session result:", session.data ? "found" : "none");
			return next({
				context: { adminSession: session.data },
			});
		} catch (error) {
			// No session or error fetching - return null session
			console.error("[Web:AdminAuth] Error fetching session:", error);
			return next({
				context: { adminSession: null },
			});
		}
	},
);
