import { createServerFn } from "@tanstack/react-start";

import { createServerORPCClient, requestMiddleware } from "./server-orpc";

export const getPrivateData = createServerFn()
	.middleware([requestMiddleware])
	.handler(async ({ context }) => {
		const client = createServerORPCClient(context.request);
		return client.privateData();
	});
