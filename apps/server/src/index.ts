import "dotenv/config";
import { cors } from "@elysiajs/cors";
import { OpenAPIHandler } from "@orpc/openapi/fetch";
import { OpenAPIReferencePlugin } from "@orpc/openapi/plugins";
import { onError } from "@orpc/server";
import { RPCHandler } from "@orpc/server/fetch";
import { ZodToJsonSchemaConverter } from "@orpc/zod/zod4";
import { createContext } from "@pampas-store/api/context";
import { appRouter } from "@pampas-store/api/routers/index";
import { adminAuth, customerAuth } from "@pampas-store/auth";
import { Elysia } from "elysia";

const rpcHandler = new RPCHandler(appRouter, {
	interceptors: [
		onError((error) => {
			console.error(error);
		}),
	],
});
const apiHandler = new OpenAPIHandler(appRouter, {
	plugins: [
		new OpenAPIReferencePlugin({
			schemaConverters: [new ZodToJsonSchemaConverter()],
		}),
	],
	interceptors: [
		onError((error) => {
			console.error(error);
		}),
	],
});

// Base domain for multi-tenant subdomain matching
const BASE_DOMAIN = process.env.BASE_DOMAIN || "localhost:3001";

console.log("[Server] Starting with BASE_DOMAIN:", BASE_DOMAIN);

// CORS origin validator that supports multi-tenant subdomains
const isAllowedOrigin = (origin: string): boolean => {
	// Explicit allowed origins from env
	const allowedOrigins = [
		process.env.CORS_ORIGIN,
		process.env.ADMIN_CORS_ORIGIN,
	].filter(Boolean) as string[];

	if (allowedOrigins.includes(origin)) {
		console.log("[CORS] Origin allowed (explicit):", origin);
		return true;
	}

	// Allow any subdomain of BASE_DOMAIN (e.g., *.localhost:3001)
	try {
		const url = new URL(origin);
		const host = url.host; // includes port
		const baseDomainWithoutPort = BASE_DOMAIN.split(":")[0];

		// Check if it's a subdomain of base domain
		if (
			host.endsWith(BASE_DOMAIN) ||
			(baseDomainWithoutPort && host.endsWith(baseDomainWithoutPort))
		) {
			console.log("[CORS] Origin allowed (subdomain):", origin);
			return true;
		}
	} catch {
		// Invalid URL, not allowed
	}

	console.log("[CORS] Origin REJECTED:", origin);
	return false;
};

new Elysia()
	.use(
		cors({
			origin: (request): boolean => {
				const origin = request.headers.get("origin");
				if (!origin) return true; // Allow requests without origin (same-origin)
				return isAllowedOrigin(origin);
			},
			methods: ["GET", "POST", "OPTIONS"],
			allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
			exposeHeaders: ["Set-Cookie"],
			credentials: true,
		}),
	)
	// Customer auth routes
	.all("/api/customer-auth/*", async (context) => {
		const { request, status } = context;
		console.log("[CustomerAuth]", request.method, request.url);
		if (["POST", "GET"].includes(request.method)) {
			try {
				const response = await customerAuth.handler(request);
				console.log("[CustomerAuth] Response status:", response.status);
				return response;
			} catch (error) {
				console.error("[CustomerAuth] Error:", error);
				throw error;
			}
		}
		return status(405);
	})
	// Admin auth routes
	.all("/api/admin-auth/*", async (context) => {
		const { request, status } = context;
		console.log("[AdminAuth]", request.method, request.url);
		if (["POST", "GET"].includes(request.method)) {
			try {
				const response = await adminAuth.handler(request);
				console.log("[AdminAuth] Response status:", response.status);
				return response;
			} catch (error) {
				console.error("[AdminAuth] Error:", error);
				throw error;
			}
		}
		return status(405);
	})
	// RPC routes with domain-aware context
	.all("/rpc*", async (context) => {
		const ctx = await createContext({ context });
		const { response } = await rpcHandler.handle(context.request, {
			prefix: "/rpc",
			context: ctx,
		});
		if (response) {
			const headers = new Headers(response.headers);
			headers.set("X-Locale", ctx.locale);
			return new Response(response.body, {
				status: response.status,
				headers,
			});
		}
		return new Response("Not Found", { status: 404 });
	})
	.all("/api*", async (context) => {
		const { response } = await apiHandler.handle(context.request, {
			prefix: "/api-reference",
			context: await createContext({ context }),
		});
		return response ?? new Response("Not Found", { status: 404 });
	})
	.get("/", () => "OK")
	.listen(3000, () => {
		console.log("Server is running on http://localhost:3000");
	});
