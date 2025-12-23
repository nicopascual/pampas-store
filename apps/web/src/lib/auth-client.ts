import { createAuthClient } from "better-auth/react";

// Customer auth client for storefront users
export const authClient = createAuthClient({
	baseURL: import.meta.env.VITE_SERVER_URL,
	basePath: "/api/customer-auth",
});
