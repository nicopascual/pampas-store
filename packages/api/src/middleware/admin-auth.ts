import { ORPCError, os } from "@orpc/server";
import type { Context } from "../context";

const o = os.$context<Context>();

// Admin-only authentication middleware
const requireAdminAuth = o.middleware(async ({ context, next }) => {
	// CRITICAL: Reject if this is a customer session trying to access admin routes
	if (context.authDomain === "customer") {
		context.log.warn(
			{
				category: "security",
				requestId: context.requestId,
				authDomain: "customer",
				targetDomain: "admin",
			},
			"Domain violation: customer attempting admin-only route",
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

	// Check if admin is active
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
});

export const adminProcedure = o.use(requireAdminAuth);
