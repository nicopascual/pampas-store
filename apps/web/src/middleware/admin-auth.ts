import { createMiddleware } from "@tanstack/react-start";

import { adminAuthClient } from "@/lib/admin-auth-client";

export const adminAuthMiddleware = createMiddleware().server(
	async ({ next, request }) => {
		const session = await adminAuthClient.getSession({
			fetchOptions: {
				headers: request.headers,
				throw: true,
			},
		});
		return next({
			context: { adminSession: session },
		});
	},
);
