import { createAuthClient } from "better-auth/react";

// Admin auth client for back-office users
// Uses relative URL when VITE_SERVER_URL is not set (proxied through Vite)
export const adminAuthClient = createAuthClient({
	baseURL: import.meta.env.VITE_SERVER_URL || undefined,
	basePath: "/api/admin-auth",
	fetchOptions: {
		credentials: "include",
	},
});
