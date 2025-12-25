import pino, { type Logger } from "pino";
import { pinoConfig } from "./config";
import type { AuthContext, TenantContext } from "./types";

export type { TenantContext, AuthContext, LogCategory } from "./types";
export { generateRequestId, extractOrGenerateRequestId } from "./request-id";

// Root logger singleton
let rootLoggerInstance: Logger | undefined;

/**
 * Get the root logger instance (singleton)
 */
export function getRootLogger(): Logger {
	if (!rootLoggerInstance) {
		rootLoggerInstance = pino(pinoConfig);
	}
	return rootLoggerInstance;
}

/**
 * Creates a tenant-specific logger with store context
 */
export function createTenantLogger(
	tenant: TenantContext,
	requestId?: string,
): Logger {
	const rootLogger = getRootLogger();
	const bindings: Record<string, unknown> = {
		tenant: {
			storeId: tenant.storeId,
			storeSlug: tenant.storeSlug,
		},
	};

	if (requestId) {
		bindings.requestId = requestId;
	}

	return rootLogger.child(bindings);
}

/**
 * Creates a full request-scoped logger with tenant and auth context
 */
export function createRequestLogger(
	requestId: string,
	tenant?: TenantContext,
	auth?: AuthContext,
): Logger {
	const rootLogger = getRootLogger();
	const bindings: Record<string, unknown> = {
		requestId,
	};

	if (tenant) {
		bindings.tenant = {
			storeId: tenant.storeId,
			storeSlug: tenant.storeSlug,
		};
	}

	if (auth) {
		bindings.auth = {
			domain: auth.authDomain,
			userId: auth.userId,
		};
	}

	return rootLogger.child(bindings);
}

/**
 * Partially redacts an email address for privacy
 * Example: nicolas.pascual@example.com -> ni***@example.com
 */
export function redactEmail(email: string): string {
	const [localPart, domain] = email.split("@");
	if (!localPart || !domain) return "***@***";

	const visibleChars = Math.min(2, localPart.length);
	const redacted = localPart.substring(0, visibleChars) + "***";
	return `${redacted}@${domain}`;
}
