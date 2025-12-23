import prisma from "@pampas-store/db";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

export const customerAuth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: "sqlite",
	}),

	// Custom base path for customer auth
	basePath: "/api/customer-auth",

	trustedOrigins: [process.env.CORS_ORIGIN || ""],

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
			sameSite: "none",
			secure: true,
			httpOnly: true,
		},
	},
});

export type CustomerAuth = typeof customerAuth;
export type CustomerSession = typeof customerAuth.$Infer.Session;
export type CustomerUser = typeof customerAuth.$Infer.Session.user;
