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

new Elysia()
	.use(
		cors({
			origin: [
				process.env.CORS_ORIGIN || "",
				process.env.ADMIN_CORS_ORIGIN || "",
			].filter(Boolean),
			methods: ["GET", "POST", "OPTIONS"],
			allowedHeaders: ["Content-Type", "Authorization"],
			credentials: true,
		}),
	)
	// Customer auth routes
	.all("/api/customer-auth/*", async (context) => {
		const { request, status } = context;
		if (["POST", "GET"].includes(request.method)) {
			return customerAuth.handler(request);
		}
		return status(405);
	})
	// Admin auth routes
	.all("/api/admin-auth/*", async (context) => {
		const { request, status } = context;
		if (["POST", "GET"].includes(request.method)) {
			return adminAuth.handler(request);
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
