import type { RouterClient } from "@orpc/server";
import { adminRouter } from "../domains/admin/router";
import { customerRouter } from "../domains/customers/router";
import { protectedProcedure, publicProcedure } from "../index";
import { todoRouter } from "./todo";

export const appRouter = {
	// Health check (public)
	healthCheck: publicProcedure.handler(() => {
		return "OK";
	}),

	// Customer domain - storefront users
	customer: customerRouter,

	// Admin domain - back-office users
	admin: adminRouter,

	// Legacy routes (for backward compatibility)
	privateData: protectedProcedure.handler(({ context }) => {
		return {
			message: "This is private",
			user: context.customerSession?.user || context.adminSession?.user,
		};
	}),
	todo: todoRouter,
};

export type AppRouter = typeof appRouter;
export type AppRouterClient = RouterClient<typeof appRouter>;
