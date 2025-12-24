import prisma from "@pampas-store/db";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

// Base domain for multi-tenant subdomain matching
const BASE_DOMAIN = process.env.BASE_DOMAIN || "localhost:3001";

// Check if origin is allowed (supports subdomains)
const isAllowedOrigin = (origin: string): boolean => {
	const allowedOrigins = [process.env.CORS_ORIGIN].filter(Boolean) as string[];

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

export const customerAuth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: "sqlite",
	}),

	// Custom base path for customer auth
	basePath: "/api/customer-auth",

	trustedOrigins: (request) => {
		const origin = request.headers.get("origin");
		if (!origin) return [];
		return isAllowedOrigin(origin) ? [origin] : [];
	},

	// Email/password + Google OAuth for customers
	emailAndPassword: {
		enabled: true,
	},

	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID || "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
		},
	},

	// Map to customer-prefixed tables
	user: {
		modelName: "Customer",
		fields: {
			name: "firstName",
		},
		additionalFields: {
			lastName: {
				type: "string",
				required: true,
				defaultValue: "",
				input: true,
			},
			phone: {
				type: "string",
				required: false,
				input: true,
			},
			status: {
				type: "string",
				defaultValue: "active",
			},
			isSuspended: {
				type: "boolean",
				defaultValue: false,
			},
			customerGroupId: {
				type: "string",
				required: false,
			},
			channelId: {
				type: "string",
				required: false,
			},
		},
	},

	session: {
		modelName: "CustomerSession",
		fields: {
			userId: "customerId",
		},
	},

	account: {
		modelName: "CustomerAccount",
		fields: {
			userId: "customerId",
		},
	},

	verification: {
		modelName: "CustomerVerification",
	},

	advanced: {
		// Unique cookie prefix for customer sessions - CRITICAL for domain separation
		cookiePrefix: "customer",
		defaultCookieAttributes: {
			sameSite: "lax",
			secure: process.env.NODE_ENV === "production",
			httpOnly: true,
		},
	},
});

export type CustomerAuth = typeof customerAuth;
export type CustomerSession = typeof customerAuth.$Infer.Session;
export type CustomerUser = typeof customerAuth.$Infer.Session.user;
