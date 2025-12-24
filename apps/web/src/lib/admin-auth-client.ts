import { createAuthClient } from "better-auth/react";

// Admin auth client for back-office users
export const adminAuthClient = createAuthClient({
	baseURL: import.meta.env.VITE_SERVER_URL,
	basePath: "/api/admin-auth",
});
