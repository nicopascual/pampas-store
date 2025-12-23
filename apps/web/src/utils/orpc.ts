import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import type { RouterClient } from "@orpc/server";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";
import type { appRouter } from "@pampas-store/api/routers/index";
import { QueryCache, QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import i18n from "@/lib/i18n";

export const queryClient = new QueryClient({
	queryCache: new QueryCache({
		onError: (error, query) => {
			toast.error(`${i18n.t("errors:generic")}: ${error.message}`, {
				action: {
					label: i18n.t("common:buttons.retry"),
					onClick: query.invalidate,
				},
			});
		},
	}),
});

function getClientORPC(): RouterClient<typeof appRouter> {
	const link = new RPCLink({
		url: `${import.meta.env.VITE_SERVER_URL}/rpc`,
		fetch(url, options) {
			return fetch(url, {
				...options,
				credentials: "include",
			});
		},
	});

	return createORPCClient(link);
}

export const client: RouterClient<typeof appRouter> = getClientORPC();

export const orpc = createTanstackQueryUtils(client);
