import { ORPCError, os } from "@orpc/server";

import type { Context } from "./context";

export const o = os.$context<Context>();

// Base public procedure (no auth required)
export const publicProcedure = o;

export { adminProcedure } from "./middleware/admin-auth";
// Re-export domain-specific procedures
export { customerProcedure } from "./middleware/customer-auth";
export {
	createPermissionProcedure,
	customerManagementProcedure,
	customerReadOnlyProcedure,
	roleManagementProcedure,
	superAdminProcedure,
} from "./middleware/permissions";

// Legacy protected procedure - checks either customer OR admin session
// @deprecated Use customerProcedure or adminProcedure for domain-specific auth
const requireAuth = o.middleware(async ({ context, next }) => {
	if (!context.customerSession?.user && !context.adminSession?.user) {
		throw new ORPCError("UNAUTHORIZED", {
			message: context.t("errors:unauthorized"),
		});
	}
	return next({ context });
});

/**
 * @deprecated Use customerProcedure or adminProcedure instead for proper domain separation
 */
export const protectedProcedure = publicProcedure.use(requireAuth);

// Helper for creating localized errors in handlers
export function createLocalizedError(
	context: Context,
	code: ConstructorParameters<typeof ORPCError>[0],
	messageKey: string,
	options?: { data?: unknown; cause?: unknown },
) {
	return new ORPCError(code, {
		message: context.t(messageKey),
		...options,
	});
}
