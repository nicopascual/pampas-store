import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";

import { getUser } from "@/functions/get-user";
import { getPrivateData } from "@/functions/get-private-data";
import { prefetch } from "@/functions/server-orpc";
import { orpc } from "@/utils/orpc";

export const Route = createFileRoute("/dashboard")({
	component: RouteComponent,
	beforeLoad: async () => {
		const session = await getUser();
		return { session };
	},
	loader: async ({ context }) => {
		if (!context.session) {
			throw redirect({
				to: "/login",
			});
		}
		await prefetch(getPrivateData(), orpc.privateData, context.queryClient);
	},
});

function RouteComponent() {
	const { session } = Route.useRouteContext();

	const { data: privateData } = useSuspenseQuery(orpc.privateData.queryOptions());

	return (
		<div>
			<h1>Dashboard</h1>
			<p>Welcome {session?.user.name}</p>
			<p>API: {privateData.message}</p>
		</div>
	);
}
