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
		throw new ORPCError("FORBIDDEN", {
			message: context.t("errors:wrongAuthDomain"),
		});
	}

	if (!context.customerSession?.user) {
		throw new ORPCError("UNAUTHORIZED", {
			message: context.t("errors:unauthorized"),
		});
	}

	const user = context.customerSession.user as CustomerUser;

	// Check if customer is suspended
	if (user.isSuspended) {
		throw new ORPCError("FORBIDDEN", {
			message: context.t("errors:accountSuspended"),
		});
	}

	return next({
		context: {
			...context,
			customer: user,
			customerSession: context.customerSession,
		},
	});
});

export const customerProcedure = o.use(requireCustomerAuth);
