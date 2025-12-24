import { createServerFn } from "@tanstack/react-start";

import { adminAuthMiddleware } from "@/middleware/admin-auth";

export const getAdminUser = createServerFn({ method: "GET" })
	.middleware([adminAuthMiddleware])
	.handler(async ({ context }) => {
		return context.adminSession;
	});
