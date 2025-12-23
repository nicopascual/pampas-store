// Customer Auth

// Admin Auth
export {
	type AdminAuth,
	type AdminSession,
	type AdminUser,
	adminAuth,
} from "./admin";
export {
	type CustomerAuth,
	type CustomerSession,
	type CustomerUser,
	customerAuth,
} from "./customer";

// Auth domain type for context discrimination
export type AuthDomain = "customer" | "admin" | null;
