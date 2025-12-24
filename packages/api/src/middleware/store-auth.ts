import { ORPCError, os } from "@orpc/server";
import type { Context } from "../context";

const o = os.$context<Context>();

// Middleware that requires store context (multi-tenant)
const requireStoreContext = o.middleware(async ({ context, next }) => {
	if (!context.store || !context.prisma) {
		throw new ORPCError("BAD_REQUEST", {
			message: context.t("errors:storeRequired"),
		});
	}

	return next({
		context: {
			...context,
			store: context.store,
			prisma: context.prisma,
		},
	});
});

// Base procedure that requires store context
export const storeProcedure = o.use(requireStoreContext);

// Store + Customer authentication
export const storeCustomerProcedure = storeProcedure.use(
	async ({ context, next }) => {
		// CRITICAL: Reject if this is an admin session trying to access customer routes
		if (context.authDomain === "admin") {
			throw new ORPCError("FORBIDDEN", {
				message: context.t("errors:wrongAuthDomain"),
			});
		}

		if (!context.customerSession?.user) {
			throw new ORPCError("UNAUTHORIZED", {
				message: context.t("errors:unauthorized"),
			});
		}

		return next({
			context: {
				...context,
				customer: context.customerSession.user,
				customerSession: context.customerSession,
			},
		});
	},
);

// Store + Admin authentication
export const storeAdminProcedure = storeProcedure.use(
	async ({ context, next }) => {
		// CRITICAL: Reject if this is a customer session trying to access admin routes
		if (context.authDomain === "customer") {
			throw new ORPCError("FORBIDDEN", {
				message: context.t("errors:wrongAuthDomain"),
			});
		}

		if (!context.adminSession?.user) {
			throw new ORPCError("UNAUTHORIZED", {
				message: context.t("errors:unauthorized"),
			});
		}

		const user = context.adminSession.user as {
			id: string;
			name: string;
			email: string;
			status?: string;
			roleId?: string | null;
		};

		if (user.status !== "active") {
			throw new ORPCError("FORBIDDEN", {
				message: context.t("errors:accountInactive"),
			});
		}

		return next({
			context: {
				...context,
				admin: user,
				adminSession: context.adminSession,
			},
		});
	},
);
