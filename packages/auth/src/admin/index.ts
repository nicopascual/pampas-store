import prisma from "@pampas-store/db";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

export const adminAuth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: "sqlite",
	}),

	// Custom base path for admin auth
	basePath: "/api/admin-auth",

	trustedOrigins: [
		process.env.ADMIN_CORS_ORIGIN || "",
		process.env.CORS_ORIGIN || "",
	].filter(Boolean),

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
			sameSite: "none",
			secure: true,
			httpOnly: true,
		},
	},
});

export type AdminAuth = typeof adminAuth;
export type AdminSession = typeof adminAuth.$Infer.Session;
export type AdminUser = typeof adminAuth.$Infer.Session.user;
