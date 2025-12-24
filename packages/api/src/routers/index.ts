import type { RouterClient } from "@orpc/server";
import { adminRouter } from "../domains/admin/router";
import { customerRouter } from "../domains/customers/router";
import { platformRouter } from "../domains/platform";
import { publicProcedure } from "../index";

export const appRouter = {
	// Health check (public)
	healthCheck: publicProcedure.handler(() => {
		return "OK";
	}),

	// Customer domain - storefront users
	customer: customerRouter,

	// Admin domain - back-office users
	admin: adminRouter,

	// Platform domain - multi-tenant management (super admin)
	platform: platformRouter,
};

export type AppRouter = typeof appRouter;
export type AppRouterClient = RouterClient<typeof appRouter>;
