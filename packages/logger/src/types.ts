export type TenantContext = {
	storeId: string;
	storeSlug: string;
};

export type AuthContext = {
	authDomain: "customer" | "admin";
	userId: string;
};

export type LogCategory =
	| "security"
	| "tenant"
	| "request"
	| "database"
	| "business";

export type LogContext = {
	category?: LogCategory;
	tenant?: TenantContext;
	auth?: AuthContext;
	requestId?: string;
	latencyMs?: number;
	[key: string]: unknown;
};
