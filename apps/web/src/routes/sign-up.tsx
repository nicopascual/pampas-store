import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { getUser } from "@/functions/get-user";

export const Route = createFileRoute("/sign-up")({
	component: RouteComponent,
	beforeLoad: async () => {
		const session = await getUser();
		if (session) {
			throw redirect({ to: "/dashboard" });
		}
	},
});

function RouteComponent() {
	return <Outlet />;
}
