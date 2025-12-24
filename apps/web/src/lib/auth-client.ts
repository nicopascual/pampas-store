import { createAuthClient } from "better-auth/react";

// Customer auth client for storefront users
// Uses relative URL when VITE_SERVER_URL is not set (proxied through Vite)
export const authClient = createAuthClient({
	baseURL: import.meta.env.VITE_SERVER_URL || undefined,
	basePath: "/api/customer-auth",
	fetchOptions: {
		credentials: "include",
	},
});
