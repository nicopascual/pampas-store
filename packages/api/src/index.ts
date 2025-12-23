import { ORPCError, os } from "@orpc/server";

import type { Context } from "./context";

export const o = os.$context<Context>();

export const publicProcedure = o;

const requireAuth = o.middleware(async ({ context, next }) => {
	if (!context.session?.user) {
		throw new ORPCError("UNAUTHORIZED", {
			message: context.t("errors:unauthorized"),
		});
	}
	return next({
		context: {
			...context,
			session: context.session,
		},
	});
});

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
