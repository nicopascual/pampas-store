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
import {
	extractOrGenerateRequestId,
	getRootLogger,
} from "@pampas-store/logger";
import { Elysia } from "elysia";

const logger = getRootLogger();

const rpcHandler = new RPCHandler(appRouter, {
	interceptors: [
		onError((error) => {
			logger.error({ err: error, category: "request" }, "RPC error");
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
			logger.error({ err: error, category: "request" }, "API error");
		}),
	],
});

// Base domain for multi-tenant subdomain matching
const BASE_DOMAIN = process.env.BASE_DOMAIN || "localhost:3001";

logger.info(
	{ baseDomain: BASE_DOMAIN, category: "request" },
	"Server starting with BASE_DOMAIN",
);

// CORS origin validator that supports multi-tenant subdomains
const isAllowedOrigin = (origin: string): boolean => {
	// Explicit allowed origins from env
	const allowedOrigins = [
		process.env.CORS_ORIGIN,
		process.env.ADMIN_CORS_ORIGIN,
	].filter(Boolean) as string[];

	if (allowedOrigins.includes(origin)) {
		logger.debug(
			{ origin, type: "explicit", category: "security" },
			"CORS origin allowed (explicit)",
		);
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
			logger.debug(
				{ origin, host, type: "subdomain", category: "security" },
				"CORS origin allowed (subdomain)",
			);
			return true;
		}
	} catch {
		// Invalid URL, not allowed
	}

	logger.warn(
		{ origin, category: "security" },
		"CORS origin rejected",
	);
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
		const requestId = extractOrGenerateRequestId(
			Object.fromEntries(request.headers.entries()),
		);
		logger.debug(
			{
				requestId,
				method: request.method,
				url: request.url,
				category: "security",
			},
			"Customer auth request",
		);
		if (["POST", "GET"].includes(request.method)) {
			try {
				const response = await customerAuth.handler(request);
				logger.debug(
					{
						requestId,
						status: response.status,
						category: "security",
					},
					"Customer auth response",
				);
				return response;
			} catch (error) {
				logger.error(
					{
						requestId,
						err: error,
						category: "security",
					},
					"Customer auth error",
				);
				throw error;
			}
		}
		return status(405);
	})
	// Admin auth routes
	.all("/api/admin-auth/*", async (context) => {
		const { request, status } = context;
		const requestId = extractOrGenerateRequestId(
			Object.fromEntries(request.headers.entries()),
		);
		logger.debug(
			{
				requestId,
				method: request.method,
				url: request.url,
				category: "security",
			},
			"Admin auth request",
		);
		if (["POST", "GET"].includes(request.method)) {
			try {
				const response = await adminAuth.handler(request);
				logger.debug(
					{
						requestId,
						status: response.status,
						category: "security",
					},
					"Admin auth response",
				);
				return response;
			} catch (error) {
				logger.error(
					{
						requestId,
						err: error,
						category: "security",
					},
					"Admin auth error",
				);
				throw error;
			}
		}
		return status(405);
	})
	// RPC routes with domain-aware context
	.all("/rpc*", async (context) => {
		const startTime = Date.now();
		const requestId = extractOrGenerateRequestId(
			Object.fromEntries(context.request.headers.entries()),
		);
		const ctx = await createContext({ context, requestId });

		logger.debug(
			{
				requestId,
				method: context.request.method,
				url: context.request.url,
				category: "request",
			},
			"RPC request started",
		);

		const { response } = await rpcHandler.handle(context.request, {
			prefix: "/rpc",
			context: ctx,
		});

		if (response) {
			const latencyMs = Date.now() - startTime;
			const headers = new Headers(response.headers);
			headers.set("X-Locale", ctx.locale);
			headers.set("X-Request-Id", requestId);

			logger.info(
				{
					requestId,
					status: response.status,
					latencyMs,
					category: "request",
				},
				"RPC request completed",
			);

			return new Response(response.body, {
				status: response.status,
				headers,
			});
		}
		return new Response("Not Found", { status: 404 });
	})
	.all("/api*", async (context) => {
		const requestId = extractOrGenerateRequestId(
			Object.fromEntries(context.request.headers.entries()),
		);
		const { response } = await apiHandler.handle(context.request, {
			prefix: "/api-reference",
			context: await createContext({ context, requestId }),
		});
		return response ?? new Response("Not Found", { status: 404 });
	})
	.get("/", () => "OK")
	.listen(3000, () => {
		logger.info({ port: 3000, category: "request" }, "Server listening");
	});
