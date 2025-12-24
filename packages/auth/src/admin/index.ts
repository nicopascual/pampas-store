import prisma from "@pampas-store/db";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

// Base domain for multi-tenant subdomain matching
const BASE_DOMAIN = process.env.BASE_DOMAIN || "localhost:3001";

// Check if origin is allowed (supports subdomains)
const isAllowedOrigin = (origin: string): boolean => {
	const allowedOrigins = [
		process.env.ADMIN_CORS_ORIGIN,
		process.env.CORS_ORIGIN,
	].filter(Boolean) as string[];

	if (allowedOrigins.includes(origin)) {
		return true;
	}

	// Allow any subdomain of BASE_DOMAIN (e.g., *.lvh.me:3001)
	try {
		const url = new URL(origin);
		const host = url.host;
		const baseDomainWithoutPort = BASE_DOMAIN.split(":")[0];
		if (
			host.endsWith(BASE_DOMAIN) ||
			(baseDomainWithoutPort && host.endsWith(baseDomainWithoutPort))
		) {
			return true;
		}
	} catch {
		// Invalid URL
	}

	return false;
};

export const adminAuth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: "sqlite",
	}),

	// Custom base path for admin auth
	basePath: "/api/admin-auth",

	trustedOrigins: (request) => {
		const origin = request.headers.get("origin");
		if (!origin) return [];
		return isAllowedOrigin(origin) ? [origin] : [];
	},

	// Email/password ONLY for admins (no OAuth)
	emailAndPassword: {
		enabled: true,
	},

	// Map to admin-prefixed tables
	user: {
		modelName: "Admin",
		additionalFields: {
			status: {
				type: "string",
				defaultValue: "active",
			},
			roleId: {
				type: "string",
				required: false,
			},
		},
	},

	session: {
		modelName: "AdminSession",
		fields: {
			userId: "adminId",
		},
	},

	account: {
		modelName: "AdminAccount",
		fields: {
			userId: "adminId",
		},
	},

	verification: {
		modelName: "AdminVerification",
	},

	advanced: {
		// Unique cookie prefix for admin sessions - CRITICAL for domain separation
		cookiePrefix: "admin",
		defaultCookieAttributes: {
			sameSite: "lax",
			secure: process.env.NODE_ENV === "production",
			httpOnly: true,
		},
	},
});

export type AdminAuth = typeof adminAuth;
export type AdminSession = typeof adminAuth.$Infer.Session;
export type AdminUser = typeof adminAuth.$Infer.Session.user;
