import { ORPCError, os } from "@orpc/server";
import type { Context } from "../context";

const o = os.$context<Context>();

// Middleware that requires store context (multi-tenant)
const requireStoreContext = o.middleware(async ({ context, next }) => {
	if (!context.store || !context.prisma) {
		context.log.warn(
			{ category: "tenant", requestId: context.requestId },
			"Store context required but not found",
		);
		throw new ORPCError("BAD_REQUEST", {
			message: context.t("errors:storeRequired"),
		});
	}

	context.log.debug(
		{
			category: "tenant",
			requestId: context.requestId,
			storeId: context.store.id,
			storeSlug: context.store.slug,
		},
		"Store context validated",
	);

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
			context.log.warn(
				{
					category: "security",
					requestId: context.requestId,
					authDomain: "admin",
					targetDomain: "customer",
				},
				"Domain violation: admin session attempting customer route",
			);
			throw new ORPCError("FORBIDDEN", {
				message: context.t("errors:wrongAuthDomain"),
			});
		}

		if (!context.customerSession?.user) {
			context.log.warn(
				{
					category: "security",
					requestId: context.requestId,
				},
				"Unauthorized customer access attempt",
			);
			throw new ORPCError("UNAUTHORIZED", {
				message: context.t("errors:unauthorized"),
			});
		}

		context.log.debug(
			{
				category: "security",
				requestId: context.requestId,
				userId: context.customerSession.user.id,
			},
			"Customer authentication successful",
		);

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
			context.log.warn(
				{
					category: "security",
					requestId: context.requestId,
					authDomain: "customer",
					targetDomain: "admin",
				},
				"Domain violation: customer session attempting admin route",
			);
			throw new ORPCError("FORBIDDEN", {
				message: context.t("errors:wrongAuthDomain"),
			});
		}

		if (!context.adminSession?.user) {
			context.log.warn(
				{
					category: "security",
					requestId: context.requestId,
				},
				"Unauthorized admin access attempt",
			);
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
			context.log.warn(
				{
					category: "security",
					requestId: context.requestId,
					userId: user.id,
					status: user.status,
				},
				"Inactive admin access attempt",
			);
			throw new ORPCError("FORBIDDEN", {
				message: context.t("errors:accountInactive"),
			});
		}

		context.log.debug(
			{
				category: "security",
				requestId: context.requestId,
				userId: user.id,
				roleId: user.roleId,
			},
			"Admin authentication successful",
		);

		return next({
			context: {
				...context,
				admin: user,
				adminSession: context.adminSession,
			},
		});
	},
);
