import { ORPCError, os } from "@orpc/server";
import type { Context } from "../context";

const o = os.$context<Context>();

// Customer user type from Better-Auth with our additional fields
export type CustomerUser = {
	id: string;
	email: string;
	name: string; // Better-Auth uses 'name', maps to firstName in DB
	lastName: string;
	isSuspended: boolean;
	status: string;
	customerGroupId?: string | null;
	channelId?: string | null;
	phone?: string | null;
	emailVerified: boolean;
	image?: string | null;
	createdAt: Date;
	updatedAt: Date;
};

// Customer-only authentication middleware
const requireCustomerAuth = o.middleware(async ({ context, next }) => {
	// CRITICAL: Reject if this is an admin session trying to access customer routes
	if (context.authDomain === "admin") {
		context.log.warn(
			{
				category: "security",
				requestId: context.requestId,
				authDomain: "admin",
				targetDomain: "customer",
			},
			"Domain violation: admin attempting customer-only route",
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

	const user = context.customerSession.user as CustomerUser;

	// Check if customer is suspended
	if (user.isSuspended) {
		context.log.warn(
			{
				category: "security",
				requestId: context.requestId,
				userId: user.id,
			},
			"Suspended customer access attempt",
		);
		throw new ORPCError("FORBIDDEN", {
			message: context.t("errors:accountSuspended"),
		});
	}

	context.log.debug(
		{
			category: "security",
			requestId: context.requestId,
			userId: user.id,
		},
		"Customer authentication successful",
	);

	return next({
		context: {
			...context,
			customer: user,
			customerSession: context.customerSession,
		},
	});
});

export const customerProcedure = o.use(requireCustomerAuth);
